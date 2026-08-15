"use client";

import { useEffect, useRef } from "react";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const mono = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const GRADIENT =
  "linear-gradient(115deg, #3E1F3D 0%, #6E3F63 30%, #A45F86 55%, #C97AA0 75%, #E9B9CC 100%)";

const PARAMETERS = [
  "Skin Type",
  "Oil Balance",
  "Hydration",
  "Pore Health",
  "Pigmentation",
  "Acne Condition",
  "Wrinkles",
  "Fine Lines",
  "Elasticity",
  "UV Damage",
  "Skin Age",
  "Sensitivity",
  "Dark Spots",
  "Texture",
];

function DiagnosticRing({ sweepRef, className }) {
  return (
    <svg viewBox="0 0 600 600" className={className}>
      <circle cx="300" cy="300" r="280" fill="none" stroke="#2B2330" strokeOpacity="0.12" strokeWidth="1" />
      <circle cx="300" cy="300" r="220" fill="none" stroke="#2B2330" strokeOpacity="0.14" strokeWidth="1" />
      <circle cx="300" cy="300" r="160" fill="none" stroke="#2B2330" strokeOpacity="0.16" strokeWidth="1" />
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i * 360) / 60;
        const major = i % 5 === 0;
        const r1 = 280;
        const r2 = major ? 258 : 270;
        const rad = (angle * Math.PI) / 180;
        const round = (n) => Math.round(n * 100) / 100;
        return (
          <line
            key={i}
            x1={round(300 + r1 * Math.cos(rad))}
            y1={round(300 + r1 * Math.sin(rad))}
            x2={round(300 + r2 * Math.cos(rad))}
            y2={round(300 + r2 * Math.sin(rad))}
            stroke="#2B2330"
            strokeOpacity={major ? 0.24 : 0.1}
            strokeWidth="1"
          />
        );
      })}
      <g ref={sweepRef} style={{ transformOrigin: "300px 300px" }}>
        <path d="M300 300 L300 20 A280 280 0 0 1 445 96 Z" fill="url(#kys-sweep)" />
      </g>
      <defs>
        <linearGradient id="kys-sweep" x1="300" y1="20" x2="445" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A45F86" stopOpacity="0.32" />
          <stop offset="1" stopColor="#A45F86" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="5" fill="#3E1F3D" />
    </svg>
  );
}

export default function Technology() {
  const sectionRef = useRef(null);
  const sweep1Ref = useRef(null);
  const sweep2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        [sweep1Ref, sweep2Ref].forEach((ref) => {
          if (!ref.current) return;
          gsap.to(ref.current, {
            rotate: 360,
            duration: 10,
            repeat: -1,
            ease: "none",
            transformOrigin: "50% 50%",
          });
        });

        const stages = gsap.utils.toArray("[data-tech-stage]", sectionRef.current);
        stages.forEach((stage) => {
          const items = stage.querySelectorAll("[data-reveal]");
          gsap.set(items, { opacity: 0, y: 26 });
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: stage, start: "top 72%", toggleActions: "play none none none" },
          });
        });

        const tags = gsap.utils.toArray("[data-param]", sectionRef.current);
        if (tags.length) {
          gsap.set(tags, { opacity: 0, y: 16, scale: 0.92 });
          gsap.to(tags, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.6)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: tags[0]?.closest("[data-tech-stage]"),
              start: "top 68%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-param]", { clearProps: "all", opacity: 1 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className={`${display.variable} ${mono.variable} relative overflow-hidden bg-[#FAF5EE] px-6 py-28 md:py-36`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(43,35,48,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,35,48,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div data-tech-stage className="grid items-center gap-12 border-b border-[#2B2330]/10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2
              data-reveal
              className="mb-8 font-[family-name:var(--font-display)] text-5xl font-semibold italic leading-[1.05] sm:text-6xl"
              style={{
                backgroundImage: GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Don&rsquo;t Guess.
              <br />
              Know.
            </h2>
            <div className="space-y-4 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/80">
              <p data-reveal>Every skincare journey starts with one question.</p>
              <p data-reveal className="italic">What does your skin actually need?</p>
              <p data-reveal>
                Our advanced skin analysis machine provides detailed insights about your skin
                health before any product recommendation.
              </p>
              <p data-reveal className="font-semibold text-[#2B2330]">
                No assumptions.
                <br />
                Only science.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <DiagnosticRing
              sweepRef={sweep1Ref}
              className="h-[62vw] w-[62vw] max-h-[420px] max-w-[420px] sm:h-[380px] sm:w-[380px]"
            />
          </div>
        </div>

        <div className="grid items-center gap-12 border-b border-[#2B2330]/10 py-16 md:grid-cols-2 md:py-24" data-tech-stage>
          <div className="order-2 flex justify-center md:order-1">
            <DiagnosticRing
              sweepRef={sweep2Ref}
              className="h-[62vw] w-[62vw] max-h-[420px] max-w-[420px] sm:h-[380px] sm:w-[380px]"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2
              data-reveal
              className="mb-8 font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl"
            >
              Precision Meets Personal Care
            </h2>
            <div className="space-y-4 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/80">
              <p data-reveal>
                Our skin analysis system evaluates multiple skin parameters within minutes.
              </p>
              <p data-reveal>
                It helps identify visible and underlying concerns that cannot always be seen with
                naked eye.
              </p>
              <p data-reveal>
                This allows us to recommend products with greater accuracy and confidence.
              </p>
            </div>
          </div>
        </div>

        <div data-tech-stage className="py-16 text-center md:py-24">
          <h2
            data-reveal
            className="mb-12 font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl"
          >
            What We Analyze
          </h2>

          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {PARAMETERS.map((param) => (
              <span
                key={param}
                data-param
                className="rounded-full border border-[#2B2330]/15 bg-[#FFFBF6] px-5 py-2.5 font-[family-name:var(--font-mono)] text-sm text-[#2B2330]/80 shadow-[0_10px_25px_-15px_rgba(89,46,86,0.25)]"
              >
                {param}
              </span>
            ))}
          </div>

          <p
            data-reveal
            className="mx-auto mt-12 max-w-xl font-[family-name:var(--font-display)] text-xl italic text-[#2B2330]/80"
          >
            Every report creates complete picture of your skin.
          </p>
        </div>
      </div>
    </section>
  );
}
