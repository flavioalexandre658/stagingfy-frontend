import type { Metadata } from "next";
import { Fragment } from "react"

import { AboutUs } from "./_components/about-us"

export const metadata: Metadata = {
  // Título da página (máximo 60 caracteres para SEO)
  title: `Sobre Nós | ${process.env.NEXT_PUBLIC_NAME_PROJECT} - Plataforma de Agentes de IA`,

  // Descrição da página (máximo 160 caracteres para SEO)
  description: `Conheça a história do ${process.env.NEXT_PUBLIC_NAME_PROJECT}, a plataforma que revoluciona a criação de agentes de IA, chatbots personalizados e automação inteligente para empresas.`,

  // Palavras-chave (relevantes e específicas para SEO)
  keywords: [
    `sobre o ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `história do ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    "plataforma de agentes de IA",
    "chatbots personalizados",
    "automação inteligente",
    "inteligência artificial conversacional",
    "agentes virtuais para empresas",
    "assistentes de IA personalizados",
    "chatbots para atendimento",
    "automação de processos com IA",
    "plataforma de IA no-code",
    "criação de chatbots sem código",
    "agentes de IA para vendas",
    "chatbots para marketing",
    "assistentes virtuais inteligentes",
    `quem somos ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `missão ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `visão ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    `valores ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    "plataforma segura de IA",
    "ferramenta de criação de agentes",
    "tecnologia de ponta em IA",
    "inovação em inteligência artificial",
    `${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
  ],

  // URL canônica (evita conteúdo duplicado e ajuda no SEO)
  alternates: {
    canonical: `https://chatagentes.com/sobre-nos`,
  },

  // Metadados para Open Graph (compartilhamento em redes sociais como Facebook, LinkedIn)
  openGraph: {
    title: `Sobre Nós | ${process.env.NEXT_PUBLIC_NAME_PROJECT} - Plataforma de Agentes de IA`,
    description: `Conheça a história do ${process.env.NEXT_PUBLIC_NAME_PROJECT}, a plataforma que revoluciona a criação de agentes de IA, chatbots personalizados e automação inteligente para empresas.`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/sobre-nos`,
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
    title: `Sobre Nós | ${process.env.NEXT_PUBLIC_NAME_PROJECT} - Plataforma de Agentes de IA`,
    description: `Conheça a história do ${process.env.NEXT_PUBLIC_NAME_PROJECT}, a plataforma que revoluciona a criação de agentes de IA, chatbots personalizados e automação inteligente para empresas.`,
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
      <AboutUs />
    </Fragment>
  );
}
