"use client";

import { useEffect, useRef, useId } from "react";
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

  // Unique id for the clip-path so multiple instances of this section never collide
  const rawId = useId();
  const maskId = `kys-mv-mask-${rawId.replace(/:/g, "")}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax movement for the central image inside the mask
      if (parallaxImgRef.current && containerRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -14, scale: 1.22 },
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

      // Cards stay fully visible at all times — no opacity/fade. They rise
      // upward from a lower starting offset, driven by the SAME container
      // scrollTrigger range as the image above, so cards + image move
      // together as one continuous scroll-linked parallax system rather
      // than a separate "reveal" animation. Each card starts a bit further
      // below than the last for a layered, non-uniform feel.
      const cards = gsap.utils.toArray("[data-floating-card]", containerRef.current);
      cards.forEach((card, index) => {
        const startY = 110 + index * 18;
        gsap.fromTo(
          card,
          { y: startY },
          {
            y: -startY * 0.18,
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
      <div className="max-w-7xl mx-auto relative z-10 mb-6 lg:mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">
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

      <div className="max-w-7xl mx-auto relative min-h-[660px] lg:min-h-[760px] flex items-center justify-center">
        {/* Hidden clip-path definition — tall, steeply-tilted oval mask. Computed in true
            physical proportions (accounting for the box's 4:5 aspect ratio) so the rotation
            doesn't skew, then mapped into objectBoundingBox units. Major axis is longer and
            the tilt steeper than before, matching the reference — it intentionally overshoots
            the box at the top-right and bottom-left corners. */}
        <svg width="0" height="0" className="pointer-events-none absolute" aria-hidden="true">
          <defs>
            <clipPath id={maskId} clipPathUnits="objectBoundingBox">
              <path d="M 1.0056 0.1606 C 1.1476 0.2960, 1.0364 0.5577, 0.7571 0.7451 C 0.4778 0.9326, 0.1365 0.9748, -0.0056 0.8394 C -0.1476 0.7040, -0.0364 0.4423, 0.2429 0.2549 C 0.5222 0.0674, 0.8635 0.0252, 1.0056 0.1606 Z" />
            </clipPath>
          </defs>
        </svg>

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] sm:w-[65%] lg:w-[48%] aspect-[4/5] overflow-hidden z-0 bg-[#F1E9E0] drop-shadow-[0_22px_38px_rgba(43,35,48,0.32)]"
          style={{ clipPath: `url(#${maskId})` }}
        >
          <div
            ref={parallaxImgRef}
            className="absolute inset-0 h-[134%] w-full -top-[17%] bg-cover bg-center"
            style={{
              backgroundImage: `url('/parallax.png')`,
            }}
          />
        </div>

        {/* Cards: flex-stacked on mobile, "contents" at md: so each card positions
            itself directly against this section's relative container (same
            coordinate space as the oval image above) instead of a grid column —
            lets them hug the left/right edges and overlap the oval's corner. */}
        <div className="relative z-10 flex w-full flex-col gap-5 py-6 md:contents">
          <div
            data-floating-card
            className="w-full z-10 md:absolute md:left-0 lg:left-2 md:top-[3%] md:w-auto md:max-w-[16.5rem] lg:max-w-[18.5rem] rounded-[1.5rem] border border-[#A45F86]/15 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF5F8_100%)] p-3.5 shadow-[0_18px_40px_-25px_rgba(89,46,86,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_22px_45px_-25px_rgba(89,46,86,0.35)] sm:p-4"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#A45F86]/20 bg-gradient-to-br from-[#F8E9F0] to-[#F4DDE9] shadow-sm">
              <TargetIcon />
            </div>
            <span className="mb-2 block font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.22em] text-[#6E3F63]">
              Our Mission
            </span>
            <h2 className="mb-2 font-[family-name:var(--font-display)] text-[clamp(1.3rem,1.6vw,1.75rem)] font-semibold italic leading-[1.05] text-[#2B2330]">
              Informed Skincare Decisions
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-[12.5px] leading-relaxed text-[#2B2330]/75">
              KYS exists to help people make informed skincare decisions through advanced skin diagnostics and personalized product recommendations.
            </p>
          </div>

          <div
            data-floating-card
            className="w-full z-10 md:absolute md:right-0 lg:right-2 md:top-[15%] md:w-auto md:max-w-[16.5rem] lg:max-w-[18.5rem] rounded-[1.5rem] border border-[#A45F86]/15 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF5F8_100%)] p-3.5 shadow-[0_18px_40px_-25px_rgba(89,46,86,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_22px_45px_-25px_rgba(89,46,86,0.35)] sm:p-4"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#A45F86]/20 bg-gradient-to-br from-[#F8E9F0] to-[#F4DDE9] shadow-sm">
              <EyeIcon />
            </div>
            <span className="mb-2 block font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.22em] text-[#6E3F63]">
              Our Vision
            </span>
            <h2 className="mb-2 font-[family-name:var(--font-display)] text-[clamp(1.3rem,1.6vw,1.75rem)] font-semibold italic leading-[1.05] text-[#2B2330]">
              Trusted Personalization
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-[12.5px] leading-relaxed text-[#2B2330]/75">
              To become India’s most trusted personalized skincare company by combining technology, science, and skincare into one seamless experience.
            </p>
          </div>

          <div
            data-floating-card
            className="w-full z-10 md:absolute md:left-0 lg:left-2 md:bottom-[15%] md:w-auto md:max-w-[16.5rem] lg:max-w-[18.5rem] rounded-[1.5rem] border border-[#A45F86]/15 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF5F8_100%)] p-3.5 shadow-[0_18px_40px_-25px_rgba(89,46,86,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_22px_45px_-25px_rgba(89,46,86,0.35)] sm:p-4"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#A45F86]/20 bg-gradient-to-br from-[#F8E9F0] to-[#F4DDE9] shadow-sm">
              <MonitorIcon />
            </div>
            <span className="mb-2 block font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.22em] text-[#6E3F63]">
              Advanced Diagnostics
            </span>
            <h2 className="mb-2 font-[family-name:var(--font-display)] text-[clamp(1.3rem,1.6vw,1.75rem)] font-semibold italic leading-[1.05] text-[#2B2330]">
              Advanced Skin Analysis
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-[12.5px] leading-relaxed text-[#2B2330]/75">
              Our advanced skin analysis machine provides detailed insights about your skin health before any product recommendation.
            </p>
          </div>

          <div
            data-floating-card
            className="w-full z-10 md:absolute md:right-0 lg:right-2 md:bottom-[3%] md:w-auto md:max-w-[16.5rem] lg:max-w-[18.5rem] rounded-[1.5rem] border border-[#A45F86]/15 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF5F8_100%)] p-3.5 shadow-[0_18px_40px_-25px_rgba(89,46,86,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_22px_45px_-25px_rgba(89,46,86,0.35)] sm:p-4"
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#A45F86]/20 bg-gradient-to-br from-[#F8E9F0] to-[#F4DDE9] shadow-sm">
              <FlaskIcon />
            </div>
            <span className="mb-2 block font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.22em] text-[#6E3F63]">
              Our Science
            </span>
            <h2 className="mb-2 font-[family-name:var(--font-display)] text-[clamp(1.3rem,1.6vw,1.75rem)] font-semibold italic leading-[1.05] text-[#2B2330]">
              No Assumptions. Only Science.
            </h2>
            <p className="font-[family-name:var(--font-mono)] text-[12.5px] leading-relaxed text-[#2B2330]/75">
              Don’t Guess. Know. Every skincare journey starts with one fundamental question: What does your skin actually need?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}