"use server"

import { getServerSession } from "next-auth";

import { ApiResponse, AppError } from "@/interfaces/api-response.interface";
import { User } from "@/interfaces/user.interface";
import { createErrorResponse, createSuccessResponse } from "@/utils/api-response.util";

import { authOptions } from "../../../libs/auth-options";

export async function updateUser(body: object, user_id: number): Promise<ApiResponse<User>> {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            throw new Error("Não autorizado");
        }

        if (!user_id) {
            throw new Error("ID do usuário não encontrado");
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update/user/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${session.user.access_token}`
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) {
            throw new AppError(
                data.message || `Erro na requisição`,
                'API_ERROR',
                res.status,
                data
            );
        }
        
        if (data) {
            const user: User = data;
            return createSuccessResponse(user);
        } else {
            throw new AppError(
                data.message,
                'API_ERROR',
                res.status,
                data
            );
        }
    } catch (error: any) {
        console.error("Erro ao atualizar usuário:", error);
        return createErrorResponse(error);
    }
}
