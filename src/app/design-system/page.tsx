"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { ProductCard } from "@/components/ui/ProductCard";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { NumberSelector } from "@/components/ui/NumberSelector";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Toast } from "@/components/ui/Toast";
import { Drawer } from "@/components/ui/Drawer";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { LotusMotif, KolamCornerFlourish, ThattuIcon } from "@/components/ui/Motifs";
import { DiyaLogo } from "@/components/ui/DiyaLogo";
import { SplashLoader } from "@/components/ui/SplashLoader";
import { COLOR_TOKENS, COLOR_USAGE_RATIOS, TYPOGRAPHY_TOKENS, SPACING_SCALE } from "@/lib/tokens";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, staggerItem, typographyRow, typographyContainer, typographyItem, eyebrowReveal, metaFade } from "@/lib/animations";
import { Sparkles, CheckCircle, Send, Heart, Eye, ArrowRight, ShieldCheck, Bell, SlidersHorizontal, Play, Film, Layers, Sliders } from "lucide-react";
import { useLenis } from "lenis/react";
import {
  GSAPHeroIntro,
  GSAPScrollReveal,
  GSAPTextReveal,
  GSAPImageReveal,
  GSAPParallax,
  GSAPHorizontalScroll,
} from "@/components/animations";

export default function DesignSystemPage() {
  const [scrollY, setScrollY] = useState<number>(0);
  const lenis = useLenis((lenisInstance) => {
    if (lenisInstance?.scroll !== undefined) {
      const val = Math.round(lenisInstance.scroll);
      setScrollY((prev) => (prev !== val ? val : prev));
    }
  });

  // Motion Demo Replay State
  const [fadeUpKey, setFadeUpKey] = useState<number>(0);
  const [staggerKey, setStaggerKey] = useState<number>(0);

  // Interactive Form State
  const [trayCount, setTrayCount] = useState<number>(7);
  const [selectedOccasion, setSelectedOccasion] = useState<string>("wedding");
  const [isAgreed, setIsAgreed] = useState<boolean>(true);
  const [isGoldChecked, setIsGoldChecked] = useState<boolean>(true);
  const [isSmChecked, setIsSmChecked] = useState<boolean>(true);
  const [isLgChecked, setIsLgChecked] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [showSplashPreview, setShowSplashPreview] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("colors");

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -120, duration: 1.2 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Interactive Splash Loader Preview */}
      {showSplashPreview && (
        <SplashLoader
          forceShow={true}
          minDuration={3000}
          onComplete={() => setShowSplashPreview(false)}
        />
      )}

      <Navbar />

      {/* Hero Header Banner */}
      <Section theme="maroon" padding="md" className="relative">
        <KolamCornerFlourish size={140} className="absolute top-0 right-0 opacity-60 pointer-events-none scale-x-[-1]" />
        <KolamCornerFlourish size={140} className="absolute bottom-0 left-0 opacity-60 pointer-events-none scale-y-[-1]" />

        <Container size="xl">
          <div className="flex flex-col items-center text-center gap-4 py-8">
            <Badge variant="gold" size="md">
              Official Brand Architecture
            </Badge>
            <Heading
              as="h1"
              variant="display"
              theme="dark"
              title="Seer Varisai Thattu Design System"
              subtitle="A complete, production-ready visual foundation combining traditional South Indian wedding heritage with modern luxury web experience."
              align="center"
              hasDivider
            />
          </div>
        </Container>
      </Section>

      {/* Sub-Navigation Tabs for Quick Jumps */}
      <div className="sticky top-16 z-30 bg-card/95 backdrop-blur-md border-b border-border shadow-warm-sm py-2">
        <Container size="xl">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-sm font-sans font-semibold">
            {[
              { id: "colors", label: "1. Colors & Tokens" },
              { id: "typography", label: "2. Typography" },
              { id: "buttons", label: "3. Buttons & CTAs" },
              { id: "cards", label: "4. Cards & Displays" },
              { id: "forms", label: "5. Form Controls" },
              { id: "sections", label: "6. Layout Themes" },
              { id: "motifs", label: "7. Traditional Motifs" },
              { id: "animations", label: "8. Motion Foundations" },
              { id: "overlays", label: "9. Overlays & Skeletons" },
              { id: "gsap-animations", label: "10. GSAP Animations" },
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => handleTabClick(e, tab.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeTab === tab.id
                    ? "bg-primary text-primary-foreground font-bold shadow-warm-sm"
                    : "text-foreground/80 hover:bg-secondary/60"
                  }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </Container>
      </div>

      {/* SECTION 1: COLORS & SEMANTIC TOKENS */}
      <Section id="colors" theme="ivory" padding="lg">
        <Container size="xl">
          <Heading
            eyebrow="Color Architecture"
            title="Brand Palette & Ratio System"
            subtitle="Carefully balanced tones communicating South Indian tradition, celebration, warmth, and luxury."
            align="left"
            hasDivider
          />

          {/* Swatches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[
              { name: "Deep Maroon", hex: "#6B1F2A", var: "--primary", role: "Primary CTAs, Brand Headings, Dark Sections", textLight: true },
              { name: "Antique Gold", hex: "#B08D57", var: "--accent", role: "Decorative Borders, Icons, Eyebrows", textLight: false },
              { name: "Warm Ivory", hex: "#FAF7F0", var: "--background", role: "Main Page & Section Background (60-70%)", textLight: false },
              { name: "Sand Beige", hex: "#E8DCC8", var: "--secondary", role: "Secondary Backgrounds & Content Cards", textLight: false },
              { name: "Dark Brown", hex: "#2B2118", var: "--foreground", role: "Primary Text, Headings & Form Labels", textLight: true },
              { name: "Soft White", hex: "#FFFDF8", var: "--card", role: "Cards, Surfaces, Modals & Dropdowns", textLight: false },
            ].map((color) => (
              <div
                key={color.name}
                className="rounded-xl border border-border bg-card p-4 shadow-warm-sm flex flex-col gap-4"
              >
                <div
                  className="w-full h-28 rounded-lg border border-black/10 flex flex-col justify-end p-3 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                >
                  <span
                    className={`font-mono text-sm font-bold ${color.textLight ? "text-white" : "text-dark-brown"
                      }`}
                  >
                    {color.hex}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-semibold text-foreground">
                      {color.name}
                    </span>
                    <code className="text-xs text-accent bg-secondary/50 px-2 py-0.5 rounded font-mono">
                      {color.var}
                    </code>
                  </div>
                  <span className="text-xs text-muted-foreground font-sans">
                    {color.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Color Ratio Distribution Bar */}
          <div className="mt-12 p-6 rounded-xl bg-card border border-border shadow-warm-sm flex flex-col gap-4">
            <h4 className="text-h4 font-medium text-foreground">
              Recommended Color Ratio Balance (docs/color-system.md)
            </h4>
            <div className="w-full h-8 rounded-lg overflow-hidden flex shadow-inner">
              <div className="bg-[#FAF7F0] w-[65%] flex items-center justify-center text-xs font-bold text-dark-brown border-r border-border">
                Warm Ivory 65%
              </div>
              <div className="bg-[#2B2118] w-[12%] flex items-center justify-center text-xs font-bold text-white">
                12%
              </div>
              <div className="bg-[#6B1F2A] w-[12%] flex items-center justify-center text-xs font-bold text-white">
                12%
              </div>
              <div className="bg-[#E8DCC8] w-[7%] flex items-center justify-center text-xs font-bold text-dark-brown">
                7%
              </div>
              <div className="bg-[#B08D57] w-[4%] flex items-center justify-center text-[10px] font-bold text-dark-brown">
                4%
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-sans">
              {COLOR_USAGE_RATIOS.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: item.hex }}
                  />
                  <span className="font-semibold text-foreground">{item.name}</span> ({item.ratio})
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <OrnamentalDivider width="lg" />

      {/* SECTION 2: TYPOGRAPHY SYSTEM */}
      <Section id="typography" theme="sand" padding="lg">
        <Container size="xl">
          <Heading
            eyebrow="Typography Hierarchy"
            title="Font Pairings & Scale"
            subtitle="Cormorant Garamond (Serif) for storytelling and headers combined with Manrope (Sans) for modern UI clarity."
            align="left"
            hasDivider
          />

          <div className="flex flex-col gap-0 mt-8 bg-card rounded-xl border border-border shadow-warm-sm overflow-hidden">
            {/* Display */}
            <motion.div
              custom={0}
              variants={typographyRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border-b border-border/60 p-8 pb-6"
            >
              <motion.span
                variants={eyebrowReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-eyebrow"
              >
                Display Header (Cormorant Garamond)
              </motion.span>
              <p className="text-display font-medium text-foreground mt-1">
                Seer Varisai Thattu
              </p>
              <motion.span
                variants={metaFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-xs text-muted-foreground font-mono"
              >
                Desktop: 72–96px | Line Height: 1.02 | Serif Display
              </motion.span>
            </motion.div>

            {/* H1 */}
            <motion.div
              custom={1}
              variants={typographyRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border-b border-border/60 px-8 py-6"
            >
              <motion.span
                variants={eyebrowReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-eyebrow"
              >
                H1 Heading
              </motion.span>
              <h1 className="text-h1 font-medium text-foreground mt-1">
                Traditional Ceremonial Gift Arrangements
              </h1>
              <motion.span
                variants={metaFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-xs text-muted-foreground font-mono"
              >
                Desktop: 56–72px | Line Height: 1.05
              </motion.span>
            </motion.div>

            {/* H2 */}
            <motion.div
              custom={2}
              variants={typographyRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border-b border-border/60 px-8 py-6"
            >
              <motion.span
                variants={eyebrowReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-eyebrow"
              >
                H2 Heading
              </motion.span>
              <h2 className="text-h2 font-medium text-foreground mt-1">
                Crafted for Weddings &amp; Auspicious Occasions
              </h2>
              <motion.span
                variants={metaFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-xs text-muted-foreground font-mono"
              >
                Desktop: 44–56px | Line Height: 1.1
              </motion.span>
            </motion.div>

            {/* H3 */}
            <motion.div
              custom={3}
              variants={typographyRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border-b border-border/60 px-8 py-6"
            >
              <motion.span
                variants={eyebrowReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-eyebrow"
              >
                H3 Heading
              </motion.span>
              <h3 className="text-h3 font-medium text-foreground mt-1">
                Signature Fruit &amp; Sweet Trays Set
              </h3>
              <motion.span
                variants={metaFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-xs text-muted-foreground font-mono"
              >
                Desktop: 32–40px | Line Height: 1.15
              </motion.span>
            </motion.div>

            {/* H4 */}
            <motion.div
              custom={4}
              variants={typographyRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border-b border-border/60 px-8 py-6"
            >
              <motion.span
                variants={eyebrowReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-eyebrow"
              >
                H4 Heading
              </motion.span>
              <h4 className="text-h4 font-medium text-foreground mt-1">
                Customized Requirements &amp; Budget Options
              </h4>
              <motion.span
                variants={metaFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-xs text-muted-foreground font-mono"
              >
                Desktop: 26–32px | Line Height: 1.2
              </motion.span>
            </motion.div>

            {/* Body Large */}
            <motion.div
              custom={5}
              variants={typographyRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border-b border-border/60 px-8 py-6"
            >
              <motion.span
                variants={eyebrowReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-eyebrow"
              >
                Body Large (Manrope)
              </motion.span>
              <p className="text-body-lg text-foreground mt-1">
                We are an artisanal studio creating handcrafted Seer Varisai gift trays with fresh flowers, traditional sweets, fruits, silk clothes, and brass decor.
              </p>
              <motion.span
                variants={metaFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-xs text-muted-foreground font-mono"
              >
                Size: 18–20px | Line Height: 1.6 | Sans Body
              </motion.span>
            </motion.div>

            {/* Body Regular */}
            <motion.div
              custom={6}
              variants={typographyRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border-b border-border/60 px-8 py-6"
            >
              <motion.span
                variants={eyebrowReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-eyebrow"
              >
                Body Regular (Manrope)
              </motion.span>
              <p className="text-body text-foreground mt-1">
                Customers can easily browse our previous work, select their occasion, specify the exact number of trays needed, and place custom enquiries directly via WhatsApp or online contact.
              </p>
              <motion.span
                variants={metaFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-xs text-muted-foreground font-mono"
              >
                Size: 16px | Line Height: 1.6
              </motion.span>
            </motion.div>

            {/* Caption */}
            <motion.div
              custom={7}
              variants={typographyRow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="px-8 py-6"
            >
              <motion.span
                variants={eyebrowReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-eyebrow"
              >
                Caption &amp; Metadata
              </motion.span>
              <p className="text-caption text-muted-foreground mt-1">
                Artisanal Studio &amp; Venue Service • 100% Authentic Quality Guarantee • Delivered to your event venue
              </p>
              <motion.span
                variants={metaFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="text-xs text-muted-foreground font-mono"
              >
                Size: 12–13px | Line Height: 1.5
              </motion.span>
            </motion.div>
          </div>
        </Container>
      </Section>

      <OrnamentalDivider width="lg" />

      {/* SECTION 3: BUTTONS & CTAS */}
      <Section id="buttons" theme="ivory" padding="lg">
        <Container size="xl">
          <Heading
            eyebrow="Interactive Elements"
            title="Buttons & Call-to-Action States"
            subtitle="Buttons designed for primary conversion, secondary navigation, WhatsApp quick contact, and loading feedback."
            align="left"
            hasDivider
          />

          <div className="flex flex-col gap-10 mt-8">
            {/* Button Variants Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-card p-6 rounded-xl border border-border shadow-warm-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase text-accent">
                  Primary Maroon
                </span>
                <Button variant="primary">Enquire Now</Button>
                <Button variant="primary" rightIcon={<Sparkles className="w-4 h-4 text-accent" />}>
                  Explore Collections
                </Button>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase text-accent">
                  Secondary Sand
                </span>
                <Button variant="secondary">View Details</Button>
                <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Our Family Story
                </Button>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase text-accent">
                  Antique Gold Accent
                </span>
                <Button variant="accent">Custom Request</Button>
                <Button variant="accent" leftIcon={<Heart className="w-4 h-4" />}>
                  Save to Wishlist
                </Button>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase text-accent">
                  WhatsApp Direct CTA
                </span>
                <Button variant="whatsapp">Quick WhatsApp</Button>
                <Button variant="whatsapp" leftIcon={<Send className="w-4 h-4" />}>
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            {/* Sizes & Special States */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded-xl border border-border shadow-warm-sm">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold uppercase text-accent">
                  Button Sizes (Small, Medium, Large)
                </span>
                <div className="flex items-center flex-wrap gap-3">
                  <Button size="sm">Small (sm)</Button>
                  <Button size="md">Medium (md)</Button>
                  <Button size="lg">Large (lg)</Button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-xs font-semibold uppercase text-accent">
                  Outline, Ghost, Loading & Disabled States
                </span>
                <div className="flex items-center flex-wrap gap-3">
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button isLoading>Submitting</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>

            {/* Badges showcase */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-warm-sm flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase text-accent">
                Badge Tags & Status Indicators
              </span>
              <div className="flex items-center flex-wrap gap-3">
                <Badge variant="gold">Wedding Seer Varisai</Badge>
                <Badge variant="maroon">Popular 11 Trays Set</Badge>
                <Badge variant="beige">Engagement Special</Badge>
                <Badge variant="outline">Custom Arrangement</Badge>
                <Badge variant="success">Verified Authentic</Badge>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <OrnamentalDivider width="lg" />

      {/* SECTION 4: CARDS & PRESENTATION DISPLAYS */}
      <Section id="cards" theme="sand" padding="lg">
        <Container size="xl">
          <Heading
            eyebrow="Presentation Components"
            title="Product Cards, Collection Banners & Testimonials"
            subtitle="Modular cards presenting Seer Varisai Thattu offerings with high imagery and warm shadows."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Product Card Sample */}
            <ProductCard
              title="Royal Wedding Seer Varisai Set"
              category="Wedding Special"
              trayCount={11}
              startingPrice="₹24,999"
              imageUrl="/gallery/photos/wedding-seer-varisai-stage.jpeg"
              imageAlt="Royal Wedding Seer Varisai Trays"
              description="Complete traditional set featuring fresh fruit arrangements, dry fruits, sweets, coconuts, flowers, and silver/brass accessories."
              onEnquire={() => setIsModalOpen(true)}
            />

            {/* Collection Card Sample */}
            <CollectionCard
              title="Engagement Thamboolam Collection"
              subtitle="Traditional Ceremonial"
              itemCount="14 Designs"
              imageUrl="/gallery/photos/betel-leaf-peacock-rose-gift.jpeg"
              imageAlt="Engagement Thamboolam Arrangements"
              onClick={() => setIsModalOpen(true)}
            />

            {/* Testimonial Card Sample */}
            <TestimonialCard
              quote="The Seer Varisai Thattu arrangement for my daughter's wedding was breathtaking! Every single guest commented on the traditional elegance and fresh flowers."
              author="Smt. Lakshmi Ramanathan"
              occasion="Wedding • 15 Trays Set"
              location="Grand Wedding Ceremony"
              rating={5}
            />
          </div>
        </Container>
      </Section>

      <OrnamentalDivider width="lg" />

      {/* SECTION 5: FORMS & INPUTS PLAYGROUND */}
      <Section id="forms" theme="ivory" padding="lg">
        <Container size="xl">
          <Heading
            eyebrow="Conversion Infrastructure"
            title="Form Controls & Enquiry Playground"
            subtitle="Accessible inputs, occasion selectors, quantity counters, and validation state feedback."
            align="left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
            {/* Form Inputs Interactive Sandbox */}
            <div className="lg:col-span-7 bg-card p-8 rounded-xl border border-border shadow-warm-md flex flex-col gap-6">
              <h3 className="text-h3 font-medium text-foreground border-b border-border/50 pb-3">
                Custom Tray Enquiry Form Demo
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  placeholder="e.g. Ramesh Sundaram"
                  defaultValue="Arvind Kumar"
                />
                <Input
                  label="Phone Number (WhatsApp) *"
                  placeholder="+91 98765 43210"
                  defaultValue="+91 98765 43210"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Event Venue Type"
                  options={[
                    { value: "mandapam", label: "Wedding Hall / Kalyana Mandapam" },
                    { value: "resort", label: "Hotel / Resort Event Space" },
                    { value: "residence", label: "Private Residence" },
                    { value: "other", label: "Other Ceremonial Venue" },
                  ]}
                />
                <Input label="Event Date" type="date" defaultValue="2026-11-15" />
              </div>

              {/* Number Selector for Tray Quantity */}
              <NumberSelector
                label="Required Number of Trays"
                value={trayCount}
                onChange={setTrayCount}
                min={3}
                max={31}
                step={2}
              />

              {/* Radio Group for Occasion */}
              <RadioGroup
                name="occasion"
                label="Select Occasion Type"
                selectedValue={selectedOccasion}
                onChange={setSelectedOccasion}
                options={[
                  { value: "wedding", label: "Wedding Seer", description: "Full traditional wedding tray sets", badge: "Popular" },
                  { value: "engagement", label: "Engagement", description: "Ring exchange & Thamboolam" },
                  { value: "seemantham", label: "Seemantham", description: "Bangles & traditional sweets" },
                ]}
              />

              <Textarea
                label="Customization Requirements & Preferences"
                placeholder="Mention preferred fruits, flower color theme, specific items needed, or budget constraints..."
                rows={3}
              />

              <Checkbox
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                label="I prefer to receive details and photos via WhatsApp"
              />

              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsModalOpen(true)}
                rightIcon={<Sparkles className="w-4 h-4 text-accent" />}
              >
                Submit Custom Tray Enquiry
              </Button>
            </div>

            {/* Input States & Validation Examples */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Checkboxes & Tick Animations Showcase */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-warm-sm flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <h4 className="text-h4 font-medium text-foreground">
                    Checkboxes & Tick Animations
                  </h4>
                  <Badge variant="maroon" size="sm">ui-checkbox</Badge>
                </div>

                {/* Primary & Accent Color Variants */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase text-accent">
                    Color Variants & Tick Marks
                  </span>
                  <Checkbox
                    variant="primary"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    label="Primary Deep Maroon Checkbox"
                    description="Fills with brand Deep Maroon and animates crisp ivory SVG tick mark on check."
                  />
                  <Checkbox
                    variant="accent"
                    checked={isGoldChecked}
                    onChange={(e) => setIsGoldChecked(e.target.checked)}
                    label="Antique Gold Accent Checkbox"
                    description="Fills with Antique Gold accent and dark tick mark."
                  />
                </div>

                {/* Checkbox Sizes */}
                <div className="flex flex-col gap-3 pt-2 border-t border-border/40">
                  <span className="text-xs font-semibold uppercase text-accent">
                    Size Options (Sm, Md, Lg)
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <Checkbox
                      size="sm"
                      checked={isSmChecked}
                      onChange={(e) => setIsSmChecked(e.target.checked)}
                      label="Small size (sm) checkbox"
                    />
                    <Checkbox
                      size="md"
                      checked={true}
                      readOnly
                      label="Medium size (md) standard"
                    />
                    <Checkbox
                      size="lg"
                      checked={isLgChecked}
                      onChange={(e) => setIsLgChecked(e.target.checked)}
                      label="Large size (lg) prominent option"
                    />
                  </div>
                </div>

                {/* Indeterminate & Disabled States */}
                <div className="flex flex-col gap-3 pt-2 border-t border-border/40">
                  <span className="text-xs font-semibold uppercase text-accent">
                    Special & Disabled States
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Checkbox
                      indeterminate
                      label="Indeterminate"
                      description="Partial selection"
                    />
                    <Checkbox
                      disabled
                      checked
                      label="Disabled Checked"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border shadow-warm-sm flex flex-col gap-4">
                <h4 className="text-h4 font-medium text-foreground">
                  Input Field States
                </h4>

                <Input
                  label="Standard Default State"
                  placeholder="Type information here..."
                />

                <Input
                  label="Input with Error State"
                  defaultValue="invalid-email-address"
                  error="Please enter a valid email or phone number."
                />

                <Input
                  label="Disabled State"
                  defaultValue="Fixed Package Discount Code"
                  disabled
                  hint="This code is automatically applied."
                />
              </div>

              <div className="bg-secondary/40 p-6 rounded-xl border border-border flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <span>Privacy & Customization Promise</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every enquiry is directly managed by our lead plating designers. We strictly safeguard customer privacy and event details.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <OrnamentalDivider width="lg" />

      {/* SECTION 6: LAYOUT CONTAINERS & SECTION THEMES */}
      <Section id="sections" theme="sand" padding="lg">
        <Container size="xl">
          <Heading
            eyebrow="Layout Architecture"
            title="Section Themes & Container Gutters"
            subtitle="Demonstrating the 5 official section themes specified in docs/color-system.md."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-xl bg-background border border-border text-foreground shadow-warm-sm flex flex-col gap-2">
              <span className="text-xs uppercase font-bold text-accent">Theme 1: Warm Ivory (Main)</span>
              <h4 className="font-serif text-xl font-medium">Warm Ivory Background</h4>
              <p className="text-xs text-muted-foreground">Primary website background (60–70% balance). Clean, airy, editorial.</p>
            </div>

            <div className="p-6 rounded-xl bg-secondary border border-border text-secondary-foreground shadow-warm-sm flex flex-col gap-2">
              <span className="text-xs uppercase font-bold text-primary">Theme 2: Sand Beige (Secondary)</span>
              <h4 className="font-serif text-xl font-medium">Sand Beige Background</h4>
              <p className="text-xs text-muted-foreground">Used for alternate content sections, collections, and background contrast.</p>
            </div>

            <div className="p-6 rounded-xl bg-primary text-primary-foreground shadow-warm-md flex flex-col gap-2">
              <span className="text-xs uppercase font-bold text-accent">Theme 3: Deep Maroon (Accent)</span>
              <h4 className="font-serif text-xl font-medium">Deep Maroon Hero Theme</h4>
              <p className="text-xs text-sand-beige/90">Used for cinematic hero headers, major CTAs, and festive highlights.</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border text-card-foreground shadow-warm-sm flex flex-col gap-2">
              <span className="text-xs uppercase font-bold text-accent">Theme 4: Soft White (Surface)</span>
              <h4 className="font-serif text-xl font-medium">Soft White Card Surface</h4>
              <p className="text-xs text-muted-foreground">Used for elevated components, product cards, forms, and dialogs.</p>
            </div>

            <div className="p-6 rounded-xl bg-background bg-kolam-pattern border border-border text-foreground shadow-warm-sm flex flex-col gap-2 md:col-span-2">
              <span className="text-xs uppercase font-bold text-accent">Theme 5: Kolam Dot Grid Overlay</span>
              <h4 className="font-serif text-xl font-medium">Traditional South Indian Texture Pattern</h4>
              <p className="text-xs text-muted-foreground">Subtle radial gold dot matrix overlay giving authentic Tamil heritage depth.</p>
            </div>
          </div>
        </Container>
      </Section>

      <OrnamentalDivider width="lg" />

      {/* SECTION 7: TRADITIONAL MOTIFS & DIVIDERS */}
      <Section id="motifs" theme="ivory" padding="lg">
        <Container size="xl">
          <Heading
            eyebrow="Cultural Identity"
            title="Traditional South Indian Motifs"
            subtitle="SVG vector graphics inspired by Tamil wedding tradition: Lotus, Kolam flourishes, and Thattu trays."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
            <div className="p-6 rounded-xl bg-card border border-border flex flex-col items-center text-center gap-3 shadow-warm-sm">
              <LotusMotif size={48} className="text-accent" />
              <h4 className="font-serif text-lg font-semibold">Lotus Floral Motif</h4>
              <p className="text-xs text-muted-foreground">Symbol of purity, prosperity, and divine blessing in Tamil weddings.</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border flex flex-col items-center text-center gap-3 shadow-warm-sm">
              <KolamCornerFlourish size={80} />
              <h4 className="font-serif text-lg font-semibold">Kolam Corner Flourish</h4>
              <p className="text-xs text-muted-foreground">Realistic traditional antique-gold Kolam corner flourish artwork asset.</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-accent/40 flex flex-col items-center text-center gap-3 shadow-warm-md bg-gradient-to-b from-amber-500/10 to-transparent">
              <DiyaLogo size={84} />
              <h4 className="font-serif text-lg font-semibold text-foreground">Diwali Diya Brand Logo</h4>
              <p className="text-xs text-muted-foreground">Official website logo featuring animated Diwali Diya Lottie animation (diwali-diya.json).</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border flex flex-col items-center text-center gap-3 shadow-warm-sm justify-between">
              <div className="w-full my-auto">
                <OrnamentalDivider width="md" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-semibold">Ornamental Divider</h4>
                <p className="text-xs text-muted-foreground">Used inside headings & footers to elegantly divide content blocks.</p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-accent/40 flex flex-col items-center text-center gap-3 shadow-warm-md bg-gradient-to-b from-maroon-dark/10 to-transparent">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <Sparkles size={24} />
              </div>
              <h4 className="font-serif text-lg font-semibold">Brass Platter Splash</h4>
              <p className="text-xs text-muted-foreground">Rotating ornate brass tray animation with gold progress bar & brand intro.</p>
              <Button
                variant="accent"
                size="sm"
                className="mt-1"
                onClick={() => setShowSplashPreview(true)}
              >
                <Play size={14} className="mr-1" /> Replay Splash Screen
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <OrnamentalDivider width="lg" />

      {/* SECTION 8: MOTION FOUNDATIONS & LENIS INTEGRATION */}
      <Section id="animations" theme="pattern" padding="lg">
        <Container size="xl">
          <Heading
            eyebrow="Motion Language"
            title="Animation Foundations & Lenis Smooth Scroll"
            subtitle="Smooth reveals powered by Motion for React and Lenis smooth scroll ticker integration."
            align="center"
            hasDivider
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* Motion Variant 1: Fade Up Entrance */}
            <div className="p-6 bg-card border border-border rounded-2xl shadow-warm-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    Motion Variant 1
                  </span>
                  <Badge variant="maroon" size="sm">fadeUp</Badge>
                </div>
                <h4 className="font-serif text-xl font-semibold text-foreground">
                  Fade Up Entrance
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Translates element vertically from <strong>y: 35px → 0px</strong> over <strong>650ms</strong> using custom luxury cubic-bezier <code>(0.22, 1, 0.36, 1)</code>.
                </p>
              </div>

              {/* Interactive Demo Container */}
              <div className="bg-secondary/40 p-4 rounded-xl border border-border/60 min-h-[140px] flex items-center justify-center relative overflow-hidden">
                <motion.div
                  key={fadeUpKey}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="p-4 bg-primary text-primary-foreground rounded-lg shadow-warm-md text-center flex flex-col items-center gap-1 w-full"
                >
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="font-serif text-sm font-semibold">Luxury Fade Up Card</span>
                  <span className="text-[11px] text-sand-beige/80 font-mono">y: 35px → 0px (650ms)</span>
                </motion.div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setFadeUpKey((prev) => prev + 1)}
                leftIcon={<Play size={14} className="text-accent" />}
              >
                Replay Fade Up Animation
              </Button>
            </div>

            {/* Motion Variant 2: Staggered Grid Reveal */}
            <div className="p-6 bg-card border border-border rounded-2xl shadow-warm-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    Motion Variant 2
                  </span>
                  <Badge variant="gold" size="sm">staggerContainer</Badge>
                </div>
                <h4 className="font-serif text-xl font-semibold text-foreground">
                  Staggered Grid Reveal
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Cascades child elements with progressive <strong>120ms delay intervals</strong> and 50ms initial container delay for natural grid choreography.
                </p>
              </div>

              {/* Interactive Demo Grid */}
              <div className="bg-secondary/40 p-3 rounded-xl border border-border/60 min-h-[140px] flex items-center justify-center">
                <motion.div
                  key={staggerKey}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 gap-2 w-full"
                >
                  {[
                    { label: "Item 01", delay: "0ms" },
                    { label: "Item 02", delay: "120ms" },
                    { label: "Item 03", delay: "240ms" },
                    { label: "Item 04", delay: "360ms" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={staggerItem}
                      className="p-2.5 bg-card border border-border rounded-lg shadow-warm-sm flex flex-col items-center justify-center text-center"
                    >
                      <span className="font-serif text-xs font-semibold text-foreground">{item.label}</span>
                      <span className="text-[10px] text-accent font-mono">+{item.delay}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setStaggerKey((prev) => prev + 1)}
                leftIcon={<Play size={14} className="text-accent" />}
              >
                Replay Staggered Grid
              </Button>
            </div>

            {/* Lenis Integration: Cinematic Smooth Scroll */}
            <div className="p-6 bg-card border border-border rounded-2xl shadow-warm-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    Lenis Integration
                  </span>
                  <Badge variant="success" size="sm">Active (Ticker Sync)</Badge>
                </div>
                <h4 className="font-serif text-xl font-semibold text-foreground">
                  Cinematic Smooth Scroll
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Driven via <strong>GSAP ticker synchronization</strong> without frame tearing. Automatically honors <code>prefers-reduced-motion</code>.
                </p>
              </div>

              {/* Real-time Lenis Status Indicator */}
              <div className="bg-secondary/40 p-4 rounded-xl border border-border/60 min-h-[140px] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border/50 pb-2 text-xs">
                  <span className="text-muted-foreground font-sans">Live Scroll Position Y:</span>
                  <code className="font-mono font-bold text-primary text-sm">{scrollY} px</code>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-muted-foreground font-sans">GSAP Ticker Rate:</span>
                  <span className="font-mono font-semibold text-foreground">60 FPS Sync</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-sans">Scroll Ease:</span>
                  <span className="font-mono text-accent font-semibold">Normalized RAF</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => lenis?.scrollTo("#overlays", { duration: 1.2, offset: -100 })}
                >
                  Scroll Down
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => lenis?.scrollTo(0, { duration: 1.5 })}
                >
                  Scroll to Top
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <OrnamentalDivider width="lg" />

      {/* SECTION 9: OVERLAYS, TOAST & SHIMMER SKELETONS */}
      <Section id="overlays" theme="ivory" padding="lg">
        <Container size="xl">
          <Heading
            eyebrow="Interactive Overlays"
            title="Skeletons, Toast Feedback & Slide-over Drawer"
            subtitle="Reusable application state indicators, loading shimmers, notifications, and responsive drawers."
            align="center"
            hasDivider
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Skeleton Shimmer Showcase */}
            <div className="p-6 bg-card border border-border rounded-xl shadow-warm-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <h4 className="font-serif text-lg font-semibold text-foreground">
                  Shimmer Skeleton Loading States
                </h4>
                <Badge variant="maroon" size="sm">ui-skeleton</Badge>
              </div>

              <div className="flex flex-col gap-3">
                <Skeleton variant="rectangular" height={160} />
                <div className="flex items-center gap-3 mt-1">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton variant="text" width="70%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Triggers */}
            <div className="p-6 bg-card border border-border rounded-xl shadow-warm-sm flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <h4 className="font-serif text-lg font-semibold text-foreground">
                  Interactive Overlays Playground
                </h4>
                <Badge variant="gold" size="sm">Overlays & Drawers</Badge>
              </div>

              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                Test the new reusable feedback components built with design system CSS variables and Motion transitions.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsToastOpen(true)}
                  leftIcon={<Bell className="w-4 h-4 text-accent" />}
                >
                  Trigger Toast Notification
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setIsDrawerOpen(true)}
                  leftIcon={<SlidersHorizontal className="w-4 h-4 text-primary" />}
                >
                  Open Filter Drawer
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <OrnamentalDivider width="lg" />

      {/* SECTION 10: GSAP CINEMATIC ANIMATION SYSTEM */}
      <Section id="gsap-animations" theme="sand" padding="lg">
        <Container size="xl">
          <Heading
            eyebrow="Cinematic Storytelling Engine"
            title="GSAP 3 Animation System Showcase"
            subtitle="Timeline-driven hero intros, clip-path mask reveals, multi-layer parallax, and pinned horizontal scrolling sections."
            align="center"
            hasDivider
          />

          <div className="flex flex-col gap-12 mt-10">
            {/* 10.1 Hero Sequence Demo */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-warm-md overflow-hidden flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-accent" />
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    1. Hero Animation Sequence Timeline
                  </h3>
                </div>
                <Badge variant="gold" size="sm">useGSAPHeroSequence</Badge>
              </div>

              <GSAPHeroIntro className="rounded-xl border border-border bg-gradient-to-b from-maroon-dark/20 to-background p-8 md:p-12 text-center flex flex-col items-center gap-4">
                <div data-hero-logo className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Sparkles size={24} />
                </div>
                <span data-hero-eyebrow className="text-eyebrow">
                  Handcrafted Tamil Wedding Excellence
                </span>
                <h2 data-hero-heading className="text-h2 font-serif font-medium text-foreground max-w-2xl">
                  Seer Varisai Thattu Artistry
                </h2>
                <p data-hero-description className="text-body text-muted-foreground max-w-lg">
                  Every tray is crafted with fresh flowers, traditional sweets, fruits, and brass embellishments.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Button data-hero-cta variant="primary" size="md">
                    Explore Collections
                  </Button>
                  <Button data-hero-cta variant="outline" size="md">
                    Book Consultation
                  </Button>
                </div>
              </GSAPHeroIntro>
            </div>

            {/* 10.2 Text & Image Reveal Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Text Line Reveal */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-warm-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      2. Masked Line Text Reveal
                    </h3>
                  </div>
                  <Badge variant="maroon" size="sm">GSAPTextReveal</Badge>
                </div>

                <GSAPTextReveal as="div" className="flex flex-col gap-3 py-4">
                  <p data-text-line className="text-h3 font-serif font-medium text-foreground">
                    "Preserving rich South Indian heritage through meticulous tray presentation."
                  </p>
                  <p data-text-line className="text-body text-muted-foreground">
                    Smooth clip-path mask reveals each paragraph line sequentially without layout shifts or text jumpiness.
                  </p>
                </GSAPTextReveal>
              </div>

              {/* Image Curtain Mask Reveal */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-warm-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-accent" />
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      3. Image Curtain Mask Reveal
                    </h3>
                  </div>
                  <Badge variant="gold" size="sm">GSAPImageReveal</Badge>
                </div>

                <GSAPImageReveal direction="up" className="h-48 w-full">
                  <img
                    src="/gallery/photos/daisy-mandala-tray-spread.jpeg"
                    alt="GSAP Mask Reveal Demo"
                    className="w-full h-full object-cover"
                  />
                </GSAPImageReveal>
              </div>
            </div>

            {/* 10.3 Scroll Parallax Showcase */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-warm-sm flex flex-col gap-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/50 pb-3 z-10">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  4. Multi-Layer Scroll Parallax
                </h3>
                <Badge variant="beige" size="sm">GSAPParallax</Badge>
              </div>

              <div className="relative h-64 rounded-xl overflow-hidden bg-secondary/40 border border-border flex items-center justify-center p-8">
                <GSAPParallax speed={-0.3} containerClassName="absolute inset-0 pointer-events-none opacity-25" className="w-full h-full">
                  <div className="w-full h-full bg-kolam-pattern scale-125" />
                </GSAPParallax>

                <GSAPParallax speed={0.15} className="z-10 text-center flex flex-col items-center gap-2">
                  <span className="text-eyebrow">Visual Depth Control</span>
                  <h4 className="text-h3 font-serif font-semibold text-primary">
                    Cinematic Multi-Depth Layers
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-md">
                    Background moves smoothly relative to foreground content, synchronized with Lenis requestAnimationFrame ticker.
                  </p>
                </GSAPParallax>
              </div>
            </div>

            {/* 10.4 Horizontal Scroll Showcase — the pinned track itself is
                rendered full-bleed below, since a pinned element has to own the
                whole viewport to read correctly. */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-warm-md flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  5. Horizontal Scroll Storytelling Track
                </h3>
                <Badge variant="gold" size="sm">GSAPHorizontalScroll</Badge>
              </div>

              <p className="text-xs text-muted-foreground font-sans">
                Keep scrolling: the section below pins the page and converts vertical scroll into
                horizontal travel. Every card passes through and the last one holds briefly before
                vertical scrolling resumes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 10.4 demo track — full-bleed so the pin fills the viewport */}
      <GSAPHorizontalScroll
        className="bg-secondary/30 border-y border-border"
        speed={1.1}
        holdRatio={0.1}
      >
        {[
          { title: "Flowers & Garlands", desc: "Fresh jasmine, marigold & lotus decor." },
          { title: "Traditional Sweets", desc: "Handcrafted ghee sweets & dry fruits." },
          { title: "Fruit Arrangements", desc: "Exotic and seasonal fruit baskets." },
          { title: "Silk & Coconuts", desc: "Kanchipuram silk towel & decorated coconuts." },
          { title: "Brass & Silver", desc: "Polished brass lamps & silver platters." },
          { title: "Paruppu Thengai", desc: "Sugar cones finished with edible gold leaf." },
          { title: "Velvet Transit", desc: "Dust-free shrouds & shock-resistant frames." },
          { title: "Stage Setup", desc: "White-glove plating at the venue." },
        ].map((item, idx) => (
          <div
            key={idx}
            className="w-80 p-6 rounded-xl bg-card border border-border shadow-warm-sm flex flex-col gap-3 shrink-0"
          >
            <span className="text-xs font-mono text-accent font-bold">
              Step {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </span>
            <h4 className="font-serif text-lg font-semibold text-foreground">{item.title}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </GSAPHorizontalScroll>

      {/* Interactive Modal Dialog Showcase */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Custom Seer Varisai Tray Request"
        description="Your enquiry details have been prepared. Our family will review and respond within 2 hours."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>

            <a
              href={`https://wa.me/919876543210?text=Hello%20Seer%20Varisai%20Thattu,%20I%20would%20like%20to%20enquire%20about%20${trayCount}%20trays%20for%20${selectedOccasion}.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="sm" leftIcon={<Send className="w-4 h-4" />}>
                Send to WhatsApp
              </Button>
            </a>
          </>
        }
      >
        <div className="flex flex-col gap-4 py-2">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-success shrink-0" />
            <div>
              <span className="text-sm font-semibold text-foreground font-sans block">
                Selected Package Summary
              </span>
              <span className="text-xs text-muted-foreground">
                Occasion: <strong className="text-foreground capitalize">{selectedOccasion}</strong> • Trays Required: <strong className="text-foreground">{trayCount} Trays Set</strong>
              </span>
            </div>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed font-sans">
            We offer completely customized Seer Varisai arrangements based on your budget, family traditions, and specific floral color palette. Click below to chat directly with us on WhatsApp!
          </p>
        </div>
      </Modal>

      {/* Toast Notification Banner */}
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        title="Enquiry Saved Successfully!"
        message="Your custom tray configuration was stored into local selection."
        type="success"
      />

      {/* Drawer Panel */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Filter Seer Varisai Trays"
        position="right"
      >
        <div className="flex flex-col gap-6 py-4">
          <RadioGroup
            name="drawerOccasion"
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
            value={trayCount}
            onChange={setTrayCount}
            min={3}
            max={31}
            step={2}
          />

          <Button variant="primary" fullWidth onClick={() => setIsDrawerOpen(false)}>
            Apply Selection Filters
          </Button>
        </div>
      </Drawer>

      <Footer />
    </div>
  );
}
