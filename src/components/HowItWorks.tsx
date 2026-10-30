"use client";

import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick, Gift, Award, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      step: "01",
      icon: <MousePointerClick className="w-6 h-6 text-yellow-400" />,
      title: "1. Choisissez vos boîtes",
      desc: "Sélectionnez 2 boîtes cadeaux parmi les 20 disponibles pour tenter le jackpot instantané."
    },
    {
      step: "02",
      icon: <Gift className="w-6 h-6 text-emerald-400" />,
      title: "2. Déballez le double gain",
      desc: "Découvrez votre montant en cash garanti + 3 lots d'exception (véhicule, smartphone, luxe)."
    },
    {
      step: "03",
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: "3. Téléchargez votre reçu PDF",
      desc: "Générez votre certificat légal horodaté avec votre selfie et référence sécurisée."
    },
    {
      step: "04",
      icon: <Truck className="w-6 h-6 text-sky-400" />,
      title: "4. Livraison et virement",
      desc: "Validez sur WhatsApp pour déclencher l'expédition FedEx Express à votre adresse en 48h."
    }
  ];

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10 space-y-2">
        <span className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold rounded-full uppercase tracking-wider">
          Transparence & Sécurité
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
          Comment récupérer vos <span className="text-gold-gradient">Gains & Lots</span> ?
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          Processus officiel en 4 étapes simples, certifié et garanti par le protocole FedEx express gift.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card rounded-2xl p-5 border border-yellow-500/20 bg-gradient-to-b from-[#111827] to-[#0c1220] relative overflow-hidden"
          >
            <div className="text-4xl font-display font-black text-white/5 absolute top-2 right-3 select-none">
              {item.step}
            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-4">
              {item.icon}
            </div>

            <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
