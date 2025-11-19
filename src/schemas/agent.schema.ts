import { z } from 'zod'

export const agentFormSchema = z.object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
    description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres').optional(),
    status: z.enum(['active', 'training', 'disable']).default('disable').optional(),
})

export type AgentFormValues = z.infer<typeof agentFormSchema> 