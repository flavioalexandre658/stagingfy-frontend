import { ChevronRight, Settings2, Upload, Wand2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

export function StepsFlow() {
  const items = [
    { icon: Upload, title: "Passo 1", desc: "Envie sua foto" },
    { icon: Settings2, title: "Passo 2", desc: "Defina preferências" },
    { icon: Wand2, title: "Passo 3", desc: "Gere e use o resultado" },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {items.map((it, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ametista-600 text-white">
                  <it.icon size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{it.title}</p>
                  <p className="text-xs text-gray-600">{it.desc}</p>
                </div>
                {i < items.length - 1 && (
                  <div className="hidden sm:flex flex-1 justify-end text-gray-400">
                    <ChevronRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Pill variant="outline" className="text-gray-600">Melhor qualidade, rápido e confiável</Pill>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[0,1,2,3].map((i) => (
            <Card key={i} className="p-4 bg-white border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-gray-100" />
                <div className="h-4 w-16 rounded bg-green-500" />
              </div>
              <p className="text-sm text-gray-700">Resultados consistentes e super realistas para seus ambientes.</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { t: "Sem habilidades de design", c: "Sem experiência necessária" },
            { t: "80+ estilos e espaços", c: "Variedade completa" },
            { t: "100% customizável", c: "Controle total" },
            { t: "Mude cores e texturas", c: "Ajustes rápidos" },
            { t: "Preencha espaços automaticamente", c: "IA inteligente" },
          ].map((f, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 text-center">
              <p className="text-sm font-semibold text-gray-900">{f.t}</p>
              <p className="text-xs text-gray-600">{f.c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}