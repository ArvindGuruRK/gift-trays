"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { GSAPTextReveal, GSAPScrollReveal } from "@/components/animations";

const REVIEWS = [
  {
    quote: "The Seer Varisai Thattu arrangement for my daughter's wedding was breathtaking! Every single guest commented on the traditional elegance and packed floral plating.",
    author: "Smt. Lakshmi Ramanathan",
    occasion: "Wedding • 15 Trays Set",
    location: "Grand Wedding Ceremony",
    rating: 5
  },
  {
    quote: "On-time delivery right to our wedding venue. The packed tray decor and floral plating matched our stage background flawlessly. Impeccable professional service!",
    author: "Sri. Vigneshwaran K.",
    occasion: "Engagement • 11 Trays Set",
    location: "Nitchayathartham Rituals",
    rating: 5
  },
  {
    quote: "Superb attention to detail! The bangles tray and sweet arrangement for my sister's seemantham were so beautifully crafted.",
    author: "Smt. Ananya Sundar",
    occasion: "Seemantham • 9 Trays Set",
    location: "Seemantham Celebration",
    rating: 5
  },
  {
    quote: "We ordered 21 grand wedding trays for our son's marriage. The stacked fruit pyramids stayed fresh all day, and the brass lamps were sparkling clean.",
    author: "Sri. Natarajan Swaminathan",
    occasion: "Wedding • 21 Trays Set",
    location: "Imperial Wedding Reception",
    rating: 5
  },
  {
    quote: "Bespoke plating service! They customized the tray count to fit our requirements while maintaining top-class traditional presentation and packed tray art.",
    author: "Smt. Meenakshi Sundaram",
    occasion: "Grahapravesam • 7 Trays Set",
    location: "Grahapravesam Ceremony",
    rating: 5
  },
  {
    quote: "Prompt WhatsApp response and exact photo preview before event day. Truly trustworthy studio for authentic Indian wedding traditions and sacred gestures.",
    author: "Sri. Karthik Subramanian",
    occasion: "Engagement • 9 Trays Set",
    location: "Marital Betrothal Event",
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <Section theme="sand" padding="lg">
      <Container size="xl">
        <GSAPTextReveal as="div">
          <Heading
            eyebrow="Customer Trust &amp; Reviews"
            title="What Our Clients Say"
            subtitle="Authentic feedback from hosts who trusted us with their grand wedding and ceremonial tray arrangements."
            align="center"
            hasDivider
          />
        </GSAPTextReveal>

        <GSAPScrollReveal type="scaleIn" stagger={0.12} start="top 85%" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {REVIEWS.map((rev, idx) => (
            <div data-gsap-item key={idx}>
              <TestimonialCard
                quote={rev.quote}
                author={rev.author}
                occasion={rev.occasion}
                location={rev.location}
                rating={rev.rating}
              />
            </div>
          ))}
        </GSAPScrollReveal>
      </Container>
    </Section>
  );
}
