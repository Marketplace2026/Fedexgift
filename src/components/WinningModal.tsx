"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, CheckCircle2, ArrowRight, Gift } from "lucide-react";
import { LuxuryItem } from "./BoxGridGame";
import { useLanguage } from "@/context/LanguageContext";

interface WinningModalProps {
  isOpen: boolean;
  winningPrize: number;
  winningItems?: LuxuryItem[];
  onClaim: () => void;
}

export default function WinningModal({ isOpen, winningPrize, winningItems = [], onClaim }: WinningModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl glass-card rounded-3xl p-6 md:p-8 text-center gold-border-glow shadow-2xl bg-gradient-to-b from-brandDark-800 via-brandDark-900 to-yellow-950/40 overflow-hidden my-8"
        >
          {/* Confetti background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Trophy Header Icon */}
          <div className="relative w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-yellow-500 via-amber-300 to-yellow-100 p-0.5 shadow-2xl shadow-yellow-500/50">
            <div className="w-full h-full bg-brandDark-900 rounded-[22px] flex items-center justify-center">
              <Trophy className="w-10 h-10 text-yellow-400 animate-bounce" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          <h3 className="text-sm uppercase tracking-widest text-yellow-400 font-extrabold mb-1 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            TRIPLE GAIN DE LUXE + CASH VALIDÉ
          </h3>

          <h2 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight mb-4">
            {t("winningModalTitle")} <br />
            <span className="text-gold-gradient drop-shadow-[0_2px_15px_rgba(255,215,0,0.6)]">
              VOUS AVEZ REMPORTÉ L'ARGENT + 3 CADEAUX DE LUXE :
            </span>
          </h2>

          {/* 1. Cash Prize Card */}
          <div className="my-4 py-3 px-6 rounded-2xl bg-gradient-to-r from-yellow-500/20 via-yellow-400/30 to-yellow-500/20 border-2 border-yellow-400/70 shadow-inner">
            <span className="text-[10px] uppercase font-bold text-yellow-300/80 tracking-widest block mb-0.5">
              {t("winningModalCashLabel")}
            </span>
            <p className="text-3xl sm:text-4xl font-black text-yellow-300 tracking-tight">
              {winningPrize.toLocaleString("en-US")} <span className="text-xl sm:text-2xl">$ USD</span>
            </p>
          </div>

          {/* 2. Three Luxury Physical Gifts Grid with Real Photos */}
          {winningItems.length > 0 && (
            <div className="my-4 space-y-2 text-left">
              <span className="text-xs font-black text-yellow-400 uppercase tracking-wider flex items-center gap-1">
                <Gift className="w-4 h-4 text-yellow-400 animate-bounce" />
                3 CADEAUX DE LUXE RÉSERVÉS À VOTRE NOM :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {winningItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 * (idx + 1) }}
                    className="p-2.5 rounded-2xl bg-gradient-to-b from-brandDark-800 to-red-950/70 border border-yellow-400/80 shadow-lg flex flex-row sm:flex-col items-center gap-3 text-left sm:text-center"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border border-yellow-400 shadow-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0.5 right-0.5 text-xs bg-black/70 px-1 rounded">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-white leading-tight line-clamp-2">
                        {item.name}
                      </p>
                      <span className="text-[10px] text-green-400 font-bold block mt-0.5">
                        {item.valueEst}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Cash bill graphic illustration */}
          <div className="relative w-full max-w-xs mx-auto h-24 mb-6 rounded-xl bg-gradient-to-b from-green-950/80 to-brandDark-900 border border-green-500/40 p-2.5 flex flex-col justify-between items-center shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_70%)]" />
            <div className="w-full flex justify-between items-center text-[9px] font-mono text-green-400 font-bold">
              <span>TRANSFERT BANCAIRE / $ USD</span>
              <span>100% SÉCURISÉ</span>
            </div>
            <div className="text-center my-auto">
              <span className="text-xl font-black text-green-300 font-mono tracking-wider drop-shadow-md">
                💵 $ {winningPrize.toLocaleString("en-US")} + 🎁 3 CADEAUX
              </span>
              <p className="text-[8px] text-green-400/80 uppercase font-semibold mt-0.5">
                {t("winningModalCashBill")}
              </p>
            </div>
            <div className="w-full flex justify-between items-center text-[9px] text-gray-400">
              <span>FEDEX-GIFT-2026</span>
              <span>VALIDÉ</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 mb-6">
            Votre virement et vos 3 cadeaux de luxe ont été réservés avec succès. Remplissez le formulaire pour valider votre expédition.
          </p>

          {/* Claim Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClaim}
            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-green-600/50 flex items-center justify-center gap-3 border-2 border-yellow-300 cursor-pointer transition-all"
          >
            <span>{t("winningModalCTA")}</span>
            <ArrowRight className="w-6 h-6 text-yellow-300" />
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
