import { Card } from "@/components/ui/card";

const testimonials = [
  {
    initials: "DM",
    name: "David Miller",
    flag: "https://cdn.homedesigns.ai/web/images/gs-offer-flag-usa.png",
    title: "Instrumento de IA extraordinário!",
    text:
      "Esta IA é realmente extraordinária. Simples de usar e resultados autênticos, muitas vezes indistinguíveis de projetos reais.",
  },
  {
    initials: "ET",
    name: "Emma Taylor",
    flag: "https://cdn.homedesigns.ai/web/images/gs-offer-flag-canada.png",
    title: "Banheiro redesenhado",
    text:
      "O Stagingfy foi crucial para visualizar nosso novo banheiro, oferecendo opções e layouts criativos. Estamos usando na sala agora. 5 estrelas!!",
  },
  {
    initials: "MC",
    name: "Michael O’Connell",
    flag: "https://cdn.homedesigns.ai/web/images/gs-offer-flag-au.png",
    title: "Muitas ideias novas",
    text:
      "Estou encantado com as propostas para transformar meus espaços internos em estética moderna que harmoniza com o que já tenho.",
  },
  {
    initials: "SJ",
    name: "Sarah Jones",
    flag: "https://cdn.homedesigns.ai/web/images/gs-offer-flag-usa.png",
    title: "Fácil de gerenciar",
    text:
      "A vasta seleção de estilos permite criatividade ilimitada. Valorizo ajustar a intensidade das modificações de forma simples.",
  },
];

export function OfferReviews() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-center text-gray-700">
          Stagingfy, IA para Interiores e Paisagismo. <strong>Melhor qualidade, super rápido e confiável, usado por milhares de profissionais.</strong>
        </p>

        {/*<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <img src="https://cdn.homedesigns.ai/web/images/clients.png" alt="Clientes" className="h-10" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">2.28M+ usuários não podem estar errados.</h3>
              <p className="text-sm text-gray-600">Deixe a IA fazer a mágica por você.</p>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-4 bg-white border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 grid place-items-center text-xs font-bold text-gray-900">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    </div>
                  </div>
                  <img src={t.flag} alt="" className="h-4" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <img src="https://cdn.homedesigns.ai/web/images/ts-trustpilot.svg" alt="Trustpilot" className="h-3" />
                  <span className="text-xs text-green-600 font-semibold">4.8 de 5</span>
                </div>
                <div className="text-sm font-semibold text-gray-900">{t.title}</div>
                <p className="text-sm text-gray-700 mt-1">{t.text}</p>
              </Card>
            ))}
          </div>
        </div>*/}
      </div>
    </section>
  );
}