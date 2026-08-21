"use client";

import React from "react";
import { Gift, ArrowDown, HelpCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function QuestionSection() {
  const { t } = useLanguage();

  const scrollToGame = () => {
    const el = document.getElementById("game-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="question-section" 
      className="py-10 px-4 max-w-3xl mx-auto my-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl p-6 sm:p-8 text-center gold-border-glow relative overflow-hidden bg-gradient-to-b from-brandDark-800 via-brandDark-900 to-red-950/40"
      >
        {/* Subtle decorative sparkles */}
        <Sparkles className="absolute top-4 right-4 text-yellow-400/40 w-6 h-6 animate-pulse" />
        <HelpCircle className="absolute bottom-4 left-4 text-red-500/20 w-10 h-10" />

        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-600 to-yellow-500 p-0.5 shadow-xl shadow-red-600/30 mb-4 flex items-center justify-center">
          <div className="w-full h-full bg-brandDark-900 rounded-[14px] flex items-center justify-center">
            <Gift className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <h2 className="text-xl sm:text-3xl font-display font-black text-white leading-tight mb-3">
          {t("questionTitle")}
        </h2>

        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-6">
          {t("questionDesc")}
        </p>

        {/* Red CTA Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={scrollToGame}
          className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-red-600/50 flex items-center justify-center gap-3 border-2 border-yellow-400 mx-auto transition-all cursor-pointer"
        >
          <span>{t("questionCTA")}</span>
          <ArrowDown className="w-6 h-6 text-yellow-300 animate-bounce" />
        </motion.button>
      </motion.div>
    </section>
  );
}
