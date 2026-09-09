import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { pageMetadata } from "@/lib/seo";
import { BUSINESS, formattedAddress, mailtoHref, publicEmail, publicName, isSet } from "@/lib/business";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${BUSINESS.displayName} handles the personal details you share when enquiring about ceremonial gift tray arrangements.`,
  path: "/privacy-policy",
});

const LAST_UPDATED = "2026-09-09";

export default function PrivacyPolicyPage() {
  const businessName = publicName();
  const email = publicEmail();
  const grievance = BUSINESS.grievanceContact;

  return (
    <LegalPageLayout
      title="Privacy Policy"
      intro="What happens to your details when you contact us, in plain language."
      lastUpdated={LAST_UPDATED}
    >
      <h2>The short version</h2>
      <p>
        <strong>This website does not collect or store your personal data.</strong>{" "}
        There is no account system, no database, no analytics and no advertising
        or tracking code. The enquiry form does not send anything to a server.
      </p>
      <p>
        When you fill in the enquiry form and submit it, your browser opens
        WhatsApp with a message already written out for you. Nothing is sent
        until you press send inside WhatsApp. If you close WhatsApp without
        sending, we never see what you typed.
      </p>

      <h2>Who we are</h2>
      <p>
        {businessName} operates this website and provides Seer Varisai Thattu
        ceremonial gift tray arrangements.
      </p>
      <ul>
        <li>Address: {formattedAddress()}</li>
        <li>Phone: {BUSINESS.phoneDisplay}</li>
        {email && (
          <li>
            Email: <a href={mailtoHref}>{email}</a>
          </li>
        )}
      </ul>

      <h2>What we collect, and when</h2>
      <h3>Through this website</h3>
      <p>Nothing. The site stores no cookies and runs no tracking scripts.</p>

      <h3>When you contact us</h3>
      <p>
        Once you actually reach us — by WhatsApp, phone or email — we receive
        whatever you chose to tell us. For an enquiry that is typically:
      </p>
      <ul>
        <li>Your name</li>
        <li>Your phone number</li>
        <li>The occasion, event date and venue type</li>
        <li>The number of trays you want and any specific requirements</li>
      </ul>
      <p>
        We ask for these because we cannot quote for an arrangement without
        them. Nothing on the enquiry form is collected for any other purpose.
        There is deliberately no email field, no address field and no marketing
        opt-in — we do not need them to reply to you.
      </p>

      <h2>What we do with it</h2>
      <p>We use your details only to:</p>
      <ul>
        <li>Reply to your enquiry and discuss what you need;</li>
        <li>Prepare and send you a quote;</li>
        <li>Arrange and deliver an order, if you go ahead.</li>
      </ul>
      <p>
        <strong>We do not sell, rent or share your details</strong> with anyone
        for marketing. We do not send promotional messages to people who have
        only made an enquiry.
      </p>

      <h2>Where your messages live</h2>
      <p>
        Enquiries sent over WhatsApp are held in WhatsApp on our own phone, and
        are also handled by WhatsApp (Meta) as the messaging provider under
        their own terms and privacy policy. Emails sit in our email account.
        This is the ordinary consequence of contacting a business by those
        channels, but it is worth stating: your message passes through those
        services, not just to us.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry conversations while we are talking to you and, if you
        place an order, for as long as we need them for that order and for any
        tax or accounting records we are legally required to keep. You can ask
        us to delete your conversation at any point — see below.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the Digital Personal Data Protection Act, 2023, you have the right
        to:
      </p>
      <ul>
        <li>Ask what personal data of yours we hold;</li>
        <li>Ask us to correct anything that is wrong;</li>
        <li>Ask us to erase it, where we are not required to keep it;</li>
        <li>Withdraw consent for us to contact you;</li>
        <li>Nominate someone to exercise these rights on your behalf;</li>
        <li>Raise a grievance if you are unhappy with how we have handled your data.</li>
      </ul>
      <p>
        To do any of these, contact us using the details below. We will respond
        as quickly as we reasonably can.
      </p>

      <h2>Grievance contact</h2>
      <p>
        If you have a complaint about how your personal data has been handled,
        contact:
      </p>
      <ul>
        {isSet(grievance.name) && <li>{grievance.name}</li>}
        {isSet(grievance.email) && (
          <li>
            <a href={`mailto:${grievance.email}`}>{grievance.email}</a>
          </li>
        )}
        <li>{BUSINESS.phoneDisplay}</li>
      </ul>
      <p>
        If you are not satisfied with our response, you may escalate to the Data
        Protection Board of India.
      </p>

      <h2>Children</h2>
      <p>
        This is a service for people arranging ceremonies, and it is not
        directed at children. We do not knowingly collect personal data from
        anyone under 18.
      </p>

      <h2>Photographs on this site</h2>
      <p>
        The photographs on this website are of our own arrangements. If you
        appear in a photograph and would like it removed, contact us and we will
        take it down.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how we handle your details — for example if we ever add a
        form that stores data on a server — we will update this page and change
        the date at the top.
      </p>

      <p>
        See also our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>,{" "}
        <Link href="/terms">Terms &amp; Conditions</Link> and{" "}
        <Link href="/refund-policy">Cancellation &amp; Refund Policy</Link>.
      </p>
    </LegalPageLayout>
  );
}
