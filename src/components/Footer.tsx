"use client";

import React from "react";
import { Lock, Gift } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 bg-brandDark-900 border-t border-yellow-500/20 py-10 px-4 text-center text-gray-400 text-xs">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Brand Logo & Language Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-yellow-400" />
            <span className="font-display font-black text-lg text-gold-gradient tracking-wide">
              FedEx express gift 🎁
            </span>
          </div>
          <LanguageSelector />
        </div>

        {/* Responsible Gaming Badge & Age Warning */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-yellow-400/90 font-bold">
          <span className="bg-red-950/80 border border-red-500/50 px-3 py-1 rounded-full text-red-300">
            🔞 18+
          </span>
          <span className="bg-yellow-500/10 border border-yellow-500/30 px-3 py-1 rounded-full text-yellow-300">
            🎁 {t("footerRights")}
          </span>
          <span className="bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full text-green-400 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> SSL 256-bit
          </span>
        </div>

        {/* Mentions Légales */}
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-[11px]">
          {t("footerTagline")} FedEx express gift 🎁.
        </p>

        {/* Trust Icons */}
        <div className="pt-4 border-t border-gray-800/60 flex items-center justify-between text-[10px] text-gray-400 flex-col sm:flex-row gap-2">
          <p>© 2026 FedEx express gift 🎁. {t("footerRights")}</p>
        </div>
      </div>
    </footer>
  );
}
