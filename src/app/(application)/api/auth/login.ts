import { signInEmailAction } from "@/actions/auth/sign-in";
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

        const resp = await signInEmailAction({ email: body.email, password: body.password || '' });

        const serverError = (resp as any)?.serverError;
        const validationErrors = (resp as any)?.validationErrors;
        const payload = (resp?.data as any)?.data;

        if (serverError || validationErrors || !payload?.token) {
            const errorMessage = serverError?.message || 'Falha ao realizar login';
            return {
                error: errorMessage,
                status: serverError?.status || 400
            } as any;
        }

        return { access_token: payload.token } as any;
    } catch (error: any) {
        console.error('Erro ao realizar login:', error);
        return {
            error: error.message || 'Erro interno ao realizar login',
            status: 500
        } as any;
    }
}
