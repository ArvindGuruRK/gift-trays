"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SplashLoader } from "@/components/ui/SplashLoader";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Send } from "lucide-react";
import { useLenis } from "lenis/react";
import { refreshScrollTrigger } from "@/lib/gsap/config";

// Neither is ever visible on first paint, so neither belongs in the initial
// chunk — they load on demand the first time something opens them.
const Modal = dynamic(() => import("@/components/ui/Modal").then((m) => m.Modal));
const Toast = dynamic(() => import("@/components/ui/Toast").then((m) => m.Toast));

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
  GALLERY_IMAGE_URLS,
  COLLECTION_IMAGE_URLS,
} from "@/components/landing";
import { getImageProps } from "next/image";
import { useImagePreloader, type PreloadEntry } from "@/lib/useImagePreloader";

/**
 * Photography warmed while the splash is on screen: the gallery grid plus the
 * collection cards. These are the two image-heavy sections, and they're what the
 * visitor scrolls to — so they should already be in cache by the time they do.
 *
 * Sized to match ImageFrame/CollectionCard's own `sizes`, otherwise the browser
 * picks a different srcset candidate and none of this is reused.
 */
const PRELOAD_IMAGE_URLS = [...COLLECTION_IMAGE_URLS, ...GALLERY_IMAGE_URLS];
const PRELOAD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * Resolved through `getImageProps` so each preload asks for exactly the srcset
 * candidate the real `<img>` will later request — preloading the raw `/public`
 * path would download every photo a second time and hit the cache zero times.
 *
 * The hook decides *when* to issue these (after `window.load`); see its comments
 * for why doing it earlier makes the whole page slower rather than faster.
 */
const PRELOAD_ENTRIES: PreloadEntry[] = PRELOAD_IMAGE_URLS.map((src) => {
  const { props } = getImageProps({ src, alt: "", fill: true, sizes: PRELOAD_SIZES });
  return { src, href: props.src, srcSet: props.srcSet, sizes: props.sizes };
});

export default function HomePage() {
  const lenis = useLenis();

  // Track active state of initial Splash Loader
  const [isSplashActive, setIsSplashActive] = useState<boolean>(true);

  // Warm the gallery + collection photography behind the splash, and report real
  // progress into it rather than animating a decorative bar.
  const preload = useImagePreloader(PRELOAD_ENTRIES);

  // Global Interactive Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("Enquiry Submitted Successfully!");

  // Selected item payload state for Modal preview
  const [modalTitle, setModalTitle] = useState<string>("Custom Seer Varisai Tray Request");
  const [modalDescription, setModalDescription] = useState<string>(
    "Your enquiry details have been prepared. Our master plating team will review and respond within 2 hours."
  );
  const [selectedOccasion, setSelectedOccasion] = useState<string>("Wedding Seer Varisai");
  const [selectedPrice, setSelectedPrice] = useState<string>("₹26,400");

  /**
   * Every ScrollTrigger start/end position was computed while the splash overlay
   * was covering the page and images were still settling in. Those measurements
   * are stale the moment it leaves — which is exactly why reveals used to fire
   * long after their section had already scrolled into view. Re-measure once,
   * here, and they line up again.
   */
  const handleSplashComplete = useCallback(() => {
    setIsSplashActive(false);
    refreshScrollTrigger();
  }, []);

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

      {/* Brand splash — a flat 3 seconds, while the collection and first gallery
          photos warm into cache behind it and the bar reports the real count.

          Note there is no `assetsReady` here, deliberately. Gating dismissal on the
          preload ties "how long is the brand moment" to "how fast is this visitor's
          connection", which is precisely how this screen became a multi-second wait
          before. Images that haven't arrived by the time it lifts simply keep
          loading behind the page. */}
      <SplashLoader
        onComplete={handleSplashComplete}
        minDuration={3000}
        progress={preload.progress}
        loadedCount={preload.loaded}
        totalCount={preload.total}
      />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Section 1: Hero Section with GSAP Timeline Sequence (waits for splash completion) */}
      <HeroSection isSplashActive={isSplashActive} onEnquireClick={scrollToEnquiry} />

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

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
