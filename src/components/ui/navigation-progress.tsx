"use client";

import { useEffect, useState } from "react";

import { nprogress } from "@/lib/nprogress";
import { cn } from "@/lib/utils";

interface NavigationProgressProps {
  size?: number;
  color?: string;
  className?: string;
}

export function NavigationProgress({ 
  size = 5, 
  color = "primary",
  className 
}: NavigationProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribeStart = nprogress.onStart(() => {
      setIsVisible(true);
      setProgress(0);
    });

    const unsubscribeProgress = nprogress.onProgress((newProgress) => {
      setProgress(newProgress);
    });

    const unsubscribeComplete = nprogress.onComplete(() => {
      setProgress(100);
      // Esconde depois de uma pequena animação
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 200);
    });

    return () => {
      unsubscribeStart();
      unsubscribeProgress();
      unsubscribeComplete();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-transparent",
        className
      )}
      style={{ height: `${size}px` }}
    >
      <div
        className={cn(
          "h-full transition-all duration-300 ease-out",
          color === "primary" && "bg-primary",
          color === "secondary" && "bg-secondary",
          color === "destructive" && "bg-destructive",
          // Efeito de glow
          "shadow-sm"
        )}
        style={{
          width: `${progress}%`,
          background: color === "primary" 
            ? "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)"
            : undefined,
          boxShadow: color === "primary" 
            ? "0 0 10px hsl(var(--primary) / 0.3)"
            : undefined,
        }}
      />
    </div>
  );
} 