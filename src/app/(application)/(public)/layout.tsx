

import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { FooterLinks } from "@/app/(application)/(lp)/_components/footer-links"
import { LandingHeader } from '@/app/(application)/(lp)/_components/landing-header'

import { authOptions } from "../../../../libs/auth-options";
export const metadata: Metadata = {
    // Título otimizado para SEO
    title: {
        default: `Crie Conteúdo com IA | Posts e Web Stories - ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
        template: `%s | ${process.env.NEXT_PUBLIC_NAME_PROJECT} - Conteúdo Personalizado com Inteligência Artificial`,
    },

    // Descrição persuasiva para melhorar o CTR nas buscas
    description: `Gere posts e web stories personalizados com inteligência artificial na ${process.env.NEXT_PUBLIC_NAME_PROJECT}! Crie conteúdo para sites e redes sociais de forma fácil e rápida. Experimente agora! 🚀`,

    // Palavras-chave ampliadas para atrair buscas relevantes
    keywords: [
        "criar conteúdo com IA",
        "gerador de posts com inteligência artificial",
        "web stories personalizadas",
        "criação de conteúdo automatizada",
        "ferramenta de conteúdo IA",
        "ChatAgentes",
        "gerar posts para redes sociais",
        "conteúdo para sites com IA",
        "web stories para marketing",
        "inteligência artificial para marketing digital",
        "criação de posts online",
        "ferramenta de marketing de conteúdo",
        "posts automáticos para blogs",
        "conteúdo personalizado IA",
        "melhor ferramenta para criar posts com IA",
        "como criar web stories com inteligência artificial",
        "gerador de conteúdo para sites grátis",
        "plataforma de criação de posts automatizada",
        `${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
    ],

    // Metadados para mecanismos de busca
    robots: {
        index: true, // Permite indexação
        follow: true, // Permite seguir links
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

    // URL canônica para evitar conteúdo duplicado
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },

    // Metadados para Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
        title: `Crie Conteúdo com IA | Posts e Web Stories - ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
        description: `Gere posts e web stories incríveis com inteligência artificial na ${process.env.NEXT_PUBLIC_NAME_PROJECT}. Fácil, rápido e perfeito para marketing digital! Experimente agora! 🎨`,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        siteName: `${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
        images: [
            {
                url: "/assets/images/icon/icon.svg",
                width: 1200,
                height: 630,
                alt: `${process.env.NEXT_PUBLIC_NAME_PROJECT} - Criação de Conteúdo com Inteligência Artificial`,
            },
        ],
        locale: "pt_BR",
        type: "website",
    },

    // Metadados para Twitter Cards
    twitter: {
        card: "summary_large_image",
        title: `Crie Conteúdo com IA | Posts e Web Stories - ${process.env.NEXT_PUBLIC_NAME_PROJECT}`,
        description: `Crie posts e web stories personalizados com IA na ${process.env.NEXT_PUBLIC_NAME_PROJECT}! Fácil, rápido e ideal para redes sociais e sites. Experimente agora!`,
        images: ["/assets/images/icon/icon.svg"],
    },

    // Ícones (favicon, atalhos, Apple)
    icons: {
        icon: "/assets/images/icon/icon.svg",
        shortcut: "/assets/images/icon/icon.svg",
        apple: "/assets/images/icon/icon.svg",
    },

    // Autores
    authors: [
        {
            name: "ChatAgentes",
            url: "https://chatagentes.com",
        },
    ],
};
// O layout já roda no lado do servidor por padrão
export default async function ApplicationLayout({ children }: { children: React.ReactNode }) {

    const session = await getServerSession(authOptions);
    const isAuthenticated = !!(session?.user?.id && session?.user?.access_token);
    
    return (
        <>
            <LandingHeader isAuthenticated={isAuthenticated} />
            <div className="m-auto">

                {children}

            </div>
            <FooterLinks />

        </>
    );
}

