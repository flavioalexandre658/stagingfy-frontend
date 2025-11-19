"use client"

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export function useSessionMonitor() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const logoutInProgress = useRef(false);

  useEffect(() => {
    // Verificar se o token foi marcado como expirado ou se não há access_token
    if (status === "authenticated" && session?.user) {
      const hasExpiredFlag = (session as any)?.expired;
      const hasNoToken = !session.user.access_token || session.user.access_token === '';

      if ((hasExpiredFlag || hasNoToken) && !logoutInProgress.current) {
        console.log("Token expirado ou inválido detectado, fazendo logout...");
        logoutInProgress.current = true;

        signOut({
          redirect: false,
          callbackUrl: "/entrar"
        }).then(() => {
          router.push("/entrar");
        }).finally(() => {
          logoutInProgress.current = false;
        });
        return;
      }
    }

    // Se a sessão foi invalidada (status é "unauthenticated" mas antes estava autenticado)
    if (status === "unauthenticated" && typeof window !== "undefined") {
      const wasAuthenticated = localStorage.getItem("was_authenticated");

      if (wasAuthenticated === "true" && !logoutInProgress.current) {
        // Limpar flag e fazer sign-out completo
        localStorage.removeItem("was_authenticated");
        logoutInProgress.current = true;

        signOut({
          redirect: false,
          callbackUrl: "/entrar"
        }).then(() => {
          router.push("/entrar");
        }).finally(() => {
          logoutInProgress.current = false;
        });
      }
    }

    // Marcar como autenticado quando há sessão válida e não expirada
    if (status === "authenticated" && session && session.user.access_token && !(session as any)?.expired) {
      localStorage.setItem("was_authenticated", "true");
    }
  }, [status, session, router, update]);

  return { session, status };
}