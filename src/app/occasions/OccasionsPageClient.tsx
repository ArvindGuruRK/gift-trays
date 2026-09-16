"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { KolamCornerFlourish, LotusMotif } from "@/components/ui/Motifs";
import { WhatsAppLogo } from "@/components/ui/WhatsAppLogo";
import { BUSINESS, whatsappHref } from "@/lib/business";
import { CheckCircle2, Images, ListChecks, Sparkles } from "lucide-react";

interface Occasion {
  id: string;
  title: string;
  eyebrow: string;
  trays: string;
  timing: string;
  image: string;
  imageAlt: string;
  desc: string;
  highlights: string[];
  galleryCategory: string;
}

const OCCASIONS: Occasion[] = [
  {
    id: "wedding",
    title: "Wedding Ceremonies (Kalyanam)",
    eyebrow: "The Grand Celebration",
    trays: "11 to 21 Trays Set",
    timing: "Best confirmed 3–4 weeks before the date",
    image: "/gallery/photos/daisy-mandala-tray-spread.webp",
    imageAlt: "A grand wedding tray spread laid out in a daisy mandala pattern",
    desc: "The centrepiece of sacred wedding traditions. Exchanged between the bride and groom's families at the Kalyana Mandapam with ceremonial gestures of reverence.",
    highlights: [
      "Exotic fruit pyramids & dry fruit platters",
      "Pure ghee Mysore Pak & laddus",
      "Silk saree & dhoti towel folding",
      "Decorated coconuts & brass lamps",
    ],
    galleryCategory: "wedding",
  },
  {
    id: "engagement",
    title: "Engagement (Nitchayathartham)",
    eyebrow: "The Promise of Union",
    trays: "7 to 11 Trays Set",
    timing: "Best confirmed 2–3 weeks before the date",
    image: "/gallery/photos/pink-ribbon-daisy-mandala-spread-1.webp",
    imageAlt: "Engagement thamboolam trays finished with pink ribbon detailing",
    desc: "Elegant Thamboolam arrangements celebrating the official engagement and sacred marital betrothal.",
    highlights: [
      "Special ring exchange platter",
      "Fresh betel leaves & decorated betel nuts",
      "Jasmine & lotus garlands",
      "Customised sweet gift boxes",
    ],
    galleryCategory: "engagement",
  },
  {
    id: "seemantham",
    title: "Seemantham & Valaikappu",
    eyebrow: "Motherhood Blessings",
    trays: "5 to 9 Trays Set",
    timing: "Best confirmed 2 weeks before the date",
    image: "/gallery/photos/white-chrysanthemum-leaf-mandala-closeup.webp",
    imageAlt: "White chrysanthemum and leaf mandala tray arrangement",
    desc: "Warm ceremonial trays honouring expectant mothers with auspicious bangles, traditional sweets, and floral decor.",
    highlights: [
      "7 varieties of traditional sweets",
      "Glass bangles tray arrangement",
      "Lotus flower borders",
      "Silk sari presentation",
    ],
    galleryCategory: "seemantham",
  },
  {
    id: "housewarming",
    title: "Grahapravesam (Housewarming)",
    eyebrow: "Auspicious New Beginning",
    trays: "5 to 7 Trays Set",
    timing: "Best confirmed 1–2 weeks before the date",
    image: "/gallery/photos/marigold-money-leaf-centerpiece-spread.webp",
    imageAlt: "Marigold and money-leaf centrepiece surrounded by trays",
    desc: "Sacred tray arrangements welcoming prosperity into your new home with kuthuvilakku lamps and fruit baskets.",
    highlights: [
      "Polished Kamatchi Amman lamp tray",
      "Banana flower & thamboolam set",
      "Fresh coconut arrangement",
      "Assorted fruit basket",
    ],
    galleryCategory: "housewarming",
  },
  {
    id: "custom",
    title: "Custom & Other Occasions",
    eyebrow: "Bespoke Arrangements",
    trays: "Tailored Trays",
    timing: "Tell us your date and we'll confirm what's possible",
    image: "/gallery/photos/rose-mandala-pineapple-tray-spread-1.webp",
    imageAlt: "A custom rose mandala tray arrangement with pineapple and fresh fruit",
    desc: "Birthdays, anniversaries, festivals, or a theme that doesn't fit a fixed category — if it calls for a ceremonial tray, we can put it together.",
    highlights: [
      "Custom colour & flower themes",
      "Imported chocolates & specialty items",
      "Brass artefacts on request",
      "Any tray count you need",
    ],
    galleryCategory: "custom",
  },
];

const TRAY_COUNTS = [5, 7, 9, 11, 15, 21];

export function OccasionsPageClient() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* Page header                                                   */}
      {/* ------------------------------------------------------------ */}
      <Section theme="sand" padding="md" className="relative overflow-hidden">
        <KolamCornerFlourish
          size={150}
          className="absolute top-0 right-0 opacity-30 pointer-events-none scale-x-[-1]"
          aria-hidden="true"
        />
        <KolamCornerFlourish
          size={150}
          className="absolute bottom-0 left-0 opacity-30 pointer-events-none scale-y-[-1]"
          aria-hidden="true"
        />

        <Container size="lg">
          <Heading
            as="h1"
            variant="h1"
            eyebrow="Occasions We Serve"
            title="Ceremonial Trays for Every Milestone"
            subtitle="Recommended tray counts and traditional plating contents for every sacred ceremony — adjusted to your family's requirements, colours and budget."
            align="center"
            hasDivider
          />
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* How tray counts work                                          */}
      {/* ------------------------------------------------------------ */}
      <Section theme="ivory" padding="md">
        <Container size="lg">
          <div className="rounded-2xl border border-border bg-card shadow-warm-sm p-6 sm:p-8 flex flex-col lg:flex-row gap-6 lg:items-center">
            <div className="flex items-center gap-4 lg:w-1/3 shrink-0">
              <span
                aria-hidden="true"
                className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0"
              >
                <ListChecks className="w-6 h-6" />
              </span>
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  How tray counts work
                </h2>
                <p className="text-xs text-muted-foreground font-sans mt-0.5">
                  Traditionally an odd number
                </p>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                Seer Varisai sets are almost always put together in odd
                numbers — it is considered more auspicious. Larger ceremonies
                like weddings call for more trays; smaller ceremonies need
                fewer. Every number below is a starting point, not a fixed
                package — we will help you settle on the right count for your
                occasion.
              </p>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Common tray counts">
                {TRAY_COUNTS.map((count) => (
                  <span
                    key={count}
                    role="listitem"
                    className="inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-full bg-secondary/60 border border-border text-sm font-semibold font-sans text-foreground"
                  >
                    {count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Occasion detail rows                                          */}
      {/* ------------------------------------------------------------ */}
      <Section theme="ivory" padding="lg" className="pt-0">
        <Container size="lg">
          <div className="flex flex-col gap-16 sm:gap-20">
            {OCCASIONS.map((occ, idx) => {
              const reversed = idx % 2 === 1;
              return (
                <motion.article
                  key={occ.id}
                  id={occ.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center scroll-mt-28"
                >
                  <div
                    className={`lg:col-span-5 ${reversed ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <ImageFrame
                      src={occ.image}
                      alt={occ.imageAlt}
                      aspectRatio="4/3"
                      hasGoldFrame
                    />
                  </div>

                  <div
                    className={`lg:col-span-7 flex flex-col gap-5 ${
                      reversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="text-xs font-semibold uppercase text-accent-text font-sans tracking-wider">
                        {occ.eyebrow}
                      </span>
                      <Badge variant="gold" size="sm">
                        {occ.trays}
                      </Badge>
                    </div>

                    <h2 className="text-h2 font-serif font-medium text-foreground">
                      {occ.title}
                    </h2>

                    <p className="text-body-sm text-muted-foreground font-sans leading-relaxed">
                      {occ.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {occ.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-center gap-2 text-sm font-sans text-foreground/90"
                        >
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground font-mono">
                      {occ.timing} · Items &amp; colours can be changed
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Link href="/#enquiry-form">
                        <Button variant="primary" size="md">
                          Enquire About This
                        </Button>
                      </Link>
                      <a
                        href={whatsappHref(
                          `Hello ${BUSINESS.displayName}, I would like to enquire about ${occ.title}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ask about ${occ.title} on WhatsApp (opens in a new tab)`}
                      >
                        <Button
                          variant="secondary"
                          size="md"
                          leftIcon={<WhatsAppLogo size={18} />}
                        >
                          Ask on WhatsApp
                        </Button>
                      </a>
                      <Link
                        href="/gallery"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:translate-x-0.5 transition-transform font-sans"
                      >
                        <Images className="w-4 h-4" aria-hidden="true" />
                        See real examples
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Closing call to action                                        */}
      {/* ------------------------------------------------------------ */}
      <Section theme="maroon" padding="lg" className="relative overflow-hidden">
        <KolamCornerFlourish
          size={160}
          className="absolute top-0 left-0 opacity-40 pointer-events-none"
          aria-hidden="true"
        />
        <KolamCornerFlourish
          size={160}
          className="absolute bottom-0 right-0 opacity-40 pointer-events-none rotate-180"
          aria-hidden="true"
        />

        <Container size="md">
          <div className="flex flex-col items-center text-center gap-6">
            <LotusMotif size={40} className="text-accent" aria-hidden="true" />
            <Heading
              theme="dark"
              variant="h2"
              title="Not sure which occasion fits?"
              subtitle="Tell us what you're celebrating and roughly how many guests, and we will recommend a tray count and set that fits your ceremony and budget."
              align="center"
            />
            <OrnamentalDivider className="opacity-60" />
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={whatsappHref(
                  `Hello ${BUSINESS.displayName}, I would like help choosing the right Seer Varisai set for my occasion.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enquire on WhatsApp (opens in a new tab)"
              >
                <Button variant="secondary" size="lg" leftIcon={<WhatsAppLogo size={20} />}>
                  Enquire on WhatsApp
                </Button>
              </a>
              <Link href="/#enquiry-form">
                <Button
                  variant="outline"
                  size="lg"
                  className="!text-white !border-white/70 hover:!bg-white/10"
                  rightIcon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
                >
                  Use the enquiry form
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
