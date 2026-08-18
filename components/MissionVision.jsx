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
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const mono = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

// Icon components
const TargetIcon = () => (
  <svg className="w-5 h-5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const MonitorIcon = () => (
  <svg className="w-5 h-5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-4v4" />
  </svg>
);

const FlaskIcon = () => (
  <svg className="w-5 h-5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

export default function MissionVision() {
  const containerRef = useRef(null);
  const parallaxImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax movement for the central image inside the mask
      if (parallaxImgRef.current && containerRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -14, scale: 1.15 },
          {
            yPercent: 14,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Smooth offset scrolling for individual floating cards
      const cards = gsap.utils.toArray("[data-floating-card]", containerRef.current);
      cards.forEach((card, index) => {
        const offset = (index % 2 === 0 ? 1 : -1) * (20 + index * 8);
        gsap.fromTo(
          card,
          { y: offset },
          {
            y: -offset,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`${display.variable} ${mono.variable} relative left-1/2 min-h-screen w-screen -translate-x-1/2 overflow-hidden bg-[#FAF5EE] px-4 py-16 text-[#2B2330] sm:px-8 lg:px-16`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 18% 20%, rgba(233,185,204,0.18) 0%, rgba(233,185,204,0.08) 20%, rgba(250,245,238,0) 48%), radial-gradient(circle at 80% 12%, rgba(201,122,160,0.12) 0%, rgba(201,122,160,0.06) 18%, rgba(250,245,238,0) 42%)",
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10 mb-12 lg:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          <div className="lg:col-span-8">
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.08] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-[#3E1F3D] via-[#6E3F63] to-[#A45F86] bg-clip-text text-transparent">
                KNOW YOUR SKIN
              </span>
              <br />
              <span className="mt-2 block font-[family-name:var(--font-display)] text-3xl font-semibold italic leading-[1.12] text-[#2B2330]/90 sm:text-5xl lg:text-6xl">
                before you treat it.
              </span>
            </h1>

            <p className="mt-6 max-w-lg font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[#2B2330]/75 sm:text-base">
              Modern skincare has become confusing. Thousands of products, thousands of ingredients, and thousands of opinions. But only one thing truly matters: understanding your skin.
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-4 relative h-36">
            <svg
              className="absolute -top-2 -left-8 h-[200px] w-[320px] pointer-events-none text-[#6E3F63]/35"
              viewBox="0 0 300 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M 10 20 C 150 -30, 290 50, 240 180" strokeDasharray="0" />
              <path d="M 235 170 L 240 180 L 248 172" fill="none" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative min-h-[780px] lg:min-h-[880px] flex items-center justify-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] sm:w-[65%] lg:w-[48%] aspect-[4/5] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] overflow-hidden shadow-[0_24px_45px_-28px_rgba(43,35,48,0.55)] z-0 border border-[#2B2330]/10 bg-[#F1E9E0]">
          <div
            ref={parallaxImgRef}
            className="absolute inset-0 h-[128%] w-full -top-[14%] bg-cover bg-center"
            style={{
              backgroundImage: `url('/parallax.png')`,
            }}
          />
        </div>

        <div className="relative z-10 grid w-full grid-cols-1 gap-6 my-auto py-8 md:grid-cols-2 lg:gap-16">
          <div
            data-floating-card
            className="md:col-span-1 md:max-w-md rounded-[1.5rem] border border-[#A45F86]/15 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF5F8_100%)] p-6 shadow-[0_18px_40px_-25px_rgba(89,46,86,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_22px_45px_-25px_rgba(89,46,86,0.35)] sm:p-8"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#A45F86]/20 bg-gradient-to-br from-[#F8E9F0] to-[#F4DDE9] shadow-sm">
              <TargetIcon />
            </div>
            <span className="mb-2 block font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.22em] text-[#6E3F63]">
              Our Mission
            </span>
            <h2 className="mb-3 font-[family-name:var(--font-display)] text-[clamp(1.45rem,2.3vw,2rem)] font-semibold italic leading-[1.15] text-[#2B2330]">
              Informed Skincare Decisions
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[#2B2330]/75">
              KYS exists to help people make informed skincare decisions through advanced skin diagnostics and personalized product recommendations.
            </p>
          </div>

          <div
            data-floating-card
            className="md:col-span-1 md:col-start-2 md:ml-auto md:mt-16 md:max-w-md rounded-[1.5rem] border border-[#A45F86]/15 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF5F8_100%)] p-6 shadow-[0_18px_40px_-25px_rgba(89,46,86,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_22px_45px_-25px_rgba(89,46,86,0.35)] sm:p-8"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#A45F86]/20 bg-gradient-to-br from-[#F8E9F0] to-[#F4DDE9] shadow-sm">
              <EyeIcon />
            </div>
            <span className="mb-2 block font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.22em] text-[#6E3F63]">
              Our Vision
            </span>
            <h2 className="mb-3 font-[family-name:var(--font-display)] text-[clamp(1.45rem,2.3vw,2rem)] font-semibold italic leading-[1.15] text-[#2B2330]">
              Trusted Personalization
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[#2B2330]/75">
              To become India’s most trusted personalized skincare company by combining technology, science, and skincare into one seamless experience.
            </p>
          </div>

          <div
            data-floating-card
            className="md:col-span-1 md:max-w-md rounded-[1.5rem] border border-[#A45F86]/15 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF5F8_100%)] p-6 shadow-[0_18px_40px_-25px_rgba(89,46,86,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_22px_45px_-25px_rgba(89,46,86,0.35)] sm:p-8 md:-mt-6"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#A45F86]/20 bg-gradient-to-br from-[#F8E9F0] to-[#F4DDE9] shadow-sm">
              <MonitorIcon />
            </div>
            <span className="mb-2 block font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.22em] text-[#6E3F63]">
              Advanced Diagnostics
            </span>
            <h2 className="mb-3 font-[family-name:var(--font-display)] text-[clamp(1.45rem,2.3vw,2rem)] font-semibold italic leading-[1.15] text-[#2B2330]">
              Advanced Skin Analysis
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[#2B2330]/75">
              Our advanced skin analysis machine provides detailed insights about your skin health before any product recommendation.
            </p>
          </div>

          <div
            data-floating-card
            className="md:col-span-1 md:col-start-2 md:ml-auto md:mt-10 md:max-w-md rounded-[1.5rem] border border-[#A45F86]/15 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF5F8_100%)] p-6 shadow-[0_18px_40px_-25px_rgba(89,46,86,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_22px_45px_-25px_rgba(89,46,86,0.35)] sm:p-8"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#A45F86]/20 bg-gradient-to-br from-[#F8E9F0] to-[#F4DDE9] shadow-sm">
              <FlaskIcon />
            </div>
            <span className="mb-2 block font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.22em] text-[#6E3F63]">
              Our Science
            </span>
            <h2 className="mb-3 font-[family-name:var(--font-display)] text-[clamp(1.45rem,2.3vw,2rem)] font-semibold italic leading-[1.15] text-[#2B2330]">
              No Assumptions. Only Science.
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[#2B2330]/75">
              Don’t Guess. Know. Every skincare journey starts with one fundamental question: What does your skin actually need?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
