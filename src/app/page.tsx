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
  const [winningItem, setWinningItem] = useState<LuxuryItem>(LUXURY_ITEMS[0]);

  const handleWin = (amount: number, item: LuxuryItem) => {
    setWinningAmount(amount);
    setWinningItem(item);
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

        {/* 20 Gift Boxes Game Grid (Guaranteed 2nd attempt random money + luxury gift) */}
        <BoxGridGame onWin={handleWin} />

        {/* Winner Form + Dynamic PDF Receipt + WhatsApp Redirection */}
        <ClaimForm winningPrize={winningAmount} winningItem={winningItem} />

        {/* Footer & Legal mentions */}
        <Footer />
      </main>
    </LanguageProvider>
  );
}
