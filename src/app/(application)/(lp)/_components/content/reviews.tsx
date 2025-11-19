"use client";

import { motion } from "framer-motion";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Ana Oliveira",
    role: "Equipe de Suporte",
    review:
      "Com o Chat Agentes, conseguimos reduzir o tempo de resposta ao cliente em mais de 70%. A IA responde com assertividade e ajuda real. Impressionante!",
  },
  {
    name: "Bruno Martins",
    role: "CTO na TechFlow",
    review:
      "Integrar o Chat Agentes foi simples e impactou diretamente nosso atendimento. Automatizamos dúvidas repetitivas e ganhamos mais tempo para focar no que importa.",
  },
  {
    name: "Juliana Rocha",
    role: "CEO na LojaZen",
    review:
      "A interface do Chat Agentes é incrivelmente fácil. Em menos de 10 minutos, nosso agente estava treinado e pronto para atuar com nossos clientes.",
  },
  {
    name: "Marcos Lima",
    role: "Analista de Dados",
    review:
      "O painel de insights do Chat Agentes nos permite acompanhar a performance do agente em tempo real. Hoje tomamos decisões baseadas em dados concretos!",
  },
];

export function Reviews() {
  return (
    <section className="py-8 sm:py-20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Depoimentos reais
          </Badge>
        </div>

        <h2 className="text-2xl font-bold text-center mt-4">
          O que nossos clientes dizem
        </h2>
        <p className="text-center text-muted-foreground mt-4 mb-12">
          Empresas e profissionais que estão otimizando seus atendimentos com agentes inteligentes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 shadow-sm">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {r.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">{r.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {r.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-800">
                    "{r.review}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}