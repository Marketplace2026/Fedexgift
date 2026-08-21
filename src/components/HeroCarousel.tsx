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
  {
    id: 1,
    nom: "Kouassi Marc",
    ville: "Abidjan, Côte d'Ivoire",
    montant: "250.000 $",
    texte: "J'ai gagné 250.000 $ à ma deuxième boîte ! Le virement est arrivé en 15 minutes chrono. Incroyable !",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 12 min"
  },
  {
    id: 2,
    nom: "Fatou Sow",
    ville: "Dakar, Sénégal",
    montant: "100.000 $",
    texte: "100.000 $ reçu en 2H ! Je n'y croyais pas au début mais le reçu PDF officiel est très clair et sécurisé.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 28 min"
  },
  {
    id: 3,
    nom: "Samuel Mbarga",
    ville: "Douala, Cameroun",
    montant: "500.000 $",
    texte: "500.000 $ !!! C'est la première fois que je gagne une somme aussi énorme sur internet. MERCI FedexGift !",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 45 min"
  },
  {
    id: 4,
    nom: "Aminata Traoré",
    ville: "Ouagadougou, Burkina Faso",
    montant: "150.000 $",
    texte: "J'ai tenté ma chance ce matin et j'ai empoché 150.000 $ directement par transfert ! Trop heureuse !",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 1h"
  },
  {
    id: 5,
    nom: "Koffi Jean-Luc",
    ville: "Lomé, Togo",
    montant: "350.000 $",
    texte: "350.000 $ gagnés très facilement à la 2ème boîte. Le service client sur WhatsApp est super réactif.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 1h 20m"
  },
  {
    id: 6,
    nom: "Aïcha Dossou",
    ville: "Cotonou, Bénin",
    montant: "500.000 $",
    texte: "500.000 $ reçu direct sur mon compte ! Tout s'est passé exactement comme promis sur la plateforme.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 2h"
  },
  {
    id: 7,
    nom: "Ibrahim Diop",
    ville: "Dakar, Sénégal",
    montant: "250.000 $",
    texte: "J'ai ouvert la première boîte (vide), puis la 2ème et BOUM 250.000 $ ! N'attendez pas les amis.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 2h 40m"
  },
  {
    id: 8,
    nom: "Grâce Lawson",
    ville: "Abidjan, Côte d'Ivoire",
    montant: "150.000 $",
    texte: "150.000 $ reçus en cash ! Franchement le système de boîte est génial et super stimulant.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 3h"
  },
  {
    id: 9,
    nom: "Cheick Ouedraogo",
    ville: "Ouagadougou, Burkina Faso",
    montant: "50.000 $",
    texte: "50.000 $ en 1 heure chrono. Rien à redire, c'est fiable, rapide et sécurisé.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 3h 15m"
  },
  {
    id: 10,
    nom: "Brice Ndong",
    ville: "Douala, Cameroun",
    montant: "350.000 $",
    texte: "350.000 $ tombé du ciel. FedexGift est 100% réel. Je viens de valider mon reçu PDF.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    temps: "Il y a 4h"
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
          Derniers gagnants vérifiés ({currentIndex + 1}/10)
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
