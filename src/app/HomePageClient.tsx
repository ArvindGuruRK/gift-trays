"use client";

import React, { useState } from "react";
import { SplashLoader } from "@/components/ui/SplashLoader";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Send } from "lucide-react";
import { useLenis } from "lenis/react";
import { BUSINESS, whatsappHref } from "@/lib/business";

import {
  HeroSection,
  BrandIntroSection,
  CollectionsSection,
  OccasionsSection,
  HowItWorksSection,
  GalleryPreviewSection,
  InteractiveEnquirySection,
  FinalCTASection,
} from "@/components/landing";

/**
 * Homepage body.
 *
 * Split out of `app/page.tsx` so that file can be a Server Component and export
 * `metadata` — Next.js only reads a metadata export from a Server Component, so
 * while the whole page was marked "use client" the homepage could not have its
 * own title, description or canonical URL at all.
 */
export function HomePageClient() {
  const lenis = useLenis();

  const [isSplashActive, setIsSplashActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");

  const scrollToEnquiry = () => {
    if (lenis) {
      lenis.scrollTo("#enquiry-form", { offset: -100, duration: 1.2 });
    } else {
      document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCollectionClick = (collection: {
    title: string;
    description: string;
    subtitle: string;
  }) => {
    setModalTitle(collection.title);
    setModalDescription(collection.description);
    setSelectedOccasion(collection.subtitle);
    setIsModalOpen(true);
  };

  const handleOccasionClick = (occasionName: string) => {
    setSelectedOccasion(occasionName);
    scrollToEnquiry();
  };

  // The form opens WhatsApp itself; the toast only reflects what happened.
  // It used to say "your enquiry was received" while nothing had been sent.
  const handleFormSubmit = (formData: { fullName: string }) => {
    setToastMessage(
      `Thanks ${formData.fullName} — WhatsApp should have opened with your enquiry ready to send.`
    );
    setIsToastOpen(true);
  };

  return (
    <>
      <SplashLoader onComplete={() => setIsSplashActive(false)} minDuration={2600} />

      <HeroSection isSplashActive={isSplashActive} onEnquireClick={scrollToEnquiry} />

      <CollectionsSection
        isSplashActive={isSplashActive}
        onSelectCollection={handleCollectionClick}
      />

      <BrandIntroSection />

      <OccasionsSection onSelectOccasion={handleOccasionClick} />

      <InteractiveEnquirySection onSubmitEnquiry={handleFormSubmit} />

      <HowItWorksSection />

      <GalleryPreviewSection
        onImageClick={(item) =>
          handleCollectionClick({
            title: item.title,
            description: item.location,
            subtitle: item.category,
          })
        }
      />

      <FinalCTASection onEnquireClick={scrollToEnquiry} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        description={modalDescription}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <a
              href={whatsappHref(
                `Hello ${BUSINESS.displayName}, I am interested in ${modalTitle}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ask about this on WhatsApp (opens in a new tab)"
            >
              <Button variant="whatsapp" size="sm" leftIcon={<Send className="w-4 h-4" aria-hidden="true" />}>
                Ask on WhatsApp
              </Button>
            </a>
          </>
        }
      >
        <div className="flex flex-col gap-4 py-2">
          {selectedOccasion && (
            <div className="p-4 rounded-xl bg-secondary/50 border border-border flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-success shrink-0" aria-hidden="true" />
              <div>
                <span className="text-sm font-semibold text-foreground font-sans block">
                  What you selected
                </span>
                <span className="text-xs text-muted-foreground font-sans">
                  Occasion: <strong className="text-foreground capitalize">{selectedOccasion}</strong>
                </span>
              </div>
            </div>
          )}

          {/*
            No price is shown here. The previous version displayed a fixed
            "₹26,400" package estimate regardless of what the visitor had
            chosen — a number with nothing behind it.
          */}
          <p className="text-sm text-foreground/80 leading-relaxed font-sans">
            Every arrangement is put together around your occasion, tray count
            and budget, so pricing depends on what you choose. Message us with
            your requirements and we will come back to you with a quote.
          </p>
        </div>
      </Modal>

      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        title="WhatsApp opened"
        message={toastMessage}
        type="success"
      />
    </>
  );
}
