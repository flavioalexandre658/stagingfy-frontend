"use client";

import { IconDeviceMobile, IconEdit, IconHeadset, IconHeart, IconShare } from "@tabler/icons-react";
import React from "react";

// Dados atualizados para o ChatAgentes - Plataforma de Agentes de IA
export const MOCKDATA = [
  {
    icon: IconHeart,
    title: "Agentes de IA Personalizados",
    description:
      "Crie agentes de inteligência artificial únicos treinados com seus próprios dados e conhecimento específico do seu negócio, sem necessidade de programação.",
  },
  {
    icon: IconEdit,
    title: "Treinamento Intuitivo",
    description:
      "Configure e treine seus agentes de IA facilmente através de nossa interface visual. Adicione documentos, URLs e dados para criar um assistente especializado.",
  },
  {
    icon: IconShare,
    title: "Integração Multiplataforma",
    description:
      "Integre seus agentes de IA ao WhatsApp, website, sistemas internos ou APIs em poucos cliques. Disponibilize atendimento inteligente onde seus clientes estão.",
  },
  {
    icon: IconDeviceMobile,
    title: "Acesso de Qualquer Lugar",
    description:
      "Gerencie seus agentes de IA pelo celular, tablet ou computador. Nossa plataforma é 100% responsiva e permite controle total de qualquer dispositivo.",
  },
  {
    icon: IconHeadset,
    title: "Atendimento 24/7 Automatizado",
    description:
      "Seus agentes de IA trabalham 24 horas por dia, 7 dias por semana, oferecendo respostas precisas e atendimento personalizado sem interrupções.",
  },
];

export function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-gray-100 rounded-full p-3">
        <Icon size={24} stroke={1.5} className="text-gray-700" />
      </div>
      <h3 className="mt-4 mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export function FeaturesGrid() {
  const features = MOCKDATA.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Por que Escolher o Stagingfy para Staging Virtual",
    description:
      "Descubra por que o Stagingfy é a melhor plataforma para staging virtual com IA, gerando propostas autênticas e rápidas para interiores e exteriores.",
    url: "https://stagingfy.com",
    mainEntity: MOCKDATA.map((feature) => ({
      "@type": "ItemList",
      name: feature.title,
      description: feature.description,
    })),
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Por que Escolher o Stagingfy para Staging Virtual?
        </h2>

        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Descubra como o Stagingfy acelera a criação de propostas de decoração com IA – simples, rápido e com resultados impressionantes!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-12">
          {features}
        </div>
      </div>
    </>
  );
}
