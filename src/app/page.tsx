"use client";

import React, { useState } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import TrustBar from "@/components/TrustBar";
import HeroCarousel from "@/components/HeroCarousel";
import QuestionSection from "@/components/QuestionSection";
import BoxGridGame, { LuxuryItem, LUXURY_ITEMS } from "@/components/BoxGridGame";
import ClaimForm from "@/components/ClaimForm";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import LiveActivityToast from "@/components/LiveActivityToast";
import Footer from "@/components/Footer";

export default function Home() {
  const [showGame, setShowGame] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [winningAmount, setWinningAmount] = useState<number>(250000);
  const [winningItems, setWinningItems] = useState<LuxuryItem[]>([LUXURY_ITEMS[0], LUXURY_ITEMS[4], LUXURY_ITEMS[8]]);

  const handleStartGame = () => {
    setShowGame(true);
  };

  const handleWin = (amount: number, items: LuxuryItem[]) => {
    setWinningAmount(amount);
    setWinningItems(items);
    setHasWon(true);
  };

  return (
    <LanguageProvider>
      <div className="w-full max-w-full overflow-x-hidden min-h-screen flex flex-col bg-gradient-to-b from-[#0b0f19] via-[#111827] to-[#080b12] text-white relative">
        {/* Sticky Header with Dynamic Urgency Counter & Language Selector */}
        <Header />

        {/* Real-time Trust Bar with Badges, Live Count & Certifications */}
        <TrustBar />

        {/* Hero Section & Testimonials Carousel */}
        <HeroCarousel onStartGame={handleStartGame} />

        {/* Question Section */}
        <QuestionSection onStartGame={handleStartGame} />

        {/* 20 Gift Boxes Game Grid reveals on 'Tenter ma chance' click */}
        {showGame && (
          <BoxGridGame onWin={handleWin} />
        )}

        {/* Claim Form with Mandatory Winner Selfie and Instant PDF generator */}
        {hasWon && (
          <ClaimForm winningPrize={winningAmount} winningItems={winningItems} />
        )}

        {/* How It Works & Transparency Process */}
        <HowItWorks />

        {/* FAQ with Official Guarantees */}
        <FAQ />

        {/* Floating Social Proof & Live Activity Winner Notifications */}
        <LiveActivityToast />

        {/* Footer & Legal mentions */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
