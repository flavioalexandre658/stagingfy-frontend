"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageContainer, PageContent, PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function AdjustmentsError({ error, reset }: ErrorProps) {
    return (
        <PageContainer>
            <PageHeader>
                <PageHeaderContent>
                    <div className="grid grid-cols-12 gap-1">
                        <div className="col-span-12">
                            <PageTitle>Erro nos Ajustes</PageTitle>
                        </div>
                        <div className="col-span-12">
                            <PageDescription>
                                Ocorreu um erro ao carregar as configurações do usuário.
                            </PageDescription>
                        </div>
                    </div>
                </PageHeaderContent>
            </PageHeader>

            <PageContent>
                <Card className="p-6 text-center">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-destructive">
                            Algo deu errado
                        </h2>
                        <p className="text-muted-foreground">
                            Não foi possível carregar as configurações da sua conta.
                        </p>
                        {error.message && (
                            <p className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                                {error.message}
                            </p>
                        )}
                        <Button onClick={reset} variant="outline">
                            Tentar novamente
                        </Button>
                    </div>
                </Card>
            </PageContent>
        </PageContainer>
    );
} 