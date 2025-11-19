'use client'

import { IconBrandWhatsapp } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PageTooltip } from '@/components/ui/page-container'
import { openWhatsApp } from '@/utils/functions.util'

export function ButtonWhatsapp() {
    return (
        <Card className="my-6 p-6 border rounded-lg bg-muted/30">
            <div className="flex items-start gap-4">
                {/* Ícone redondo verde */}
                <div className="p-2 bg-green-100 rounded-full">
                    <IconBrandWhatsapp size={32} color="green" />
                </div>

                {/* Textos explicativos */}
                <div className="flex-1">
                    <p className="text-lg font-semibold text-white mb-1">
                        Precisa de ajuda?
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Nossa equipe está disponível no WhatsApp para te ajudar com qualquer dúvida.
                    </p>
                </div>
            </div>

            {/* Botão de ação */}
            <div className="mt-4">
                <PageTooltip tooltip="Você será atendido pelo WhatsApp!">
                    <div>
                        <Button
                            variant="outline"
                            className="w-full text-ametista-500 hover:text-ametista-700 bg-ametista-100 hover:bg-ametista-200"
                            onClick={() =>
                                openWhatsApp(
                                    process.env.NEXT_PUBLIC_SUPPORT_NUMBER,
                                    `Olá, preciso de ajuda no ${process.env.NEXT_PUBLIC_NAME_PROJECT}`
                                )
                            }
                        >
                            <IconBrandWhatsapp size={18} className="mr-2" />
                            Falar pelo WhatsApp
                        </Button>
                    </div>
                </PageTooltip>
            </div>
        </Card>
    )
}
