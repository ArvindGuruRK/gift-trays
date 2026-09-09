import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/business";

export const alt = `${BUSINESS.displayName} — Traditional Ceremonial Gift Trays`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Generated rather than shipped as a file so it stays in
 * step with the business name and city.
 *
 * ImageResponse supports only flexbox and a subset of CSS — no grid.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#6B1F2A",
          color: "#FFFDF8",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D0B27C",
            fontWeight: 600,
          }}
        >
          {BUSINESS.tagline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 24,
            letterSpacing: "-0.02em",
          }}
        >
          {BUSINESS.displayName}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            marginTop: 28,
            color: "#E8DCC8",
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          Custom ceremonial gift trays for weddings, engagements and traditional
          ceremonies in {BUSINESS.address.city}.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            height: 6,
            width: 180,
            background: "#B08D57",
            borderRadius: 999,
          }}
        />
      </div>
    ),
    size
  );
}
