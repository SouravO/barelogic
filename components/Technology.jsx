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

export default function Technology() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
      className={`${display.variable} ${mono.variable} relative overflow-hidden bg-[#FAF5EE] px-6 pt-8 pb-28 md:pt-10 md:pb-36`}
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
        <div data-tech-stage className="pt-8 pb-16 text-center md:pt-10 md:pb-24">
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
