import { z } from 'zod'

// FAQ Form Schema
export const faqFormSchema = z.object({
    title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres'),
    questions: z.array(
        z.string().trim().min(10, 'A pergunta deve ter no mínimo 10 caracteres')
    ).min(1, 'Adicione pelo menos uma pergunta'),
    answer: z.string().trim().min(10, 'A resposta deve ter no mínimo 10 caracteres'),
})

export type FaqFormValues = z.infer<typeof faqFormSchema>

// Text Form Schema
export const textFormSchema = z.object({
    title: z.string().trim().min(3, 'O título deve ter no mínimo 3 caracteres'),
    content: z.string().trim().min(10, 'O conteúdo deve ter no mínimo 10 caracteres'),
})

export type TextFormValues = z.infer<typeof textFormSchema>

// Website Form Schema
export const websiteFormSchema = z.object({
    mode: z.enum(['crawl', 'sitemap', 'single']),
    protocol: z.enum(['https://', 'http://']),
    url: z.string().min(1, 'A URL é obrigatória'),
    includePaths: z.string().optional(),
    excludePaths: z.string().optional(),
})

export type WebsiteFormValues = z.infer<typeof websiteFormSchema>

// Files Form Schema
export const filesFormSchema = z.object({
    files: z.array(z.any()).min(1, 'Selecione pelo menos um arquivo'),
})

export type FilesFormValues = z.infer<typeof filesFormSchema> 