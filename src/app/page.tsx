"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SplashLoader } from "@/components/ui/SplashLoader";
import { Modal } from "@/components/ui/Modal";
import { Drawer } from "@/components/ui/Drawer";
import { Toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { NumberSelector } from "@/components/ui/NumberSelector";
import { CheckCircle, Send, MessageCircle, Sparkles } from "lucide-react";
import { useLenis } from "lenis/react";

import {
  HeroSection,
  BrandIntroSection,
  CollectionsSection,
  OccasionsSection,
  HowItWorksSection,
  GalleryPreviewSection,
  TestimonialsSection,
  InteractiveEnquirySection,
  FinalCTASection,
} from "@/components/landing";

export default function HomePage() {
  const lenis = useLenis();

  // Track active state of initial Splash Loader
  const [isSplashActive, setIsSplashActive] = useState<boolean>(true);
  // Real load state of the hero visual — lets the splash wait on the actual image
  // instead of a fixed timer, so it never dismisses onto a still-loading hero.
  const [isHeroImageReady, setIsHeroImageReady] = useState<boolean>(false);

  // Global Interactive Modal & Drawer State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("Enquiry Submitted Successfully!");

  // Selected item payload state for Modal preview
  const [modalTitle, setModalTitle] = useState<string>("Custom Seer Varisai Tray Request");
  const [modalDescription, setModalDescription] = useState<string>(
    "Your enquiry details have been prepared. Our master plating team will review and respond within 2 hours."
  );
  const [selectedTrays, setSelectedTrays] = useState<number>(11);
  const [selectedOccasion, setSelectedOccasion] = useState<string>("Wedding Seer Varisai");
  const [selectedPrice, setSelectedPrice] = useState<string>("₹26,400");

  const scrollToEnquiry = () => {
    if (lenis) {
      lenis.scrollTo("#enquiry-form", { offset: -100, duration: 1.2 });
    } else {
      document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCollectionClick = (collection: any) => {
    setModalTitle(collection.title);
    setModalDescription(collection.description);
    setSelectedTrays(11);
    setSelectedOccasion(collection.subtitle);
    setSelectedPrice("Custom Budget");
    setIsModalOpen(true);
  };

  const handleOccasionClick = (occasionName: string) => {
    setSelectedOccasion(occasionName);
    scrollToEnquiry();
  };

  const handleFormSubmit = (formData: any) => {
    setToastMessage(`Thank you ${formData.fullName}! Your enquiry for ${formData.trayCount} trays was received.`);
    setIsToastOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Brand Animated Splash Loader — waits on the real hero image, not a guessed timer */}
      <SplashLoader
        onComplete={() => setIsSplashActive(false)}
        minDuration={2600}
        assetsReady={isHeroImageReady}
      />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Section 1: Hero Section with GSAP Timeline Sequence (waits for splash completion) */}
      <HeroSection
        isSplashActive={isSplashActive}
        onEnquireClick={scrollToEnquiry}
        onHeroImageReady={() => setIsHeroImageReady(true)}
      />

      {/* Section 2: Filterable Collections Portfolio */}
      <CollectionsSection onSelectCollection={handleCollectionClick} />

      {/* Section 3: Brand Heritage & Story */}
      <BrandIntroSection />

      {/* Section 4: Occasions We Serve */}
      <OccasionsSection onSelectOccasion={handleOccasionClick} />

      {/* Section 5: Conversion Infrastructure - Interactive Consultation & Enquiry Form */}
      <InteractiveEnquirySection onSubmitEnquiry={handleFormSubmit} />

      {/* Section 6: Step-by-Step GSAP Horizontal Scroll Track */}
      <HowItWorksSection />

      {/* Section 7: Real Photo Gallery Preview */}
      <GalleryPreviewSection onImageClick={(item) => handleCollectionClick({ title: item.title, description: item.location, subtitle: item.category })} />

      {/* Section 8: Verified Customer Testimonials */}
      <TestimonialsSection />

      {/* Section 9: Final Deep Maroon Festive CTA */}
      <FinalCTASection onEnquireClick={scrollToEnquiry} />

      {/* Global Interactive Modal Dialog */}
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
              href={`https://wa.me/919876543210?text=Hello%20Seer%20Varisai%20Thattu,%20I%20am%20interested%20in%20${encodeURIComponent(modalTitle)}.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="sm" leftIcon={<Send className="w-4 h-4" />}>
                Direct WhatsApp Quote
              </Button>
            </a>
          </>
        }
      >
        <div className="flex flex-col gap-4 py-2">
          <div className="p-4 rounded-xl bg-secondary/50 border border-border flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-success shrink-0" />
            <div>
              <span className="text-sm font-semibold text-foreground font-sans block">
                Selected Arrangement Summary
              </span>
              <span className="text-xs text-muted-foreground font-sans">
                Occasion: <strong className="text-foreground capitalize">{selectedOccasion}</strong> • Package Estimate: <strong className="text-primary font-bold">{selectedPrice}</strong>
              </span>
            </div>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed font-sans">
            Every arrangement is tailored to your event requirements, traditional gestures, and venue stage décor. Click below to chat directly with our plating specialists on WhatsApp!
          </p>
        </div>
      </Modal>

      {/* Global Toast Notification */}
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        title="Enquiry Received"
        message={toastMessage}
        type="success"
      />

      {/* Global Slide-over Filter Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Filter Seer Varisai Trays"
        position="right"
      >
        <div className="flex flex-col gap-6 py-4">
          <RadioGroup
            name="globalDrawerOccasion"
            label="Occasion Category"
            selectedValue={selectedOccasion}
            onChange={setSelectedOccasion}
            layout="vertical"
            options={[
              { value: "wedding", label: "Wedding Seer (11-21 Trays)" },
              { value: "engagement", label: "Engagement (7-11 Trays)" },
              { value: "seemantham", label: "Seemantham (5-9 Trays)" },
            ]}
          />

          <NumberSelector
            label="Tray Quantity"
            value={selectedTrays}
            onChange={setSelectedTrays}
            min={3}
            max={31}
            step={2}
          />

          <Button variant="primary" fullWidth onClick={() => setIsDrawerOpen(false)}>
            Apply Filters
          </Button>
        </div>
      </Drawer>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
