// components/CustomAnchor.tsx
"use client";

import { nprogress } from "@/lib/nprogress";
import { cn } from "@/lib/utils";

export function CustomAnchor({ 
  href, 
  children, 
  className, 
  ...props 
}: { 
  href: string, 
  children: React.ReactNode, 
  className?: string, 
  [key: string]: any 
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    nprogress.start();
  };

  return (
    <a 
      href={href} 
      onClick={handleClick} 
      className={cn("text-primary underline-offset-4 hover:underline", className)} 
      {...props}
    >
      {children}
    </a>
  );
}