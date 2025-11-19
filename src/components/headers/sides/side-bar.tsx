'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'

type SidebarProps = {
    title: string
    items: {
        option: string
        label: string
        icon: React.ElementType
        prefix: string
    }[]
}

export default function Sidebar({ title, items }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()

    const segments = pathname.split('/')
    const tab = segments[segments.length - 1]

    const [selectedOption, setSelectedOption] = useState(tab)

    useEffect(() => {
        setSelectedOption(tab)
    }, [tab])

    const handleNavigation = (item: { option: string; prefix: string }) => {
        setSelectedOption(item.option)
        
        // Construir a rota absoluta correta usando o prefix
        const segments = pathname.split('/')
        // Para rotas como /agents/:slug/connect/channels/whatsapp, precisamos voltar para /agents/:slug/connect
        // e então adicionar o prefix (que já inclui a barra inicial)
        let basePath = segments.slice(0, 4).join('/') // /agents/:slug/connect
        const newPath = `${basePath}${item.prefix}`
        
        router.push(newPath)
    }

    const isActive = (option: string) => selectedOption === option

    return (
        <div className="col-span-3 hidden md:block">
            <div className="p-5 rounded shadow-sm bg-white">
                <h2 className="font-semibold text-xl mb-5">{title}</h2>

                <div className="space-y-2">
                    {items.map((item, i) => {
                        const Icon = item.icon
                        const showBadge =
                            ['pacotes', 'recompensas', 'licenca'].includes(item.option) &&
                            !isActive(item.option)

                        return (
                            <div
                                key={i}
                                className={`cursor-pointer rounded ${isActive(item.option)
                                    ? 'px-4 py-2 bg-gray-50 text-ametista-500'
                                    : ''
                                    }`}
                                onClick={() => handleNavigation(item)}
                            >
                                <button className="flex items-center space-x-3 p-1 w-full text-left">
                                    <div className="text-lg">
                                        <Icon size={22} />
                                    </div>

                                    <div className="flex-1 text-base font-medium">{item.label}</div>

                                    {showBadge && (
                                        <Badge variant="outline" className="ml-auto text-xs" color="orange">
                                            novo
                                        </Badge>
                                    )}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
