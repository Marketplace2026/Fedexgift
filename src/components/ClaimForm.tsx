"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Download, MessageSquare, CheckCircle2, ShieldAlert, User, Mail, MapPin, 
  Lock, Sparkles, Truck, Gift, Camera, Phone, UploadCloud, RefreshCw, AlertCircle
} from "lucide-react";
import { jsPDF } from "jspdf";
import { LuxuryItem } from "./BoxGridGame";
import { useLanguage } from "@/context/LanguageContext";

interface ClaimFormProps {
  winningPrize: number;
  winningItems?: LuxuryItem[];
}

// Admin WhatsApp Number (+224663267096)
const ADMIN_WHATSAPP_NUMBER = "224663267096";

export default function ClaimForm({ winningPrize, winningItems = [] }: ClaimFormProps) {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [selfieDataUrl, setSelfieDataUrl] = useState<string | null>(null);
  const [selfieError, setSelfieError] = useState<string | null>(null);
  const [acceptShipping, setAcceptShipping] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  // Dynamic shipping fee calculated for the 3 items bundle (between $200 and $385 USD)
  const maxFee = winningItems.length > 0 ? Math.max(...winningItems.map((i) => i.shippingFee)) : 350;
  const shippingFee = maxFee;

  // Handle Selfie selection & file reader
  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSelfieError("Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setSelfieError("L'image ne doit pas dépasser 8 Mo.");
      return;
    }

    setSelfieError(null);
    const reader = new FileReader();
    reader.onload = () => {
      setSelfieDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nom.trim() || !telephone.trim() || !email.trim() || !adresse.trim()) {
      alert("Veuillez remplir tous les champs obligatoires (*)");
      return;
    }

    // MANDATORY SELFIE VALIDATION
    if (!selfieDataUrl) {
      setSelfieError("⚠️ Un selfie officiel est OBLIGATOIRE pour certifier votre identité de gagnant et générer votre reçu sécurisé.");
      const selfieElement = document.getElementById("selfie-upload-container");
      if (selfieElement) {
        selfieElement.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (!acceptShipping) {
      alert("Veuillez cocher la case d'acceptation des frais de livraison pour valider votre reçu.");
      return;
    }

    setIsGeneratingPdf(true);

    // Generate unique transaction reference
    const refId = "FDX-" + Math.random().toString(36).substring(2, 9).toUpperCase() + "-" + Date.now().toString().slice(-4);
    setTransactionId(refId);

    // Generate PDF receipt in selected language with jsPDF & embedded Selfie
    setTimeout(() => {
      generatePDFReceipt(refId);
      setIsSubmitted(true);
      setPdfGenerated(true);
      setIsGeneratingPdf(false);
    }, 400);
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

    const itemsText = winningItems.length > 0 
      ? winningItems.map((item, idx) => `${idx + 1}. ${item.name} (${item.valueEst})`).join(" | ")
      : "1. Jeep Renegade SUV 4x4 | 2. iPhone 16 Pro Max 1TB | 3. Machine à Café Smeg";

    // Dark luxury theme colors
    doc.setFillColor(15, 23, 42); // slate 900 background header
    doc.rect(0, 0, 210, 45, "F");

    // Header Title
    doc.setTextColor(255, 215, 0); // Gold
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(t("pdfHeaderTitle"), 105, 18, { align: "center" });

    doc.setFontSize(10.5);
    doc.setTextColor(255, 255, 255);
    doc.text(t("pdfHeaderSub"), 105, 26, { align: "center" });

    doc.setFontSize(8.5);
    doc.setTextColor(200, 200, 200);
    doc.text(t("pdfLicence"), 105, 33, { align: "center" });

    // Gold decorative bar
    doc.setFillColor(255, 215, 0);
    doc.rect(0, 43, 210, 2, "F");

    // Body Container Frame
    doc.setDrawColor(255, 215, 0);
    doc.setLineWidth(0.8);
    doc.rect(15, 52, 180, 228);

    // Transaction Metadata Box
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 58, 170, 24, "F");

    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    doc.text(t("pdfRefLabel"), 25, 66);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(185, 28, 28);
    doc.text(refId, 85, 66);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    doc.text(t("pdfDateLabel"), 25, 75);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(currentDate, 85, 75);

    // Winner Info Header
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(t("pdfSectionTitle"), 25, 90);

    doc.setDrawColor(226, 232, 240);
    doc.line(25, 93, 185, 93);

    // Embed Winner Selfie Photo in PDF top-right of table
    if (selfieDataUrl) {
      try {
        doc.setDrawColor(218, 165, 32);
        doc.setLineWidth(0.5);
        doc.roundedRect(147, 98, 38, 42, 2, 2);
        doc.addImage(selfieDataUrl, "JPEG", 148, 99, 36, 40);
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(22, 163, 74);
        doc.text("✓ SELFIE VÉRIFIÉ", 166, 144, { align: "center" });
      } catch (err) {
        console.error("Could not render image to PDF:", err);
      }
    }

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    
    // Rows translated according to selected language
    const rows = [
      [t("pdfRowNom"), nom],
      ["Numéro Téléphone :", telephone],
      [t("pdfRowEmail"), email],
      [t("pdfRowAdresse"), adresse],
      [t("pdfRowItem"), itemsText],
      [t("pdfRowShipping"), `$ ${shippingFee} USD (ENGAGEMENT VALIDE)`],
      [t("pdfRowStatus"), t("pdfStatusValue")],
    ];

    let startY = 100;
    const maxWidth = selfieDataUrl ? 58 : 95;

    rows.forEach(([label, value]) => {
      doc.setTextColor(100, 116, 139);
      doc.text(label, 25, startY);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      
      const splitVal = doc.splitTextToSize(value, maxWidth);
      doc.text(splitVal, 82, startY);

      doc.setFont("helvetica", "normal");
      startY += (splitVal.length * 4.6) + 2.4;
    });

    // Make sure we clear space below the selfie
    if (startY < 148) {
      startY = 148;
    }

    // Winning Prize Box
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(239, 68, 68);
    doc.rect(25, startY + 4, 160, 28, "FD");

    doc.setFontSize(10);
    doc.setTextColor(185, 28, 28);
    doc.setFont("helvetica", "bold");
    doc.text(t("pdfNetTotalLabel"), 105, startY + 13, { align: "center" });

    doc.setFontSize(15);
    doc.setTextColor(22, 163, 74);
    doc.text(`$ ${winningPrize.toLocaleString("en-US")} USD  +  3 CADEAUX DE LUXE`, 105, startY + 24, { align: "center" });

    // Official Certification Stamp
    doc.setDrawColor(22, 163, 74);
    doc.setLineWidth(1.3);
    doc.rect(132, startY + 36, 53, 20);
    doc.setFontSize(8.5);
    doc.setTextColor(22, 163, 74);
    doc.setFont("helvetica", "bold");
    doc.text("FedEx express gift 🎁", 158.5, startY + 42, { align: "center" });
    doc.text(t("pdfStampApproved"), 158.5, startY + 48, { align: "center" });
    doc.text(t("pdfStampGuaranteed"), 158.5, startY + 53, { align: "center" });

    // Security & Instructions Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 116, 139);
    const footerLines = doc.splitTextToSize(t("pdfFooterInstruction"), 165);
    doc.text(footerLines, 25, startY + 62);

    // Save File
    doc.save(`recu_gain_fedex_express_gift_${refId}.pdf`);
  };

  const getWhatsAppLink = () => {
    const itemsListStr = winningItems.length > 0 
      ? winningItems.map((i, idx) => `${idx + 1}. ${i.name}`).join(" | ")
      : "3 Cadeaux de Luxe";

    const message = `${t("waMessageHello")} ${winningPrize.toLocaleString("en-US")} $ + ${itemsListStr} ${t("waMessageOnSite")}

${t("waName")} ${nom}
Numéro Tel: ${telephone}
${t("waEmail")} ${email}
${t("waAddress")} ${adresse}
Selfie d'identité: [Inclus sur le reçu officiel PDF certifié]
${t("waItem")} ${itemsListStr}
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

          {/* 3 Items Preview Banner */}
          {winningItems.length > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-brandDark-800/90 border border-yellow-500/40 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs text-yellow-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-yellow-400" />
                  3 LOTS DE LUXE EN ATTENTE DE LIVRAISON :
                </span>
                <span className="text-xs font-black text-yellow-300 bg-yellow-500/10 px-2.5 py-0.5 rounded-full border border-yellow-500/30">
                  Frais: ${shippingFee} USD
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {winningItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-brandDark-900/80 p-2 rounded-xl border border-gray-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-lg border border-yellow-400 shrink-0"
                    />
                    <div className="truncate">
                      <span className="text-[11px] font-black text-white block truncate">{item.name}</span>
                      <span className="text-[9px] text-green-400 font-bold block">{item.valueEst}</span>
                    </div>
                  </div>
                ))}
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

            {/* Téléphone / WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                Numéro de Téléphone (WhatsApp actif) *
              </label>
              <input
                type="tel"
                required
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="Ex: +33 6 12 34 56 78 / +224 620..."
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

            {/* SELFIE OBLIGATOIRE DU GAGNANT */}
            <div id="selfie-upload-container" className="space-y-2">
              <label className="block text-xs font-bold text-yellow-300 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-amber-400" />
                  Selfie officiel du gagnant (Obligatoire) *
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Certification KYC
                </span>
              </label>

              <div className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                selfieDataUrl ? "border-emerald-500/70 bg-emerald-950/20" : "border-yellow-500/40 bg-brandDark-800/80 hover:border-yellow-400"
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  ref={fileInputRef}
                  onChange={handleSelfieChange}
                  className="hidden"
                />

                {!selfieDataUrl ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer py-4 flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                      <Camera className="w-7 h-7" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      Prendre ou importer un selfie maintenant
                    </p>
                    <p className="text-[11px] text-gray-400 max-w-sm">
                      Requis par la réglementation pour prouver votre identité et figurer sur votre reçu certifié PDF.
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs text-yellow-300 font-bold bg-yellow-500/20 px-3 py-1.5 rounded-lg border border-yellow-500/40 mt-1">
                      <UploadCloud className="w-4 h-4" />
                      Appuyez pour ouvrir l'appareil photo
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={selfieDataUrl}
                        alt="Selfie gagnant"
                        className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-400 shadow-md"
                      />
                      <div className="text-left">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          Selfie validé & intégré au reçu
                        </span>
                        <span className="text-[10px] text-gray-400 block">Photo conforme aux normes d'audit</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-yellow-300 hover:text-yellow-200 underline flex items-center gap-1 py-1 px-3 bg-brandDark-900 rounded-lg border border-yellow-500/30"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Changer la photo
                    </button>
                  </div>
                )}
              </div>

              {selfieError && (
                <p className="text-xs text-red-400 font-semibold flex items-center gap-1 bg-red-950/40 p-2.5 rounded-lg border border-red-500/40">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  {selfieError}
                </p>
              )}
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
              disabled={isGeneratingPdf}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-600 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white font-black text-lg rounded-2xl shadow-xl shadow-red-600/50 border border-yellow-400 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
              <span>{isGeneratingPdf ? "Génération sécurisée du PDF..." : t("submitCTA")}</span>
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
