'use client'

import { IconCheck } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function HeroBullets() {
  const router = useRouter()

  return (
    <div className="relative overflow-hidden bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              Crie agentes de IA{' '}
              <span className="text-released">treinados com seus dados</span>
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              Transforme conteúdos como documentos, textos e perguntas frequentes
              em assistentes inteligentes e personalizados — tudo isso sem precisar
              programar.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Treine com textos, sites, FAQs e arquivos',
                'Interface moderna e 100% em português',
                'Compartilhamento fácil e integração no seu site',
              ].map((text, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 text-released">
                    <IconCheck size={20} />
                  </span>
                  <span className="text-base text-gray-700">{text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button
                className="rounded-full"
                size="lg"
                onClick={() => router.push('/cadastro')}
              >
                Começar agora
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('recursos')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Ver recursos
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative w-full">
            <Image
              src="/assets/images/illustrations/sources.svg"
              alt="Exemplo de agente inteligente"
              width={600}
              height={400}
              className="rounded-md drop-shadow-xl"
            />
            <div className="absolute -top-4 -right-2 animate-pulse bg-released-800 text-white text-xs px-3 py-2 rounded-full shadow-md">
              Novo 🚀
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
