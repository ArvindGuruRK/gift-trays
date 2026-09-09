import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageShell } from "@/components/layout/PageShell";
import { BUSINESS, mailtoHref, telHref, publicEmail } from "@/lib/business";

/**
 * Shared frame for the four policy pages, so they share one heading structure,
 * one prose style and one contact block rather than each rebuilding it.
 */
export function LegalPageLayout({
  title,
  intro,
  lastUpdated,
  children,
}: {
  title: string;
  intro: string;
  /** ISO date. Shown so a reader can see how current the policy is. */
  lastUpdated: string;
  children: React.ReactNode;
}) {
  const email = publicEmail();
  const formatted = new Date(lastUpdated).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <PageShell>
      <Section theme="sand" padding="md">
        <Container size="md">
          <nav aria-label="Breadcrumb" className="mb-4">
            <Link
              href="/"
              className="text-xs font-sans font-semibold text-primary hover:underline"
            >
              ← Back to home
            </Link>
          </nav>

          <h1 className="text-h1 font-serif font-medium text-foreground tracking-tight">
            {title}
          </h1>
          <p className="text-body-lg text-muted-foreground font-sans mt-3 max-w-2xl">
            {intro}
          </p>
          <p className="text-xs text-muted-foreground font-sans mt-4">
            Last updated:{" "}
            <time dateTime={lastUpdated}>{formatted}</time>
          </p>
        </Container>
      </Section>

      <Section theme="ivory" padding="md">
        <Container size="md">
          <div className="ui-prose">{children}</div>

          <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-secondary/40 border border-border">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
              Questions about this policy?
            </h2>
            <p className="text-sm text-muted-foreground font-sans mb-3">
              Contact {BUSINESS.displayName} and we will answer them.
            </p>
            <ul className="flex flex-col gap-1.5 text-sm font-sans">
              {email && (
                <li>
                  Email:{" "}
                  <a href={mailtoHref} className="text-primary underline underline-offset-2 [overflow-wrap:anywhere]">
                    {email}
                  </a>
                </li>
              )}
              <li>
                Phone:{" "}
                <a href={telHref} className="text-primary underline underline-offset-2">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
