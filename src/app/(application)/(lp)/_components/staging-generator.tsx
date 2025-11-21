"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, Trash2, Upload } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { generateStagingAction } from "@/actions/staging/generate";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type StagingInput, stagingSchema } from "@/form-schemas/staging.schema";

type ResultItem = { url: string };

export function StagingGenerator() {
  const [phase, setPhase] = useState<"form" | "results">("form");
  const [inputUrl, setInputUrl] = useState<string | null>(null);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { register, handleSubmit, setValue, watch } = useForm({ resolver: zodResolver(stagingSchema), defaultValues: { removeExistingFurniture: false, addFurniture: true, roomType: "bedroom", furnitureStyle: "standard" } });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      const url = URL.createObjectURL(acceptedFiles[0]);
      setInputUrl(url);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] }, multiple: false });
  const canProcess = useMemo(() => !!inputUrl, [inputUrl]);

  const { executeAsync } = useAction(generateStagingAction as any);
  const onSubmit = async (data: StagingInput) => {
    if (!inputUrl) return;
    setProcessing(true);
    setProgress(0);
    const timer = setInterval(() => setProgress((p) => Math.min(p + Math.floor(Math.random() * 12) + 8, 90)), 400);
    const resp = await executeAsync({ ...data, inputUrl } as any);
    const payload = (resp?.data as any)?.data;
    if (payload && !resp.serverError && !resp.validationErrors) {
      clearInterval(timer);
      setProgress(100);
      setProcessing(false);
      const one = (payload.results || []).slice(0, 1);
      setResults(one);
      setSelectedIndex(0);
      setPhase("results");
    } else {
      clearInterval(timer);
      setProcessing(false);
      const msg = (resp as any)?.serverError?.message || (resp?.data as any)?.error?.message || "Falha ao processar imagem";
      toast.error(msg);
      const status = (resp as any)?.serverError?.status || (resp?.data as any)?.error?.status;
      if (status === 401) {
        window.location.href = "/entrar?redirect=" + encodeURIComponent(window.location.pathname);
      }
    }
  };

  if (phase === "results") {
    return (
      <section className="relative dark bg-gradient-to-b from-[#1b1b21] via-[#23232c] to-[#121217] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl bg-white px-4 py-8 sm:mb-4 lg:p-8">
            <div className="grid w-full gap-4 md:grid-cols-[3fr_5fr]">
              <div className="flex flex-col gap-4 md:min-w-[240px]">
                <h3 className="font-semibold text-gray-800 text-lg md:text-xl">Foto de entrada</h3>
                <div className="relative w-full overflow-hidden rounded-xl border bg-gray-50">
                  {inputUrl && <img src={inputUrl} alt="Input" className="max-h-[300px] w-auto object-contain mx-auto" />}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <Label className="text-sm">Tipo de cômodo</Label>
                    <div className="mt-1 rounded-xl border px-3 py-2 text-sm">{watch("roomType")}</div>
                  </div>
                  <div>
                    <Label className="text-sm">Estilo do mobiliário</Label>
                    <div className="mt-1 rounded-xl border px-3 py-2 text-sm">{watch("furnitureStyle")}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => onSubmit(watch() as any)}>Criar mais</Button>
                    <Button variant="secondary" className="flex-1" onClick={() => { setResults([]); setSelectedIndex(0); setPhase("form"); }}>Tentar outra foto</Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-800 text-lg md:text-xl">Seus resultados (1)</h3>
                <div className="rounded-xl bg-gray-100 p-4">
                  {results[0] && (
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl">
                      <img src={results[0].url} alt="Resultado" className="h-full w-full object-cover" />
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative dark bg-gradient-to-b from-[#1b1b21] via-[#23232c] to-[#121217] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Gere <span className="text-[#FFCD06]">ambientes</span> com IA
          </h2>
          <p className="mt-3 text-gray-300 text-base md:text-lg">
            Envie uma foto e defina preferências. Nós entregamos resultados realistas em minutos.
          </p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-8 sm:mb-4 lg:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="relative z-50 w-full flex-col flex">
            <div className="flex w-full flex-col gap-4 md:grid md:grid-cols-[3fr_5fr]">
              <div className="flex flex-col gap-4 md:min-w-[450px]">
                <Card className="flex flex-col gap-2 rounded-xl border border-x-slate-900 p-4 cursor-pointer bg-primary/10">
                  <div className="flex items-center gap-2">
                    <CirclePlus className="text-slate-800" size={18} />
                    <span className="text-base whitespace-nowrap text-gray-900">Adicionar móveis</span>
                    <input type="checkbox" className="ml-auto h-5 w-5 rounded border-gray-300 bg-white text-slate-800 focus:ring-2" defaultChecked {...register("addFurniture")} />
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                    <div>
                      <Label className="text-gray-900">Tipo de cômodo</Label>
                      <Select defaultValue={watch("roomType")} onValueChange={(v) => setValue("roomType", v)}>
                        <SelectTrigger className="mt-1 rounded-xl border-primary/20 px-3 py-2 text-gray-900 backdrop-blur-md">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bedroom">Quarto</SelectItem>
                          <SelectItem value="livingroom">Sala</SelectItem>
                          <SelectItem value="kitchen">Cozinha</SelectItem>
                          <SelectItem value="bathroom">Banheiro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-900">Estilo do mobiliário</Label>
                      <Select defaultValue={watch("furnitureStyle")} onValueChange={(v) => setValue("furnitureStyle", v)}>
                        <SelectTrigger className="mt-1 rounded-xl border-primary/20 px-3 py-2 text-gray-900 backdrop-blur-md">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Padrão</SelectItem>
                          <SelectItem value="modern">Moderno</SelectItem>
                          <SelectItem value="classic">Clássico</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                </Card>
                <Button
                  type="submit"
                  disabled={!canProcess}
                  className="w-full rounded-xl border-2 px-10 py-3.5 text-base text-white bg-ametista-600 hover:bg-ametista-700 border-ametista-600 disabled:opacity-50 disabled:bg-ametista-300 disabled:border-ametista-300"
                >
                  Processar foto
                </Button>
              </div>

              <div className="relative flex min-h-[150px] justify-center">
                <div className="flex h-full w-full justify-center">
                  <div className="flex w-full flex-col">
                    <div className="flex h-auto flex-col items-center">
                      <div {...getRootProps()} role="presentation" tabIndex={0} className="relative flex h-full w-full shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-black/15 p-4 transition-all duration-75 hover:bg-black/5 min-h-52 md:min-h-[300px]">
                        <input {...getInputProps()} />
                        {inputUrl ? (
                          <>
                            <img src={inputUrl} alt="Prévia" className="max-h-[300px] w-auto object-contain rounded-xl" />
                            <Button
                              type="button"
                              aria-label="Remover imagem"
                              onClick={(e) => { e.stopPropagation(); setInputUrl(null); }}
                              className="absolute right-3 top-3 z-10 rounded-full bg-red-600 text-white hover:bg-red-700 px-2 py-2"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </>
                        ) : (
                          <div className="flex items-center gap-2 flex-col text-center">
                            <Upload className="shrink-0 text-xl text-slate-800" />
                            <span className="text-gray-700"><span className="md:font-medium md:text-slate-800">Envie uma imagem</span><span className="hidden md:inline"> ou arraste e solte</span></span>
                          </div>
                        )}
                        {processing && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm grid place-items-center rounded-xl">
                            <div className="rounded-xl bg-black/60 text-white px-6 py-4 text-center">
                              <div className="text-2xl font-bold">{progress}%</div>
                              <div className="text-sm">Processando sua imagem</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}