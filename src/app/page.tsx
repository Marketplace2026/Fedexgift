"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import QuestionSection from "@/components/QuestionSection";
import BoxGridGame from "@/components/BoxGridGame";
import ClaimForm from "@/components/ClaimForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [winningAmount, setWinningAmount] = useState<number>(500000);

  const handleWin = (amount: number) => {
    setWinningAmount(amount);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b0f19] via-[#111827] to-[#080b12] text-white">
      {/* Sticky Header with Dynamic Urgency Counter */}
      <Header />

      {/* Hero Section & 10 Testimonials Carousel */}
      <HeroCarousel />

      {/* Question Section */}
      <QuestionSection />

      {/* 20 Gift Boxes Game Grid (Guaranteed 2nd attempt random prize) */}
      <BoxGridGame onWin={handleWin} />

      {/* Winner Form + Dynamic PDF Receipt + WhatsApp Redirection */}
      <ClaimForm winningPrize={winningAmount} />

      {/* Footer & Legal mentions */}
      <Footer />
    </main>
  );
}
