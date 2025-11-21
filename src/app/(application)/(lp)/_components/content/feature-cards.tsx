'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'

const data = [
  {
    image: '/assets/images/features/llm-integrations.svg',
    title: 'Staging virtual de alta qualidade',
    description:
      'Resultados autênticos e realistas para interiores e exteriores, prontos para apresentação.',
  },
  {
    image: '/assets/images/features/simple-ui.svg',
    title: 'Feito para ser simples',
    description:
      'Envie fotos e escolha estilos em uma interface amigável. Sem complicação.',
  },
  {
    image: '/assets/images/features/secure.svg',
    title: 'Pensado para segurança',
    description:
      'Privacidade garantida e segurança para seus arquivos e imagens.',
  },
]

export function FeaturesCards() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:py-20" id="funcionalidades">
      <Badge variant="default" className="bg-red-100 text-red-700 mb-4 text-sm shadow-none hover:bg-red-200">
        Destaques
      </Badge>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Staging virtual com IA, do upload ao resultado
      </h2>
      <p className="text-gray-500 text-base mb-10">
        O Stagingfy foi criado para facilitar a geração de propostas de design com IA,
        com agilidade, simplicidade e segurança.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="bg-white border rounded-xl p-6 hover:shadow-md transition-all"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={350}
              height={350}
              className="mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
