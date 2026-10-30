"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Truck, Users, Star, Award } from "lucide-react";

export default function TrustBar() {
  const [winnerCount, setWinnerCount] = useState(14820);

  useEffect(() => {
    const interval = setInterval(() => {
      setWinnerCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0a0e17]/95 border-b border-yellow-500/20 backdrop-blur-md py-2 px-2 overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center sm:justify-around gap-2.5 sm:gap-3 text-[11px] sm:text-xs">
        {/* Item 1: SSL Secure */}
        <div className="flex items-center gap-1 text-gray-300 whitespace-nowrap">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-semibold">SSL 256-bit Sécurisé</span>
        </div>

        {/* Item 2: Official Delivery Partner */}
        <div className="flex items-center gap-1 text-gray-300 whitespace-nowrap">
          <Truck className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
          <span className="font-semibold">Livraison Suivie</span>
        </div>

        {/* Item 3: Verified Winners Counter */}
        <div className="flex items-center gap-1 text-gray-300 whitespace-nowrap">
          <Users className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="font-semibold">
            <span className="text-emerald-400 font-bold">{winnerCount.toLocaleString()}</span> Gagnants Validés
          </span>
        </div>

        {/* Item 4: Rating */}
        <div className="flex items-center gap-1 text-gray-300 whitespace-nowrap">
          <div className="flex text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
          </div>
          <span className="font-bold text-amber-300 ml-0.5">4.9/5</span>
        </div>

        {/* Item 5: Guarantee & License */}
        <div className="hidden lg:flex items-center gap-1 text-gray-300 whitespace-nowrap">
          <Award className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
          <span className="font-semibold text-yellow-300/90">Certifié FedEx Express 2026</span>
        </div>
      </div>
    </div>
  );
}
