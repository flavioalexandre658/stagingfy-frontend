import mammoth from 'mammoth'
import TurndownService from 'turndown'

// Dynamically import PDF.js only on the client side
const getPdfJs = async () => {
    if (typeof window === 'undefined') {
        throw new Error('PDF processing is only available on the client side')
    }

    const pdfjsLib = await import('pdfjs-dist')

    // Configure worker only once
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
    }

    return pdfjsLib
}

// Helper function to read file as array buffer
const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.result instanceof ArrayBuffer) {
                resolve(reader.result)
            } else {
                reject(new Error('Failed to read file as ArrayBuffer'))
            }
        }
        reader.onerror = () => reject(reader.error)
        reader.readAsArrayBuffer(file)
    })
}

// Helper function to read file as text
const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result)
            } else {
                reject(new Error('Failed to read file as text'))
            }
        }
        reader.onerror = () => reject(reader.error)
        reader.readAsText(file)
    })
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

export interface ConversionResult {
    content: string
    originalSize: number
    processedSize: number
    mimeType: string
    fileType: string
}

export const convertFileToMarkdown = async (file: File): Promise<ConversionResult> => {
    // Ensure this runs only on the client side
    if (typeof window === 'undefined') {
        throw new Error('File conversion is only available on the client side')
    }

    const originalSize = file.size
    const mimeType = file.type
    const fileType = file.type

    let content = ''

    try {
        switch (file.type) {
            case 'text/plain':
                content = await convertTextFile(file)
                break
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                content = await convertDocxFile(file)
                break
            case 'application/msword':
                throw new Error('Arquivos .doc não são suportados. Use .docx')
            case 'application/pdf':
                content = await convertPdfFile(file)
                break
            default:
                throw new Error(`Tipo de arquivo não suportado: ${file.type}`)
        }

        // Sanitize and format the content
        content = sanitizeMarkdown(content)

        const processedSize = new TextEncoder().encode(content).length

        return {
            content,
            originalSize,
            processedSize,
            mimeType,
            fileType
        }
    } catch (error) {
        console.error('Error converting file:', error)
        throw new Error(`Erro ao converter arquivo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
}

const convertTextFile = async (file: File): Promise<string> => {
    const text = await readFileAsText(file)
    // Normalize characters 
    const normalizedText = normalizeCharacters(text)

    // Split text into pages if it's long enough
    const lines = normalizedText.split('\n')
    let markdownContent = `# ${file.name.replace(/\.[^/.]+$/, '')}\n\n`

    if (normalizedText.length > 1500) {
        let currentPageContent = ''
        let pageNumber = 1
        let contentLength = 0

        for (const line of lines) {
            currentPageContent += line + '\n'
            contentLength += line.length

            // Auto-split if content gets too long (approximately one page)
            if (contentLength > 1500 && (line.trim() === '' || line.endsWith('.') || line.endsWith('!') || line.endsWith('?'))) {
                const pageNumberFormatted = pageNumber.toString().padStart(2, '0')
                markdownContent += `\n\n---- PÁGINA ${pageNumberFormatted} ----\n\n`
                markdownContent += currentPageContent.trim() + '\n\n'
                pageNumber++
                currentPageContent = ''
                contentLength = 0
            }
        }

        // Add any remaining content
        if (currentPageContent.trim()) {
            const pageNumberFormatted = pageNumber.toString().padStart(2, '0')
            markdownContent += `\n\n---- PÁGINA ${pageNumberFormatted} ----\n\n`
            markdownContent += currentPageContent.trim() + '\n\n'
        }
    } else {
        // Single page for shorter content
        markdownContent += `\n\n---- PÁGINA 01 ----\n\n`
        markdownContent += normalizedText + '\n\n'
    }

    return markdownContent
}

const convertDocxFile = async (file: File): Promise<string> => {
    const arrayBuffer = await readFileAsArrayBuffer(file)

    // Convert DOCX to HTML using mammoth
    const result = await mammoth.convertToHtml({ arrayBuffer })

    if (result.messages.length > 0) {
        console.warn('Mammoth warnings:', result.messages)
    }

    // Convert HTML to markdown
    let markdown = turndownService.turndown(result.value)

    // Try to split content into logical pages based on content structure
    // Since DOCX page breaks are not always preserved, we'll split by major headings or long content
    const lines = markdown.split('\n')
    let markdownContent = `# ${file.name.replace(/\.[^/.]+$/, '')}\n\n`
    let currentPageContent = ''
    let pageNumber = 1
    let contentLength = 0

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()

        // Check for explicit page break markers
        if (line.includes('<!--PAGE_BREAK-->')) {
            if (currentPageContent.trim()) {
                const pageNumberFormatted = pageNumber.toString().padStart(2, '0')
                markdownContent += `\n\n---- PÁGINA ${pageNumberFormatted} ----\n\n`
                markdownContent += normalizeCharacters(currentPageContent.trim()) + '\n\n'
                pageNumber++
                currentPageContent = ''
                contentLength = 0
            }
            continue
        }

        // Split on major headings (# or ##) if content is getting long
        if ((line.startsWith('# ') || line.startsWith('## ')) && contentLength > 800 && currentPageContent.trim()) {
            const pageNumberFormatted = pageNumber.toString().padStart(2, '0')
            markdownContent += `\n\n---- PÁGINA ${pageNumberFormatted} ----\n\n`
            markdownContent += normalizeCharacters(currentPageContent.trim()) + '\n\n'
            pageNumber++
            currentPageContent = line + '\n'
            contentLength = line.length
        } else {
            currentPageContent += line + '\n'
            contentLength += line.length

            // Auto-split if content gets too long (approximately one page)
            if (contentLength > 1500 && (line === '' || line.endsWith('.') || line.endsWith('!') || line.endsWith('?'))) {
                const pageNumberFormatted = pageNumber.toString().padStart(2, '0')
                markdownContent += `\n\n---- PÁGINA ${pageNumberFormatted} ----\n\n`
                markdownContent += normalizeCharacters(currentPageContent.trim()) + '\n\n'
                pageNumber++
                currentPageContent = ''
                contentLength = 0
            }
        }
    }

    // Add any remaining content
    if (currentPageContent.trim()) {
        const pageNumberFormatted = pageNumber.toString().padStart(2, '0')
        markdownContent += `\n\n---- PÁGINA ${pageNumberFormatted} ----\n\n`
        markdownContent += normalizeCharacters(currentPageContent.trim()) + '\n\n'
    }

    // If no pages were created (single page document), create at least one page
    if (pageNumber === 1) {
        const normalizedMarkdown = normalizeCharacters(markdown)
        markdownContent += `\n\n---- PÁGINA 01 ----\n\n`
        markdownContent += normalizedMarkdown + '\n\n'
    }

    return markdownContent
}

const convertPdfFile = async (file: File): Promise<string> => {
    try {
        // Get PDF.js dynamically (client-side only)
        const pdfjsLib = await getPdfJs()

        // Use FileReader for better compatibility
        const arrayBuffer = await readFileAsArrayBuffer(file)
        const uint8Array = new Uint8Array(arrayBuffer)

        // Load PDF document using PDF.js
        const loadingTask = pdfjsLib.getDocument({ data: uint8Array })
        const pdf = await loadingTask.promise

        let markdownContent = `# ${file.name.replace(/\.[^/.]+$/, '')}\n\n`
        let totalTextLength = 0

        // Extract text from each page individually
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum)
            const textContent = await page.getTextContent()

            // Extract and join text items for this page
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ')
                .trim()

            // Only add page if it has meaningful content
            if (pageText && pageText.length > 10) {
                // Format page number with leading zeros if more than 99 pages
                const pageNumberFormatted = pdf.numPages > 99
                    ? pageNum.toString().padStart(3, '0')
                    : pageNum.toString().padStart(2, '0')

                markdownContent += `\n\n---- PÁGINA ${pageNumberFormatted} ----\n\n`

                // Clean and format page text
                const cleanPageText = pageText
                    .replace(/\s+/g, ' ')
                    .trim()

                markdownContent += cleanPageText + '\n\n'
                totalTextLength += cleanPageText.length
            }
        }

        if (totalTextLength < 10) {
            throw new Error('PDF não contém texto extraível ou tem muito pouco conteúdo')
        }

        return markdownContent
    } catch (error) {
        console.error('PDF extraction error:', error)
        throw new Error(`Não foi possível extrair texto do PDF: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
}

// Function to normalize accents and special characters
export const normalizeCharacters = (text: string): string => {
    return text
        // Fix common encoding issues
        .replace(/Ã¡/g, 'á')
        .replace(/Ã /g, 'à')
        .replace(/Ã¢/g, 'â')
        .replace(/Ã£/g, 'ã')
        .replace(/Ã©/g, 'é')
        .replace(/Ãª/g, 'ê')
        .replace(/Ã­/g, 'í')
        .replace(/Ã³/g, 'ó')
        .replace(/Ã´/g, 'ô')
        .replace(/Ãµ/g, 'õ')
        .replace(/Ãº/g, 'ú')
        .replace(/Ã§/g, 'ç')
        .replace(/Ã‡/g, 'Ç')
        .replace(/Â´/g, '´')
        .replace(/Â`/g, '`')
        .replace(/Â~/g, '~')
        .replace(/Â^/g, '^')
        .replace(/â€™/g, "'")
        .replace(/â€œ/g, '"')
        .replace(/â€/g, '"')
        .replace(/â€"/g, '–')
        .replace(/â€"/g, '—')
        // Fix other common issues
        .replace(/â¢/g, '•')
        .replace(/Â·/g, '·')
        .replace(/Â°/g, '°')
        .replace(/Â®/g, '®')
        .replace(/Â©/g, '©')
        .replace(/Â/g, ' ')
        // Remove multiple spaces
        .replace(/\s+/g, ' ')
        .trim()
}

const sanitizeMarkdown = (content: string): string => {
    // Normalize characters first
    content = normalizeCharacters(content)

    // Remove excessive whitespace
    content = content.replace(/\n{3,}/g, '\n\n')

    // Trim the content
    content = content.trim()

    // Ensure minimum content length
    if (content.length < 10) {
        throw new Error('Arquivo não contém texto suficiente para processamento')
    }

    return content
}

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = [
        'text/plain',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf'
    ]

    if (file.size > maxSize) {
        return {
            isValid: false,
            error: 'Arquivo muito grande. Tamanho máximo: 5MB'
        }
    }

    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            error: 'Tipo de arquivo não suportado. Use: .txt, .docx, .pdf'
        }
    }

    return { isValid: true }
}

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
} 