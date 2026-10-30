"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Truck, Users, Star, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TrustBar() {
  const { t } = useLanguage();
  const [winnerCount, setWinnerCount] = useState(14820);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time incrementing winners
      setWinnerCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0a0e17]/95 border-b border-yellow-500/20 backdrop-blur-md py-2.5 px-3">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-3 text-xs">
        {/* Item 1: SSL Secure */}
        <div className="flex items-center gap-1.5 text-gray-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{t("trustSSL", { defaultValue: "SSL 256-bit Sécurisé" })}</span>
        </div>

        {/* Item 2: Official Delivery Partner */}
        <div className="flex items-center gap-1.5 text-gray-300">
          <Truck className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="font-semibold">{t("trustDelivery", { defaultValue: "Livraison Express Suivie" })}</span>
        </div>

        {/* Item 3: Verified Winners Counter */}
        <div className="flex items-center gap-1.5 text-gray-300">
          <Users className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="font-semibold">
            <span className="text-emerald-400 font-bold">{winnerCount.toLocaleString()}</span> {t("trustWinners", { defaultValue: "Gagnants Validés" })}
          </span>
        </div>

        {/* Item 4: Rating */}
        <div className="flex items-center gap-1 text-gray-300">
          <div className="flex text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <Star className="w-3.5 h-3.5 fill-amber-400" />
          </div>
          <span className="font-bold text-amber-300 ml-1">4.9/5</span>
          <span className="text-gray-400 text-[11px]">(2,840+ avis)</span>
        </div>

        {/* Item 5: Guarantee & License */}
        <div className="hidden md:flex items-center gap-1.5 text-gray-300">
          <Award className="w-4 h-4 text-yellow-400 shrink-0" />
          <span className="font-semibold text-yellow-300/90">{t("trustLicense", { defaultValue: "Certifié FedEx Express 2026" })}</span>
        </div>
      </div>
    </div>
  );
}
