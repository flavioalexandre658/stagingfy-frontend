"use client";

import { motion } from "framer-motion";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Ana Oliveira",
    role: "Designer de Interiores",
    review:
      "Com o Stagingfy, apresentei propostas em minutos e aumentei minha taxa de conversão. Os resultados são super realistas!",
  },
  {
    name: "Bruno Martins",
    role: "Arquiteto na TechFlow",
    review:
      "O Stagingfy acelerou nossa pré-venda. Em poucos cliques geramos visualizações que encantam os clientes.",
  },
  {
    name: "Juliana Rocha",
    role: "CEO na LojaZen",
    review:
      "A interface do Stagingfy é incrivelmente simples. Em menos de 10 minutos, tínhamos propostas prontas para o catálogo.",
  },
  {
    name: "Marcos Lima",
    role: "Gestor Comercial",
    review:
      "Com Stagingfy, melhoramos a apresentação e fechamos mais negócios. Os clientes entendem o potencial do ambiente imediatamente.",
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