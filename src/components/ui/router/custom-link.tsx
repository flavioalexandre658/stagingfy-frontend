// components/CustomLink.tsx
"use client";

import NextLink from "next/link";

import { nprogress } from "@/lib/nprogress";

export function CustomLink({ 
  href, 
  children, 
  ...props 
}: { 
  href: string, 
  children: React.ReactNode, 
  [key: string]: any 
}) {
  const handleClick = () => {
    nprogress.start();
  };

  return (
    <NextLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  );
}