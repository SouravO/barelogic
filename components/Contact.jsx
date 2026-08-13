"use client";

import { useEffect, useRef } from "react";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * KYS — Contact / Final CTA
 * -----------------------------------------------------------------------
 * The one dark section on the page — a deliberate contrast beat, arriving
 * only after the reader has been through the science and the promise, so
 * it reads as a culmination rather than a sales banner. Background is a
 * deep aubergine/ink blend (#221A26) already implied by the palette
 * rather than a new, unrelated dark color.
 * -----------------------------------------------------------------------
 */

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

export default function Contact() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = sectionRef.current.querySelectorAll("[data-reveal]");
        gsap.set(items, { opacity: 0, y: 24 });
        gsap.to(glowRef.current, {
          opacity: 1,
          duration: 1.8,
          ease: "sine.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { clearProps: "all", opacity: 1 });
        gsap.set(glowRef.current, { opacity: 1 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${display.variable} ${mono.variable} relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-[#221A26] px-6 py-28 text-center`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,122,160,0.16) 0%, rgba(140,90,130,0.08) 45%, rgba(34,26,38,0) 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,245,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,245,238,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        <p
          data-reveal
          className="mb-8 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[#E9B9CC]/70"
        >
          12 — Begin
        </p>
        <h2
          data-reveal
          className="mb-8 font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] text-[#FAF5EE] sm:text-5xl md:text-6xl"
        >
          Ready to Discover Your Skin?
        </h2>

        <div className="space-y-2 font-[family-name:var(--font-mono)] text-lg text-[#FAF5EE]/75 sm:text-xl">
          <p data-reveal>Stop guessing.</p>
          <p data-reveal>Start understanding.</p>
        </div>

        <p data-reveal className="mx-auto mt-6 max-w-lg font-[family-name:var(--font-mono)] text-base leading-relaxed text-[#FAF5EE]/60 sm:text-lg">
          Book your personalized skin analysis today and experience skincare built around you.
        </p>

        <div data-reveal className="mt-10">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block rounded-full px-10 py-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[#221A26] transition-transform duration-300 hover:scale-[1.03]"
            style={{ backgroundColor: "#E9B9CC" }}
          >
            Know Your Skin
          </a>
        </div>
      </div>
    </section>
  );
}