// components/RouterTransition.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { NavigationProgress } from "@/components/ui/navigation-progress";
import { nprogress } from "@/lib/nprogress";

export function RouterTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Completa o progresso assim que a nova rota é carregada
    const timer = setTimeout(() => {
      nprogress.complete();
    }, 300); // Pequeno delay para garantir visibilidade

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return <NavigationProgress size={5} color="primary" />;
}