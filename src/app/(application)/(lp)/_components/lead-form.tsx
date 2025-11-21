"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { createLeadAction } from "@/actions/leads/create-lead";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type LeadInput, leadSchema } from "@/form-schemas/lead.schema";

import pt from "../../../../../messages/pt.json";

export function LeadForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({ resolver: zodResolver(leadSchema) });

  const { executeAsync } = useAction(createLeadAction as any);
  const onSubmit = async (data: LeadInput) => {
    setLoading(true);
    const resp = await executeAsync(data as any);
    setLoading(false);
    if (resp?.data && !resp.serverError && !resp.validationErrors) {
      toast.success(pt.landing.form.success);
      reset();
    } else {
      toast.error(pt.landing.form.error);
    }
  };

  return (
    <section id="lead" className="py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">{pt.landing.form.name}</Label>
              <Input id="name" placeholder="Seu nome" {...register("name")} />
              {errors.name?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">{pt.landing.form.email}</Label>
              <Input id="email" type="email" placeholder="seu@email.com" {...register("email")} />
              {errors.email?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="company">{pt.landing.form.company}</Label>
              <Input id="company" placeholder="Nome da empresa" {...register("company")} />
              {errors.company?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.company.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">{pt.landing.form.phone}</Label>
              <Input id="phone" placeholder="(00) 00000-0000" {...register("phone")} />
              {errors.phone?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Enviando..." : pt.landing.cta}
            </Button>
          </form>
        </Card>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Pronto para transformar seu atendimento?</h2>
          <p className="text-muted-foreground">
            Deixe seus dados e nossa equipe entrará em contato para uma demonstração
            personalizada.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Sem compromisso
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Resposta em até 24h
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Privacidade garantida
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}