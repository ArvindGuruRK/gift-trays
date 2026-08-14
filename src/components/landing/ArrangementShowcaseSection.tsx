"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ProductCard } from "@/components/ui/ProductCard";
import { GSAPTextReveal, GSAPScrollReveal } from "@/components/animations";

export interface ArrangementProduct {
  id: string;
  title: string;
  category: string;
  trayCount: number;
  startingPrice: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
  contents: string[];
}

const PRODUCTS_DATA: ArrangementProduct[] = [
  {
    id: "prod-1",
    title: "Grand Royal Wedding Fruit & Sweet Set",
    category: "Wedding Special",
    trayCount: 15,
    startingPrice: "₹28,500",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Grand Royal Wedding Fruit & Sweet Set",
    description: "Our signature 15-tray wedding package featuring exotic fruit towers, pure ghee mysore pak, laddus, decorated coconuts, silk towel, and brass floral holders.",
    contents: ["4 Exotic Fruit Pyramids", "3 Sweets & Savories Trays", "2 Decorated Coconuts", "2 Silk & Sari Platters", "2 Betel Leaves & Supari Set", "2 Brass Lamp Trays"]
  },
  {
    id: "prod-2",
    title: "Traditional Thamboolam & Floral Trays",
    category: "Engagement",
    trayCount: 9,
    startingPrice: "₹16,000",
    imageUrl: "https://images.unsplash.com/photo-1545232979-fbf592320755?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Traditional Thamboolam & Floral Trays",
    description: "Includes fresh betel leaves, decorated betel nuts, fresh jasmine garlands, premium cashew & badam assortments, and customized gift wraps.",
    contents: ["2 Betel & Supari Trays", "2 Fresh Flower Trays", "2 Dry Fruit Boxes", "2 Ghee Sweets Trays", "1 Ring Exchange Platter"]
  },
  {
    id: "prod-3",
    title: "Classic Seemantham Sweet & Sari Set",
    category: "Seemantham",
    trayCount: 7,
    startingPrice: "₹12,500",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Classic Seemantham Sweet & Sari Set",
    description: "Features 7 varieties of traditional sweets, glass bangles arrangement, silk sari presentation tray, and lotus floral borders.",
    contents: ["1 Glass Bangles Arrangement", "2 Traditional Sweets Trays", "1 Silk Sari Folding Platter", "1 Fresh Fruit Basket", "2 Thamboolam Trays"]
  },
  {
    id: "prod-4",
    title: "Imperial 21-Tray Wedding Extravaganza",
    category: "Luxury Wedding",
    trayCount: 21,
    startingPrice: "₹45,000",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Imperial 21-Tray Wedding Extravaganza",
    description: "The ultimate traditional wedding display including brass kuthuvilakku lamps, silver kumkum chimizh, imported dry fruits, and lotus floral garlands.",
    contents: ["6 Fruit Towers", "4 Traditional Ghee Sweets", "3 Dry Fruit Platters", "3 Silk Towel & Sari Trays", "3 Thamboolam Sets", "2 Brass Lamp Trays"]
  },
  {
    id: "prod-5",
    title: "Auspicious Grahapravesam Lamp & Fruit Set",
    category: "Housewarming",
    trayCount: 5,
    startingPrice: "₹9,500",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Auspicious Grahapravesam Lamp & Fruit Set",
    description: "Designed for housewarming ceremonies, featuring polished Kamatchi Amman lamp tray, banana flower thamboolam, and seasonal fruits.",
    contents: ["1 Brass Lamp Tray", "2 Seasonal Fruit Baskets", "1 Sweets & Ladoo Box", "1 Thamboolam Coconut Set"]
  },
  {
    id: "prod-6",
    title: "Custom Lotus Floral & Fruit Basket",
    category: "Custom Theme",
    trayCount: 11,
    startingPrice: "₹22,000",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Custom Lotus Floral & Fruit Basket",
    description: "Artistic lotus floral arrangements paired with fresh pomegranate, green grape, and kiwi fruit pyramids.",
    contents: ["3 Lotus Floral Baskets", "3 Fruit Pyramids", "2 Ghee Sweets Trays", "2 Dry Fruit Bowls", "1 Custom Brass Platter"]
  }
];

interface ArrangementShowcaseSectionProps {
  onProductClick?: (product: ArrangementProduct) => void;
}

export function ArrangementShowcaseSection({ onProductClick }: ArrangementShowcaseSectionProps) {
  return (
    <Section theme="ivory" padding="lg">
      <Container size="xl">
        <GSAPTextReveal as="div">
          <Heading
            eyebrow="Signature Arrangements"
            title="Handcrafted Seer Varisai Tray Sets"
            subtitle="Explore our most popular ceremonial gift tray configurations with tray counts and starting prices."
            align="left"
            hasDivider
          />
        </GSAPTextReveal>

        <GSAPScrollReveal type="fadeUp" stagger={0.15} start="top 85%" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {PRODUCTS_DATA.map((prod) => (
            <div data-gsap-item key={prod.id}>
              <ProductCard
                title={prod.title}
                category={prod.category}
                trayCount={prod.trayCount}
                startingPrice={prod.startingPrice}
                imageUrl={prod.imageUrl}
                imageAlt={prod.imageAlt}
                description={prod.description}
                onEnquire={() => onProductClick?.(prod)}
              />
            </div>
          ))}
        </GSAPScrollReveal>
      </Container>
    </Section>
  );
}
