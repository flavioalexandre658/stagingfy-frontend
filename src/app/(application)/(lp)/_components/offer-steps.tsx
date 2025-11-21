import { cn } from "@/lib/utils";

const steps = [
  {
    icon: "https://cdn.homedesigns.ai/web/images/gs-offer-step1.svg",
    title: "Passo 1",
    desc: "Envie sua foto",
  },
  {
    icon: "https://cdn.homedesigns.ai/web/images/gs-offer-step2.svg",
    title: "Passo 2",
    desc: "Defina preferências",
  },
  {
    icon: "https://cdn.homedesigns.ai/web/images/gs-offer-step3.svg",
    title: "Passo 3",
    desc: "Gere e use o resultado",
  },
];

export function OfferSteps() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col sm:flex-row gap-4 py-6">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-1 items-center gap-3 rounded-2xl bg-white shadow-base2 border border-gray-200 px-4 py-4">
              <div className="h-12 w-12 rounded-xl bg-ametista-600 grid place-items-center">
                <img src={s.icon} alt={s.title} className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{s.title}</h3>
                <p className="text-xs text-gray-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-700">
          Stagingfy, IA para Interiores e Paisagismo. <strong>Melhor qualidade, super rápido e confiável, usado por milhares de profissionais.</strong>
        </p>
      </div>
    </section>
  );
}