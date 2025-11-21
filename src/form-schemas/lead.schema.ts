import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório" }).max(120),
  email: z
    .string()
    .email({ message: "E-mail inválido" })
    .max(160),
  company: z.string().min(2, { message: "Empresa é obrigatória" }).max(160),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || v.replace(/\D/g, "").length >= 10, {
      message: "Telefone inválido",
    }),
  message: z.string().max(500).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;