'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const steps = [
  {
    step: '01',
    title: 'Crie e publique seu agente',
    description:
      'Treine um agente com seus dados de negócio, configure suas ações e publique com um clique.',
    image: '/assets/images/how-it-works/step1.svg',
  },
  {
    step: '02',
    title: 'O agente resolve dúvidas automaticamente',
    description:
      'O agente responde perguntas usando as fontes treinadas, sem intervenção humana.',
    image: '/assets/images/how-it-works/step2.svg',
  },
  {
    step: '03',
    title: 'Refine e melhore com feedbacks',
    description:
      'Analise interações e melhore continuamente as respostas do agente.',
    image: '/assets/images/how-it-works/step3.svg',
  },
  {
    step: '04',
    title: 'Encaminhe para humanos quando necessário',
    description:
      'Situações complexas podem ser automaticamente direcionadas para atendimento humano.',
    image: '/assets/images/how-it-works/step4.svg',
  },
  {
    step: '05',
    title: 'Analise tudo com insights e métricas',
    description:
      'Visualize dados de performance e melhore a experiência do usuário.',
    image: '/assets/images/how-it-works/step5.svg',
  },
]

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="recursos" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <Badge variant="default" className="mb-4 bg-vermelho-100 text-vermelho-700 text-sm shadow-none hover:bg-vermelho-200">
          Como funciona
        </Badge>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Etapas à esquerda */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4">
              Uma solução completa para agentes conversacionais
            </h2>
            <p className="text-gray-600 mb-8">
              O Chat Agentes ajuda sua empresa a resolver dúvidas, automatizar
              fluxos e melhorar o suporte com inteligência real.
            </p>

            <div className="space-y-3">
              {steps.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <motion.div
                    key={item.step}
                    onClick={() => setActiveIndex(index)}
                    initial={false}
                    animate={{
                      backgroundColor: isActive ? '#ffffff' : 'transparent',
                      borderColor: isActive ? '#d1d5db' : 'transparent',
                      color: isActive ? '#000' : '#9ca3af',
                      transition: { duration: 0.25 },
                    }}
                    className={cn(
                      'cursor-pointer px-4 py-3 rounded-xl border transition-all',
                      isActive && 'shadow-sm'
                    )}
                    style={{ borderWidth: 1 }}
                  >
                    <p className="text-sm font-bold text-vermelho mb-1">
                      {item.step}.{' '}
                      <span className="text-grafite font-semibold">{item.title}</span>
                    </p>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="text-xs text-gray-600 mt-1 min-h-[50px]"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Imagem da etapa à direita */}
          <motion.div
            key={steps[activeIndex].image}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-50 border rounded-md p-4"
          >
            <Image
              src={steps[activeIndex].image}
              alt={steps[activeIndex].title}
              width={500}
              height={320}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
