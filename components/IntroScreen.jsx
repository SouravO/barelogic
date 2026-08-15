"use client";

import { useEffect, useRef } from "react";
import { Bodoni_Moda } from "next/font/google";
import gsap from "gsap";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

/**
 * Premium Skincare Entry Banner
 *
 * Timing Breakdown:
 *  - 0.0s to 3.2s: Realistic staggered loading (stuck, load, stuck) to 100%.
 *  - 0.0s to ~0.2s: Letters reveal one by one (First 5%).
 *  - 3.04s: Letters start to disappear (At 95% of load).
 *  - 3.6s: Entire screen wipes upward smoothly.
 */
const LOAD_DURATION = 3.2;
const EXIT_START = 3.6;
const EXIT_DURATION = 0.9;

// Deepened version of the original purple-pink palette for a luxurious, grounded feel
const PANEL_GRADIENT =
  "linear-gradient(115deg, #2A1529 0%, #4A2742 30%, #764360 55%, #925875 75%, #B3869A 100%)";

export default function IntroScreen({ onComplete }) {
  const screenRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const titleContainerRef = useRef(null);
  const subtitleRef = useRef(null);
  const barContainerRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);

  const titleText = "Bare Logic";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = previousOverflow;
      onComplete?.();
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Initial setup for the loading bar
        gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });

        // Gentle, continuous background movement for the glossy skincare vibe
        gsap.to(screenRef.current, {
          backgroundPosition: "100% 100%",
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Drifting ambient light orbs
        gsap.to(orb1Ref.current, {
          x: "10vw",
          y: "10vh",
          duration: 6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(orb2Ref.current, {
          x: "-10vw",
          y: "-10vh",
          duration: 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: finish,
        });

        const progressObj = { value: 0 };

        const updateUI = () => {
          if (percentRef.current) {
            percentRef.current.innerText = Math.round(progressObj.value) + "%";
          }
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${progressObj.value / 100})`;
          }
        };

        // 1. Realistic "Stuck & Load" Network Animation (Total = 3.2s)
        const loadTl = gsap.timeline();
        loadTl
          .to(progressObj, { value: 18, duration: 0.4, ease: "power2.out", onUpdate: updateUI })
          .to(progressObj, { value: 18, duration: 0.5 }) // Stuck
          .to(progressObj, { value: 65, duration: 0.8, ease: "power1.inOut", onUpdate: updateUI })
          .to(progressObj, { value: 65, duration: 0.6 }) // Stuck
          .to(progressObj, { value: 88, duration: 0.4, ease: "power2.out", onUpdate: updateUI })
          .to(progressObj, { value: 88, duration: 0.2 }) // Stuck
          .to(progressObj, { value: 100, duration: 0.3, ease: "power3.in", onUpdate: updateUI });

        tl.add(loadTl, 0);

        // 2. Letters Reveal (First 5% of 3.2s -> ~0.16s)
        tl.fromTo(
          ".title-letter",
          { opacity: 0, y: 15, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          0
        );

        // 3. Letters Disappear (Start at 95% of 3.2s -> 3.04s)
        tl.to(
          ".title-letter",
          {
            opacity: 0,
            y: -15,
            filter: "blur(4px)",
            stagger: 0.04,
            duration: 0.4,
            ease: "power2.in",
          },
          LOAD_DURATION * 0.95
        );

        // 4. Fade out loading UI (Subtitle, Bar, Percentage)
        tl.to(
          [subtitleRef.current, barContainerRef.current],
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          },
          LOAD_DURATION + 0.1
        );

        // 5. Wipe screen up smoothly
        tl.to(
          screenRef.current,
          { yPercent: -100, duration: EXIT_DURATION, ease: "power4.inOut" },
          EXIT_START
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(barRef.current, { scaleX: 1 });
        if (percentRef.current) percentRef.current.innerText = "100%";

        const t = setTimeout(() => {
          gsap.to(screenRef.current, {
            opacity: 0,
            duration: 0.4,
            onComplete: finish,
          });
        }, 1000);

        return () => clearTimeout(t);
      });
    }, screenRef);

    return () => {
      document.body.style.overflow = previousOverflow;
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={screenRef}
      role="status"
      aria-label="Loading Bare Logic"
      className={`${display.variable} fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden text-[#FAF5EE]`}
      style={{
        backgroundImage: PANEL_GRADIENT,
        backgroundSize: "200% 200%", // Oversized for panning animation
        backgroundPosition: "0% 0%",
      }}
    >
      {/* Soft floating ambient lights for the premium skincare vibe */}
      <div
        ref={orb1Ref}
        className="pointer-events-none absolute -left-[10%] -top-[10%] h-[60vmin] w-[60vmin] rounded-full bg-[#E9B9CC] opacity-15 blur-[120px] md:opacity-25 md:blur-[160px]"
      />
      <div
        ref={orb2Ref}
        className="pointer-events-none absolute -bottom-[10%] -right-[10%] h-[70vmin] w-[70vmin] rounded-full bg-[#A45F86] opacity-15 blur-[120px] md:opacity-25 md:blur-[160px]"
      />

      {/* Texture Overlay (subtle grain/grid) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,245,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,245,238,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Title with letter-by-letter split */}
      <h1
        ref={titleContainerRef}
        className="relative z-10 flex select-none whitespace-nowrap px-4 font-[family-name:var(--font-display)] text-[14vw] font-semibold leading-[1.1] tracking-tight sm:text-[12vw] md:text-[90px] lg:text-[110px]"
        style={{ textShadow: "0 8px 32px rgba(42,21,41,0.5)" }}
      >
        {titleText.split("").map((char, index) => (
          <span
            key={index}
            className="title-letter inline-block"
            style={{ width: char === " " ? "0.3em" : "auto" }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <div
        ref={subtitleRef}
        className="z-10 mt-16 mb-4 text-[9px] font-medium tracking-[0.25em] text-[#FAF5EE]/70 uppercase sm:text-[10px] md:text-[11px]"
      >
        Music at your doorstep
      </div>

      {/* Progress Track & Counter */}
      <div
        ref={barContainerRef}
        className="z-10 flex w-[85%] max-w-[420px] items-center gap-4"
      >
        {/* Track */}
        <div className="relative h-[2px] flex-grow overflow-hidden bg-[#FAF5EE]/15 sm:h-[3px]">
          {/* Fill */}
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 w-full bg-[#FAF5EE]"
          />
        </div>

        {/* Percentage */}
        <span
          ref={percentRef}
          className="w-[3ch] text-right font-mono text-[11px] font-medium tracking-wide sm:text-[12px]"
        >
          0%
        </span>
      </div>
    </div>
  );
}