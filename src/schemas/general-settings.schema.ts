import { z } from "zod";

export const generalSettingsSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().optional(),
});