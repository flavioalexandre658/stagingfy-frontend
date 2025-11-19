"use client";

import { IconCheck, IconStar } from "@tabler/icons-react";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

import { getPlans } from "@/actions/plans/get-plans";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plan } from "@/interfaces/plan.interface";

import { PricingPlanSkeleton } from "./pricing-plan-skeleton";

export function PricingPlans() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await getPlans();
                if (response.success && response.data) {
                    setPlans(response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar planos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

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

        if(!isFree && plan?.name?.toLowerCase() != 'hobby') {
            // Features padrão para todos os planos
            features.push('Suporte prioritário');
          
        }
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

    const handleSelectPlan = (plan: Plan) => {
        // Redirecionar para página de cadastro/login com plan_id como query param
        if (plan.name?.toLowerCase() === 'free') {
            window.location.href = '/cadastro';
        } else {
            window.location.href = `/cadastro?plan_id=${plan.id}`;
        }
    };

    const getButtonText = (planName: string) => {
        if (planName.toLowerCase() === 'free') {
            return 'Começar Grátis';
        }
        return 'Assinar Plano';
    };

    const getButtonVariant = (planName: string) => {
        if (planName.toLowerCase() === 'free') {
            return 'outline';
        }
        return 'default';
    };

    if (loading) {
        return <PricingPlanSkeleton />;
    }

    return (
        <section className="py-16 bg-white" id="planos">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <CreditCard className="mr-2 size-6 text-black-500" />
                        <h2 className="text-3xl font-bold text-gray-900">
                            Planos e Preços
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Escolha o plano ideal para suas necessidades. Comece grátis e faça upgrade quando precisar.
                    </p>
                </div>

                {/* Container para badge Popular e Grid de Planos */}
                <div className="max-w-5xl mx-auto relative">
                    {/* Badge Popular posicionado acima do card Standard */}
                    {(() => {
                        const standardIndex = plans.findIndex(plan => plan.name?.toLowerCase() === 'standard');
                        if (standardIndex === -1) return null;
                        
                        const leftPosition = (standardIndex / plans.length) * 100;
                        const width = (1 / plans.length) * 100;
                        
                        return (
                            <div 
                                className="sm:block hidden absolute -top-9 z-10"
                                style={{
                                    left: `${leftPosition}%`,
                                    width: `${width}%`
                                }}
                            >
                                <div className="bg-released-800 text-white text-center py-2 px-4 text-sm font-medium rounded-t-lg mx-auto">
                                    <IconStar className="inline mr-1 size-4" />
                                    Popular
                                </div>
                            </div>
                        );
                    })()}
                    
                    {/* Layout Desktop - Grid */}
                    <div className="hidden lg:grid grid-cols-4 gap-0 border border-gray-200 overflow-hidden relative rounded-lg shadow-lg">
                        {plans.map((plan, index) => {
                            const planFeatures = generatePlanFeatures(plan);
                            const isLastPlan = index === plans.length - 1;
                            const isPopular = plan.name?.toLowerCase() === 'standard';
                            const isFree = plan.name?.toLowerCase() === 'free';

                            return (
                                <div
                                    key={plan.id}
                                    className={`relative transition-all duration-200 hover:shadow-lg bg-white ${
                                        !isLastPlan ? 'border-r border-gray-200' : ''
                                    } ${
                                        index === 0 ? 'rounded-l-lg' : ''
                                    } ${
                                        isLastPlan ? 'rounded-r-lg' : ''
                                    } ${
                                        isPopular ? 'rounded-t-none' : ''
                                    } ${
                                        isFree ? 'bg-gray-50' : ''
                                    }`}
                                >
                                    {isPopular && (
                                        <div className="sm:hidden absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                                            <div className="bg-released-800 text-white text-center py-1 px-4 text-xs font-medium rounded-lg shadow-lg">
                                                <IconStar className="inline mr-1 size-3" />
                                                Popular
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-6 text-center">
                                        <div className="text-xl font-semibold mb-2">{plan.name}</div>
                                        <div className="min-h-[2.5rem] flex items-center justify-center text-sm text-gray-600 mb-4">
                                            {plan.name === 'Free' ? 'Comece sua jornada gratuitamente' :
                                             plan.name === 'Hobby' ? 'Ideal para projetos pessoais' :
                                             plan.name === 'Pro' ? 'Perfeito para profissionais' :
                                             plan.name === 'Standard' ? 'Ideal para pequenas e médias empresas' :
                                             'Plano personalizado para suas necessidades'}
                                        </div>

                                        <div className="mb-6">
                                            <div className="text-3xl lg:text-4xl font-bold">
                                                {plan.price === 0 ? 'Grátis' : formatPrice(Number(plan.price), plan.currency)}
                                            </div>
                                            {plan.price > 0 && (
                                                <div className="text-sm text-gray-500">
                                                    por mês
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="px-6 pb-6 space-y-4">
                                        <hr className="border-gray-200" />

                                        <div className="space-y-3">
                                            <div className="text-sm font-medium">Recursos inclusos:</div>
                                            <ul className="space-y-2">
                                                {planFeatures.slice(0, 5).map((feature, featureIndex) => (
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

                                        <div className="pt-4 mx-auto text-center">
                                            <Button
                                                onClick={() => handleSelectPlan(plan)}
                                                variant={getButtonVariant(plan.name || '')}
                                                className="w-full"
                                            >
                                                {getButtonText(plan.name || '')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Layout Mobile - Cards Separados */}
                    <div className="lg:hidden space-y-6">
                        {plans.map((plan, index) => {
                            const planFeatures = generatePlanFeatures(plan);
                            const isPopular = plan.name?.toLowerCase() === 'standard';
                            const isFree = plan.name?.toLowerCase() === 'free';

                            return (
                                <div key={plan.id} className="relative">
                                    {/* Badge Popular para mobile - apenas no card Standard */}
                                    {isPopular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                                            <div className="bg-black-600 text-white text-center py-2 px-6 text-sm font-medium rounded-lg shadow-lg">
                                                <IconStar className="inline mr-1 size-4" />
                                                Popular
                                            </div>
                                        </div>
                                    )}
                                    
                                    <Card className={`relative transition-all duration-200 hover:shadow-lg ${
                                        isPopular ? 'mt-6 border-t-0 rounded-t-none' : ''
                                    } ${
                                        isFree ? 'bg-gray-50' : ''
                                    }`}>
                                        <CardHeader className="text-center">
                                            <CardTitle className="text-xl font-semibold mb-2">{plan.name}</CardTitle>
                                            <CardDescription className="min-h-[2.5rem] flex items-center justify-center text-sm text-gray-600 mb-4">
                                                {plan.name === 'Free' ? 'Comece sua jornada gratuitamente' :
                                                 plan.name === 'Hobby' ? 'Ideal para projetos pessoais' :
                                                 plan.name === 'Pro' ? 'Perfeito para profissionais' :
                                                 plan.name === 'Standard' ? 'Ideal para pequenas e médias empresas' :
                                                 'Plano personalizado para suas necessidades'}
                                            </CardDescription>

                                            <div className="mb-6">
                                                <div className="text-3xl lg:text-4xl font-bold">
                                                    {plan.price === 0 ? 'Grátis' : formatPrice(Number(plan.price), plan.currency)}
                                                </div>
                                                {plan.price > 0 && (
                                                    <div className="text-sm text-gray-500">
                                                        por mês
                                                    </div>
                                                )}
                                            </div>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            <hr className="border-gray-200" />

                                            <div className="space-y-3">
                                                <div className="text-sm font-medium">Recursos inclusos:</div>
                                                <ul className="space-y-2">
                                                    {planFeatures.slice(0, 5).map((feature, featureIndex) => (
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
                                                <Button
                                                    onClick={() => handleSelectPlan(plan)}
                                                    variant={getButtonVariant(plan.name || '')}
                                                    className="w-full"
                                                >
                                                    {getButtonText(plan.name || '')}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}