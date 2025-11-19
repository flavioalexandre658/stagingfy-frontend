import { User } from "@/interfaces/user.interface";

export const revalidate = 60;

interface LoginBody {
    email: string;
    password?: string;
    provider?: string;
    provider_data?: {
        name?: string;
        picture?: string;
    };
}

export async function login(body: LoginBody): Promise<User> {
    try {
        console.log('Tentando login com:', {
            email: body.email,
            provider: body.provider,
            hasPassword: !!body.password
        });

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(body),
                credentials: 'include'
            }
        );

        const payload = await res.json();

        // Log detalhado para debug
        console.log('Resposta da API:', {
            status: res.status,
            ok: res.ok,
            hasToken: !!payload.access_token,
            error: payload.error || payload.message
        });

        if (!res.ok) {
            const errorMessage = payload.message || `Erro ${res.status} ao realizar login`;
            console.error('Erro na resposta:', errorMessage);
            return {
                error: errorMessage,
                status: res.status
            } as any;
        }

        if (!payload.access_token) {
            const errorMessage = 'Token de acesso não retornado pela API';
            console.error(errorMessage);
            return {
                error: errorMessage,
                status: 500
            } as any;
        }

        return payload as User;
    } catch (error: any) {
        console.error('Erro ao realizar login:', error);
        return {
            error: error.message || 'Erro interno ao realizar login',
            status: 500
        } as any;
    }
}
