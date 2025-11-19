import type { Metadata } from "next";

import Forgot from './_components/forgot'
export const metadata: Metadata = {
    title: `Recuperar senha`,
    // Metadados adicionais para SEO
    robots: {
        index: false, // Permite que a página seja indexada pelos mecanismos de busca
        follow: false, // Permite que os mecanismos de busca sigam os links da página
        nocache: false, // Define se a página deve ser armazenada em cache
        googleBot: {
            index: false,
            follow: false,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};
const RecuperarSenha = () => {

    return (

        <Forgot />

    );
};

export default RecuperarSenha;