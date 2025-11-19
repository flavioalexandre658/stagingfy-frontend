'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'

const data = [
  {
    image: '/assets/images/features/llm-integrations.svg',
    title: 'Projetado para IA de verdade',
    description:
      'Modelos de linguagem com raciocínio avançado, capazes de responder com precisão usando seu conteúdo.',
  },
  {
    image: '/assets/images/features/simple-ui.svg',
    title: 'Feito para ser simples',
    description:
      'Gerencie agentes com uma interface amigável e visual. Não precisa saber programar.',
  },
  {
    image: '/assets/images/features/secure.svg',
    title: 'Pensado para segurança',
    description:
      'Criptografia de ponta e conformidade rigorosa para proteger seus dados e dos seus clientes.',
  },
]

export function FeaturesCards() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:py-20" id="funcionalidades">
      <Badge variant="default" className="bg-red-100 text-red-700 mb-4 text-sm shadow-none hover:bg-red-200">
        Destaques
      </Badge>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        A plataforma completa para agentes inteligentes
      </h2>
      <p className="text-gray-500 text-base mb-10">
        O Chat Agentes foi criado para facilitar a criação de agentes com IA treinada,
        oferecendo controle, simplicidade e segurança.
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
