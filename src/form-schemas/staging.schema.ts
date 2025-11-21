import { z } from "zod";

export const stagingSchema = z.object({
  removeExistingFurniture: z.boolean().default(false),
  addFurniture: z.boolean().default(true),
  roomType: z.string().min(2),
  furnitureStyle: z.string().min(2),
});

export type StagingInput = z.infer<typeof stagingSchema>;