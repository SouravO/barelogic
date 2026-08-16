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

export default function Services() {
  const promiseRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!promiseRef.current) return;
        const items = promiseRef.current.querySelectorAll("[data-reveal]");
        gsap.set(items, { opacity: 0, y: 26 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: promiseRef.current, start: "top 72%", toggleActions: "play none none none" },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { clearProps: "all", opacity: 1 });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={`${display.variable} ${mono.variable}`}>
      <section
        ref={promiseRef}
        className="relative flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF5EE] px-6 py-28 text-center md:py-36"
      >
        <h2
          data-reveal
          className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl italic leading-[1.4] text-[#2B2330] sm:text-4xl md:text-5xl"
        >
          We promise to recommend only what your skin needs.
          <br />
          Nothing more.
          <br />
          Nothing less.
        </h2>
        <p data-reveal className="mt-8 font-[family-name:var(--font-mono)] text-lg text-[#2B2330]/70">
          Because trust begins with honesty.
        </p>
      </section>
    </div>
  );
}
