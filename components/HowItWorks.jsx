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

const GRADIENT =
  "linear-gradient(115deg, #3E1F3D 0%, #6E3F63 30%, #A45F86 55%, #C97AA0 75%, #E9B9CC 100%)";

const STEPS = [
  {
    title: "Analyze",
    copy: "Your skin scanned using professional skin analysis technology.",
  },
  {
    title: "Understand",
    copy: "Receive complete report explaining your skin condition.",
  },
  {
    title: "Personalize",
    copy: "Experts recommend skincare routine based on your unique skin profile.",
  },
  {
    title: "Transform",
    copy: "Follow routine. Track improvements. Re-analyze periodically.",
  },
];

export default function HowItWorks() {
  const wrapperRef = useRef(null);
  const pinRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const steps = stepRefs.current.filter(Boolean);
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(steps, { opacity: 0.35 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 4.5}`,
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
            steps.forEach((step, i) => {
              gsap.to(step, { opacity: i <= idx ? 1 : 0.35, duration: 0.3, overwrite: "auto" });
            });
          },
        },
      });

      tl.to(lineRef.current, { scaleY: 1, ease: "none", duration: 1 }, 0);
    }, wrapperRef);

    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <section id="how-it-works" ref={wrapperRef} className="relative h-[500dvh] w-full motion-reduce:h-auto">
      <div
        ref={pinRef}
        className={`${display.variable} ${mono.variable} relative flex h-[100dvh] w-full items-center overflow-hidden bg-[#FAF5EE] px-6 motion-reduce:h-auto motion-reduce:py-24`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(43,35,48,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,35,48,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <h2
            className="mb-14 font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl"
            style={{
              backgroundImage: GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            How KYS Works
          </h2>

          <div className="relative pl-8 sm:pl-10">
            <div className="absolute left-3 top-1 h-full w-px bg-[#2B2330]/12 sm:left-4" />
            <div
              ref={lineRef}
              className="absolute left-3 top-1 h-full w-px sm:left-4"
              style={{ backgroundImage: GRADIENT }}
            />

            <div className="space-y-12">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  ref={(el) => (stepRefs.current[i] = el)}
                  className="relative motion-reduce:opacity-100"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold italic text-[#2B2330] sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md font-[family-name:var(--font-mono)] text-base leading-relaxed text-[#2B2330]/75 sm:text-lg">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-14 pl-8 font-[family-name:var(--font-display)] text-xl italic text-[#2B2330]/85 sm:pl-10">
            Healthy skin becomes measurable.
          </p>
        </div>
      </div>
    </section>
  );
}
