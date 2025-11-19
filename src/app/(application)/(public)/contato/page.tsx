import type { Metadata } from "next";
import { Fragment } from "react"

import { GetInTouch } from "./_components/get-in-touch"

export const metadata: Metadata = {
  // Título da página (máximo 60 caracteres para SEO)
  title: `Contato | ${process.env.NEXT_PUBLIC_NAME_PROJECT} - Suporte para Agentes de IA`,

  // Descrição da página (máximo 160 caracteres para SEO)
  description: `Entre em contato com a equipe do ${process.env.NEXT_PUBLIC_NAME_PROJECT}! Tire dúvidas sobre criação de agentes de IA, chatbots personalizados e automação inteligente.`,

  // Palavras-chave (relevantes e específicas para SEO)
  keywords: [
    `contato ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `suporte ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `fale conosco ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `atendimento ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    "suporte para agentes de IA",
    "suporte para chatbots",
    "suporte para automação",
    `como entrar em contato com ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `suporte por WhatsApp ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `suporte por e-mail ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `chat de suporte ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `ajuda ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    "dúvidas sobre agentes de IA",
    "plataforma de IA conversacional",
    "suporte para chatbots personalizados",
    "contato para agentes inteligentes",
    `atendimento ao cliente ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `suporte 24/7 ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `solução de problemas ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    "agentes de IA para empresas",
    "chatbots para atendimento",
    "automação com inteligência artificial",
    "assistentes virtuais personalizados",
    `${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
  ],

  // URL canônica (evita conteúdo duplicado e ajuda no SEO)
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contato`,
  },

  // Metadados para Open Graph (compartilhamento em redes sociais como Facebook, LinkedIn)
  openGraph: {
    title: `Contato | ${process.env.NEXT_PUBLIC_NAME_PROJECT} - Suporte para Agentes de IA`,
    description: `Entre em contato com a equipe do ${process.env.NEXT_PUBLIC_NAME_PROJECT}! Tire dúvidas sobre criação de agentes de IA, chatbots personalizados e automação inteligente.`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/contato`,
    siteName: `${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    images: [
      {
        url: "/assets/images/icon/icon.svg",
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_NAME_PROJECT} - Plataforma de Agentes de IA e Chatbots`,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  // Metadados para Twitter Cards (compartilhamento no Twitter)
  twitter: {
    card: "summary_large_image",
    title: `Contato | ${process.env.NEXT_PUBLIC_NAME_PROJECT} - Suporte para Agentes de IA`,
    description: `Entre em contato com a equipe do ${process.env.NEXT_PUBLIC_NAME_PROJECT}! Tire dúvidas sobre criação de agentes de IA, chatbots personalizados e automação inteligente.`,
    images: ["/assets/images/icon/icon.svg"],
  },

  // Metadados adicionais para SEO
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Ícone favorito (favicon)
  icons: {
    icon: "/assets/images/icon/icon.svg",
    shortcut: "/assets/images/icon/icon.svg",
    apple: "/assets/images/icon/icon.svg",
  },

  // Autores (opcional, para dar crédito)
  authors: [
    {
      name: `${process.env.NEXT_PUBLIC_NAME_PROJECT} Team`,
      url: "https://chatagentes.com",
    },
  ],
};
export default function Home() {
  return (
    <Fragment>
      <GetInTouch />
    </Fragment>
  );
}
