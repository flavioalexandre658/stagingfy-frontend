
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Fragment } from "react";

import { authOptions } from "../../../../libs/auth-options";
import { FooterLinks } from "./_components/footer-links";
import { HeroShowcase } from "./_components/hero-showcase";
import { LandingHeader } from "./_components/landing-header";
import { LeadForm } from "./_components/lead-form";
import { OfferComponents } from "./_components/offer-components";
import { OfferLogosMarquee } from "./_components/offer-logos-marquee";
import { OfferReviews } from "./_components/offer-reviews";
import { OfferSteps } from "./_components/offer-steps";
import { StagingGenerator } from "./_components/staging-generator";

export const metadata: Metadata = {
  title: `Staging virtual com IA para interiores e exteriores`,
  description: `Faça upload da foto, defina preferências e gere ambientes decorados realistas com IA.`,
  keywords: [
    "staging virtual",
    "decoração com IA",
    "interiores com IA",
    "exteriores com IA",
    "stagingfy",
    "renderização de ambientes",
    "propostas de design",
    "upload de foto",
    "preferências de estilo",
    "gerar resultado"
  ],
  alternates: { canonical: "https://stagingfy.com" },

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
  authors: [{ name: "Equipe Stagingfy", url: "https://stagingfy.com" }],
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
      <HeroShowcase />
      <OfferSteps />
      <OfferComponents />
      <StagingGenerator />
      <LeadForm />
      <FooterLinks />
    </Fragment>
  );
}