"use server";

import { type LeadInput, leadSchema } from "@/form-schemas/lead.schema";
import { ApiResponse, AppError } from "@/interfaces/api-response.interface";
import { actionClient } from "@/lib/safe-action";
import { createErrorResponse, createSuccessResponse } from "@/utils/api-response.util";

export const createLeadAction = actionClient
  .inputSchema(leadSchema)
  .action(async ({ parsedInput }): Promise<ApiResponse<any>> => {
  try {
    if (!parsedInput || typeof parsedInput !== "object") {
      throw new AppError("Dados inválidos", "VALIDATION_ERROR", 400);
    }
    const input = parsedInput as LeadInput;
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return createSuccessResponse({ message: "Lead recebido (modo dev)" });
    }

    const res = await fetch(`${apiUrl}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new AppError(data?.message || "Falha ao enviar lead", "API_ERROR", res.status, data);
    }
    return createSuccessResponse(data);
  } catch (error: any) {
    return createErrorResponse(error);
  }
});