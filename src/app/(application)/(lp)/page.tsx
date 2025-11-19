
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Fragment } from "react";

import { authOptions } from "../../../../libs/auth-options";
import { FaqSimple } from "./_components/content/faq-simple";
import { FeaturesCards } from "./_components/content/feature-cards";
import { FeatureSimple } from "./_components/content/feature-simple";
import { HeroBullets } from "./_components/content/hero-bullets";
import { HowItWorks } from "./_components/content/how-it-works";
import { PricingPlans } from "./_components/content/pricing-plans";
import { Reviews } from "./_components/content/reviews";
import { FooterLinks } from "./_components/footer-links";
import { LandingHeader } from "./_components/landing-header";

export const metadata: Metadata = {
  title: `Crie agentes de IA personalizados`,
  description: `Com o Chat Agentes você constrói agentes de inteligência artificial treinados com seus próprios dados. Use textos, documentos, sites ou FAQs para treinar seu chatbot. Comece grátis!`,
  keywords: [
    "chat agentes",
    "chatbots com IA",
    "agente de IA personalizado",
    "chat treinado com dados",
    "criar chatbot com conteúdo próprio",
    "inteligência artificial para atendimento",
    "faq automatizado",
    "chat para site",
    "bot com IA em português"
  ],
  alternates: {
    canonical: "https://www.stagingfy.com",
  },

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
  authors: [
    {
      name: "Equipe ChatAgentes",
      url: "https://www.stagingfy.com",
    },
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2e2e2e',
};

export default async function Home() {
  // Buscar informações de sessão via Server Side
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!(session?.user?.id && session?.user?.access_token);

  return (
    <Fragment>
      <LandingHeader isAuthenticated={isAuthenticated} />
      <HeroBullets />
      <FeatureSimple />
      <div className="bg-gray-50">
        <FeaturesCards />
        <HowItWorks />
      </div>
      <Reviews />
      <PricingPlans />
      <FaqSimple />
      <FooterLinks />
    </Fragment>
  );
}