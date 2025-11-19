import * as cheerio from 'cheerio'
import TurndownService from 'turndown'

import { normalizeCharacters } from './file-converter.util'

// Import puppeteer dynamically to avoid SSR issues
const getPuppeteer = async () => {
    if (typeof window !== 'undefined') {
        throw new Error('Puppeteer should only run on the server side')
    }
    return await import('puppeteer')
}

// Initialize turndown service for HTML to markdown conversion
const turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined',
    linkReferenceStyle: 'full'
})

export interface ScrapingResult {
    title: string
    content: string
    markdown: string
    url: string
    method: 'cheerio' | 'jina' | 'puppeteer'
    processedSize: number
}

export interface ScrapingOptions {
    timeout?: number
    waitForSelector?: string
    userAgent?: string
}

const DEFAULT_OPTIONS: ScrapingOptions = {
    timeout: 30000,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

export const validateUrl = (url: string): { isValid: boolean; error?: string } => {
    try {
        const urlObj = new URL(url)

        // Check if it's http or https
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
            return {
                isValid: false,
                error: 'URL deve usar protocolo HTTP ou HTTPS'
            }
        }

        // Check if it has a valid domain
        if (!urlObj.hostname || urlObj.hostname.length < 3) {
            return {
                isValid: false,
                error: 'URL deve ter um domínio válido'
            }
        }

        return { isValid: true }
    } catch (error) {
        return {
            isValid: false,
            error: 'URL inválida'
        }
    }
}

const cleanHtmlContent = (html: string): string => {
    const $ = cheerio.load(html)

    // Remove JavaScript e CSS
    $('script, style').remove()

    // Filtrar imagens
    $('img').each(function () {
        const src = $(this).attr('src') || ''
        const alt = $(this).attr('alt') || ''
        const width = $(this).attr('width') || ''
        const height = $(this).attr('height') || ''

        // Remove imagens que são provavelmente decorativas ou não relevantes
        if (
            // Remove base64 e data URLs
            src.includes('data:image') ||
            src.includes('base64') ||
            // Remove imagens sem alt text significativo
            !alt.trim() ||
            alt.toLowerCase().includes('logo') ||
            alt.toLowerCase().includes('icon') ||
            alt.toLowerCase().includes('banner') ||
            alt.toLowerCase().includes('background') ||
            // Remove imagens muito pequenas (provavelmente ícones)
            (width && parseInt(width) < 100) ||
            (height && parseInt(height) < 100) ||
            // Remove imagens de redes sociais e elementos de UI comuns
            src.toLowerCase().includes('logo') ||
            src.toLowerCase().includes('icon') ||
            src.toLowerCase().includes('banner') ||
            src.toLowerCase().includes('avatar') ||
            src.toLowerCase().includes('social')
        ) {
            $(this).remove()
        } else {
            // Para imagens mantidas, garante que elas tenham um alt text descritivo
            if (alt.trim()) {
                $(this).attr('alt', alt.trim())
            } else {
                $(this).remove() // Remove se não tiver alt text
            }
        }
    })

    // Remove style attributes
    $('*').removeAttr('style')

    return $('body').html() || html
}

const processMarkdownContent = (markdown: string): string => {
    // Normalize characters
    let processed = normalizeCharacters(markdown)

    // Clean up markdown formatting
    processed = processed
        .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
        .replace(/^\s+|\s+$/gm, '') // Trim whitespace from lines
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Normalize paragraph spacing
        .replace(/\s+/g, ' ') // Normalize multiple spaces
        .replace(/\*{3,}/g, '**') // Normalize bold formatting
        .replace(/_{3,}/g, '__') // Normalize italic formatting
        .trim()

    return processed
}

const extractTitle = (html: string): string => {
    const $ = cheerio.load(html)

    // Try different title sources in order of preference
    const titleSelectors = [
        'h1',
        'title',
        '[property="og:title"]',
        '[name="twitter:title"]',
        '.page-title',
        '.post-title',
        '.entry-title'
    ]

    for (const selector of titleSelectors) {
        const element = $(selector)
        if (element.length > 0) {
            const title = element.text().trim()
            if (title.length > 0 && title.length < 200) {
                return title
            }
        }
    }

    return 'Conteúdo Web'
}

const scrapeWithCheerio = async (url: string, options: ScrapingOptions): Promise<ScrapingResult | null> => {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), options.timeout)

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': options.userAgent || DEFAULT_OPTIONS.userAgent!
            }
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const html = await response.text()
        const cleanedHtml = cleanHtmlContent(html)
        const title = extractTitle(html)
        const rawMarkdown = turndownService.turndown(cleanedHtml)
        const markdown = processMarkdownContent(rawMarkdown)
        const processedSize = new TextEncoder().encode(markdown).length

        return {
            title,
            content: cleanedHtml,
            markdown,
            url,
            method: 'cheerio',
            processedSize
        }
    } catch (error) {
        console.warn('Cheerio scraping failed:', error)
        return null
    }
}

const scrapeWithPuppeteer = async (url: string, options: ScrapingOptions): Promise<ScrapingResult> => {
    const puppeteer = await getPuppeteer()

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    })

    try {
        const page = await browser.newPage()

        await page.setUserAgent(options.userAgent || DEFAULT_OPTIONS.userAgent!)
        await page.setViewport({ width: 1920, height: 1080 })

        // Set timeout
        page.setDefaultTimeout(options.timeout!)

        await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: options.timeout
        })

        // Wait for custom selector if provided
        if (options.waitForSelector) {
            await page.waitForSelector(options.waitForSelector, { timeout: 5000 }).catch(() => {
                console.warn('Custom selector not found, continuing...')
            })
        }

        // Extract content
        const result = await page.evaluate(() => {
            // Remove JavaScript and CSS
            const scriptsAndStyles = document.querySelectorAll('script, style')
            scriptsAndStyles.forEach(el => el.remove())

            // Filtrar imagens
            const images = document.querySelectorAll('img')
            images.forEach(img => {
                const src = img.getAttribute('src') || ''
                const alt = img.getAttribute('alt') || ''
                const width = img.getAttribute('width')
                const height = img.getAttribute('height')

                // Remove imagens que são provavelmente decorativas ou não relevantes
                if (
                    // Remove base64 e data URLs
                    src.includes('data:image') ||
                    src.includes('base64') ||
                    // Remove imagens sem alt text significativo
                    !alt.trim() ||
                    alt.toLowerCase().includes('logo') ||
                    alt.toLowerCase().includes('icon') ||
                    alt.toLowerCase().includes('banner') ||
                    alt.toLowerCase().includes('background') ||
                    // Remove imagens muito pequenas (provavelmente ícones)
                    (width && parseInt(width) < 100) ||
                    (height && parseInt(height) < 100) ||
                    // Remove imagens de redes sociais e elementos de UI comuns
                    src.toLowerCase().includes('logo') ||
                    src.toLowerCase().includes('icon') ||
                    src.toLowerCase().includes('banner') ||
                    src.toLowerCase().includes('avatar') ||
                    src.toLowerCase().includes('social')
                ) {
                    img.remove()
                } else {
                    // Para imagens mantidas, garante que elas tenham um alt text descritivo
                    if (alt.trim()) {
                        img.setAttribute('alt', alt.trim())
                    } else {
                        img.remove() // Remove se não tiver alt text
                    }
                }
            })

            // Remove style attributes
            const allElements = document.querySelectorAll('*')
            allElements.forEach(el => el.removeAttribute('style'))

            // Get title
            const title = document.querySelector('h1')?.textContent?.trim() ||
                document.title?.trim() ||
                'Conteúdo Web'

            // Get content
            const content = document.body.innerHTML

            return { title, content }
        })

        const rawMarkdown = turndownService.turndown(result.content)
        const markdown = processMarkdownContent(rawMarkdown)
        const processedSize = new TextEncoder().encode(markdown).length

        return {
            title: result.title,
            content: result.content,
            markdown,
            url,
            method: 'puppeteer',
            processedSize
        }

    } finally {
        await browser.close()
    }
}

const scrapeWithJina = async (url: string, options: ScrapingOptions): Promise<ScrapingResult | null> => {
    try {
        const response = await fetch('https://api.jina.ai/v1/text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.JINA_API_KEY}`
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            throw new Error(`Jina API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.text || '';

        if (!content || content.length < 500) {
            return null;
        }

        const title = data.title || extractTitle(content);
        const markdown = turndownService.turndown(content);
        const processedMarkdown = processMarkdownContent(markdown);
        const processedSize = new TextEncoder().encode(processedMarkdown).length;

        return {
            title,
            content,
            markdown: processedMarkdown,
            url,
            method: 'jina',
            processedSize
        };
    } catch (error) {
        console.warn('Jina scraping failed:', error);
        return null;
    }
};

export const scrapeWebsite = async (url: string, options: Partial<ScrapingOptions> = {}): Promise<ScrapingResult> => {
    const finalOptions = { ...DEFAULT_OPTIONS, ...options }

    // Validate URL first
    const validation = validateUrl(url)
    if (!validation.isValid) {
        throw new Error(validation.error)
    }

    // Try cheerio first (fastest)
    console.log('Tentando extrair com Cheerio...')
    const cheerioResult = await scrapeWithCheerio(url, finalOptions)

    if (cheerioResult && cheerioResult.processedSize >= 50) {
        console.log('Conteúdo extraído com sucesso usando Cheerio')
        return cheerioResult
    }

    // Try Jina if Cheerio fails or returns insufficient content
    console.log('Cheerio retornou conteúdo insuficiente, tentando Jina...')
    const jinaResult = await scrapeWithJina(url, finalOptions)

    if (jinaResult && jinaResult.processedSize >= 50) {
        console.log('Conteúdo extraído com sucesso usando Jina')
        return jinaResult
    }

    // Fallback to puppeteer as last resort
    console.log('Jina retornou conteúdo insuficiente, tentando Puppeteer...')
    const puppeteerResult = await scrapeWithPuppeteer(url, finalOptions)

    if (!puppeteerResult || puppeteerResult.processedSize < 500) {
        throw new Error('Não foi possível extrair conteúdo suficiente da página')
    }

    console.log('Conteúdo extraído com sucesso usando Puppeteer')
    return puppeteerResult
}

export const formatWebsiteContent = (result: ScrapingResult): string => {
    let markdown = `# ${result.title}\n\n`
    markdown += result.markdown + '\n\n'
    return markdown
} 