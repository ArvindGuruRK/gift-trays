/**
 * A `<script>` that runs during HTML parsing, before the first paint, without
 * tripping React's dev-mode warning.
 *
 * React warns whenever a component renders a script tag, because scripts
 * inserted through a DOM update never execute — so a script that only works on
 * the server render looks like a bug. The fix from the Next.js guide is to make
 * that explicit: emit a real executable script in the server's HTML, and an
 * inert `text/plain` one on the client, where it would never have run anyway.
 * `suppressHydrationWarning` covers the resulting `type` difference.
 *
 * See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
