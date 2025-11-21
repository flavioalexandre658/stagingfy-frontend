const components = [
  { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-component1.svg", t: "Não necessita", s: "habilidades de design" },
  { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-component2.svg", t: "Vários estilos", s: "e espaços" },
  { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-component3.svg", t: "100% resultados", s: "automáticos" },
  { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-component5.svg", t: "Preenchimento automático", s: "de espaços" },
  { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-component7.svg", t: "Fotorealismo", s: "impressionante" },
  { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-component8.svg", t: "Entrega", s: "instantânea" },
  { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-component9.svg", t: "Design", s: "abrangente" },
];

export function OfferComponents() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {components.map((c, i) => (
            <li key={i} className="rounded-2xl bg-white border border-gray-200 shadow-base2 px-4 py-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-ametista-100 grid place-items-center">
                <img src={c.icon} alt="" className="h-6 w-6" />
              </div>
              <span className="text-sm text-gray-700">
                {c.t} <strong>{c.s}</strong>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center">
          <a href="#lead" className="rounded-full bg-ametista-600 text-white px-6 py-3 text-sm">Começar agora</a>
        </div>
      </div>
    </section>
  );
}