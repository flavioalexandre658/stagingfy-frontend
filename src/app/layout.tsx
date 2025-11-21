import "./(application)/globals.css";

import type { Metadata } from "next";

import SessionWrapper from "@/components/session-wrapper";

export const metadata: Metadata = {
  title: "Stagingfy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}