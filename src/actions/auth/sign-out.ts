"use server";

import { cookies } from "next/headers";

import { ApiResponse, AppError } from "@/interfaces/api-response.interface";
import { actionClient } from "@/lib/safe-action";
import { createErrorResponse, createSuccessResponse } from "@/utils/api-response.util";

export const signOutAction = actionClient.action(async (): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const res = await fetch(`/api/auth/sign-out`, { method: "POST" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new AppError(data?.message || "Falha ao sair", "API_ERROR", res.status, data);
    }
    const c = await cookies();
    c.delete("auth_token");
    return createSuccessResponse({ success: true });
  } catch (error: any) {
    return createErrorResponse(error);
  }
});