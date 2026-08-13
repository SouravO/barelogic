"use client";

import { useEffect, useRef } from "react";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * KYS — About
 * -----------------------------------------------------------------------
 * Four content stages (Brand Story, Mission, Vision, Philosophy) told as
 * one continuous editorial piece rather than four boxed cards — the
 * reader scrolls through a single narrative that gets progressively more
 * distilled: a scene, a statement, a single vision line, then a set of
 * human factors. The per-element scroll reveal (fade + rise, staggered)
 * is the same motion language as the previous card-based About, just
 * applied to editorial blocks instead of a 3-up grid.
 *
 * Tokens: cream #FAF5EE · ink #2B2330 · aubergine #3E1F3D · mauve #8C5A82
 * blush #E9B9CC · display: Bodoni Moda · body/labels: Space Grotesk
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

const GRADIENT =
  "linear-gradient(115deg, #3E1F3D 0%, #6E3F63 30%, #A45F86 55%, #C97AA0 75%, #E9B9CC 100%)";

const FACTORS = ["Age", "Lifestyle", "Climate", "Diet", "Stress", "Hormones", "Genetics"];

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

        // Every [data-reveal] block within a [data-stage] fades + rises in,
        // staggered, the moment its stage crosses the trigger line.
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

        // Philosophy factor tags: a slightly bouncier, individually
        // staggered "settling into place" reveal.
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
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-0 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-0 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,122,160,0.20) 0%, rgba(140,90,130,0.10) 40%, rgba(250,245,238,0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(43,35,48,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,35,48,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* ===== Stage 1 — Brand Story ===== */}
        <div data-stage className="border-b border-[#2B2330]/10 py-16 first:pt-0 md:py-24">
          <p
            data-reveal
            className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[#2B2330]/50"
          >
            01 — Brand Story
          </p>
          <h2
            data-reveal
            className="mb-10 font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl md:text-6xl"
            style={{
              backgroundImage: GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            We Don&rsquo;t Sell Products.
            <br />
            We Build Personalized Skin Journeys.
          </h2>

          <div className="space-y-5 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/80 md:text-xl">
            <p data-reveal>Walk into most skincare stores.</p>
            <p data-reveal>
              Someone asks,
              <br />
              &ldquo;What&rsquo;s your skin type?&rdquo;
            </p>
            <p data-reveal>
              You answer,
              <br />
              &ldquo;Maybe oily&hellip; maybe dry&hellip;&rdquo;
            </p>
            <p data-reveal>Then buy product based on guess.</p>
            <p data-reveal className="font-semibold text-[#2B2330]">
              At KYS, guessing ends.
            </p>
            <p data-reveal>
              We scientifically analyze your skin, identify its real condition, and recommend
              products designed specifically for your skin.
            </p>
            <p data-reveal className="italic">
              Because your skin deserves certainty, not assumptions.
            </p>
          </div>
        </div>

        {/* ===== Stage 2 — Our Mission ===== */}
        <div data-stage className="border-b border-[#2B2330]/10 py-16 md:py-24">
          <p
            data-reveal
            className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[#2B2330]/50"
          >
            02 — Our Mission
          </p>
          <h2
            data-reveal
            className="mb-10 font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl md:text-6xl"
          >
            Know Your Skin Before You Treat It.
          </h2>

          <div className="space-y-5 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/80 md:text-xl">
            <p data-reveal>Modern skincare has become confusing.</p>
            <p data-reveal>
              Thousands of products.
              <br />
              Thousands of ingredients.
              <br />
              Thousands of opinions.
            </p>
            <p data-reveal>But only one thing truly matters.</p>
            <p data-reveal className="font-semibold text-[#2B2330]">
              Understanding your skin.
            </p>
            <p data-reveal>
              KYS exists to help people make informed skincare decisions through advanced skin
              diagnostics and personalized product recommendations.
            </p>
          </div>
        </div>

        {/* ===== Stage 3 — Our Vision ===== */}
        <div
          data-stage
          className="flex min-h-[60vh] flex-col justify-center border-b border-[#2B2330]/10 py-16 text-center md:py-24"
        >
          <p
            data-reveal
            className="mb-8 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[#2B2330]/50"
          >
            03 — Our Vision
          </p>
          <h2
            data-reveal
            className="mx-auto max-w-3xl font-[family-name:var(--font-display)] text-3xl font-medium italic leading-[1.3] sm:text-4xl md:text-5xl"
            style={{
              backgroundImage: GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            To become India&rsquo;s most trusted personalized skincare company by combining
            technology, science, and skincare into one seamless experience.
          </h2>
        </div>

        {/* ===== Stage 4 — Our Philosophy ===== */}
        <div data-stage className="py-16 md:py-24">
          <p
            data-reveal
            className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[#2B2330]/50"
          >
            04 — Our Philosophy
          </p>
          <h2
            data-reveal
            className="mb-10 font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl md:text-6xl"
          >
            Every Face Is Different.
          </h2>

          <div className="space-y-5 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/80 md:text-xl">
            <p data-reveal>No two fingerprints are same.</p>
            <p data-reveal>No two skins are same.</p>
          </div>

          <div className="my-10 flex flex-wrap justify-center gap-3">
            {FACTORS.map((factor) => (
              <span
                key={factor}
                data-tag
                className="rounded-full border border-[#2B2330]/15 bg-[#FFFBF6] px-5 py-2.5 font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.1em] text-[#2B2330]/80 shadow-[0_10px_25px_-15px_rgba(89,46,86,0.25)]"
              >
                {factor}
              </span>
            ))}
          </div>

          <div className="space-y-5 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/80 md:text-xl">
            <p data-reveal>Everything affects your skin.</p>
            <p data-reveal>Why should everyone use same skincare?</p>
            <p data-reveal className="font-semibold text-[#2B2330]">
              They shouldn&rsquo;t.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}