"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, MessageSquare, CheckCircle2, ShieldAlert, User, Mail, MapPin, Lock, Sparkles, Truck, AlertTriangle } from "lucide-react";
import { jsPDF } from "jspdf";
import { LuxuryItem } from "./BoxGridGame";
import { useLanguage } from "@/context/LanguageContext";

interface ClaimFormProps {
  winningPrize: number;
  winningItem?: LuxuryItem;
}

// Admin WhatsApp Number
const ADMIN_WHATSAPP_NUMBER = "22990000000";

export default function ClaimForm({ winningPrize, winningItem }: ClaimFormProps) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [acceptShipping, setAcceptShipping] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const { t } = useLanguage();

  // Dynamic shipping fee based on item won (between $200 and $385 USD)
  const shippingFee = winningItem ? winningItem.shippingFee : 250;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nom.trim() || !email.trim() || !adresse.trim()) {
      alert("Veuillez remplir tous les champs obligatoires (*)");
      return;
    }

    if (!acceptShipping) {
      alert("Veuillez cocher la case d'acceptation des frais de livraison pour valider votre reçu.");
      return;
    }

    // Generate unique transaction reference
    const refId = "FDX-" + Math.random().toString(36).substring(2, 9).toUpperCase() + "-" + Date.now().toString().slice(-4);
    setTransactionId(refId);

    // Generate PDF receipt in selected language with jsPDF
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

    const itemName = winningItem ? `${winningItem.name} (${winningItem.valueEst})` : "iPhone 16 Pro Max 1TB ($1,599)";

    // Dark luxury theme colors
    doc.setFillColor(15, 23, 42); // slate 900 background header
    doc.rect(0, 0, 210, 45, "F");

    // Header Title
    doc.setTextColor(255, 215, 0); // Gold
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(t("pdfHeaderTitle"), 105, 20, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(t("pdfHeaderSub"), 105, 28, { align: "center" });

    doc.setFontSize(9);
    doc.setTextColor(200, 200, 200);
    doc.text(t("pdfLicence"), 105, 35, { align: "center" });

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
    doc.text(t("pdfRefLabel"), 25, 71);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(185, 28, 28);
    doc.text(refId, 85, 71);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text(t("pdfDateLabel"), 25, 80);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(currentDate, 85, 80);

    // Winner Info Table
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(t("pdfSectionTitle"), 25, 98);

    doc.setDrawColor(226, 232, 240);
    doc.line(25, 101, 185, 101);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    // Rows translated according to selected language
    const rows = [
      [t("pdfRowNom"), nom],
      [t("pdfRowEmail"), email],
      [t("pdfRowAdresse"), adresse],
      [t("pdfRowItem"), itemName],
      [t("pdfRowShipping"), `$ ${shippingFee} USD (ENGAGEMENT VALIDE)`],
      [t("pdfRowStatus"), t("pdfStatusValue")],
    ];

    let startY = 108;
    rows.forEach(([label, value]) => {
      doc.setTextColor(100, 116, 139);
      doc.text(label, 25, startY);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      
      // Wrap text if address or value is long
      const splitVal = doc.splitTextToSize(value, 95);
      doc.text(splitVal, 88, startY);

      doc.setFont("helvetica", "normal");
      startY += (splitVal.length * 6) + 2.5;
    });

    // Winning Prize Box
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(239, 68, 68);
    doc.rect(25, startY + 4, 160, 32, "FD");

    doc.setFontSize(11);
    doc.setTextColor(185, 28, 28);
    doc.setFont("helvetica", "bold");
    doc.text(t("pdfNetTotalLabel"), 105, startY + 14, { align: "center" });

    doc.setFontSize(17);
    doc.setTextColor(22, 163, 74);
    doc.text(`$ ${winningPrize.toLocaleString("en-US")} USD  +  ${winningItem?.name || "iPhone 16 Pro Max"}`, 105, startY + 26, { align: "center" });

    // Official Certification Stamp
    doc.setDrawColor(22, 163, 74);
    doc.setLineWidth(1.5);
    doc.rect(130, startY + 43, 55, 22);
    doc.setFontSize(9);
    doc.setTextColor(22, 163, 74);
    doc.setFont("helvetica", "bold");
    doc.text("FedexGift", 157.5, startY + 50, { align: "center" });
    doc.text(t("pdfStampApproved"), 157.5, startY + 56, { align: "center" });
    doc.text(t("pdfStampGuaranteed"), 157.5, startY + 61, { align: "center" });

    // Security & Instructions Footer
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 116, 139);
    const footerLines = doc.splitTextToSize(t("pdfFooterInstruction"), 165);
    doc.text(footerLines, 25, startY + 73);

    // Save File
    doc.save(`recu_gain_fedex_gift_${refId}.pdf`);
  };

  const getWhatsAppLink = () => {
    const itemStr = winningItem ? winningItem.name : "Cadeau de Luxe";
    const message = `${t("waMessageHello")} ${winningPrize.toLocaleString("en-US")} $ + ${itemStr} ${t("waMessageOnSite")}

${t("waName")} ${nom}
${t("waEmail")} ${email}
${t("waAddress")} ${adresse}
${t("waItem")} ${itemStr}
${t("waShippingFee")} $ ${shippingFee} USD
${t("waRef")} ${transactionId}

${t("waClosing", { fee: shippingFee })}`;

    return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="claim-form-section" className="py-12 px-4 max-w-2xl mx-auto">
      <div className="glass-card rounded-3xl p-6 sm:p-10 gold-border-glow shadow-2xl bg-gradient-to-b from-brandDark-800 via-brandDark-900 to-brandDark-900">
        
        {/* Section Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/40 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <Lock className="w-3.5 h-3.5 text-green-400" />
            {t("claimBadge")}
          </div>

          {winningItem && (
            <div className="mb-6 p-3 rounded-2xl bg-brandDark-800/90 border border-yellow-500/40 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <img
                  src={winningItem.image}
                  alt={winningItem.name}
                  className="w-14 h-14 object-cover rounded-xl border border-yellow-400 shrink-0 shadow-md"
                />
                <div>
                  <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider block">
                    🎁 {t("winningModalItemLabel")}
                  </span>
                  <span className="text-sm font-black text-white block">
                    {winningItem.name} ({winningItem.valueEst})
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0 bg-yellow-500/10 border border-yellow-500/30 px-2.5 py-1 rounded-xl">
                <span className="text-[9px] text-gray-400 uppercase font-bold block">Expédition</span>
                <span className="text-xs font-black text-yellow-300">${shippingFee} USD</span>
              </div>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
            {t("claimTitle")} <span className="text-gold-gradient">{winningPrize.toLocaleString("en-US")} $</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            {t("claimSub")}
          </p>
        </div>

        {!isSubmitted ? (
          /* FORMULAIRE DE RÉCLAMATION ET ADRESSE */
          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Nom & Prénom */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-yellow-400" />
                {t("labelNom")}
              </label>
              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder={t("placeholderNom")}
                className="w-full bg-brandDark-700/80 border border-gray-700 focus:border-yellow-400 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none transition shadow-inner"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-yellow-400" />
                {t("labelEmail")}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholderEmail")}
                className="w-full bg-brandDark-700/80 border border-gray-700 focus:border-yellow-400 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none transition shadow-inner"
              />
            </div>

            {/* Adresse Complète de Résidence */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-green-400" />
                {t("labelAdresse")}
              </label>
              <textarea
                required
                rows={3}
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                placeholder={t("placeholderAdresse")}
                className="w-full bg-brandDark-700/80 border border-gray-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none transition shadow-inner resize-none"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                {t("addressHelper")}
              </span>
            </div>

            {/* MANDATORY SHIPPING FEE ACCEPTANCE CHECKBOX */}
            <div className="bg-gradient-to-r from-yellow-500/10 via-amber-500/20 to-yellow-500/10 border-2 border-yellow-400/80 rounded-2xl p-4 space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs font-bold text-yellow-300">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-yellow-400 animate-bounce" />
                  {t("shippingFeeNotice")}
                </span>
                <span className="bg-yellow-400 text-black px-2.5 py-0.5 rounded-full font-black text-sm shadow-md">
                  ${shippingFee} USD
                </span>
              </div>

              <label className="flex items-start gap-3 cursor-pointer select-none text-left">
                <input
                  type="checkbox"
                  required
                  checked={acceptShipping}
                  onChange={(e) => setAcceptShipping(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-700 text-yellow-500 focus:ring-yellow-400 mt-0.5 cursor-pointer accent-yellow-400 shrink-0"
                />
                <span className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {t("acceptShippingLabel", { fee: shippingFee })}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-500 hover:to-red-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-red-600/50 border border-yellow-400 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
              <span>{t("submitCTA")}</span>
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
                {t("successTitle")}
              </h3>
              <p className="text-xs text-gray-300">
                Réf: <span className="text-yellow-400 font-mono font-bold">{transactionId}</span>
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-yellow-300 font-bold text-xs">
                <Download className="w-4 h-4 text-yellow-400 animate-bounce" />
                {t("successStep1")}
              </div>
              <div className="flex items-center gap-2 text-green-400 font-bold text-xs">
                <MessageSquare className="w-4 h-4 text-green-400" />
                {t("successStep2")}
              </div>
            </div>

            {/* Re-Download PDF Button */}
            <button
              onClick={() => generatePDFReceipt(transactionId)}
              className="text-xs text-yellow-300/80 hover:text-yellow-300 underline flex items-center justify-center gap-1 mx-auto"
            >
              <Download className="w-3.5 h-3.5" /> {t("reDownload")}
            </button>

            {/* Green WhatsApp Action Button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-[#25D366]/40 flex items-center justify-center gap-3 border-2 border-white cursor-pointer transition-all block text-center"
            >
              <MessageSquare className="w-6 h-6 fill-white" />
              <span>{t("whatsappCTA")}</span>
            </a>

            <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-yellow-400" />
              {t("supportNote")}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
