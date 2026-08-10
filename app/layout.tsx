import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EnE | Economia nas Escolas",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  description: "Pela democratização do acesso ao conhecimento e à universidade pública.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
