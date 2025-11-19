// lib/use-custom-router.ts
"use client";

import { useRouter } from "next/navigation";

import { nprogress } from "@/lib/nprogress";

export function useCustomRouter() {
  const router = useRouter();

  const customPush = (href: string, options?: { refresh?: boolean }) => {
    console.log("Iniciando progresso antes de push:", href);
    nprogress.start(); // Inicia o progresso imediatamente
    router.push(href);
    if (options?.refresh) {
      router.refresh();
    }
  };

  return {
    ...router,
    push: customPush, // Sobrescreve o push original
  };
}