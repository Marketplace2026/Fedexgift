"use client";

import React, { useState, useEffect } from "react";
import { Zap, Star, ChevronLeft, ChevronRight, CheckCircle2, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  nom: string;
  ville: string;
  montant: string;
  texte: string;
  avatar: string;
  temps: string;
}

const TESTIMONIALS: Testimonial[] = [
  // --- ITALIENS (Italian - 5) ---
  {
    id: 1,
    nom: "Marco Rossi",
    ville: "Milano, Italia 🇮🇹",
    montant: "250.000 $",
    texte: "Ho vinto 250.000 $ al secondo tentativo! Il bonifico è arrivato in soli 15 minuti. Incredibile!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 8 min"
  },
  {
    id: 2,
    nom: "Giulia Bianchi",
    ville: "Roma, Italia 🇮🇹",
    montant: "100.000 $",
    texte: "100.000 $ ricevuti in 2 ore! La ricevuta PDF ufficiale è chiarissima e sicura. Grazie FedexGift!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 15 min"
  },
  {
    id: 3,
    nom: "Alessandro Moretti",
    ville: "Firenze, Italia 🇮🇹",
    montant: "500.000 $",
    texte: "500.000 $ !!! È la prima volta che vinco una cifra così enorme su internet. GRAZIE FedexGift!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 22 min"
  },
  {
    id: 4,
    nom: "Francesca Russo",
    ville: "Napoli, Italia 🇮🇹",
    montant: "150.000 $",
    texte: "Ho tentato la fortuna stamattina e ho incassato 150.000 $ direttamente sul mio conto. Felicissima!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 35 min"
  },
  {
    id: 5,
    nom: "Matteo Ferrari",
    ville: "Torino, Italia 🇮🇹",
    montant: "350.000 $",
    texte: "350.000 $ vinti facilissimo alla seconda scatola. Il supporto clienti su WhatsApp è velocissimo.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 45 min"
  },

  // --- AMÉRICAINS (American / English - 5) ---
  {
    id: 6,
    nom: "James Wilson",
    ville: "New York, USA 🇺🇸",
    montant: "500.000 $",
    texte: "I won $500,000 on my 2nd gift box! Instant transfer verified right on my PDF receipt. Mind blowing!",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 52 min"
  },
  {
    id: 7,
    nom: "Emily Davis",
    ville: "Los Angeles, USA 🇺🇸",
    montant: "250.000 $",
    texte: "Opened the 1st box (empty), then the 2nd one and BOOM $250,000! Don't wait guys, FedexGift is legit.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 1h"
  },
  {
    id: 8,
    nom: "Michael Miller",
    ville: "Miami, USA 🇺🇸",
    montant: "150.000 $",
    texte: "$150,000 cash received in less than an hour! Really fun box system and great customer support.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 1h 15m"
  },
  {
    id: 9,
    nom: "Sarah Johnson",
    ville: "Chicago, USA 🇺🇸",
    montant: "350.000 $",
    texte: "$350,000 out of nowhere! Downloaded my official PDF receipt instantly. Absolutely amazing experience!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 1h 30m"
  },
  {
    id: 10,
    nom: "David Martinez",
    ville: "Houston, USA 🇺🇸",
    montant: "50.000 $",
    texte: "$50,000 payout in 45 minutes flat. Reliable, fast, and super easy to claim!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 1h 45m"
  },

  // --- ESPAGNOLS (Spanish - 5) ---
  {
    id: 11,
    nom: "Carlos Fernández",
    ville: "Madrid, España 🇪🇸",
    montant: "350.000 $",
    texte: "¡Gané 350.000 $ en la segunda caja! El recibo PDF y la atención por WhatsApp fueron impecables.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 2h"
  },
  {
    id: 12,
    nom: "Lucía Gómez",
    ville: "Barcelona, España 🇪🇸",
    montant: "100.000 $",
    texte: "100.000 $ recibidos en menos de 2 horas. ¡No me lo creía al principio pero FedexGift es 100% real!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 2h 10m"
  },
  {
    id: 13,
    nom: "Javier López",
    ville: "Valencia, España 🇪🇸",
    montant: "500.000 $",
    texte: "¡¡500.000 $!! Es el premio más grande que he ganado jamás. ¡Muchísimas gracias FedexGift!",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 2h 25m"
  },
  {
    id: 14,
    nom: "Elena Torres",
    ville: "Sevilla, España 🇪🇸",
    montant: "250.000 $",
    texte: "Probé suerte hoy y me llevé 250.000 $ directo a mi cuenta. ¡Super recomendada esta oportunidad!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 2h 40m"
  },
  {
    id: 15,
    nom: "Mateo Ruiz",
    ville: "Málaga, España 🇪🇸",
    montant: "150.000 $",
    texte: "150.000 $ ganados facilísimo al segundo intento. El proceso de reclamación por PDF es instantáneo.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 3h"
  },

  // --- FINLANDAIS (Finnish - 5) ---
  {
    id: 16,
    nom: "Juho Koskinen",
    ville: "Helsinki, Suomi 🇫🇮",
    montant: "250.000 $",
    texte: "Voitin 250 000 $ toisella laatikolla! Siirto saapui tililleni 15 minuutissa. Aivan mahtavaa!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 3h 15m"
  },
  {
    id: 17,
    nom: "Aino Laitinen",
    ville: "Tampere, Suomi 🇫🇮",
    montant: "150.000 $",
    texte: "150 000 $ vastaanotettu kahdessa tunnissa. Virallinen PDF-kuitti on erittäin selkeä ja turvallinen.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 3h 30m"
  },
  {
    id: 18,
    nom: "Eero Heikkinen",
    ville: "Turku, Suomi 🇫🇮",
    montant: "500.000 $",
    texte: "500 000 $ !!! Ensimmäinen kerta kun voitan näin suuren summan verkossa. KIITOS FedexGift!",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 3h 45m"
  },
  {
    id: 19,
    nom: "Sofia Korhonen",
    ville: "Oulu, Suomi 🇫🇮",
    montant: "350.000 $",
    texte: "Kokeilin onneani tänä aamuna ja sain 350 000 $ suoraan tililleni. Todella onnellinen!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 4h"
  },
  {
    id: 20,
    nom: "Matti Virtanen",
    ville: "Espoo, Suomi 🇫🇮",
    montant: "50.000 $",
    texte: "50 000 $ voitto toisella yrityksellä. WhatsApp-asiakaspalvelu toimii nopeasti ja sujuvasti.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 4h 15m"
  },

  // --- PORTUGAIS (Portuguese - 5) ---
  {
    id: 21,
    nom: "Rodrigo Silva",
    ville: "Lisboa, Portugal 🇵🇹",
    montant: "350.000 $",
    texte: "Ganhei 350.000 $ na segunda caixa! O recibo PDF oficial e a resposta no WhatsApp foram perfeitos.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 4h 30m"
  },
  {
    id: 22,
    nom: "Beatriz Santos",
    ville: "Porto, Portugal 🇵🇹",
    montant: "250.000 $",
    texte: "250.000 $ recebidos em menos de 2 horas. Não acreditava no início, mas o FedexGift é 100% real!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 4h 45m"
  },
  {
    id: 23,
    nom: "Gabriel Oliveira",
    ville: "São Paulo, Brasil 🇧🇷",
    montant: "500.000 $",
    texte: "500.000 $ !!! Foi a primeira vez que ganhei um prêmio tão grande na internet. OBRIGADO FedexGift!",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 5h"
  },
  {
    id: 24,
    nom: "Mariana Costa",
    ville: "Rio de Janeiro, Brasil 🇧🇷",
    montant: "150.000 $",
    texte: "Tentei a minha sorte hoje e recebi 150.000 $ diretamente na minha conta. Muito feliz!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 5h 15m"
  },
  {
    id: 25,
    nom: "Tiago Ferreira",
    ville: "Coimbra, Portugal 🇵🇹",
    montant: "100.000 $",
    texte: "100.000 $ ganhos super fácil na segunda caixa. Processo de transferência rápido e muito confiável.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 5h 30m"
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const scrollToQuestion = () => {
    const el = document.getElementById("question-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-6 pb-12 px-4 max-w-5xl mx-auto text-center overflow-hidden">
      {/* Glow ambient background lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 left-1/4 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main H1 Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/40 text-yellow-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          <Trophy className="w-4 h-4 text-yellow-400" />
          Tirage Au Sort 100% Gagnant à la 2ème Boîte
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white leading-tight tracking-wide max-w-4xl mx-auto">
          GRAND JEU CONCOURS <span className="text-gold-gradient drop-shadow-[0_2px_15px_rgba(255,215,0,0.5)]">FedexGift</span>
        </h1>
        <p className="text-base sm:text-xl font-bold text-red-400 max-w-2xl mx-auto">
          GAGNEZ JUSQU'À <span className="bg-yellow-400/20 text-yellow-300 border border-yellow-400/50 px-2 py-0.5 rounded font-extrabold text-xl sm:text-2xl inline-block mt-1">500.000 $</span> EN DÉBALLANT VOTRE BOÎTE !
        </p>
      </motion.div>

      {/* Testimonials Carousel Section */}
      <div className="mt-8 mb-10 max-w-xl mx-auto relative">
        <div className="text-xs font-semibold text-yellow-200/80 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          Derniers gagnants vérifiés ({currentIndex + 1}/25)
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        </div>

        {/* Testimonial Card */}
        <div className="relative min-h-[190px] glass-card rounded-2xl p-5 md:p-6 shadow-2xl gold-border-glow flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  <img
                    src={TESTIMONIALS[currentIndex].avatar}
                    alt={TESTIMONIALS[currentIndex].nom}
                    className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                      {TESTIMONIALS[currentIndex].nom}
                      <CheckCircle2 className="w-4 h-4 text-green-400 fill-green-400/20" />
                    </h3>
                    <p className="text-xs text-gray-400">{TESTIMONIALS[currentIndex].ville}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black text-xs md:text-sm px-3 py-1 rounded-full shadow-lg block">
                    {TESTIMONIALS[currentIndex].montant}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-1">{TESTIMONIALS[currentIndex].temps}</span>
                </div>
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm md:text-base text-gray-200 italic text-left">
                "{TESTIMONIALS[currentIndex].texte}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-800">
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-6 bg-yellow-400" : "w-2 bg-gray-700 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full bg-gray-800 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 border border-gray-700 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-full bg-gray-800 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 border border-gray-700 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pulsing CTA Green Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToQuestion}
        className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-black text-lg md:text-xl rounded-2xl shadow-2xl shadow-green-600/50 green-pulse-btn flex items-center justify-center gap-3 border-2 border-yellow-300 mx-auto transition-all cursor-pointer"
      >
        <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-bounce" />
        <span>TENTER MA CHANCE MAINTENANT</span>
      </motion.button>
    </section>
  );
}
