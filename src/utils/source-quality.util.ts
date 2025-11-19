import { KnowledgeSource, KnowledgeSourceConfig } from '@/interfaces/knowledge-source.interface'

export interface QualityInfo {
    level: 'excellent' | 'good' | 'regular' | 'low'
    label: string
    emoji: string
    description: string
}

export const getSourceQuality = (source: KnowledgeSource): QualityInfo => {
    const { type, config } = source

    switch (type) {
        case 'text':
            return getTextQuality(config)
        case 'faqs':
            return getFaqsQuality(config)
        case 'document':
            return getDocumentQuality(config)
        case 'url':
            return getUrlQuality(config)
        default:
            return {
                level: 'regular',
                label: 'Regular',
                emoji: '🟠',
                description: 'Qualidade não determinada'
            }
    }
}

const getTextQuality = (config: KnowledgeSourceConfig): QualityInfo => {
    const size = config.processedSize || 0

    if (size > 3000) {
        return {
            level: 'excellent',
            label: 'Excelente',
            emoji: '🟢',
            description: 'Texto rico em conteúdo'
        }
    } else if (size > 1500) {
        return {
            level: 'good',
            label: 'Boa',
            emoji: '🟡',
            description: 'Texto com bom conteúdo'
        }
    } else if (size > 300) {
        return {
            level: 'regular',
            label: 'Regular',
            emoji: '🟠',
            description: 'Texto básico'
        }
    } else {
        return {
            level: 'low',
            label: 'Baixa',
            emoji: '🔴',
            description: 'Texto muito curto'
        }
    }
}

const getFaqsQuality = (config: KnowledgeSourceConfig): QualityInfo => {
    const questionCount = config.questions?.length || 0

    if (questionCount >= 10) {
        return {
            level: 'excellent',
            label: 'Excelente',
            emoji: '🟢',
            description: `${questionCount} perguntas - FAQ completo`
        }
    } else if (questionCount >= 5) {
        return {
            level: 'good',
            label: 'Boa',
            emoji: '🟡',
            description: `${questionCount} perguntas - FAQ útil`
        }
    } else if (questionCount >= 2) {
        return {
            level: 'regular',
            label: 'Regular',
            emoji: '🟠',
            description: `${questionCount} perguntas - FAQ básico`
        }
    } else {
        return {
            level: 'low',
            label: 'Baixa',
            emoji: '🔴',
            description: `${questionCount} pergunta - FAQ limitado`
        }
    }
}

const getDocumentQuality = (config: KnowledgeSourceConfig): QualityInfo => {
    const size = config.processedSize || 0

    if (size > 10000) {
        return {
            level: 'excellent',
            label: 'Excelente',
            emoji: '🟢',
            description: 'Documento extenso'
        }
    } else if (size > 5000) {
        return {
            level: 'good',
            label: 'Boa',
            emoji: '🟡',
            description: 'Documento completo'
        }
    } else if (size > 1000) {
        return {
            level: 'regular',
            label: 'Regular',
            emoji: '🟠',
            description: 'Documento básico'
        }
    } else {
        return {
            level: 'low',
            label: 'Baixa',
            emoji: '🔴',
            description: 'Documento pequeno'
        }
    }
}

const getUrlQuality = (config: KnowledgeSourceConfig): QualityInfo => {
    const size = config.processedSize || 0

    if (size > 5000) {
        return {
            level: 'excellent',
            label: 'Excelente',
            emoji: '🟢',
            description: 'Conteúdo URL rico'
        }
    } else if (size > 2000) {
        return {
            level: 'good',
            label: 'Boa',
            emoji: '🟡',
            description: 'Conteúdo URL completo'
        }
    } else if (size > 500) {
        return {
            level: 'regular',
            label: 'Regular',
            emoji: '🟠',
            description: 'Conteúdo URL básico'
        }
    } else {
        return {
            level: 'low',
            label: 'Baixa',
            emoji: '🔴',
            description: 'Conteúdo URL limitado'
        }
    }
} 