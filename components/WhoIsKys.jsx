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

const AUDIENCES = [
  "Teenagers managing acne.",
  "Young professionals protecting their skin.",
  "Brides and grooms preparing for their big day.",
  "Working parents with busy lifestyles.",
  "Men building skincare routines.",
  "Women seeking personalized care.",
  "Anyone who believes healthy skin begins with understanding.",
];

export default function WhoIsKys() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = sectionRef.current.querySelectorAll("[data-reveal]");
        gsap.set(items, { opacity: 0, y: 24 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", toggleActions: "play none none none" },
        });

        const slots = sectionRef.current.querySelectorAll("[data-slot]");
        gsap.set(slots, { opacity: 0, scale: 0.94 });
        gsap.to(slots, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: slots[0], start: "top 82%", toggleActions: "play none none none" },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-slot]", { clearProps: "all", opacity: 1 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="who-is-kys"
      ref={sectionRef}
      className={`${display.variable} ${mono.variable} relative overflow-hidden bg-[#FAF5EE] px-6 py-28 md:py-36`}
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        <h2
          data-reveal
          className="mb-4 text-center font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl"
        >
          Who Is KYS For?
        </h2>
        <p data-reveal className="mb-14 text-center font-[family-name:var(--font-mono)] text-lg text-[#2B2330]/75">
          KYS created for everyone.
        </p>

        <div className="mx-auto max-w-3xl space-y-5">
          {AUDIENCES.map((line, i) => (
            <p
              key={line}
              data-reveal
              className={`font-[family-name:var(--font-display)] text-2xl italic leading-snug text-[#2B2330] sm:text-3xl ${
                i % 2 === 0 ? "text-left" : "text-right"
              } ${line.startsWith("Anyone") ? "mt-4 text-center font-semibold not-italic sm:text-2xl" : ""}`}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-28 border-t border-[#2B2330]/10 pt-20 text-center md:mt-32">
          <div className="mx-auto max-w-2xl">
            <p data-reveal className="font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/75">
              Thousands begin skincare by buying products.
            </p>
            <p data-reveal className="mt-3 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/75">
              Our customers begin by understanding themselves.
            </p>
            <p data-reveal className="mt-3 font-[family-name:var(--font-display)] text-xl italic text-[#2B2330]">
              That makes all difference.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                data-slot
                className="flex h-40 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#2B2330]/15 bg-[#FFFBF6]/60"
              >
                <svg viewBox="0 0 32 24" className="h-6 w-8 text-[#2B2330]/20" fill="currentColor" aria-hidden="true">
                  <path d="M0 24V13.71C0 5.49 4.94 1.03 13.5 0v6.29c-3.94.8-6 3.31-6 6.6v.51h6V24H0Zm18.5 0V13.71c0-8.22 4.94-12.68 13.5-13.71v6.29c-3.94.8-6 3.31-6 6.6v.51h6V24h-13.5Z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
