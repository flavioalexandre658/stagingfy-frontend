"use server"

import { ApiResponse, AppError } from "@/interfaces/api-response.interface";
import { User } from "@/interfaces/user.interface";
import { createSuccessResponse } from "@/utils/api-response.util";
import { createErrorResponse } from "@/utils/api-response.util";

export async function me(token: string): Promise<ApiResponse<User>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const payload = await res.json();
    if (!res.ok) {
      if (res.status === 401) {
        return createErrorResponse(
          new AppError(payload?.message || "Token expirado", "TOKEN_EXPIRED", res.status, payload)
        );
      }
      throw new AppError(payload?.message || "Erro na requisição", "API_ERROR", res.status, payload);
    }

    const u = payload?.data?.user;
    if (!u?.id || !u?.email) {
      throw new AppError(payload?.message || "Perfil inválido", "API_ERROR", res.status, payload);
    }

    const user: User = {
      id: String(u.id),
      userName: String(u.name || ""),
      email: String(u.email || ""),
      access_token: token,
      created_at: String(u.createdAt || ""),
      updated_at: String(u.updatedAt || ""),
      plan: undefined,
      subscription: undefined,
    };

    return createSuccessResponse(user);
  } catch (error: any) {
    return createErrorResponse(error);
  }
}
