"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Gift } from "lucide-react";

interface ToastWinner {
  name: string;
  location: string;
  amount: string;
  item: string;
  timeAgo: string;
  avatar: string;
}

const RECENT_WINNERS: ToastWinner[] = [
  { name: "Matteo R.", location: "Rome, Italie", amount: "150,000 $", item: "iPhone 16 Pro Max", timeAgo: "Il y a 2 min", avatar: "👨🏻" },
  { name: "Sophie D.", location: "Lyon, France", amount: "250,000 $", item: "Jeep Renegade SUV", timeAgo: "Il y a 4 min", avatar: "👩🏼" },
  { name: "Lucas M.", location: "Genève, Suisse", amount: "100,000 $", item: "Rolex Submariner", timeAgo: "Il y a 6 min", avatar: "👨🏽" },
  { name: "Elena B.", location: "Milan, Italie", amount: "350,000 $", item: "Machine Smeg", timeAgo: "Il y a 8 min", avatar: "👩🏻" },
  { name: "Amadou S.", location: "Dakar, Sénégal", amount: "250,000 $", item: "Tracteur New Holland", timeAgo: "Il y a 11 min", avatar: "👨🏾" },
  { name: "Clara V.", location: "Bruxelles, Belgique", amount: "500,000 $", item: "Jeep SUV + Pack Apple", timeAgo: "Il y a 14 min", avatar: "👩🏼" },
  { name: "Carlos P.", location: "Madrid, Espagne", amount: "150,000 $", item: "PlayStation 5 Pro", timeAgo: "Il y a 18 min", avatar: "👨🏻" }
];

export default function LiveActivityToast() {
  const [currentWinner, setCurrentWinner] = useState<ToastWinner | null>(null);

  useEffect(() => {
    // Show first toast after 4s
    const firstTimer = setTimeout(() => {
      setCurrentWinner(RECENT_WINNERS[0]);
    }, 4000);

    // Rotate toast every 14s
    let idx = 1;
    const interval = setInterval(() => {
      setCurrentWinner(RECENT_WINNERS[idx % RECENT_WINNERS.length]);
      idx++;
      
      // Auto hide after 6s
      setTimeout(() => {
        setCurrentWinner(null);
      }, 6500);
    }, 14000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-none max-w-sm">
      <AnimatePresence>
        {currentWinner && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-auto bg-[#0d1424]/95 border border-yellow-500/40 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-300 flex items-center justify-center text-xl shadow-md shrink-0 border border-yellow-200">
              {currentWinner.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-white truncate flex items-center gap-1">
                  {currentWinner.name}
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </span>
                <span className="text-[10px] text-gray-400 shrink-0">{currentWinner.timeAgo}</span>
              </div>
              <p className="text-[11px] text-gray-300 truncate">{currentWinner.location}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] font-black text-emerald-400">Gagné {currentWinner.amount}</span>
                <span className="text-[10px] text-yellow-300/80 truncate flex items-center gap-0.5">
                  <Gift className="w-2.5 h-2.5 text-yellow-400" />
                  {currentWinner.item}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
