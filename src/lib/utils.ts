import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The project defines its own typography scale in globals.css — text-display,
 * text-h1..text-h4, text-body, text-body-lg, text-caption, text-eyebrow.
 *
 * tailwind-merge does not know about them. Faced with
 * `cn("text-h2", "text-foreground")` it classified both as text-colour
 * utilities, decided they conflicted, and dropped `text-h2` — which is why
 * every <Heading> title was rendering at body size instead of its heading size.
 *
 * Registering the custom scale as font-size classes tells tailwind-merge they
 * belong to a different group from colours, so both survive.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "body",
            "body-lg",
            "body-sm",
            "caption",
            "eyebrow",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
