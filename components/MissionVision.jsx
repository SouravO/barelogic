"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  variable: "--font-serif",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
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
      className={`${displayFont.variable} ${bodyFont.variable} font-sans relative left-1/2 min-h-screen w-screen -translate-x-1/2 overflow-hidden bg-[#F8F6F2] px-4 py-16 text-[#1C1C1C] sm:px-8 lg:px-16`}
    >
      {/* 1. TOP HEADER BANNER SECTION */}
      <div className="max-w-7xl mx-auto relative z-10 mb-12 lg:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[1.08] text-[#1C1C1C]">
              KNOW YOUR SKIN <br />
              <span className="font-serif italic font-normal lowercase tracking-normal text-3xl sm:text-5xl lg:text-6xl text-[#2B2B2B] underline decoration-1 underline-offset-8">
                before you treat it.
              </span>
            </h1>

            <p className="mt-6 text-sm sm:text-base text-neutral-600 max-w-lg leading-relaxed font-medium">
              Modern skincare has become confusing. Thousands of products, thousands of ingredients, and thousands of opinions. But only one thing truly matters: understanding your skin.
            </p>
          </div>

          {/* Decorative Arrow Line (Reference visual) */}
          <div className="hidden lg:block lg:col-span-4 relative h-36">
            <svg
              className="absolute -top-2 -left-8 w-[320px] h-[200px] pointer-events-none text-neutral-400 opacity-70"
              viewBox="0 0 300 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path
                d="M 10 20 C 150 -30, 290 50, 240 180"
                strokeDasharray="0"
              />
              <path
                d="M 235 170 L 240 180 L 248 172"
                fill="none"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. CENTRAL PARALLAX MASK & FLOATING CARDS */}
      <div className="max-w-7xl mx-auto relative min-h-[780px] lg:min-h-[880px] flex items-center justify-center">
        
        {/* Central Organic Mask Shape Container */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] sm:w-[65%] lg:w-[48%] aspect-[4/5] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] overflow-hidden shadow-2xl z-0 border border-black/5 bg-[#EAE6DE]">
          <div
            ref={parallaxImgRef}
            className="absolute inset-0 w-full h-[128%] -top-[14%] bg-cover bg-center"
            style={{
              backgroundImage: `url('/parallax.png')`,
            }}
          />
        </div>

        {/* Floating Cards Grid Layout (Positioned around the image) */}
        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16 my-auto py-8">
          
          {/* Card 1: OUR MISSION (Top-Left) */}
          <div
            data-floating-card
            className="md:col-span-1 md:max-w-md bg-[#FAF9F6]/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg border border-black/5 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 border border-neutral-100">
              <TargetIcon />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-2 block">
              Our Mission
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3">
              Informed Skincare Decisions
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
              KYS exists to help people make informed skincare decisions through advanced skin diagnostics and personalized product recommendations.
            </p>
          </div>

          {/* Card 2: OUR VISION (Top-Right - Offset Down) */}
          <div
            data-floating-card
            className="md:col-span-1 md:col-start-2 md:max-w-md md:ml-auto md:mt-16 bg-[#FAF9F6]/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg border border-black/5 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 border border-neutral-100">
              <EyeIcon />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-2 block">
              Our Vision
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3">
              Trusted Personalization
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
              To become India’s most trusted personalized skincare company by combining technology, science, and skincare into one seamless experience.
            </p>
          </div>

          {/* Card 3: ADVANCED DIAGNOSTICS (Bottom-Left - Offset Down) */}
          <div
            data-floating-card
            className="md:col-span-1 md:max-w-md md:-mt-6 bg-[#FAF9F6]/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg border border-black/5 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 border border-neutral-100">
              <MonitorIcon />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-2 block">
              Advanced Diagnostics
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3">
              Advanced Skin Analysis
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
              Our advanced skin analysis machine provides detailed insights about your skin health before any product recommendation.
            </p>
          </div>

          {/* Card 4: OUR SCIENCE (Bottom-Right) */}
          <div
            data-floating-card
            className="md:col-span-1 md:col-start-2 md:max-w-md md:ml-auto md:mt-10 bg-[#FAF9F6]/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg border border-black/5 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 border border-neutral-100">
              <FlaskIcon />
            </div>
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-2 block">
              Our Science
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3">
              No Assumptions. Only Science.
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
              Don’t Guess. Know. Every skincare journey starts with one fundamental question: What does your skin actually need?
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
