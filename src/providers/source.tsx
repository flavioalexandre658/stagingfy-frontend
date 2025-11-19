"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { KnowledgeSource } from "@/interfaces/knowledge-source.interface";

const MAX_TOTAL_BYTES = 400 * 1024; // 400KB em bytes

function calculateSourceSize(source: KnowledgeSource): number {
  let size = 0;
  if (source.config?.processedSize) {
    size = source.config.processedSize;
  }
  return size;
}

interface SourceContextType {
  source: KnowledgeSource | null;
  successfulSources: KnowledgeSource[];
  isTraining: boolean;
  totalSize: number;
  remainingSize: number;
  isSizeLimitExceeded: boolean;
  canAddSource: (sourceSize: number) => boolean;
  updateSource: (source: KnowledgeSource | null) => void;
  addSuccessfulSource: (source: KnowledgeSource) => void;
  removeSuccessfulSource: (sourceId: string) => void;
  populateSources: (sources: KnowledgeSource[]) => void;
  clearAllSources: () => void;
  setIsTraining: (isTraining: boolean) => void;
}

const SourceContext = createContext<SourceContextType | undefined>(undefined);

export function SourceProvider({ children }: { children: React.ReactNode }) {
  const [source, setSource] = useState<KnowledgeSource | null>(null);
  const [successfulSources, setSuccessfulSources] = useState<KnowledgeSource[]>([]);
  const [isTraining, setIsTraining] = useState(false);

  // Calcula o tamanho total das sources
  const totalSize = useMemo(() => {
    return successfulSources.reduce((total, source) => total + calculateSourceSize(source), 0);
  }, [successfulSources]);

  const remainingSize = useMemo(() => {
    return Math.max(0, MAX_TOTAL_BYTES - totalSize);
  }, [totalSize]);

  const isSizeLimitExceeded = useMemo(() => {
    return totalSize >= MAX_TOTAL_BYTES;
  }, [totalSize]);

  const canAddSource = useCallback((sourceSize: number) => {
    return (totalSize + sourceSize) <= MAX_TOTAL_BYTES;
  }, [totalSize]);

  const updateSource = useCallback((newSource: KnowledgeSource | null) => {
    setSource(newSource);
  }, []);

  const addSuccessfulSource = useCallback((newSource: KnowledgeSource) => {
    const newSourceSize = calculateSourceSize(newSource);
    if (!canAddSource(newSourceSize)) {
      throw new Error("Limite de tamanho excedido.");
    }
    console.log('newSource', newSource)
    setSuccessfulSources(prev => [...prev, newSource]);
    setSource(null); // Limpa o source atual após sucesso
  }, [canAddSource]);

  const removeSuccessfulSource = useCallback((sourceId: string) => {
    setSuccessfulSources(prev => prev.filter(s => s.id !== sourceId));
  }, []);

  const populateSources = useCallback((sources: KnowledgeSource[]) => {
    const totalNewSize = sources.reduce((total, source) => total + calculateSourceSize(source), 0);
    if (totalNewSize > MAX_TOTAL_BYTES) {
      throw new Error("Limite de tamanho excedido.");
    }
    setSuccessfulSources(sources);
  }, []);

  const clearAllSources = useCallback(() => {
    setSuccessfulSources([]);
    setSource(null);
  }, []);

  return (
    <SourceContext.Provider value={{
      source,
      successfulSources,
      isTraining,
      totalSize,
      remainingSize,
      isSizeLimitExceeded,
      canAddSource,
      updateSource,
      addSuccessfulSource,
      removeSuccessfulSource,
      populateSources,
      clearAllSources,
      setIsTraining,
    }}>
      {children}
    </SourceContext.Provider>
  );
}

export function useSourceContext() {
  const context = useContext(SourceContext);
  if (context === undefined) {
    throw new Error('useSourceContext must be used within a SourceProvider');
  }
  return context;
}

