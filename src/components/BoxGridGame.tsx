"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, AlertCircle, CheckCircle, Lock } from "lucide-react";
import confetti from "canvas-confetti";
import WinningModal from "./WinningModal";

const PRIZES = [50000, 100000, 150000, 250000, 350000, 500000];

export interface LuxuryItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  valueEst: string;
  image: string;
}

export const LUXURY_ITEMS: LuxuryItem[] = [
  { id: "tesla", name: "Tesla Model S Plaid 2026", category: "Véhicule de Luxe", icon: "🏎️", valueEst: "$110,000", image: "/images/items/tesla.jpg" },
  { id: "iphone", name: "iPhone 16 Pro Max 1TB", category: "High-Tech", icon: "📱", valueEst: "$1,599", image: "/images/items/iphone.jpg" },
  { id: "rolex", name: "Rolex Submariner Gold", category: "Horlogerie", icon: "⌚", valueEst: "$38,500", image: "/images/items/rolex.jpg" },
  { id: "mercedes", name: "Mercedes-AMG CLA Coupe", category: "Véhicule de Luxe", icon: "🚗", valueEst: "$65,000", image: "/images/items/mercedes.jpg" },
  { id: "macbook", name: "MacBook Pro 16\" M3 Max", category: "High-Tech", icon: "💻", valueEst: "$3,999", image: "/images/items/macbook.jpg" },
  { id: "harley", name: "Harley-Davidson Sportster", category: "Moto de Luxe", icon: "🏍️", valueEst: "$18,500", image: "/images/items/harley.jpg" },
  { id: "ps5", name: "PlayStation 5 Pro + VR2 Pack", category: "Gaming", icon: "🎮", valueEst: "$1,200", image: "/images/items/ps5.jpg" },
  { id: "porsche", name: "Porsche Macan GTS 2026", category: "Véhicule de Luxe", icon: "🚘", valueEst: "$95,000", image: "/images/items/porsche.jpg" }
];

interface BoxGridGameProps {
  onWin: (amount: number, item: LuxuryItem) => void;
}

export default function BoxGridGame({ onWin }: BoxGridGameProps) {
  const [winningPrize, setWinningPrize] = useState<number>(250000);
  const [winningItem, setWinningItem] = useState<LuxuryItem>(LUXURY_ITEMS[0]);
  const [attempt, setAttempt] = useState<number>(0);
  const [openedBoxIds, setOpenedBoxIds] = useState<number[]>([]);
  const [firstLosingBoxId, setFirstLosingBoxId] = useState<number | null>(null);
  const [secondWinningBoxId, setSecondWinningBoxId] = useState<number | null>(null);
  const [showLossMessage, setShowLossMessage] = useState<boolean>(false);
  const [showWinningModal, setShowWinningModal] = useState<boolean>(false);

  // Initialize random prize and luxury item on mount
  useEffect(() => {
    const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
    const randomItem = LUXURY_ITEMS[Math.floor(Math.random() * LUXURY_ITEMS.length)];
    setWinningPrize(randomPrize);
    setWinningItem(randomItem);
  }, []);

  const handleBoxClick = (boxId: number) => {
    // If box already opened or game finished (attempt >= 2), return
    if (openedBoxIds.includes(boxId) || attempt >= 2) return;

    if (attempt === 0) {
      // First Attempt -> Losing Box
      setAttempt(1);
      setFirstLosingBoxId(boxId);
      setOpenedBoxIds([boxId]);
      setShowLossMessage(true);
    } else if (attempt === 1) {
      // Second Attempt -> WINNER GUARANTEED (Money + Luxury Item)
      setAttempt(2);
      setSecondWinningBoxId(boxId);
      setOpenedBoxIds((prev) => [...prev, boxId]);
      setShowLossMessage(false);

      // Trigger Confetti explosion
      triggerConfetti();

      // Notify parent & open modal
      onWin(winningPrize, winningItem);
      setTimeout(() => {
        setShowWinningModal(true);
      }, 600);
    }
  };

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FFD700', '#FFA500', '#DC2626'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#FFD700', '#22C55E', '#FFFFFF'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#FFD700', '#EAB308'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleClaimFromModal = () => {
    setShowWinningModal(false);
    const formEl = document.getElementById("claim-form-section");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="game-section" className="py-10 px-4 max-w-4xl mx-auto">
      {/* Game Title & Status Banner */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/50 px-4 py-1.5 rounded-full text-xs font-bold text-red-300 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          20 BOÎTES CADEAUX MYSTÈRES (ARGENT + CADEX DE LUXE)
        </div>

        <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
          CHOISISSEZ VOTRE <span className="text-gold-gradient">BOÎTE GAGNANTE</span>
        </h2>

        {/* Dynamic Instruction Banner based on attempt */}
        <div className="max-w-md mx-auto">
          {attempt === 0 && (
            <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-xl p-3 text-yellow-300 text-sm font-semibold flex items-center justify-center gap-2">
              <Gift className="w-5 h-5 text-yellow-400 animate-bounce" />
              <span>Étape 1/2 : Touchez une 1ère boîte pour tenter le tirage</span>
            </div>
          )}

          {attempt === 1 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-600/20 border border-green-500/60 rounded-xl p-3 text-green-300 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
              <span>Dernière étape : Touchez une 2ème boîte pour DÉBALLER VOTRE GAIN + CADEAU !</span>
            </motion.div>
          )}

          {attempt >= 2 && (
            <div className="bg-green-600/30 border border-green-500/80 rounded-xl p-3 text-green-300 text-sm font-bold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>BOÎTE GAGNANTE DÉBALLÉE ! ARGENT + CADEAU RÉSERVÉS.</span>
            </div>
          )}
        </div>
      </div>

      {/* Loss Banner after 1st attempt */}
      <AnimatePresence>
        {showLossMessage && attempt === 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md mx-auto mb-6 bg-red-950/80 border-2 border-red-500/80 rounded-2xl p-4 text-center text-red-200 shadow-xl flex items-center justify-center gap-3"
          >
            <AlertCircle className="w-6 h-6 text-red-400 shrink-0 animate-pulse" />
            <div className="text-left">
              <p className="font-extrabold text-sm sm:text-base text-white">
                Désolé... Rien 😢 Retente !
              </p>
              <p className="text-xs text-red-300">
                La 2ème boîte contient obligatoirement de l'argent et un cadeau de luxe (Véhicule, iPhone, Rolex...) !
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4x5 Grid = 20 Gift Boxes */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto">
        {Array.from({ length: 20 }, (_, index) => {
          const boxId = index + 1;
          const isOpened = openedBoxIds.includes(boxId);
          const isLosingBox = firstLosingBoxId === boxId;
          const isWinningBox = secondWinningBoxId === boxId;
          const isLocked = attempt >= 2 && !isOpened;

          return (
            <motion.div
              key={boxId}
              whileHover={!isLocked && !isOpened ? { scale: 1.08, rotate: index % 2 === 0 ? 2 : -2 } : {}}
              whileTap={!isLocked && !isOpened ? { scale: 0.92 } : {}}
              onClick={() => handleBoxClick(boxId)}
              className={`relative aspect-square rounded-2xl p-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center select-none overflow-hidden ${
                isWinningBox
                  ? "bg-gradient-to-tr from-yellow-500 via-amber-400 to-yellow-200 border-4 border-yellow-300 shadow-2xl shadow-yellow-500/60 z-20"
                  : isLosingBox
                  ? "bg-red-950/90 border-2 border-red-600 shadow-inner"
                  : isLocked
                  ? "bg-gray-900/60 border border-gray-800 opacity-40 cursor-not-allowed"
                  : "bg-gradient-to-b from-red-800 via-red-900 to-red-950 border-2 border-yellow-500/60 hover:border-yellow-400 shadow-lg gold-box-shadow"
              }`}
            >
              {/* Ribbon Visuals for unopened boxes */}
              {!isOpened && !isLocked && (
                <>
                  <div className="gift-ribbon-v" />
                  <div className="gift-ribbon-h" />
                  <div className="gift-bow" />
                </>
              )}

              {/* Unopened Box Content */}
              {!isOpened && (
                <div className="z-10 flex flex-col items-center justify-center">
                  {isLocked ? (
                    <Lock className="w-6 h-6 text-gray-500" />
                  ) : (
                    <span className="text-xs font-black text-yellow-300 bg-black/60 px-2 py-0.5 rounded-full border border-yellow-400/40 shadow-sm mt-12 sm:mt-14">
                      #{boxId}
                    </span>
                  )}
                </div>
              )}

              {/* Opened Losing Box Content */}
              {isOpened && isLosingBox && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="z-10 space-y-1"
                >
                  <span className="text-2xl sm:text-3xl block">😢</span>
                  <span className="text-[10px] sm:text-xs font-bold text-red-300 leading-tight block">
                    VIDE
                  </span>
                </motion.div>
              )}

              {/* Opened Winning Box Content */}
              {isOpened && isWinningBox && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="z-10 flex flex-col items-center justify-center space-y-0.5 p-0.5"
                >
                  <img
                    src={winningItem.image}
                    alt={winningItem.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg border border-yellow-400 shadow-md"
                  />
                  <span className="text-[10px] sm:text-xs font-black text-red-950 block tracking-tight leading-tight">
                    {winningPrize.toLocaleString("en-US")} $
                  </span>
                  <span className="text-[8px] font-extrabold text-red-900 uppercase block truncate max-w-[75px]">
                    + {winningItem.name}
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Winning Modal Popup */}
      <WinningModal
        isOpen={showWinningModal}
        winningPrize={winningPrize}
        winningItem={winningItem}
        onClaim={handleClaimFromModal}
      />
    </section>
  );
}
