import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0f1e 0%, #0d1628 40%, #0f0a2a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow orbs */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(60,224,251,0.12) 0%, transparent 70%)",
            top: "-200px",
            right: "-100px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(208,188,255,0.10) 0%, transparent 70%)",
            bottom: "-150px",
            left: "-100px",
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(60,224,251,0.08)",
            border: "1px solid rgba(60,224,251,0.25)",
            borderRadius: "999px",
            padding: "6px 18px",
            marginBottom: "24px",
          }}
        >
          <span style={{ color: "#3ce0fb", fontSize: "14px", letterSpacing: "2px" }}>
            ✦ AI • CLAUDE • GEMINI • CLOUD • PROMPT ENGINEERING
          </span>
        </div>

        {/* Arabic title */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#8ed5ff",
            marginBottom: "8px",
            letterSpacing: "-0.5px",
            direction: "rtl",
          }}
        >
          منصة تعلم ذكية من درهوس
        </div>

        {/* English title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: "800",
            color: "#ffffff",
            marginBottom: "16px",
            letterSpacing: "-1px",
            textAlign: "center",
          }}
        >
          NexaLearn by Darhous
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "20px",
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
          }}
        >
          Learn AI, Claude, Cloud & Prompt Engineering — from zero to real-world projects
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {["Claude", "Gemini", "Prompt Engineering", "Cloud", "AI Tools"].map((tag) => (
            <span
              key={tag}
              style={{
                color: "#3ce0fb",
                fontSize: "13px",
                letterSpacing: "1.5px",
                opacity: 0.7,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
