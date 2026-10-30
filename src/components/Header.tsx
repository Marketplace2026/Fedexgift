"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const [boxesLeft, setBoxesLeft] = useState(19);
  const { t } = useLanguage();

  useEffect(() => {
    // Random initial decrement between 0 and 3
    const initialDecrement = Math.floor(Math.random() * 4);
    setBoxesLeft(19 - initialDecrement);

    // Decrement counter every 30 seconds down to minimum 2
    const interval = setInterval(() => {
      setBoxesLeft((prev) => (prev > 3 ? prev - 1 : prev));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-brandDark-900/95 backdrop-blur-md border-b border-yellow-500/30 overflow-hidden">
      {/* Top urgency banner */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white text-[11px] sm:text-xs md:text-sm py-1.5 px-2 text-center font-bold tracking-tight sm:tracking-wide flex items-center justify-center gap-1.5 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin shrink-0" style={{ animationDuration: '3s' }} />
        <span className="truncate max-w-[280px] sm:max-w-none">
          {t("headerBanner", { count: boxesLeft })}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin shrink-0" style={{ animationDuration: '3s' }} />
      </div>

      {/* Main navigation header */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer min-w-0"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 p-0.5 shadow-lg shadow-yellow-500/20 shrink-0">
            <div className="w-full h-full bg-brandDark-900 rounded-[9px] sm:rounded-[10px] flex items-center justify-center">
              <Gift className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 animate-bounce" />
            </div>
          </div>
          <div className="truncate min-w-0">
            <h1 className="font-display font-black text-base sm:text-xl md:text-2xl tracking-tight sm:tracking-wider text-gold-gradient drop-shadow-[0_2px_10px_rgba(255,215,0,0.4)] truncate">
              FedEx express gift 🎁
            </h1>
            <p className="text-[9px] sm:text-[10px] text-yellow-300/80 tracking-widest font-semibold uppercase -mt-0.5 sm:-mt-1 truncate">
              {t("headerSub")}
            </p>
          </div>
        </motion.div>

        {/* Right side: Security Badge & Language Selector */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1.5 sm:gap-2 shrink-0"
        >
          <div className="hidden md:flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/40 text-yellow-300 text-xs px-2.5 py-1.5 rounded-full shadow-sm">
            <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-semibold">{t("headerSecurity")}</span>
          </div>

          {/* Interactive Language Selector Dropdown */}
          <LanguageSelector />
        </motion.div>
      </div>
    </header>
  );
}
