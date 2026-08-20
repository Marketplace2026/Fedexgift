import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FEDEZ SHIFT - Grand Jeu Concours Cadeaux",
  description: "Tentez votre chance et gagnez jusqu'à 1.500.000 FCFA instantanément avec FEDEZ SHIFT ! 15 boîtes cadeaux disponibles.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased selection:bg-yellow-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
