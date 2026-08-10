import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnE | Economia nas Escolas",
  description: "Pela democratização do acesso ao conhecimento e à universidade pública.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
