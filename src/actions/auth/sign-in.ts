"use server";

import { cookies } from "next/headers";
import { z } from "zod";

import { ApiResponse, AppError } from "@/interfaces/api-response.interface";
import { actionClient } from "@/lib/safe-action";
import { createErrorResponse, createSuccessResponse } from "@/utils/api-response.util";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type SignInInput = z.infer<typeof signInSchema>;

export const signInEmailAction = actionClient
  .inputSchema(signInSchema)
  .action(async ({ parsedInput }): Promise<ApiResponse<{ token: string; user: any }>> => {
    try {
      const input = parsedInput as SignInInput;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-in/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new AppError(data?.message || "Falha ao entrar", "API_ERROR", res.status, data);
      }

      const token = data?.token;
      if (!token) {
        throw new AppError("Token não retornado", "API_ERROR", 500, data);
      }

      const c = await cookies();
      c.set("auth_token", token, { httpOnly: true, sameSite: "lax", path: "/" });
      return createSuccessResponse({ token, user: data?.user });
    } catch (error: any) {
      return createErrorResponse(error);
    }
  });