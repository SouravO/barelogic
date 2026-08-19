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

export default function MissionVision() {
  const containerRef = useRef(null);
  const parallaxImgRef = useRef(null);

  // Title "KYS" -> "KNOW YOUR SKIN" expand refs
  const titleWrapRef = useRef(null);
  const kysTextRef = useRef(null);
  const fullTextRef = useRef(null);

  // Unique id for the clip-path so multiple instances of this section never collide
  const rawId = useId();
  const maskId = `kys-mv-mask-${rawId.replace(/:/g, "")}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Parallax movement for the central image inside the mask
      if (parallaxImgRef.current && containerRef.current && !prefersReducedMotion) {
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

      // Cards stay fully visible at all times — no opacity animation. Only
      // position moves, split across two separate transform channels so
      // they never fight each other (GSAP combines `y` (px) and `yPercent`
      // additively into the same translate, so both can animate at once):
      //
      // 1) ENTRANCE - a fast rise on `y`, scoped to each card's own position
      //    in the viewport (a short, local scroll range) rather than the
      //    whole section, so it reads as quick and snappy as you scroll it
      //    into view.
      //
      // 2) DRIFT - a slow, subtle continuous parallax on `yPercent`, tied to
      //    the SAME container scrollTrigger range as the central image, so
      //    cards keep floating in sync with the image for the rest of the
      //    section's scroll.
      const cards = gsap.utils.toArray("[data-floating-card]", containerRef.current);

      cards.forEach((card, index) => {
        const startY = 110 + index * 20;

        if (prefersReducedMotion) {
          gsap.set(card, { y: 0, yPercent: 0 });
          return;
        }

        // Start offset below the resting position before any ScrollTrigger
        // fires, so there's no flash of the fully-settled card on load.
        gsap.set(card, { y: startY });

        // 1) Entrance - fast rise, driven by the card's own scroll position.
        // Short start/end range + no scrub smoothing = snaps to scroll
        // 1:1, so it feels quick rather than a slow drift.
        gsap.fromTo(
          card,
          { y: startY },
          {
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 62%",
              scrub: true,
            },
          }
        );

        // 2) Drift - slow continuous parallax on a different transform
        // channel, synced with the image across the full section scroll.
        gsap.fromTo(
          card,
          { yPercent: -6 },
          {
            yPercent: 6,
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

      // Title entrance — shows as "KYS" first, then suddenly expands into
      // the full "KNOW YOUR SKIN". Fires once the section has mostly
      // scrolled open (top nearing the top of the viewport), not the
      // moment it starts entering. Plays once.
      const kys = kysTextRef.current;
      const full = fullTextRef.current;

      if (kys && full) {
        if (prefersReducedMotion) {
          gsap.set(kys, { opacity: 0 });
          gsap.set(full, { opacity: 1, scale: 1 });
        } else {
          gsap.set(kys, { opacity: 1, scale: 1 });
          gsap.set(full, { opacity: 0, scale: 0.55 });

          const playTitleExpand = () => {
            gsap
              .timeline({ delay: 0.35 })
              .to(kys, { opacity: 0, scale: 1.2, duration: 0.35, ease: "power2.in" }, 0)
              .to(full, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" }, 0.08);
          };

          const rect = containerRef.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.15) {
            // Section is already mostly open on load — play immediately.
            playTitleExpand();
          } else {
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top 15%",
              once: true,
              onEnter: playTitleExpand,
            });
          }
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`${display.variable} ${mono.variable} relative left-1/2 min-h-screen w-screen -translate-x-1/2 overflow-hidden bg-[#FAF5EE] px-4 pt-0 pb-10 text-[#2B2330] sm:px-8 lg:px-16 lg:pb-16`}
    >
      <div className="max-w-7xl mx-auto relative z-10 mb-1 lg:mb-2 pt-14 sm:pt-16 lg:pt-24">
        <div className="relative flex flex-col items-center text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.08] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            <span ref={titleWrapRef} className="relative inline-block">
              {/* invisible spacer reserves the full "KNOW YOUR SKIN" width so nothing shifts as it expands */}
              <span aria-hidden="true" className="invisible whitespace-nowrap">
                KNOW YOUR SKIN
              </span>

              <span
                ref={kysTextRef}
                className="absolute inset-0 whitespace-nowrap text-center bg-gradient-to-r from-[#3E1F3D] via-[#6E3F63] to-[#A45F86] bg-clip-text text-transparent"
              >
                KYS
              </span>

              <span
                ref={fullTextRef}
                className="absolute inset-0 whitespace-nowrap text-center bg-gradient-to-r from-[#3E1F3D] via-[#6E3F63] to-[#A45F86] bg-clip-text text-transparent"
              >
                KNOW YOUR SKIN
              </span>
            </span>
            <br />
            <span className="mt-2 block font-[family-name:var(--font-display)] text-3xl font-semibold italic leading-[1.12] text-[#2B2330]/90 sm:text-5xl lg:text-6xl">
              before you treat it.
            </span>
          </h1>

          <p className="mt-6 max-w-lg mx-auto font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[#2B2330]/75 sm:text-base">
            Modern skincare has become confusing. Thousands of products, thousands of ingredients, and thousands of opinions. But only one thing truly matters: understanding your skin.
          </p>
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] sm:w-[65%] lg:w-[48%] aspect-[4/5] z-0 bg-[#F1E9E0] drop-shadow-[0_22px_38px_rgba(43,35,48,0.32)]"
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
            className="w-full z-10 md:absolute md:left-[8%] lg:left-[10%] md:top-[4%] md:w-auto md:max-w-[16.5rem] lg:max-w-[18.5rem] rounded-[1.5rem] border border-[#A45F86]/15 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF5F8_100%)] p-3.5 shadow-[0_18px_40px_-25px_rgba(89,46,86,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_22px_45px_-25px_rgba(89,46,86,0.35)] sm:p-4"
          >
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
            className="w-full z-10 md:absolute md:right-[8%] lg:right-[10%] md:bottom-[7%] md:w-auto md:max-w-[16.5rem] lg:max-w-[18.5rem] rounded-[1.5rem] border border-[#A45F86]/15 bg-[linear-gradient(180deg,#FFFDFB_0%,#FDF5F8_100%)] p-3.5 shadow-[0_18px_40px_-25px_rgba(89,46,86,0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_22px_45px_-25px_rgba(89,46,86,0.35)] sm:p-4"
          >
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