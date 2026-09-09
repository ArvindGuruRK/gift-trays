/**
 * Single source of truth for every real-world business fact on this site.
 *
 * Contact details, the address and the site URL used to be hardcoded in seven
 * different files (the phone number alone appeared 14 times, and it was a
 * placeholder). Anything a customer could act on — a number to call, an address
 * to visit, a policy that names the business — belongs here and nowhere else.
 *
 * Fields marked TODO block a production build; see `assertBusinessConfigured`.
 */

export const BUSINESS = {
  /**
   * Name used on the legal pages. For an unregistered sole proprietorship this
   * is normally the proprietor's own name — `displayName` is the brand.
   */
  legalName: "Rkay Enterprise",
  displayName: "Seer Varisai Thattu",
  tagline: "Traditional Ceremonial Trays",

  phoneE164: "+919841095400",
  phoneDisplay: "+91 98410 95400",
  /** wa.me/ expects digits only — no `+`, no spaces. */
  whatsappNumber: "919841095400",

  email: "kumaraguru1606@gmail.com",

  address: {
    line1: "E93/12, 15th Street",
    locality: "Periyar Nagar",
    landmark: "Near Periyar Academy School",
    city: "Chennai",
    state: "Tamil Nadu",
    postalCode: "600082",
    country: "India",
    countryCode: "IN",
  },

  serviceAreas: ["Chennai", "Tamil Nadu"],

  /**
   * Production origin, no trailing slash. Drives metadataBase, canonicals and
   * the sitemap. Currently the enterprise subdomain; moving to the apex
   * rkay.in later is a one-line change here, but set up redirects from the old
   * URLs at that point or search rankings start again from zero.
   */
  siteUrl: "https://enterprise.rkay.in",

  /**
   * GSTIN once registered, or null. Not GST-registered at present, so the terms
   * page says quotes state whether tax applies rather than showing a number,
   * and the footer omits the GSTIN line entirely.
   */
  gstin: null as string | null,

  /**
   * Grievance contact published under the DPDP Act 2023, so a customer knows
   * who to approach about their personal data.
   *
   * Naming an actual person reads better than naming the business — swap
   * `name` for the proprietor's name when you are happy to publish it.
   */
  grievanceContact: {
    name: "Rkay Enterprise",
    email: "kumaraguru1606@gmail.com",
  },

  /**
   * Deliberately absent: foundedYear, yearsActive, eventsServed, teamSize.
   * This is a new business. Any such figure would be an unsupported claim,
   * which is the whole category of content this site was cleaned of.
   */
} as const;

/** Full postal address on one line. */
export function formattedAddress(): string {
  const a = BUSINESS.address;
  return `${a.line1}, ${a.locality}, ${a.city}, ${a.state} ${a.postalCode}, ${a.country}`;
}

/** `tel:` href — E.164, the only format every dialler handles reliably. */
export const telHref = `tel:${BUSINESS.phoneE164}`;

/**
 * True once a value has been filled in. While details are pending, pages hide
 * the field rather than printing "TODO_EMAIL" at a customer.
 */
export function isSet(value: string): boolean {
  return !value.startsWith("TODO");
}

/** The email address, or null while it is still a placeholder. */
export function publicEmail(): string | null {
  return isSet(BUSINESS.email) ? BUSINESS.email : null;
}

/** The name to show publicly: the legal name once known, otherwise the brand. */
export function publicName(): string {
  return isSet(BUSINESS.legalName) ? BUSINESS.legalName : BUSINESS.displayName;
}

/** `mailto:` href. */
export const mailtoHref = `mailto:${BUSINESS.email}`;

/**
 * WhatsApp deep link with an optional prefilled message.
 * The message is only a draft in the sender's own WhatsApp — it is not
 * transmitted anywhere until they choose to send it.
 */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${BUSINESS.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Google Maps search link. A plain link, not an embed — an embed would load
 *  third-party trackers and reintroduce a cookie-consent obligation. */
export function mapsHref(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    formattedAddress()
  )}`;
}

/**
 * Origin to build absolute URLs from. `new URL()` would throw on the TODO
 * placeholder, so fall back to localhost until the real domain is set —
 * `assertBusinessConfigured` is what stops the placeholder shipping.
 */
export function resolvedSiteUrl(): string {
  const url = BUSINESS.siteUrl;
  if (url.startsWith("http")) return url.replace(/\/$/, "");
  return "http://localhost:3000";
}

/** Absolute URL for canonicals and structured data. */
export function absoluteUrl(path = "/"): string {
  return `${resolvedSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Fails the production build while placeholder values remain, so scaffolding
 * contact details cannot reach real customers the way `+91 98765 43210` did.
 * Development is left alone so the site still runs while details are pending.
 */
export function assertBusinessConfigured(): void {
  if (process.env.NODE_ENV !== "production") return;
  // Escape hatch for local production builds while details are still pending.
  // Never set this in a real deployment — it is the only thing standing between
  // placeholder contact details and real customers.
  if (process.env.SEER_ALLOW_PLACEHOLDERS === "1") {
    console.warn(
      "[business] SEER_ALLOW_PLACEHOLDERS=1 — building with placeholder business details. Do not deploy this build."
    );
    return;
  }

  const unset = Object.entries({
    legalName: BUSINESS.legalName,
    email: BUSINESS.email,
    siteUrl: BUSINESS.siteUrl,
    "grievanceContact.name": BUSINESS.grievanceContact.name,
    "grievanceContact.email": BUSINESS.grievanceContact.email,
  })
    .filter(([, value]) => value.startsWith("TODO"))
    .map(([key]) => key);

  if (unset.length > 0) {
    throw new Error(
      `src/lib/business.ts still has placeholder values: ${unset.join(", ")}. ` +
        `Fill these in before deploying — they appear in the legal pages, ` +
        `structured data and canonical URLs.`
    );
  }
}
