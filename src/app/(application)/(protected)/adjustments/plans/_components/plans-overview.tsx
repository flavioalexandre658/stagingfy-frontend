"use client";
import { IconCheck, IconCreditCard, IconCrown, IconStar } from "@tabler/icons-react";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { createCheckout } from "@/actions/plans/create-checkout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedButton, EnhancedButtonContent, EnhancedButtonLeft } from "@/components/ui/enhanced-button";
import { PageBlocks, PageBlocksContent, PageBlocksDescription, PageBlocksHeader, PageBlocksTitle } from "@/components/ui/page-blocks";
import { Separator } from "@/components/ui/separator";
import { Plan, UserSubscription } from "@/interfaces/plan.interface";
import { User } from "@/interfaces/user.interface";

interface PlansOverviewProps {
    user: User;
    plans: Plan[];
    currentSubscription?: UserSubscription | null;
}

export function PlansOverview({ user, plans, currentSubscription }: PlansOverviewProps) {
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);



    const handleSelectPlan = async (planId: string) => {
        try {
            setLoadingPlan(planId);
            if (isCurrentPlan(planId)) {
                toast.success("Este já é seu plano atual!");
                return;
            }

            // Criar checkout do Stripe
            const checkoutResponse = await createCheckout({
                planId
            });

            if (!checkoutResponse.success) {
                toast.error(checkoutResponse.error?.message || "Erro ao criar checkout.");
                return;
            }

            // Redirecionar para o checkout do Stripe
            if (checkoutResponse?.data?.url) {
                window.location.href = checkoutResponse.data.url;
            } else {
                toast.error("URL de checkout inválida.");
            }

        } catch (error) {
            console.error("Erro ao selecionar plano:", error);
            toast.error("Erro ao processar solicitação. Tente novamente.");
        } finally {
            setLoadingPlan(null);
        }
    };

    const isCurrentPlan = (planId: string) => {
        // Primeira prioridade: comparar diretamente com o plano do usuário da sessão
        if (user.plan?.id) {
            return String(planId) === String(user.plan.id);
        }

        // Segunda prioridade: comparar por plan_id da subscription
        if (currentSubscription?.plan_id) {
            return String(planId) === String(currentSubscription.plan_id);
        }

        // Terceira prioridade: comparar por ID do plano aninhado na subscription
        if (currentSubscription?.plan?.id) {
            return String(planId) === String(currentSubscription.plan.id);
        }

        // Quarta prioridade: comparar por nome do plano
        const plan = plans.find(p => String(p.id) === String(planId));
        if (plan && user.plan?.name) {
            return plan.name?.toLowerCase() === user.plan.name.toLowerCase();
        }

        // Quinta prioridade: se não houver plano ativo, considerar o primeiro plano gratuito
        if (!user.plan && !currentSubscription) {
            const freePlan = plans.find(p =>
                p.price === 0 ||
                p.name?.toLowerCase().includes('free') ||
                p.name?.toLowerCase().includes('básico') ||
                p.name?.toLowerCase().includes('grátis')
            );
            if (freePlan) {
                return String(planId) === String(freePlan.id);
            }
        }

        return false;
    };

    // Função para gerar features baseadas nos dados do plano
    const generatePlanFeatures = (plan: any) => {
        const features = [];
        const isFree = plan?.name?.toLowerCase() === 'free';

        if (plan.max_agents) {
            features.push(`${plan.max_agents === -1 ? 'Agentes ilimitados' : `${plan.max_agents} agente${plan.max_agents > 1 ? 's' : ''}`}`);
        }

        if (plan.max_messages) {
            if (isFree) {
                features.push(`${plan.max_messages === -1 ? 'Mensagens ilimitadas' : `${plan.max_messages.toLocaleString('pt-BR')} mensagens`}`);
            } else {
                features.push(`${plan.max_messages === -1 ? 'Mensagens ilimitadas' : `${plan.max_messages.toLocaleString('pt-BR')} mensagens por mês`}`);
            }
        }

        if (plan.max_links) {
            features.push(`${plan.max_links === -1 ? 'Links ilimitados' : `${plan.max_links} links por agente`}`);
        }

        if (plan.max_document_size) {
            if (isFree) {
                const sizeInKB = Math.round(plan.max_document_size / 1024);
                features.push(`Documentos até ${sizeInKB}KB`);
            } else {
                const sizeInMB = Math.round(plan.max_document_size / (1024 * 1024));
                features.push(`Documentos até ${sizeInMB}MB`);
            }
        }

        // Features padrão para todos os planos
        features.push('Suporte prioritário');
        features.push('Interface intuitiva');

        return features;
    };

    const formatPrice = (price: number, currency: string) => {
        // Validação para garantir que currency não seja undefined ou vazio
        const validCurrency = currency && currency.trim() !== '' ? currency : 'BRL';

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: validCurrency,
        }).format(price);
    };

    return (
        <div className="space-y-8">
            {/* Planos Disponíveis */}
            <PageBlocks>
                <PageBlocksHeader>
                    <PageBlocksTitle className="text-xl font-bold">
                        <CreditCard className="mr-1.5 size-4 text-muted-foreground" />
                        Planos e Assinaturas
                    </PageBlocksTitle>
                    <PageBlocksDescription>
                        Escolha o plano ideal para suas necessidades e faça upgrade a qualquer momento.
                    </PageBlocksDescription>
                </PageBlocksHeader>
                <PageBlocksContent>
                    <div className="space-y-6">
                        {/* Plano Atual */}
                        <Card className="mb-[60px]">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Plano Atual</span>
                                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                                        {user.plan?.name || 'Teste'}
                                    </Badge>
                                </CardTitle>
                                <CardDescription>
                                    Você está usando o plano {user.plan?.name || 'Teste'}.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Container para badge Popular e Grid de Planos */}
                        <div className="max-w-5xl mx-auto relative">
                            {/* Badge Popular posicionado acima do card Standard */}
                            <div className="sm:block hidden absolute -top-9 left-1/3 w-1/3 z-4">
                                <div className="bg-released-800 text-white text-center py-2 px-4 text-sm font-medium rounded-t-lg mx-auto">
                                    Popular
                                </div>
                            </div>

                            {/* Layout Desktop - Grid */}
                            <div className="hidden lg:grid grid-cols-3 gap-0 border border-border overflow-hidden relative rounded-lg">
                                {plans
                                    .filter((plan: any) => !plan.name?.toLowerCase().includes('free') && plan.name?.toLowerCase() !== 'free')
                                    .map((plan: any, index: number) => {
                                        const isPlanCurrent = isCurrentPlan(plan.id);
                                        const isLoading = loadingPlan === plan.id;
                                        const planFeatures = generatePlanFeatures(plan);

                                        const filteredPlans = plans.filter((p: any) => !p.name?.toLowerCase().includes('free') && p.name?.toLowerCase() !== 'free');
                                        const isLastPlan = index === filteredPlans.length - 1;

                                        const isPopular = plan.name?.toLowerCase() === 'standard';

                                        return (
                                            <div
                                                key={plan.id}
                                                className={`relative transition-all duration-200 hover:shadow-lg bg-white ${isPlanCurrent ? 'bg-green-50/50' : ''
                                                    } ${!isLastPlan ? 'border-r border-border' : ''
                                                    } ${index === 0 ? 'rounded-l-lg rounded-tl-lg' : ''
                                                    } ${isLastPlan ? 'rounded-r-lg rounded-tr-lg' : ''
                                                    } ${isPopular ? 'rounded-t-none' : index !== 0 && !isLastPlan ? 'rounded-t-lg' : ''
                                                    }`}
                                            >


                                                {isPlanCurrent && (
                                                    <Badge
                                                        variant="outline"
                                                        className="absolute right-4 top-4 bg-green-100 text-green-700 border-green-300 z-20"
                                                    >
                                                        Atual
                                                    </Badge>
                                                )}

                                                <div className="p-6 text-center">
                                                    <div className="text-xl font-semibold mb-2">{plan.name}</div>
                                                    <div className="min-h-[2.5rem] flex items-center justify-center text-sm text-muted-foreground mb-4">
                                                        {plan.name === 'Hobby' ? 'Plano personalizado para suas necessidades' :
                                                            plan.name === 'Pro' ? 'Ideal para profissionais' :
                                                                plan.name === 'Standard' ? 'Ideal para pequenas e médias empresas' :
                                                                    'Plano personalizado para suas necessidades'}
                                                    </div>

                                                    <div className="mb-6">
                                                        <div className="text-3xl lg:text-4xl font-bold">
                                                            {formatPrice(Number(plan.price), 'BRL')}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            por mês
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="px-6 pb-6 space-y-4">
                                                    <Separator />

                                                    <div className="space-y-3">
                                                        <div className="text-sm font-medium">Recursos inclusos:</div>
                                                        <ul className="space-y-2">
                                                            {planFeatures.map((feature, index) => (
                                                                <li key={index} className="flex items-start gap-2">
                                                                    <IconCheck
                                                                        size={16}
                                                                        className="text-green-600 mt-0.5 flex-shrink-0"
                                                                    />
                                                                    <span className="text-sm leading-relaxed">{feature}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div className="pt-4 mx-auto text-center">


                                                        <EnhancedButton
                                                            onClick={() => handleSelectPlan(plan.id)}
                                                            disabled={isLoading}
                                                            loading={isLoading}
                                                            loadingText="Processando..."
                                                        >
                                                            <EnhancedButtonLeft>
                                                                <IconCheck size={18} />
                                                            </EnhancedButtonLeft>
                                                            <EnhancedButtonContent>
                                                                Assinar
                                                            </EnhancedButtonContent>
                                                        </EnhancedButton>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            {/* Layout Mobile - Cards Separados */}
                            <div className="lg:hidden space-y-6">
                                {plans
                                    .filter((plan: any) => !plan.name?.toLowerCase().includes('free') && plan.name?.toLowerCase() !== 'free')
                                    .map((plan: any, index: number) => {
                                        const isPlanCurrent = isCurrentPlan(plan.id);
                                        const isLoading = loadingPlan === plan.id;
                                        const planFeatures = generatePlanFeatures(plan);
                                        const isPopular = plan.name?.toLowerCase() === 'standard';

                                        return (
                                            <div key={plan.id} className="relative">
                                                {/* Badge Popular para mobile - apenas no card Standard */}
                                                {isPopular && (
                                                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                                                        <div className="bg-released-800 text-white text-center py-2 px-6 text-sm font-medium rounded-lg shadow-lg">
                                                            Popular
                                                        </div>
                                                    </div>
                                                )}

                                                <Card className={`relative transition-all duration-200 hover:shadow-lg ${isPlanCurrent ? 'bg-green-50/50' : ''
                                                    } ${isPopular ? 'mt-6 border-t-0 rounded-t-none' : ''
                                                    }`}>
                                                    {isPlanCurrent && (
                                                        <Badge
                                                            variant="outline"
                                                            className="absolute right-4 top-4 bg-green-100 text-green-700 border-green-300 z-20"
                                                        >
                                                            Atual
                                                        </Badge>
                                                    )}

                                                    <CardHeader className="text-center">
                                                        <CardTitle className="text-xl font-semibold mb-2">{plan.name}</CardTitle>
                                                        <CardDescription className="min-h-[2.5rem] flex items-center justify-center text-sm text-muted-foreground mb-4">
                                                            {plan.name === 'Hobby' ? 'Plano personalizado para suas necessidades' :
                                                                plan.name === 'Pro' ? 'Ideal para profissionais' :
                                                                    plan.name === 'Standard' ? 'Ideal para pequenas e médias empresas' :
                                                                        'Plano personalizado para suas necessidades'}
                                                        </CardDescription>

                                                        <div className="mb-6">
                                                            <div className="text-3xl lg:text-4xl font-bold">
                                                                {formatPrice(Number(plan.price), 'BRL')}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                por mês
                                                            </div>
                                                        </div>
                                                    </CardHeader>

                                                    <CardContent className="space-y-4">
                                                        <Separator />

                                                        <div className="space-y-3">
                                                            <div className="text-sm font-medium">Recursos inclusos:</div>
                                                            <ul className="space-y-2">
                                                                {planFeatures.map((feature, featureIndex) => (
                                                                    <li key={featureIndex} className="flex items-start gap-2">
                                                                        <IconCheck
                                                                            size={16}
                                                                            className="text-green-600 mt-0.5 flex-shrink-0"
                                                                        />
                                                                        <span className="text-sm leading-relaxed">{feature}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className="pt-4 text-center">
                                                            <EnhancedButton
                                                                onClick={() => handleSelectPlan(plan.id)}
                                                                disabled={isLoading}
                                                                loading={isLoading}
                                                                loadingText="Processando..."
                                                            >
                                                                <EnhancedButtonLeft>
                                                                    <IconCheck size={18} />
                                                                </EnhancedButtonLeft>
                                                                <EnhancedButtonContent>
                                                                    Assinar
                                                                </EnhancedButtonContent>
                                                            </EnhancedButton>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </PageBlocksContent>
            </PageBlocks>
        </div>
    );
}