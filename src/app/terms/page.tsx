import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { pageMetadata } from "@/lib/seo";
import { BUSINESS, formattedAddress, publicName } from "@/lib/business";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `The terms on which ${BUSINESS.displayName} provides Seer Varisai Thattu ceremonial gift tray arrangements.`,
  path: "/terms",
});

const LAST_UPDATED = "2026-09-09";

export default function TermsPage() {
  const businessName = publicName();

  return (
    <LegalPageLayout
      title="Terms & Conditions"
      intro="The terms on which we provide ceremonial gift tray arrangements. Please read them before placing an order."
      lastUpdated={LAST_UPDATED}
    >
      <h2>1. Who we are</h2>
      <p>
        This website is operated by {businessName}, of {formattedAddress()}. In
        these terms, &quot;we&quot;, &quot;us&quot; and &quot;our&quot; mean{" "}
        {businessName}, and &quot;you&quot; means the person placing an enquiry
        or order.
      </p>

      <h2>2. This website is for enquiries only</h2>
      <p>
        You cannot buy anything on this website. There is no checkout, no
        payment page and no online ordering. Everything you see here is
        information about what we do, and a way to start a conversation.
      </p>
      <p>
        Submitting the enquiry form does not create a contract, reserve a date,
        or oblige either of us to anything.
      </p>

      <h2>3. Prices and quotes</h2>
      <p>
        We do not publish fixed prices, because the cost of an arrangement
        depends on the number of trays, the contents, the flowers and the
        materials you choose. Any figure we give you before we have those
        details is an estimate, not an offer.
      </p>
      <p>
        A quote we give you is valid for the period stated in it. Prices for
        fresh flowers, fruit and sweets move with the market, so a quote may be
        revised if you confirm well after it was given, or if you change what
        you have asked for.
      </p>
      {BUSINESS.gstin ? (
        <p>We are registered for GST (GSTIN: {BUSINESS.gstin}). Quotes state whether tax is included.</p>
      ) : (
        <p>
          Quotes state clearly whether any taxes apply. If our tax status
          changes, quotes will reflect it.
        </p>
      )}

      <h2>4. Placing an order</h2>
      <p>
        An order is confirmed once we have agreed the details with you in
        writing — normally over WhatsApp or email — and you have paid the
        booking advance described in our{" "}
        <Link href="/refund-policy">Cancellation &amp; Refund Policy</Link>.
      </p>
      <p>
        Please check the confirmed details carefully. Once we have bought
        materials for your event, changes may not be possible or may cost more.
      </p>

      <h2>5. What we deliver</h2>
      <p>
        We arrange and deliver the trays agreed in your order, to the venue and
        at the time agreed with you.
      </p>
      <p>
        Fresh flowers, fruit and sweets are natural products. Their exact
        colour, size and appearance vary with the season and with what is
        available on the day. We will match what was agreed as closely as we
        reasonably can, and will tell you in advance if something has to be
        substituted.
      </p>

      <h2>6. Photographs on this site</h2>
      <p>
        The photographs on this website show arrangements we have made. They are
        there to show the style and standard of our work — they are not a
        promise that your arrangement will be identical. Your arrangement will
        be built to the specification agreed with you.
      </p>

      <h2>7. Your responsibilities</h2>
      <p>You agree to:</p>
      <ul>
        <li>Give us accurate details about the date, time, venue and requirements;</li>
        <li>Make sure we can access the venue at the agreed time to set up;</li>
        <li>Tell us promptly if any of these change.</li>
      </ul>
      <p>
        If we cannot deliver or set up because access was not available, or
        because the details we were given were wrong, we cannot be responsible
        for the result.
      </p>

      <h2>8. Things outside our control</h2>
      <p>
        We are not liable for failure or delay caused by events beyond our
        reasonable control, including transport disruption, strikes, extreme
        weather, natural disasters, civil unrest, or government restrictions.
        If such an event affects your order we will contact you as soon as we
        can to agree what to do.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        Where we are at fault, our liability is limited to the amount you paid
        for the order concerned. We are not liable for indirect or consequential
        losses.
      </p>
      <p>
        Nothing in these terms limits any right you have under the Consumer
        Protection Act, 2019 or any other law that cannot be excluded by
        agreement.
      </p>

      <h2>10. Complaints</h2>
      <p>
        If something is wrong, tell us as soon as possible and ideally on the
        day, so we have a chance to put it right. Contact details are at the
        bottom of this page.
      </p>

      <h2>11. Intellectual property</h2>
      <p>
        The photographs, text and design on this website belong to us. Please do
        not reproduce them without our permission.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any dispute is subject to
        the exclusive jurisdiction of the courts of {BUSINESS.address.city},{" "}
        {BUSINESS.address.state}.
      </p>

      <h2>13. Changes to these terms</h2>
      <p>
        We may update these terms. The version that applies to your order is the
        one published when your order was confirmed.
      </p>

      <p>
        See also our <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/refund-policy">Cancellation &amp; Refund Policy</Link>.
      </p>
    </LegalPageLayout>
  );
}
