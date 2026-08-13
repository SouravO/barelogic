"use client";

import { useEffect, useRef } from "react";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import gsap from "gsap";

/**
 * KYS — Hero
 * -----------------------------------------------------------------------
 * Carried over from the existing hero concept rather than rebuilt: the
 * oversized wordmark wipes into view via clip-path, a faint calibration
 * ring (the one "instrument" reference) settles in behind it and drifts
 * with the cursor, and an ambient light field breathes underneath. That
 * mechanic — instrumentation resolving into a brand mark — already reads
 * as "signal becoming clarity", which is exactly the KYS story (guessing
 * → understanding), so it's kept intact. What changes is scope: the
 * wordmark now shares the frame with the real headline, sub-copy and two
 * CTAs the brief calls for, instead of standing alone.
 *
 * Tokens (unchanged from the existing system):
 *  cream #FAF5EE · ink #2B2330 · aubergine #3E1F3D · mauve #8C5A82 ·
 *  blush #E9B9CC · display: Bodoni Moda · technical/labels: Space Grotesk
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

export default function Hero() {
  const rootRef = useRef(null);
  const glowRef = useRef(null);
  const wordmarkRef = useRef(null);
  const ringRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const eyebrowRef = useRef(null);
  const scrollCueRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.set(wordmarkRef.current, {
          clipPath: "inset(0% 100% 0% 0%)",
          scale: 0.94,
          y: 18,
          letterSpacing: "0.22em",
        })
          .set([eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current, scrollCueRef.current], {
            opacity: 0,
            y: 14,
          })
          .set(ringRef.current, { opacity: 0, scale: 0.88, rotate: -10 })
          .to(glowRef.current, { opacity: 1, duration: 2, ease: "sine.out" }, 0)
          .to(
            wordmarkRef.current,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              y: 0,
              letterSpacing: "-0.01em",
              duration: 1.4,
              ease: "power4.out",
            },
            0.25
          )
          .fromTo(
            wordmarkRef.current,
            { backgroundPosition: "0% 50%" },
            { backgroundPosition: "100% 50%", duration: 1.8, ease: "power2.inOut" },
            0.4
          )
          .to(ringRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 1.5 }, 0.55)
          .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.8)
          .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.95)
          .to(subRef.current, { opacity: 1, y: 0, duration: 0.9 }, 1.1)
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.25)
          .to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.4);

        // slow ambient drift once settled
        gsap.to(wordmarkRef.current, {
          backgroundPosition: "0% 50%",
          duration: 16,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2.4,
        });

        // cursor parallax
        const xTo = gsap.quickTo(wordmarkRef.current, "x", { duration: 0.9, ease: "power3.out" });
        const yTo = gsap.quickTo(wordmarkRef.current, "y", { duration: 0.9, ease: "power3.out" });
        const ringRotateTo = gsap.quickTo(ringRef.current, "rotate", { duration: 1.3, ease: "power3.out" });
        const glowXTo = gsap.quickTo(glowRef.current, "xPercent", { duration: 1.6, ease: "power2.out" });
        const glowYTo = gsap.quickTo(glowRef.current, "yPercent", { duration: 1.6, ease: "power2.out" });

        const handleMove = (e) => {
          const relX = e.clientX / window.innerWidth - 0.5;
          const relY = e.clientY / window.innerHeight - 0.5;
          xTo(relX * 14);
          yTo(relY * 6);
          ringRotateTo(relX * 8);
          glowXTo(relX * 12);
          glowYTo(relY * 12);
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            wordmarkRef.current,
            eyebrowRef.current,
            headlineRef.current,
            subRef.current,
            ctaRef.current,
            ringRef.current,
            scrollCueRef.current,
          ],
          { clearProps: "all", opacity: 1 }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className={`${display.variable} ${mono.variable} relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#FAF5EE] pt-28 pb-16`}
    >
      {/* ambient light field */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,122,160,0.20) 0%, rgba(140,90,130,0.10) 45%, rgba(250,245,238,0) 75%)",
        }}
      />

      {/* fine scientific grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(43,35,48,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,35,48,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* calibration ring behind the wordmark */}
      <svg
        ref={ringRef}
        viewBox="0 0 600 600"
        className="pointer-events-none absolute top-[30%] h-[46vmin] w-[46vmin] max-h-[460px] max-w-[460px] -translate-y-1/2"
        style={{ opacity: 0 }}
      >
        <circle cx="300" cy="300" r="280" fill="none" stroke="#2B2330" strokeOpacity="0.10" strokeWidth="1" />
        <circle cx="300" cy="300" r="240" fill="none" stroke="#2B2330" strokeOpacity="0.14" strokeWidth="1" />
        {Array.from({ length: 72 }).map((_, i) => {
          const angle = (i * 360) / 72;
          const major = i % 9 === 0;
          const r1 = 280;
          const r2 = major ? 262 : 272;
          const rad = (angle * Math.PI) / 180;
          const round = (n) => Math.round(n * 100) / 100;
          return (
            <line
              key={i}
              x1={round(300 + r1 * Math.cos(rad))}
              y1={round(300 + r1 * Math.sin(rad))}
              x2={round(300 + r2 * Math.cos(rad))}
              y2={round(300 + r2 * Math.sin(rad))}
              stroke="#2B2330"
              strokeOpacity={major ? 0.22 : 0.1}
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* brand eyebrow */}
      <div
        ref={eyebrowRef}
        className="relative z-10 mb-6 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[#2B2330]/50"
      >
        KYS — Skin Intelligence System
      </div>

      {/* wordmark */}
      <h1
        ref={wordmarkRef}
        className="relative z-10 select-none whitespace-nowrap font-[family-name:var(--font-display)] text-[26vw] font-semibold leading-[0.85] sm:text-[20vw] md:text-[200px] lg:text-[240px]"
        style={{
          backgroundImage:
            "linear-gradient(115deg, #3E1F3D 0%, #6E3F63 30%, #A45F86 55%, #C97AA0 75%, #E9B9CC 100%)",
          backgroundSize: "220% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        KYS
      </h1>

      {/* headline */}
      <h2
        ref={headlineRef}
        className="relative z-10 mt-6 max-w-3xl px-6 text-center font-[family-name:var(--font-display)] text-3xl italic leading-tight text-[#2B2330] sm:text-4xl md:text-5xl"
      >
        Your Skin. Your Story. Your Science.
      </h2>

      {/* sub-copy */}
      <div ref={subRef} className="relative z-10 mt-7 max-w-2xl px-6 text-center">
        <p className="font-[family-name:var(--font-mono)] text-base leading-relaxed text-[#2B2330]/75 sm:text-lg">
          Every skin tells different story. Different needs. Different concerns. Different care.
        </p>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-base leading-relaxed text-[#2B2330]/75 sm:text-lg">
          KYS believes skincare should never be one-size-fits-all. Before recommending products, we
          first understand your skin using advanced skin analysis technology. Because healthy skin
          begins with knowing your skin.
        </p>
      </div>

      {/* CTAs */}
      <div ref={ctaRef} className="relative z-10 mt-10 flex flex-col items-center gap-4 px-6 sm:flex-row">
        <a
          href="#technology"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#technology")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-full px-8 py-3.5 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#FAF5EE] transition-transform duration-300 hover:scale-[1.03]"
          style={{
            backgroundImage:
              "linear-gradient(115deg, #3E1F3D 0%, #6E3F63 30%, #A45F86 55%, #C97AA0 75%, #E9B9CC 100%)",
          }}
        >
          Know Your Skin
        </a>
        <a
          href="#products"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-full border border-[#2B2330]/20 px-8 py-3.5 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#2B2330] transition-colors duration-300 hover:border-[#2B2330]/40"
        >
          Explore Products
        </a>
      </div>

      {/* scroll cue */}
      <div
        ref={scrollCueRef}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.28em] text-[#2B2330]/40"
      >
        Scroll
        <span className="h-8 w-px bg-[#2B2330]/25" />
      </div>
    </section>
  );
}