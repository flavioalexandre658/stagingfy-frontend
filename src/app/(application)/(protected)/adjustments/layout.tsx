import { IconInfoCircle } from "@tabler/icons-react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle, PageTooltip } from "@/components/ui/page-container";
import { User } from "@/interfaces/user.interface";

import { authOptions } from "../../../../../libs/auth-options";
import { Menu } from "./_components/menu-adjustments";

export const metadata: Metadata = {
    title: `Ajustes`
};

export default async function AdjustmentsLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error('Não autenticado.')
    }

    const user = session?.user as User;
    if (!user?.access_token) {
        throw new Error('Não autorizado.')
    }

    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <div className="grid grid-cols-12 gap-1">
                        <div className="col-span-12">
                            <PageTitle>
                                Ajustes
                                <PageTooltip tooltip="Configure suas informações pessoais e planos.">
                                    <IconInfoCircle size={16} className="inline-flex ml-1.5 mb-0.5" />
                                </PageTooltip>
                            </PageTitle>
                        </div>
                        <div className="col-span-12">
                            <PageDescription>
                                Gerencie sua conta, dados pessoais e assinatura de planos.
                            </PageDescription>
                        </div>
                    </div>
                </PageHeaderContent>
            </PageHeader>
            <PageContent>
                <Menu>
                    {children}
                </Menu>
            </PageContent>
        </PageContainer>
    );

} 