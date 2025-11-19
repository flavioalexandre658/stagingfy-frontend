"use server"

import { redirect } from "next/navigation";

export async function autoLogout() {
    try {
        console.log("Executando logout automático devido a token expirado...");
        
        // Redirecionar para a página de login
        redirect('/entrar');
    } catch (error) {
        console.error("Erro no logout automático:", error);
        // Em caso de erro, ainda assim redirecionar
        redirect('/entrar');
    }
}