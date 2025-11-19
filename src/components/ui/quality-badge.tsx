import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { KnowledgeSource } from '@/interfaces/knowledge-source.interface'
import { getSourceQuality } from '@/utils/source-quality.util'

interface QualityBadgeProps {
    source: KnowledgeSource
    className?: string
}

// Function to get badge variant based on quality level
const getQualityBadgeVariant = (level: 'excellent' | 'good' | 'regular' | 'low') => {
    switch (level) {
        case 'excellent':
            return 'bg-green-100 text-green-800 hover:bg-green-200'
        case 'good':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
        case 'regular':
            return 'bg-orange-100 text-orange-800 hover:bg-orange-200'
        case 'low':
            return 'bg-red-100 text-red-800 hover:bg-red-200'
        default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }
}

// Function to get quality explanation based on source type
const getQualityExplanation = (source: KnowledgeSource) => {
    const { type, config } = source

    switch (type) {
        case 'text':
            return 'Avaliamos a qualidade do texto baseado no tamanho do conteúdo. Textos maiores geralmente oferecem mais contexto e informações úteis para o agente de IA.'
        case 'faqs':
            return 'A qualidade é determinada pelo número de perguntas e respostas. FAQs mais completos permitem que o agente responda a uma maior variedade de questões.'
        case 'document':
            return 'A qualidade de documentos é baseada no tamanho do conteúdo processado. Documentos maiores geralmente contêm mais informações detalhadas.'
        case 'url':
            return 'Para URLs, extraímos apenas o conteúdo principal da página, removendo elementos de navegação e anúncios, e avaliamos a riqueza do texto resultante.'
        default:
            return 'A qualidade é avaliada com base no conteúdo disponível para treinar o agente de IA.'
    }
}

export function QualityBadge({ source, className = '' }: QualityBadgeProps) {
    const quality = getSourceQuality(source)

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Badge
                        variant="secondary"
                        className={`text-xs h-5 px-2 border-0 cursor-help ${getQualityBadgeVariant(quality.level)} ${className}`}
                    >
                        {quality.label}
                    </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                    <p className="text-sm font-medium mb-1">
                        Como avaliamos a qualidade
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {getQualityExplanation(source)}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
} 