"use server";

import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { ApiResponse, AppError } from "@/interfaces/api-response.interface";
import { actionClient } from "@/lib/safe-action";
import { createErrorResponse, createSuccessResponse } from "@/utils/api-response.util";

import { authOptions } from "../../../libs/auth-options";

const generateInputSchema = z.object({
  inputUrl: z.string().min(1),
  roomType: z.string().min(1),
  furnitureStyle: z.string().min(1),
  removeExistingFurniture: z.boolean().optional(),
  addFurniture: z.boolean().optional(),
});

type GeneratePayload = z.infer<typeof generateInputSchema>;

export const generateStagingAction = actionClient
  .inputSchema(generateInputSchema)
  .action(async ({ parsedInput }): Promise<ApiResponse<{ results: { url: string }[] }>> => {
  try {
    if (!parsedInput || typeof parsedInput !== "object") {
      throw new AppError("Imagem obrigatória", "VALIDATION_ERROR", 400);
    }
    const payload = parsedInput as GeneratePayload;
    if (!payload?.inputUrl) {
      throw new AppError("Imagem obrigatória", "VALIDATION_ERROR", 400);
    }

    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return createSuccessResponse({
        results: [
          { url: "/assets/images/all-img/image-2.png" },
          { url: "/assets/images/all-img/image-3.png" },
          { url: "/assets/images/all-img/image-4.png" },
        ]
      });
    }

    // 1) Dispara staging
    const session = await getServerSession(authOptions);
    const c = await cookies();
    const token = (session as any)?.user?.access_token || c.get("auth_token")?.value;
    const headers: HeadersInit = { "Content-Type": "application/json", Accept: "application/json" };
    if (token) (headers as any)["Authorization"] = `Bearer ${token}`;
    const startRes = await fetch(`${apiUrl}/api/v1/virtual-staging/with-references`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const start = await startRes.json();

    if (!startRes.ok || !start?.data?.uploadId) {
      throw new AppError(start?.message || "Falha ao iniciar staging", "API_ERROR", startRes.status, start);
    }

    // 2) Poll status até completed (timeout ~30s)
    const uploadId = start.data.uploadId;
    const deadline = Date.now() + 30000;
    let statusData: any = null;
    while (Date.now() < deadline) {
      const statusHeaders: HeadersInit = { Accept: "application/json" };
      if (token) (statusHeaders as any)["Authorization"] = `Bearer ${token}`;
      const statusRes = await fetch(`${apiUrl}/api/v1/upload/${uploadId}/status`, { headers: statusHeaders });
      const statusJson = await statusRes.json();
      if (!statusRes.ok) {
        throw new AppError(statusJson?.message || "Falha ao obter status", "API_ERROR", statusRes.status, statusJson);
      }
      statusData = statusJson?.data;
      if (statusData?.status === "completed" && statusData?.outputImageUrl) break;
      await new Promise((r) => setTimeout(r, 1500));
    }

    const results = [] as { url: string }[];
    if (statusData?.outputImageUrl) results.push({ url: statusData.outputImageUrl });
    if (Array.isArray(statusData?.stageResults)) {
      statusData.stageResults.forEach((s: any) => {
        if (s?.imageUrl) results.push({ url: s.imageUrl });
      });
    }
    const firstOnly = results.length > 0 ? [results[0]] : [];
    return createSuccessResponse({ results: firstOnly });
  } catch (error: any) {
    return createErrorResponse(error);
  }
});