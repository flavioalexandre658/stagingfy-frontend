'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

export function FaqSimple() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o Chat Agentes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "O Chat Agentes é uma plataforma que permite criar agentes de IA treinados com seus próprios dados, sem necessidade de programação. Ideal para atendimento ao cliente, suporte interno e automação inteligente.",
        },
      },
      {
        "@type": "Question",
        "name": "Preciso saber programar para usar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Não! O Chat Agentes foi desenvolvido para ser utilizado por qualquer pessoa, com interface simples e intuitiva. Você pode treinar e implantar um agente com poucos cliques.",
        },
      },
      {
        "@type": "Question",
        "name": "Como o agente aprende com meus dados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Basta enviar documentos, links ou textos, e nosso sistema transforma essas fontes em conhecimento para o agente responder com precisão.",
        },
      },
      {
        "@type": "Question",
        "name": "Posso integrar com meu site ou sistema?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Sim! Você pode incorporar o agente ao seu site com poucos cliques, ou integrar com APIs e CRMs para uma experiência ainda mais completa.",
        },
      },
      {
        "@type": "Question",
        "name": "É seguro compartilhar meus dados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Sim. Seguimos as melhores práticas de segurança e privacidade. Seus dados são criptografados e usados apenas para treinar seu agente.",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-xl mx-auto py-10 sm:py-20 px-4">
        <div className="flex justify-center mb-4">
          <Badge variant="default" className="bg-ametista-100 text-ametista-700 text-sm shadow-none hover:bg-ametista-200">
            Dúvidas Frequentes
          </Badge>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
          Perguntas comuns sobre o Chat Agentes
        </h2>

        <Accordion
          type="single"
          collapsible
          defaultValue="chat-agentes"
          className="space-y-2"
        >
          <AccordionItem value="chat-agentes">
            <AccordionTrigger>O que é o Chat Agentes?</AccordionTrigger>
            <AccordionContent>
              É uma plataforma completa para criar agentes de IA personalizados com seus próprios dados, ideal para atendimento automatizado e suporte inteligente.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="precisa-programar">
            <AccordionTrigger>Preciso saber programar para usar?</AccordionTrigger>
            <AccordionContent>
              Não! O sistema é visual e intuitivo, qualquer pessoa consegue criar agentes sem conhecimento técnico.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="como-aprende">
            <AccordionTrigger>Como o agente aprende com meus dados?</AccordionTrigger>
            <AccordionContent>
              Você envia arquivos, textos ou links, e a plataforma transforma esse conteúdo em conhecimento para o agente responder com precisão.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="integracao">
            <AccordionTrigger>Posso integrar com meu site?</AccordionTrigger>
            <AccordionContent>
              Sim! Basta copiar um pequeno código ou usar nossa API para integrar em seu site ou sistema.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="seguranca">
            <AccordionTrigger>Meus dados estão seguros?</AccordionTrigger>
            <AccordionContent>
              Sim. Usamos criptografia de ponta e nunca compartilhamos ou usamos seus dados para outros fins.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
