import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
    icons: {
        icon: "../assets/images/icon/icon.svg", // Ícone padrão
        shortcut: "../assets/images/icon/icon.svg", // Ícone para atalhos
        apple: "../assets/images/icon/icon.svg", // Ícone para dispositivos Apple
    },
};
// O layout já roda no lado do servidor por padrão
export default async function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Toaster position="top-center"
                reverseOrder={false}
                toastOptions={{
                    // Default options for specific types
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'white',
                        },
                    },
                }} />
            {children}
        </>
    );
}

