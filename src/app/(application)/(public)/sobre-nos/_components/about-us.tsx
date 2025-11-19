'use client'

import { IconCheck, IconHeart } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { CustomAnchor } from '@/components/ui/router/custom-anchor'
import { useCustomRouter } from '@/lib/use-custom-router'

import { FeaturesGrid } from '../../../(lp)/_components/content/features-grid'

export function AboutUs() {
    const router = useCustomRouter()

    const breadcrumbs = [
        { title: 'Agentes', href: '/agents' },
        { title: 'Sobre nós', href: '/sobre-nos' },
    ]

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ChatAgentes',
        url: 'https://chatagentes.com',
        logo: 'https://chatagentes.com/assets/images/icon/icon.svg',
        description:
            'O ChatAgentes é a plataforma líder para criação de agentes de IA personalizados, chatbots inteligentes e automação de processos empresariais.',
        foundingDate: '2023',
        founders: [{ '@type': 'Person', name: 'Flávio de Jesus' }],
        sameAs: [
            'https://www.instagram.com/ChatAgentes',
            'https://www.facebook.com/ChatAgentes',
            'https://www.twitter.com/ChatAgentes',
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            <div className="w-full px-4 py-10 sm:py-20 max-w-5xl mx-auto">

                <div className="mb-8 flex gap-2 text-sm text-gray-500">
                    {breadcrumbs.map((item, index) => (
                        <CustomAnchor
                            key={index}
                            href={item.href}
                            props={{
                                className: 'hover:underline text-gray-600',
                            }}
                        >
                            {item.title}
                        </CustomAnchor>
                    ))}
                </div>

                <h2 className="text-center text-3xl font-bold mb-4">Sobre o ChatAgentes</h2>


                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
                    Conheça a história por trás da plataforma que está revolucionando a criação de agentes de IA personalizados e automação inteligente.
                </p>

                <div className="relative border-l-4 border-vermelho pl-6 text-gray-700 bg-red-50/30 py-6 px-4 rounded-md mb-12">
                    <div className="flex items-center gap-2 text-vermelho mb-2">
                        <IconHeart size={20} />
                        <span className="text-sm font-semibold">– CEO, Flávio de Jesus</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                        O <strong>ChatAgentes</strong> nasceu em 2023 com um propósito revolucionário: democratizar o acesso à inteligência artificial e tornar a criação de agentes de IA personalizados simples e acessível para empresas de todos os tamanhos. Nossa missão é empoderar organizações com chatbots inteligentes, automação de processos e soluções de IA que transformam a experiência do cliente.
                        <br />
                        <br />
                        Com uma plataforma intuitiva e tecnologia de ponta, o ChatAgentes permite que qualquer empresa crie agentes de IA sofisticados em minutos, sem necessidade de conhecimento técnico. Nossos agentes podem ser integrados a WhatsApp, websites, sistemas internos e muito mais. Hoje, somos a escolha de empresas inovadoras que buscam eficiência, produtividade e excelência no atendimento. Junte-se a nós e transforme seu negócio com o poder da inteligência artificial!
                    </p>
                </div>

                <FeaturesGrid />

                <Button
                    variant="outline"
                    className="w-full mt-12 text-base"
                    onClick={() => router.push('/agents')}
                >
                    <IconCheck className="mr-2" size={18} />
                    Crie Seu Agente de IA Agora!
                </Button>
            </div>
        </>
    )
}
