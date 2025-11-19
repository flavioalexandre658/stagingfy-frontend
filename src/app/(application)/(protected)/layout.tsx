
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { getAgents } from "@/actions/agent/get-agents";
import { Agent } from "@/interfaces/agent.interface";
import { User } from "@/interfaces/user.interface"
import { SourceProvider } from "@/providers/source";

import { authOptions } from "../../../../libs/auth-options";
import Layout from "./_components/layout";

export default async function ApplicationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error('Não autenticado.')
        }

        const user = session?.user as User;
        if (!user?.access_token) {
            throw new Error('Não autorizado.')
        }   

        const agents = await getAgents();

        return (

            <Layout user={session?.user as User} agents={agents.data as Agent[]}>
                <SourceProvider>
                    {children}
                </SourceProvider>
            </Layout>
        );
    } catch (error) {
        console.error("Erro ao carregar o layout:", error);
        redirect(`/entrar?redirect=/agents`);
    }
}