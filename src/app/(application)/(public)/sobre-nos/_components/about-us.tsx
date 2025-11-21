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
        name: 'Stagingfy',
        url: 'https://stagingfy.com',
        logo: 'https://stagingfy.com/assets/images/icon/icon.svg',
        description:
            'O Stagingfy é a plataforma líder para staging virtual com IA, gerando propostas realistas de design para interiores e exteriores.',
        foundingDate: '2023',
        founders: [{ '@type': 'Person', name: 'Flávio de Jesus' }],
        sameAs: [
            'https://www.instagram.com/Stagingfy',
            'https://www.facebook.com/Stagingfy',
            'https://www.twitter.com/Stagingfy',
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

                <h2 className="text-center text-3xl font-bold mb-4">Sobre o Stagingfy</h2>


                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
                    Conheça a história por trás da plataforma que está democratizando o staging virtual com IA para ambientes internos e externos.
                </p>

                <div className="relative border-l-4 border-vermelho pl-6 text-gray-700 bg-red-50/30 py-6 px-4 rounded-md mb-12">
                    <div className="flex items-center gap-2 text-vermelho mb-2">
                        <IconHeart size={20} />
                        <span className="text-sm font-semibold">– CEO, Flávio de Jesus</span>
                    </div>
                    <p className="text-sm leading-relaxed">
                        O <strong>Stagingfy</strong> nasceu em 2023 com um propósito claro: tornar o staging virtual com IA acessível e poderoso para profissionais e empresas de todos os tamanhos.
                        <br />
                        <br />
                        Com uma plataforma intuitiva e tecnologia de ponta, o Stagingfy permite que qualquer pessoa gere propostas de design realistas a partir de fotos de ambientes, em minutos. Hoje, somos a escolha de profissionais e empresas que buscam agilidade e qualidade na apresentação de projetos.
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
