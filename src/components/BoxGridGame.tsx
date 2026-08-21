"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, AlertCircle, CheckCircle, Lock } from "lucide-react";
import confetti from "canvas-confetti";
import WinningModal from "./WinningModal";
import { useLanguage } from "@/context/LanguageContext";

const PRIZES = [50000, 100000, 150000, 250000, 350000, 500000];

export interface LuxuryItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  valueEst: string;
  image: string;
  shippingFee: number;
}

export const LUXURY_ITEMS: LuxuryItem[] = [
  // 1. Véhicules
  { id: "jeep", name: "Jeep Renegade SUV 4x4", category: "Véhicule SUV", icon: "🚙", valueEst: "$32,000", image: "/images/items/jeep.jpg", shippingFee: 385 },
  { id: "fiat500", name: "Fiat 500 Électrique", category: "Citadine Italienne", icon: "🚗", valueEst: "$28,000", image: "/images/items/fiat500.jpg", shippingFee: 350 },
  // 2. Tracteurs & Équipements Agricoles Italiens
  { id: "same", name: "Tracteur SAME Frutteto 70", category: "Équipement Agricole", icon: "🚜", valueEst: "$45,000", image: "/images/items/same.jpg", shippingFee: 380 },
  { id: "carraro", name: "Tracteur Antonio Carraro Tigre 3200", category: "Tracteur Compact", icon: "🚜", valueEst: "$26,000", image: "/images/items/carraro.jpg", shippingFee: 340 },
  // 3. Appareils Électroniques / High-Tech
  { id: "iphone", name: "iPhone 16 Pro Max 1TB (Apple)", category: "Smartphone Premium", icon: "📱", valueEst: "$1,599", image: "/images/items/iphone.jpg", shippingFee: 210 },
  { id: "ipad", name: "iPad Pro M4 13\" (Apple)", category: "Tablette Pro", icon: "💻", valueEst: "$1,299", image: "/images/items/ipad.jpg", shippingFee: 200 },
  { id: "samsung", name: "Samsung Galaxy S24 Ultra", category: "Smartphone Premium", icon: "📱", valueEst: "$1,419", image: "/images/items/samsung.jpg", shippingFee: 205 },
  // 4. Équipements de Maison & Cuisine Smeg
  { id: "smeg_frigo", name: "Réfrigérateur Smeg 50's Style", category: "Équipement de Maison", icon: "🧊", valueEst: "$2,800", image: "/images/items/smeg_frigo.jpg", shippingFee: 290 },
  { id: "smeg_cafe", name: "Machine à Café Espresso La Pavoni / Smeg", category: "Cuisine de Luxe", icon: "☕", valueEst: "$1,650", image: "/images/items/smeg_cafe.jpg", shippingFee: 220 },
  // 5. Vêtements & Accessoires en Cuir Italiens
  { id: "sac_cuir", name: "Sac à Main en Cuir Italien", category: "Maroquinerie de Luxe", icon: "👜", valueEst: "$3,500", image: "/images/items/sac_cuir.jpg", shippingFee: 240 },
  { id: "costume", name: "Costume Sur Mesure Italien", category: "Haute Couture", icon: "👔", valueEst: "$2,900", image: "/images/items/costume.jpg", shippingFee: 230 },
  // 6. Matériel de Construction
  { id: "excavatrice", name: "Tractopelle / Excavatrice de Chantier", category: "Engin de Construction", icon: "🏗️", valueEst: "$55,000", image: "/images/items/excavatrice.jpg", shippingFee: 385 }
];

interface BoxGridGameProps {
  onWin: (amount: number, items: LuxuryItem[]) => void;
}

export default function BoxGridGame({ onWin }: BoxGridGameProps) {
  const [winningPrize, setWinningPrize] = useState<number>(250000);
  const [winningItems, setWinningItems] = useState<LuxuryItem[]>([LUXURY_ITEMS[0], LUXURY_ITEMS[4], LUXURY_ITEMS[8]]);
  const [attempt, setAttempt] = useState<number>(0);
  const [openedBoxIds, setOpenedBoxIds] = useState<number[]>([]);
  const [firstLosingBoxId, setFirstLosingBoxId] = useState<number | null>(null);
  const [secondWinningBoxId, setSecondWinningBoxId] = useState<number | null>(null);
  const [showLossMessage, setShowLossMessage] = useState<boolean>(false);
  const [showWinningModal, setShowWinningModal] = useState<boolean>(false);
  const { t } = useLanguage();

  // Initialize random prize and 3 luxury items on mount
  useEffect(() => {
    const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
    const shuffled = [...LUXURY_ITEMS].sort(() => 0.5 - Math.random());
    const random3Items = shuffled.slice(0, 3);
    setWinningPrize(randomPrize);
    setWinningItems(random3Items);
  }, []);

  const handleBoxClick = (boxId: number) => {
    if (openedBoxIds.includes(boxId) || attempt >= 2) return;

    if (attempt === 0) {
      // First Attempt -> Losing Box
      setAttempt(1);
      setFirstLosingBoxId(boxId);
      setOpenedBoxIds([boxId]);
      setShowLossMessage(true);
    } else if (attempt === 1) {
      // Second Attempt -> GUARANTEED WIN (Money + 3 Luxury Items!)
      setAttempt(2);
      setSecondWinningBoxId(boxId);
      setOpenedBoxIds((prev) => [...prev, boxId]);
      setShowLossMessage(false);

      triggerConfetti();

      // Notify parent & open modal
      onWin(winningPrize, winningItems);
      setTimeout(() => {
        setShowWinningModal(true);
      }, 600);
    }
  };

  const triggerConfetti = () => {
    const count = 250;
    const defaults = { origin: { y: 0.7 }, zIndex: 999 };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#FFD700', '#FFA500', '#DC2626'] });
    fire(0.2, { spread: 60, colors: ['#FFD700', '#22C55E', '#FFFFFF'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#FFD700', '#EAB308'] });
    fire(0.1, { spread: 120, startVelocity: 45 });
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
          20 BOÎTES CADEAUX MYSTÈRES (ARGENT + 3 LOTS DE LUXE)
        </div>

        <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
          {t("gameTitle")}
        </h2>

        {/* Dynamic Instruction Banner based on attempt */}
        <div className="max-w-md mx-auto">
          {attempt === 0 && (
            <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-xl p-3 text-yellow-300 text-sm font-semibold flex items-center justify-center gap-2">
              <Gift className="w-5 h-5 text-yellow-400 animate-bounce" />
              <span>{t("step1")}</span>
            </div>
          )}

          {attempt === 1 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-600/20 border border-green-500/60 rounded-xl p-3 text-green-300 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
              <span>Dernière étape : Touchez la 2ème boîte pour DÉBALLER VOTRE GAIN + 3 CADEAUX !</span>
            </motion.div>
          )}

          {attempt >= 2 && (
            <div className="bg-green-600/30 border border-green-500/80 rounded-xl p-3 text-green-300 text-sm font-bold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>BOÎTE GAGNANTE DÉBALLÉE ! ARGENT + 3 CADEAUX DE LUXE RÉSERVÉS.</span>
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
                {t("lossMessageTitle")}
              </p>
              <p className="text-xs text-red-300">
                La 2ème boîte contient obligatoirement de l'argent et 3 cadeaux de luxe d'exception !
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
              className={`relative aspect-square rounded-2xl p-1 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center select-none overflow-hidden ${
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

              {/* Opened Winning Box Content showing Cash + 3 Items Preview */}
              {isOpened && isWinningBox && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="z-10 flex flex-col items-center justify-center space-y-0.5 p-0.5"
                >
                  <div className="flex -space-x-2 overflow-hidden py-0.5">
                    {winningItems.map((item, idx) => (
                      <img
                        key={idx}
                        src={item.image}
                        alt={item.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-full border-2 border-yellow-400 shadow-md inline-block"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs font-black text-red-950 block tracking-tight leading-none">
                    {winningPrize.toLocaleString("en-US")} $
                  </span>
                  <span className="text-[8px] font-extrabold text-red-900 uppercase block tracking-tighter">
                    + 3 LOTS DE LUXE
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
        winningItems={winningItems}
        onClaim={handleClaimFromModal}
      />
    </section>
  );
}
