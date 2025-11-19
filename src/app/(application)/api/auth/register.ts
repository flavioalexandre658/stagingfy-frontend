import { User } from "@/interfaces/user.interface";

export const revalidate = 60;

export async function register(body: object): Promise<User> {

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
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

        // 1) Se HTTP não OK, lança com a mensagem que vier do servidor
        const payload = await res.json();
        if (!res.ok) {
            // Caso haja uma mensagem, retornamos um erro
            const error: any = { error: payload.message, status: 500 };
            return error;
        }

        if (!payload.id || !payload.email) {
            const error: any = { error: payload.message, status: 500 };
            return error;
        }

        return payload as User;
    } catch (error: any) {
        console.log(error)
        const errorThrow: any = { error: error, status: 500 };
        return errorThrow
    }



}
