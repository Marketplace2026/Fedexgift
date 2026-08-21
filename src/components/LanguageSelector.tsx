"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES, Language } from "@/i18n/translations";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSelector() {
  const { language, setLanguage, currentLanguageOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brandDark-800/90 hover:bg-brandDark-700 border border-yellow-500/50 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer gold-border-glow"
      >
        <Globe className="w-3.5 h-3.5 text-yellow-400" />
        <span className="text-base leading-none">{currentLanguageOption.flag}</span>
        <span className="hidden sm:inline-block text-yellow-300 font-semibold">{currentLanguageOption.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-2xl bg-brandDark-900/95 border-2 border-yellow-500/60 shadow-2xl backdrop-blur-xl z-50 overflow-hidden"
          >
            <div className="p-1.5 space-y-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    language === lang.code
                      ? "bg-gradient-to-r from-yellow-500/30 to-amber-500/20 text-yellow-300 border border-yellow-400/50"
                      : "text-gray-200 hover:bg-brandDark-700/80 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {language === lang.code && (
                    <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#FFD700]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
