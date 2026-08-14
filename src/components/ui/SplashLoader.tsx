"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { KolamCornerFlourish, LotusMotif } from "@/components/ui/Motifs";

const LOADING_MESSAGES = [
  "Arranging Ceremonial Gift Trays...",
  "Selecting Traditional Sweets & Thattus...",
  "Preparing Tamil Wedding Heritage...",
  "Welcome to Seer Varisai Thattu",
];

export interface SplashLoaderProps {
  /** Forced visibility toggle */
  forceShow?: boolean;
  /** Duration in ms before loader dismisses (default 3500ms) */
  minDuration?: number;
  /** Callback fired when splash animation completes */
  onComplete?: () => void;
}

export function SplashLoader({
  forceShow = false,
  minDuration = 3500,
  onComplete,
}: SplashLoaderProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [messageIndex, setMessageIndex] = useState<number>(0);

  // Set client mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Message rotation & auto-dismiss after full minDuration
  useEffect(() => {
    if (!isVisible) return;

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 750);

    const dismissTimer = setTimeout(() => {
      if (!forceShow) {
        setIsVisible(false);
      }
      if (onComplete) onComplete();
    }, minDuration);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(dismissTimer);
    };
  }, [isVisible, minDuration, forceShow, onComplete]);

  if (!isVisible && !forceShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="splash-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#3E1017] via-[#6B1F2A] to-[#2D0B10] text-amber-100 overflow-hidden select-none"
      >
        {/* Ambient Radial Glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px] pointer-events-none animate-pulse" />

        {/* Traditional Background Pattern Overlay */}
        <div className="absolute inset-0 bg-kolam-pattern opacity-10 pointer-events-none" />

        {/* 4 Corner Kolam Flourishes */}
        <KolamCornerFlourish
          size={160}
          className="absolute top-0 left-0 opacity-40 pointer-events-none"
        />
        <KolamCornerFlourish
          size={160}
          className="absolute top-0 right-0 opacity-40 pointer-events-none scale-x-[-1]"
        />
        <KolamCornerFlourish
          size={160}
          className="absolute bottom-0 left-0 opacity-40 pointer-events-none scale-y-[-1]"
        />
        <KolamCornerFlourish
          size={160}
          className="absolute bottom-0 right-0 opacity-40 pointer-events-none rotate-180"
        />

        {/* Main Center Content Box */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg w-full">
          {/* Rotating Brass Platter Video inside Circular Ornamental Frame */}
          <div className="relative mb-8">
            {/* Outer Decorative Ring */}
            <div className="absolute -inset-4 rounded-full border border-accent/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-2 rounded-full border border-dashed border-accent/50" />

            {/* Inner Circular Base */}
            <div className="w-64 h-64 sm:w-[300px] sm:h-[300px] rounded-full bg-[#4A141D]/90 border-2 border-accent/60 shadow-2xl shadow-accent/30 flex items-center justify-center p-0 backdrop-blur-md overflow-hidden">
              {isMounted ? (
                <video
                  src="/lottie/Ornate_brass_platter_rotating_202608112357-Picsart-BackgroundRemover.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain pointer-events-none drop-shadow-xl scale-[1.65]"
                />
              ) : (
                <LotusMotif size={80} className="text-accent animate-pulse" />
              )}
            </div>
          </div>

          {/* Eyebrow & Brand Title */}
          <div className="flex flex-col items-center gap-1.5 mb-6">
            <div className="flex items-center gap-2 text-accent/80 text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em]">
              <span className="w-8 h-[1px] bg-accent/40" />
              <span>HANDCRAFTED HERITAGE</span>
              <span className="w-8 h-[1px] bg-accent/40" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-accent drop-shadow-md">
              Seer Varisai Thattu
            </h1>
          </div>

          {/* Progress Bar & Status Text */}
          <div className="w-full flex flex-col items-center gap-3.5">
            {/* Rotating Auspicious Loading Messages */}
            <div className="h-6 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs sm:text-sm text-amber-200/90 font-sans tracking-wide"
                >
                  {LOADING_MESSAGES[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Custom Progress Track */}
            <div className="w-72 sm:w-96 h-2.5 bg-black/40 rounded-full overflow-hidden border border-accent/30 p-[1px] relative shadow-inner">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: minDuration / 1000, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 rounded-full shadow-[0_0_12px_rgba(234,179,8,0.6)] relative"
              >
                {/* Shimmer leading edge */}
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/80 blur-[2px] rounded-full" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
