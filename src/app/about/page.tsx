import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: `${BUSINESS.displayName} arranges Seer Varisai Thattu ceremonial gift trays in ${BUSINESS.address.city}, built on hands-on experience preparing trays for weddings and receptions.`,
  path: "/about",
});

/**
 * About page.
 *
 * Written only from what is verifiably true: this is a newly launched business,
 * run by someone who has been preparing seer varisai trays for weddings and
 * receptions. There is deliberately no founding story, no years-in-business
 * figure and no events-served count — inventing those would be the same problem
 * as the fake testimonials that were removed from this site.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      <PageShell>
        <Section theme="sand" padding="md">
          <Container size="lg">
            <Heading
              eyebrow="About Us"
              title="Seer Varisai Trays, Done Properly"
              subtitle="A new business, built on real experience arranging ceremonial trays for weddings and receptions."
              align="left"
              hasDivider
            />
          </Container>
        </Section>

        <Section theme="ivory" padding="md">
          <Container size="lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 ui-prose">
                <h2>We are just starting out — and we will say so</h2>
                <p>
                  {BUSINESS.displayName} is a new business. We could dress that
                  up with talk of generations of heritage, but you would have no
                  way of checking it and it would not be true. So here is the
                  honest version instead.
                </p>
                <p>
                  What is behind this is real, hands-on experience with exactly
                  this work: taking orders for marriage functions and
                  receptions, sourcing the fruit and provisions, and arranging
                  the trays for the ceremony. That work has been done many
                  times. What is new is doing it as a business of its own, with
                  a proper way for you to find us and talk to us.
                </p>

                <h2>Why we are doing it this way</h2>
                <p>
                  Seer varisai is not decoration. The trays are how respect is
                  offered between two families, in front of everyone who
                  matters to them. Nobody wants to be worrying about them on the
                  morning of a wedding.
                </p>
                <p>
                  So our job is to take that off your hands: agree what goes on
                  each tray, source it fresh, arrange it, and have it set out at
                  your venue before the ceremony begins.
                </p>

                <h2>How we work</h2>
                <ul>
                  <li>
                    <strong>We talk first.</strong> Occasion, number of trays,
                    what should be on them, and your budget. No fixed packages
                    you have to squeeze into.
                  </li>
                  <li>
                    <strong>You get a quote before anything is committed.</strong>{" "}
                    You will know what it costs and what the advance is before
                    you pay anything.
                  </li>
                  <li>
                    <strong>We buy close to the date.</strong> Flowers, fruit
                    and sweets are bought near your event rather than held in
                    stock.
                  </li>
                  <li>
                    <strong>We deliver and set up.</strong> The trays are
                    brought to your hall or venue and arranged there, at a time
                    agreed with you.
                  </li>
                </ul>

                <h2>Judge us on the work</h2>
                <p>
                  We would rather you looked at the trays than read our
                  adjectives. The photographs on this site are all of
                  arrangements we have actually made — not stock images and not
                  someone else&apos;s work.
                </p>
                <p>
                  You will not find customer reviews on this site yet. When we
                  have served customers under this name, and they are happy to
                  be quoted, we will publish what they actually said. Until
                  then, there is nothing there — which we think tells you
                  something useful in itself.
                </p>

                <h2>Where we work</h2>
                <p>
                  We are based in {BUSINESS.address.locality},{" "}
                  {BUSINESS.address.city}, and serve{" "}
                  {BUSINESS.serviceAreas.join(" and ")}. If your venue is
                  further out, ask us — we will tell you honestly whether we can
                  do it well.
                </p>

                <div className="flex flex-wrap gap-3 mt-8 not-prose">
                  <Link href="/#enquiry-form">
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
                    >
                      Tell Us About Your Occasion
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg">
                      Contact Details
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure className="rounded-2xl overflow-hidden border border-border shadow-warm-md">
                  {/*
                    Deliberately a close-up of an arrangement rather than a wide
                    shot of a customer event: the wide shots include named
                    place cards and guests, which is a consent question rather
                    than a copyright one.
                  */}
                  <Image
                    src="/gallery/photos/white-chrysanthemum-leaf-mandala-hero.webp"
                    alt="A ceremonial tray arranged as a mandala of betel leaves, white chrysanthemums and small decorated sweet cups"
                    width={800}
                    height={600}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="w-full h-auto object-cover"
                  />
                  <figcaption className="text-xs text-muted-foreground font-sans p-3 bg-card">
                    A betel leaf and chrysanthemum thamboolam arrangement, laid
                    out ready for a ceremony.
                  </figcaption>
                </figure>
              </div>
            </div>
          </Container>
        </Section>
      </PageShell>
    </>
  );
}
