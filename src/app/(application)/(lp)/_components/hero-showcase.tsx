"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

export function HeroShowcase() {
  const features = [
    "Staging Virtual com 1 clique",
  ];
  const words = ["Interiores"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className={cn("relative dark bg-gradient-to-b from-[#1b1b21] via-[#23232c] to-[#121217]")}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-4 text-gray-200 text-sm">
              <span className="inline-flex items-center gap-2">
                <Pill variant="primary">Novo</Pill>
                <span className="font-medium">{features[0]}</span>
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Decore
              <span className="inline-flex">
                <span className="text-[#FFCD06]">&nbsp;{words[0]}</span>
              </span>
              <span className="inline-flex">com IA, em menos de 30 segundos</span>
            </h1>
            <p className="mt-4 text-gray-300 text-base md:text-lg">
              <span className="font-semibold">Envie uma foto do seu espaço</span> e transforme completamente. Redecore,
              mobilie e reimagine qualquer <span className="font-semibold">interior</span>.
            </p>
            <div className="mt-6">
              <Button className="bg-ametista-600 hover:bg-ametista-700 text-white px-8 py-6 text-base" onClick={() => {
                const el = document.getElementById("lead");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}>Começar agora</Button>
            </div>
            {/*            <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-3">
                <img src="https://cdn.homedesigns.ai/web/images/vshome-trust-members-img.png" alt="Clientes" className="h-10" />
                <div>
                  <h6 className="text-sm font-semibold text-white">2.28M+ usuários em todo o mundo</h6>
                  <span className="text-xs text-gray-300">Casas reimaginadas com IA.</span>
                </div>
              </div>

            </div>*/}
          </div>

          <div className="relative">
            <a href="#lead" className="block rounded-2xl overflow-hidden border bg-card shadow-base2">
              <video loop muted autoPlay playsInline width="100%">
                <source src="https://cdn.homedesigns.ai/web/images/headvidnewoffer1.webm" type="video/webm" />
                <source src="https://cdn.homedesigns.ai/web/images/headvidnewoffer1.mp4" type="video/mp4" />
              </video>
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-icon1.svg", t: "Uso", s: "Pessoal" },
            { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-icon2.svg", t: "Uso", s: "Profissional" },
            { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-icon3.svg", t: "Uso", s: "Empresarial" },
            /*{ icon: "https://cdn.homedesigns.ai/web/images/gs-offer-icon4.svg", t: "7.03M+", s: "Projetos" },
            { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-icon5.svg", t: "170+", s: "Países" },
            { icon: "https://cdn.homedesigns.ai/web/images/gs-offer-icon6.svg", t: "59032+", s: "Profissionais" },*/
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-800/70 px-3 py-3">
              <div className="h-10 w-10 rounded-lg bg-gray-700 grid place-items-center">
                <img src={m.icon} alt="" className="h-6 w-6" />
              </div>
              <span className="text-sm text-gray-100">
                <strong>{m.t}</strong>
                <br />
                {m.s}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}