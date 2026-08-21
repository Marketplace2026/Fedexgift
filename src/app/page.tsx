"use client";

import React, { useState } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import QuestionSection from "@/components/QuestionSection";
import BoxGridGame, { LuxuryItem, LUXURY_ITEMS } from "@/components/BoxGridGame";
import ClaimForm from "@/components/ClaimForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [winningAmount, setWinningAmount] = useState<number>(250000);
  const [winningItems, setWinningItems] = useState<LuxuryItem[]>([LUXURY_ITEMS[0], LUXURY_ITEMS[4], LUXURY_ITEMS[8]]);

  const handleWin = (amount: number, items: LuxuryItem[]) => {
    setWinningAmount(amount);
    setWinningItems(items);
  };

  return (
    <LanguageProvider>
      <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b0f19] via-[#111827] to-[#080b12] text-white">
        {/* Sticky Header with Dynamic Urgency Counter & Language Selector */}
        <Header />

        {/* Hero Section & 25 Testimonials Carousel */}
        <HeroCarousel />

        {/* Question Section */}
        <QuestionSection />

        {/* 20 Gift Boxes Game Grid (Guaranteed 2nd attempt random money + 3 luxury gifts) */}
        <BoxGridGame onWin={handleWin} />

        {/* Winner Form + Dynamic PDF Receipt + WhatsApp Redirection */}
        <ClaimForm winningPrize={winningAmount} winningItems={winningItems} />

        {/* Footer & Legal mentions */}
        <Footer />
      </main>
    </LanguageProvider>
  );
}
