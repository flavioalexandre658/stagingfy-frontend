import { getServerSession } from "next-auth";

import { getPlans } from "@/actions/plans/get-plans";
import { User } from "@/interfaces/user.interface";

import { authOptions } from "../../../../../../libs/auth-options";
import { PlansOverview } from "./_components/plans-overview";

export default async function PlansPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('Não autenticado.')
    }

    const user = session?.user as User;
    if (!user?.access_token) {
        throw new Error('Não autorizado.')
    }

    // Buscar planos disponíveis
    const plansResponse = await getPlans();
    if (!plansResponse.success || !plansResponse.data) {
        throw new Error('Erro ao carregar planos.');
    }

    const plans = plansResponse.data;
    
    // Usar informações do plano e subscription diretamente da sessão
    const currentSubscription = user.subscription;

    return <PlansOverview user={user} plans={plans} currentSubscription={currentSubscription} />;
}