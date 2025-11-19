'use client'

import { IconMenu2 } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { EnhancedButton, EnhancedButtonContent, EnhancedButtonLeft } from '@/components/ui/enhanced-button'
import { PageBlocks, PageBlocksContent, PageBlocksHeader, PageBlocksTitle } from '@/components/ui/page-blocks'

type TabbarProps = {
    title: string
    items: {
        option: string
        label: string
        icon: React.ElementType
        prefix: string
    }[]
}

export default function Tabbar({ title, items }: TabbarProps) {
    const pathname = usePathname()
    const router = useRouter()

    const segments = pathname.split('/')
    const tab = segments[segments.length - 1]

    const [selectedOption, setSelectedOption] = useState(tab)

    useEffect(() => {
        setSelectedOption(tab)
    }, [tab])

    const handleNavigation = (option: string) => {
        setSelectedOption(option)
        
        // Encontrar o item correspondente para obter o prefix
        const item = items.find(item => item.option === option)
        if (!item) return
        
        // Construir a rota absoluta correta usando o prefix
        const segments = pathname.split('/').filter(Boolean) // Remove empty strings
        
        // Detectar o tipo de rota baseado na estrutura e construir o basePath correto
        let basePath: string
        
        if (segments.includes('adjustments')) {
            // Para rotas de adjustments: sempre usar /adjustments como base
            basePath = '/adjustments'
        } else if (segments.includes('agents') && segments.includes('connect')) {
            // Para rotas de agents connect: /agents/:slug/connect
            const agentIndex = segments.indexOf('agents')
            const slug = segments[agentIndex + 1]
            basePath = `/agents/${slug}/connect`
        } else if (segments.includes('agents') && segments.includes('settings')) {
            // Para rotas de agents settings: /agents/:slug/settings
            const agentIndex = segments.indexOf('agents')
            const slug = segments[agentIndex + 1]
            basePath = `/agents/${slug}/settings`
        } else {
            // Fallback: usar os primeiros 3 segmentos
            basePath = '/' + segments.slice(0, 3).join('/')
        }
        
        const newPath = `${basePath}${item.prefix}`
        
        router.push(newPath)
    }

    return (

        <PageBlocks>
            <PageBlocksHeader>
                <PageBlocksTitle>
                    <IconMenu2 className="mr-3.5 size-4.5 text-muted-foreground" />
                    {title}
                </PageBlocksTitle>
            </PageBlocksHeader>
            <PageBlocksContent>
                <div className="flex flex-col space-y-2">
                    {items.map((item, i) => {
                        const Icon = item.icon
                        const showBadge =
                            ['pacotes', 'recompensas', 'licenca'].includes(item.option) &&
                            selectedOption !== item.option
                        return (
                            <Fragment key={i}>
                                <EnhancedButton
                                    className="w-full justify-start text-left"
                                    variant={selectedOption === item.option ? 'default' : 'outline'}
                                    onClick={() => handleNavigation(item.option)}
                                >
                                    <EnhancedButtonLeft>
                                        <Icon size={22} />
                                    </EnhancedButtonLeft>
                                    <EnhancedButtonContent>
                                        <span>{item.label}</span>
                                        {showBadge && <Badge className="ml-2 inline-flex">
                                            Recomendado
                                        </Badge>}
                                    </EnhancedButtonContent>
                                </EnhancedButton>
                            </Fragment>
                        )
                    })}
                </div>
            </PageBlocksContent>
        </PageBlocks>
    )
}
