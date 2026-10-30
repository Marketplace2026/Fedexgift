"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: "Comment puis-je être sûr(e) de recevoir mon argent et mes lots ?",
    answer: "Chaque tirage génère un reçu officiel horodaté avec numéro de certificat unique et vérifiable. Votre colis est pris en charge par notre réseau logistique international avec suivi en temps réel."
  },
  {
    question: "Pourquoi un selfie avec pièce d'identité est-il obligatoire ?",
    answer: "Conformément aux régulations financières internationales anti-fraude (KYC), nous devons certifier que le gagnant physique est bien la personne effectuant la réclamation des fonds."
  },
  {
    question: "Quels sont les délais d'expédition et de virement bancaire ?",
    answer: "Dès validation de vos coordonnées et confirmation sur WhatsApp avec votre agent référent, le virement instantané prend entre 15 et 45 minutes. L'expédition physique de vos 3 lots arrive à votre domicile sous 48h à 72h ouvrées."
  },
  {
    question: "Pourquoi des frais d'expédition et d'assurance sont-ils demandés ?",
    answer: "Nos lots incluent des biens de très haute valeur (véhicules tout-terrain, smartphones, équipements de luxe). Les frais couvrent l'assurance tout risque jusqu'à 100% de la valeur marchande durant le transit."
  },
  {
    question: "Puis-je jouer plusieurs fois ?",
    answer: "Chaque participant est limité à une session de jeu par tranche de 24 heures pour garantir l'équité entre tous les participants internationaux."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-10 space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold rounded-full uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          Questions Fréquentes
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
          Foire Aux Questions & <span className="text-gold-gradient">Garanties</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400">
          Toutes les réponses pour récupérer vos gains en toute sérénité.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_LIST.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-yellow-500/20 bg-[#101726] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-yellow-300 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-yellow-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-gray-300 border-t border-gray-800/80 leading-relaxed flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>{faq.answer}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
