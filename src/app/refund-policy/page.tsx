import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { pageMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = pageMetadata({
  title: "Cancellation & Refund Policy",
  description: `How booking advances, cancellations and refunds work for ${BUSINESS.displayName} orders.`,
  path: "/refund-policy",
});

const LAST_UPDATED = "2026-09-09";

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Cancellation & Refund Policy"
      intro="How the booking advance works, and what happens if an order is cancelled. Please read this before paying an advance."
      lastUpdated={LAST_UPDATED}
    >
      {/*
        The advance is non-refundable. Under the Consumer Protection Act 2019 a
        term like this is defensible when it is disclosed clearly and up front,
        and vulnerable when it is buried — so it is stated plainly, the reason
        is given, and our own obligations are set out alongside it.
      */}
      <h2>In short</h2>
      <p>
        We take a <strong>booking advance</strong> to confirm an order, and that{" "}
        <strong>advance is not refundable</strong> if you cancel. Please be sure
        of your date before you pay it.
      </p>

      <h2>Why the advance is not refundable</h2>
      <p>
        When you confirm an order we commit to your date. We turn down other
        work for that day, and we plan and begin buying materials for your
        event. Flowers, fruit and sweets are bought fresh and cannot be resold
        or kept. The advance covers that commitment.
      </p>

      <h2>Paying the advance</h2>
      <ul>
        <li>
          The advance amount is agreed with you in writing before you pay it,
          and is stated in your quote.
        </li>
        <li>
          Your order is confirmed only once the advance has been received.
        </li>
        <li>
          The balance is payable as set out in your quote, normally on or before
          the day of delivery.
        </li>
        <li>
          <strong>
            We will not ask you for an advance without first telling you that it
            is non-refundable.
          </strong>
        </li>
      </ul>

      <h2>If you cancel</h2>
      <p>
        Tell us as soon as you can — by WhatsApp, phone or email — so we can
        stop work and free up the date.
      </p>
      <ul>
        <li>The booking advance is not returned.</li>
        <li>
          If you have paid more than the advance, we return the amount above the
          advance, less anything we have already spent on materials specifically
          for your order. We will show you what those costs were.
        </li>
        <li>
          If you cancel after materials have been bought and prepared, the full
          amount for those may be payable.
        </li>
      </ul>

      <h2>If you move your date</h2>
      <p>
        We would rather move your booking than lose it. If you tell us well
        before the event and we are free on your new date, we will normally
        carry the advance across to the new date at no extra charge. This
        depends on our availability, so please ask as early as possible.
      </p>

      <h2>If we cancel</h2>
      <p>
        If we cannot fulfil your order for any reason on our side, you get{" "}
        <strong>everything you have paid us back in full</strong>, including the
        advance. Where we can, we will also help you find an alternative
        supplier.
      </p>
      <p>
        If an event outside anyone&apos;s control prevents delivery — see
        clause 8 of our <Link href="/terms">Terms &amp; Conditions</Link> — we
        will discuss with you whether to move the date or refund what has not
        already been spent on your order.
      </p>

      <h2>If something is wrong with the order</h2>
      <p>
        This policy covers cancellations, not quality. If an arrangement is not
        what was agreed, that is a different matter: tell us on the day if you
        can, and we will put it right or agree a fair reduction with you.
        Nothing here affects your rights under the Consumer Protection Act,
        2019.
      </p>

      <h2>How refunds are paid</h2>
      <p>
        Refunds are paid by the same method you paid us, within 7 to 10 working
        days of us agreeing the amount.
      </p>

      <h2>Questions before you pay</h2>
      <p>
        If any part of this is unclear, ask us before paying an advance. We
        would much rather explain it now than disagree about it later.
      </p>
    </LegalPageLayout>
  );
}
