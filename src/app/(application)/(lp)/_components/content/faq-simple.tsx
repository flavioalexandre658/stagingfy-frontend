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
        "name": "O que é o Stagingfy?",
        "acceptedAnswer": {
          "@type": "Answer",
            "text":
            "O Stagingfy é uma plataforma de staging virtual com IA. Envie fotos dos seus ambientes e receba propostas de decoração internas e externas, de forma rápida e realista.",
        },
      },
      {
        "@type": "Question",
        "name": "Preciso saber design para usar?",
        "acceptedAnswer": {
          "@type": "Answer",
            "text":
            "Não! O Stagingfy foi criado para ser usado por qualquer pessoa. Basta enviar uma foto e escolher estilos; a IA faz o restante.",
        },
      },
      {
        "@type": "Question",
        "name": "Como funciona o staging virtual?",
        "acceptedAnswer": {
          "@type": "Answer",
            "text":
            "Faça upload da foto, defina preferências e em poucos segundos receba imagens renderizadas com novas propostas de layout e decoração.",
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
          Perguntas comuns sobre o Stagingfy
        </h2>

        <Accordion
          type="single"
          collapsible
          defaultValue="stagingfy"
          className="space-y-2"
        >
          <AccordionItem value="stagingfy">
            <AccordionTrigger>O que é o Stagingfy?</AccordionTrigger>
            <AccordionContent>
              É uma plataforma de staging virtual com IA para gerar propostas realistas de decoração e layout a partir de fotos.
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
