import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FedEx express gift 🎁 - Grand Jeu Concours Cadeaux",
  description: "Tentez votre chance et gagnez jusqu'à 500.000 $ instantanément avec FedEx express gift 🎁 ! 20 boîtes cadeaux disponibles.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-yellow-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
