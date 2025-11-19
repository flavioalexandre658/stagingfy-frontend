"use server"

import { ApiResponse, AppError } from "@/interfaces/api-response.interface";
import { User } from "@/interfaces/user.interface";
import { createSuccessResponse } from "@/utils/api-response.util";
import { createErrorResponse } from "@/utils/api-response.util";


export async function me(token: string): Promise<ApiResponse<User>> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: 'include'
            }
        );

        // 1) Se HTTP não OK, trata conforme o status
        const payload = await res.json();
        if (!res.ok) {
            // Se token expirou (401), retorna erro específico sem lançar exceção
            if (res.status === 401) {
                console.log("Token expirado detectado na action me.ts");
                return createErrorResponse(
                    new AppError(
                        payload.message || 'Token expirado',
                        'TOKEN_EXPIRED',
                        res.status,
                        payload
                    )
                );
            }
            
            // Para outros erros, lança exceção normalmente
            throw new AppError(
                payload.message || `Erro na requisição`,
                'API_ERROR',
                res.status,
                payload
            );
        }

        if (!payload.id || !payload.email) {
            throw new AppError(
                payload.message,
                'API_ERROR',
                res.status,
                payload
            );
        }

        return createSuccessResponse(payload as User);
    } catch (error: any) {
        console.error("Erro ao obter usuário:", error);
        return createErrorResponse(error);
    }


}
