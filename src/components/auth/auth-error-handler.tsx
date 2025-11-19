"use client"

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useRef } from "react";

export function AuthErrorHandler() {
  const router = useRouter();
  const logoutInProgress = useRef(false);

  useEffect(() => {
    // Interceptar erros de console para detectar erros de autorização
    const originalError = console.error;

    console.error = (...args) => {
      // Chamar o console.error original
      originalError.apply(console, args);

      // Verificar se é um erro de autorização relacionado ao endpoint /users/me
      const errorMessage = args.join(' ');
      const isUnauthorizedError = errorMessage.includes('Unauthorized') || errorMessage.includes('TOKEN_EXPIRED');
      const isUserMeError = errorMessage.includes('/users/me') || errorMessage.includes('me.ts');

      if (isUnauthorizedError && isUserMeError && !logoutInProgress.current) {
        console.log("Erro de autorização no endpoint /users/me detectado, fazendo logout automático...");
        logoutInProgress.current = true;

        // Fazer logout automático
        signOut({
          redirect: false,
          callbackUrl: "/entrar"
        }).then(() => {
          router.push("/entrar");
        }).catch((error) => {
          console.error("Erro ao fazer logout:", error);
        }).finally(() => {
          logoutInProgress.current = false;
        });
      }
    };

    // Cleanup: restaurar console.error original quando componente for desmontado
    return () => {
      console.error = originalError;
    };
  }, [router]);

  return null; // Componente invisível
}