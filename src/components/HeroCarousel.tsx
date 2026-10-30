"use client";

import React, { useState, useEffect } from "react";
import { Zap, Star, ChevronLeft, ChevronRight, CheckCircle2, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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
    texte: "100.000 $ ricevuti in 2 ore! La ricevuta PDF ufficiale è chiarissima e sicura. Grazie FedEx express gift 🎁!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 15 min"
  },
  {
    id: 3,
    nom: "Alessandro Moretti",
    ville: "Firenze, Italia 🇮🇹",
    montant: "500.000 $",
    texte: "500.000 $ !!! È la prima volta che vinco una cifra così enorme su internet. GRAZIE FedEx express gift 🎁!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 22 min"
  },
  {
    id: 4,
    nom: "Francesca Russo",
    ville: "Napoli, Italia 🇮🇹",
    montant: "150.000 $",
    texte: "Jeep Renegade e 150.000 $ vinti! Servizio clienti WhatsApp velocissimo e consegna in 48 ore.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 31 min"
  },
  {
    id: 5,
    nom: "Matteo Ferrari",
    ville: "Torino, Italia 🇮🇹",
    montant: "350.000 $",
    texte: "Ero scettico all'inizio, ma quando ho visto il bonifico sul mio conto mi sono messo a piangere dalla gioia!",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 45 min"
  },
  // --- FRANÇAIS (French - 5) ---
  {
    id: 6,
    nom: "Thomas Dubois",
    ville: "Paris, France 🇫🇷",
    montant: "500.000 $",
    texte: "500.000 $ virés instantanément ! La 2ème boîte m'a sauvé la vie. Vive FedEx express gift 🎁 !",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 12 min"
  },
  {
    id: 7,
    nom: "Élodie Martin",
    ville: "Lyon, France 🇫🇷",
    montant: "250.000 $",
    texte: "Incroyable ! J'ai reçu le reçu certifié en PDF et le virement a suivi sur mon compte en 30 minutes.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 19 min"
  },
  {
    id: 8,
    nom: "Alexandre Bernard",
    ville: "Marseille, France 🇫🇷",
    montant: "150.000 $",
    texte: "Mon iPhone 16 Pro Max et mes 150.000 $ sont bien arrivés. Merci au support WhatsApp très réactif.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 28 min"
  },
  {
    id: 9,
    nom: "Camille Leroy",
    ville: "Bordeaux, France 🇫🇷",
    montant: "350.000 $",
    texte: "Gros lot remporté ! La livraison du SUV à mon adresse a été validée immédiatement. Merci infiniment.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 38 min"
  },
  {
    id: 10,
    nom: "Maxime Petit",
    ville: "Toulouse, France 🇫🇷",
    montant: "100.000 $",
    texte: "100.000 $ de cash direct. Procédure super simple et sécurisée. Je recommande à 100% !",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 52 min"
  },
  // --- AFRICAINS (African - 10) ---
  {
    id: 11,
    nom: "Mamadou Diallo",
    ville: "Conakry, Guinée 🇬🇳",
    montant: "250.000 $",
    texte: "J'ai reçu mon virement Mobile Money Orange/MTN sans problème ! Que Dieu bénisse cette plateforme.",
    avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 5 min"
  },
  {
    id: 12,
    nom: "Fatoumata Camara",
    ville: "Kindia, Guinée 🇬🇳",
    montant: "500.000 $",
    texte: "Le jackpot de 500.000 $ m'a permis de construire ma maison et d'acheter mon matériel. Merci FedEx express gift 🎁 !",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 14 min"
  },
  {
    id: 13,
    nom: "Ibrahim Traoré",
    ville: "Bamako, Mali 🇲🇱",
    montant: "150.000 $",
    texte: "C'est réel ! J'ai payé les frais de livraison et mon tracteur est en route avec mes 150.000 $. Gloire à Dieu.",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 20 min"
  },
  {
    id: 14,
    nom: "Aïssatou Sow",
    ville: "Dakar, Sénégal 🇸🇳",
    montant: "350.000 $",
    texte: "Au Sénégal ici on a reçu l'argent par Wave et virement bancaire. FedEx express gift 🎁 est 100% fiable !",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 25 min"
  },
  {
    id: 15,
    nom: "Koffi Mensah",
    ville: "Abidjan, Côte d'Ivoire 🇨🇮",
    montant: "250.000 $",
    texte: "Gros gain reçu à Abidjan ! L'agent WhatsApp a confirmé mon reçu PDF en 10 minutes chrono.",
    avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 33 min"
  },
  {
    id: 16,
    nom: "Ousmane Barry",
    ville: "Labé, Guinée 🇬🇳",
    montant: "100.000 $",
    texte: "100.000 $ crédités sur mon compte. Je n'y croyais pas avant de voir les notifications de la banque !",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 40 min"
  },
  {
    id: 17,
    nom: "Aminata Koné",
    ville: "Bouaké, Côte d'Ivoire 🇨🇮",
    montant: "500.000 $",
    texte: "500.000 $ et l'iPhone 16 Pro Max reçus ! La vie de toute ma famille a changé aujourd'hui.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 47 min"
  },
  {
    id: 18,
    nom: "Sekou Touré",
    ville: "Kankan, Guinée 🇬🇳",
    montant: "150.000 $",
    texte: "Reçu PDF téléchargé et validé sur WhatsApp. Livraison programmée avec numéro de suivi international.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 55 min"
  },
  {
    id: 19,
    nom: "Fatou Ndiaye",
    ville: "Thiès, Sénégal 🇸🇳",
    montant: "250.000 $",
    texte: "Merci infiniment aux organisateurs du jeu. Tirage 100% transparent et vérifié.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 1h"
  },
  {
    id: 20,
    nom: "Jean-Baptiste Ouédraogo",
    ville: "Ouagadougou, Burkina Faso 🇧🇫",
    montant: "350.000 $",
    texte: "350.000 $ reçus en toute sécurité. Un vrai miracle en ces temps difficiles !",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 1h10"
  },
  // --- AUTRES EUROPÉENS (Other Europeans - 5) ---
  {
    id: 21,
    nom: "Hans Müller",
    ville: "Berlin, Deutschland 🇩🇪",
    montant: "500.000 $",
    texte: "500.000 $ gewonnen beim zweiten Versuch! Sehr professioneller Service und schnelle Überweisung.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 35 min"
  },
  {
    id: 22,
    nom: "Carlos Silva",
    ville: "Lisboa, Portugal 🇵🇹",
    montant: "250.000 $",
    texte: "Ganhei 250.000 $ e os prémios de luxo! Excelente apoio ao cliente pelo WhatsApp.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 44 min"
  },
  {
    id: 23,
    nom: "Elena Garcia",
    ville: "Madrid, España 🇪🇸",
    montant: "350.000 $",
    texte: "¡Increíble! 350.000 $ transferidos a mi cuenta bancaria española en menos de una hora.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 50 min"
  },
  {
    id: 24,
    nom: "Lukas Weber",
    ville: "Zürich, Schweiz 🇨🇭",
    montant: "150.000 $",
    texte: "Offizielle PDF-Quittung erhalten, Überweisung schnell bestätigt. Absolut vertrauenswürdig!",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 1h05"
  },
  {
    id: 25,
    nom: "Marc Peeters",
    ville: "Bruxelles, Belgique 🇧🇪",
    montant: "250.000 $",
    texte: "J'étais dubitatif au départ, mais les 250.000 $ sont bel et bien sur mon compte ING. Fantastique !",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 1h15"
  }
];

export default function HeroCarousel({ onStartGame }: { onStartGame?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  // Auto rotate testimonials carousel every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const scrollToGame = () => {
    if (onStartGame) {
      onStartGame();
    }
    setTimeout(() => {
      const el = document.getElementById("game-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const scrollToQuestion = () => {
    const el = document.getElementById("question-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollToGame();
    }
  };

  return (
    <section className="relative pt-6 pb-12 px-3 sm:px-4 max-w-5xl mx-auto text-center overflow-x-hidden w-full">
      {/* Glow ambient background lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main H1 Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-3 sm:space-y-4"
      >
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-yellow-500/10 border border-yellow-500/40 text-yellow-300 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-wider shadow-lg max-w-full">
          <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 shrink-0" />
          <span className="truncate">{t("heroBadge")}</span>
        </div>

        <h1 className="text-xl sm:text-3xl md:text-5xl font-display font-black text-white leading-tight tracking-tight sm:tracking-wide max-w-4xl mx-auto break-words">
          {t("heroTitle")} <span className="text-gold-gradient drop-shadow-[0_2px_15px_rgba(255,215,0,0.5)] block sm:inline">FedEx express gift 🎁</span>
        </h1>
        <p className="text-xs sm:text-lg md:text-xl font-bold text-red-400 max-w-2xl mx-auto leading-relaxed">
          {t("heroSubtitle")}
        </p>
      </motion.div>

      {/* Testimonials Carousel Section */}
      <div className="mt-6 sm:mt-8 mb-8 sm:mb-10 max-w-xl mx-auto relative w-full">
        <div className="text-[11px] sm:text-xs font-semibold text-yellow-200/80 uppercase tracking-wider sm:tracking-widest mb-2.5 sm:mb-3 flex items-center justify-center gap-1.5 sm:gap-2">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
          <span>{t("verifiedWinners")} ({currentIndex + 1}/25)</span>
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
        </div>

        {/* Testimonial Card */}
        <div className="relative min-h-[175px] sm:min-h-[190px] glass-card rounded-2xl p-4 sm:p-6 shadow-2xl gold-border-glow flex flex-col justify-between w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="space-y-2.5 sm:space-y-3"
            >
              <div className="flex items-center justify-between gap-2 text-left">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={TESTIMONIALS[currentIndex].avatar}
                    alt={TESTIMONIALS[currentIndex].nom}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-yellow-400 object-cover shadow-md shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-1 truncate">
                      <span className="truncate">{TESTIMONIALS[currentIndex].nom}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 fill-green-400/20 shrink-0" />
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-400 truncate">{TESTIMONIALS[currentIndex].ville}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-black text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full shadow-lg block whitespace-nowrap">
                    {TESTIMONIALS[currentIndex].montant}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-gray-400 block mt-1">{TESTIMONIALS[currentIndex].temps}</span>
                </div>
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-gray-200 italic text-left leading-relaxed">
                "{TESTIMONIALS[currentIndex].texte}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-gray-800">
            <div className="flex gap-1">
              {TESTIMONIALS.slice(0, 10).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex % 10 ? "w-4 sm:w-6 bg-yellow-400" : "w-1.5 sm:w-2 bg-gray-700 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <button
                onClick={handlePrev}
                className="p-1 sm:p-1.5 rounded-full bg-gray-800 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 border border-gray-700 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 sm:p-1.5 rounded-full bg-gray-800 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 border border-gray-700 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pulsing CTA Green Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={scrollToQuestion}
        className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-green-600 hover:bg-green-500 text-white font-black text-base sm:text-xl rounded-2xl shadow-2xl shadow-green-600/50 green-pulse-btn flex items-center justify-center gap-2.5 sm:gap-3 border-2 border-yellow-300 mx-auto transition-all cursor-pointer"
      >
        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300 animate-bounce" />
        <span className="truncate">{t("heroCTA")}</span>
      </motion.button>
    </section>
  );
}
