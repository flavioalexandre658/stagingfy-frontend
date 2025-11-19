'use client'

import {
  IconEdit,
  IconPlugConnected,
  IconSend,
  IconUpload,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const data = [
  {
    icon: IconUpload,
    title: 'Treine com facilidade',
    description:
      'Envie arquivos, textos ou links. Seu agente aprende com conteúdos reais da sua empresa.',
  },
  {
    icon: IconEdit,
    title: 'Personalize como quiser',
    description:
      'Adicione contexto, defina o tom da conversa e edite as instruções da IA com poucos cliques.',
  },
  {
    icon: IconSend,
    title: 'Compartilhe ou integre',
    description:
      'Use um link direto ou integre o chatbot no seu site. Você escolhe como publicar.',
  },
  {
    icon: IconPlugConnected,
    title: 'Funciona com IA moderna',
    description:
      'Aproveite o melhor da tecnologia GPT, com suporte em português e atualizações contínuas.',
  },
]

export function FeatureSimple() {
  return (
    <div className="bg-[url('/assets/images/background/grid.svg')] bg-top bg-no-repeat pb-12">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Inteligência sem complicação
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {data.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-4 w-11 h-11 flex items-center justify-center rounded-full bg-muted text-released-7">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
