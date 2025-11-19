import { getServerSession } from "next-auth";

import { User } from "@/interfaces/user.interface";

import { authOptions } from "../../../../../../libs/auth-options";
import { AccountSettings } from "./_components/account-settings";

export default async function AccountPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('Não autenticado.')
    }

    const user = session?.user as User;
    if (!user?.access_token) {
        throw new Error('Não autorizado.')
    }

    return <AccountSettings user={user} />;
} 