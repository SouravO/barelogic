"use client";

import { useEffect, useRef } from "react";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EveryFace from "./EveryFace";
import MissionVision from "./MissionVision";
import SkinType from "./SkinType";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const mono = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

/* ------------------------------------------------------------------ */
/* Main About section                                                 */
/* Owns the page-level scroll-animation logic and chrome (background   */
/* glow, grid). Just composes the four sections above — don't add      */
/* section content here, add it to the relevant function instead.      */
/* SkinType owns its own additional canvas timeline; it still exposes  */
/* data-stage / data-reveal so this loop keeps working.                */
/* MissionVision owns its own approach + pinned mission timelines.     */
/* ------------------------------------------------------------------ */
export default function About() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(glowRef.current, {
          opacity: 1,
          duration: 2,
          ease: "sine.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });

        const stages = gsap.utils.toArray("[data-stage]", sectionRef.current);
        stages.forEach((stage) => {
          const items = stage.querySelectorAll("[data-reveal]");
          gsap.set(items, { opacity: 0, y: 26 });
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: stage,
              start: "top 72%",
              toggleActions: "play none none none",
            },
          });
        });

        const tags = gsap.utils.toArray("[data-tag]", sectionRef.current);
        if (tags.length) {
          gsap.set(tags, { opacity: 0, y: 18, scale: 0.9 });
          gsap.to(tags, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.6)",
            stagger: 0.08,
            scrollTrigger: {
              trigger: tags[0].closest("[data-stage]"),
              start: "top 65%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-tag]", { clearProps: "all", opacity: 1 });
        gsap.set(glowRef.current, { opacity: 1 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`${display.variable} ${mono.variable} relative overflow-hidden bg-[#FAF5EE] px-6 py-28 md:py-36`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 68% 22%, rgba(233,185,204,0.34) 0%, rgba(233,185,204,0.18) 22%, rgba(233,185,204,0.06) 44%, rgba(250,245,238,0) 70%), radial-gradient(circle at 18% 82%, rgba(233,185,204,0.14) 0%, rgba(233,185,204,0.06) 18%, rgba(250,245,238,0) 52%)",
        }}
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-0 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(233,185,204,0.24) 0%, rgba(201,122,160,0.12) 40%, rgba(250,245,238,0) 72%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl">
        <SkinType />
        <MissionVision />
        <EveryFace />
      </div>
    </section>
  );
}
