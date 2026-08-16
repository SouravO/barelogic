"use client";

import { forwardRef, useLayoutEffect, useRef } from "react";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import gsap from "gsap";

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

const WHY_CHOOSE = [
  {
    title: "Personalized Approach",
    copy: "Every recommendation based on your skin analysis.",
    bg: "#FAF5EE",
    text: "#2B2330",
    accent: "#8C5A82",
  },
  {
    title: "Scientific Assessment",
    copy: "Advanced technology replaces guesswork.",
    bg: "#F3E9EF",
    text: "#3E1F3D",
    accent: "#A45F86",
  },
  {
    title: "Expert Guidance",
    copy: "Professional recommendations tailored to your needs.",
    bg: "#EDE1EA",
    text: "#3E1F3D",
    accent: "#8C5A82",
  },
  {
    title: "Premium Formulations",
    copy: "Carefully selected ingredients backed by research.",
    bg: "#3E1F3D",
    text: "#FAF5EE",
    accent: "#E9B9CC",
  },
  {
    title: "Progress Tracking",
    copy: "Compare reports over time and monitor improvements.",
    bg: "#2B2330",
    text: "#FAF5EE",
    accent: "#C97AA0",
  },
  {
    title: "Complete Skin Journey",
    copy: "From analysis to routine to results. Everything under one brand.",
    bg: "#221A26",
    text: "#FAF5EE",
    accent: "#E9B9CC",
  },
];

const INTRO_HOLD = 0.015;
const SECTION_SCROLL_VH = WHY_CHOOSE.length * 0.82 + 1;
const SECTION_HEIGHT = `${SECTION_SCROLL_VH * 100}dvh`;

const WhyCard = forwardRef(function WhyCard({ item, variant = "stack" }, ref) {
  const { title, copy, bg, text, accent } = item;

  const shape =
    variant === "stack"
      ? "absolute inset-0 m-auto h-[70dvh] w-[90vw] sm:h-[74dvh] sm:w-[85vw] md:h-[76dvh] md:w-[78vw] lg:max-w-[1200px]"
      : "relative mx-auto h-auto min-h-[420px] w-full max-w-2xl";

  return (
    <div
      ref={ref}
      className={`${shape} flex flex-col items-center justify-center overflow-hidden rounded-[2rem] px-6 text-center shadow-[0_40px_100px_-30px_rgba(30,20,45,0.35)] sm:rounded-[2.25rem] sm:px-10`}
      style={{
        backgroundColor: bg,
        color: text,
        willChange: variant === "stack" ? "transform, opacity" : undefined,
        opacity: variant === "stack" ? 0 : 1,
        transform: variant === "stack" ? "translate3d(0,125%,0) scale(0.94) rotate(0deg)" : undefined,
      }}
    >
      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        <h3
          data-reveal
          className="font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl md:text-6xl"
        >
          {title}
        </h3>
        <p data-reveal className="mx-auto mt-6 max-w-lg text-lg leading-relaxed opacity-85 sm:text-xl">
          {copy}
        </p>
        <span className="mt-8 h-[2px] w-10 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    </div>
  );
});

function WhyChooseStack() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);
  const activeIndexRef = useRef(0);

  useLayoutEffect(() => {
    let frame = 0;
    let cleanup = () => {};

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: 125,
          scale: 0.94,
          opacity: 0,
          rotation: i % 2 === 0 ? -2 : 2,
          zIndex: i + 1,
          transformOrigin: "50% 100%",
        });
      });

      const updateCards = (progress) => {
        const cardProgress = Math.max(0, (progress - INTRO_HOLD) / (1 - INTRO_HOLD));
        const activeIdx = Math.min(cards.length - 1, Math.max(0, Math.floor(cardProgress * cards.length)));

        cards.forEach((card, i) => {
          const local = gsap.utils.clamp(0, 1, cardProgress * cards.length - i);
          const eased = gsap.parseEase("power3.out")(local);
          const depth = Math.max(0, activeIdx - i);
          const entered = local > 0;

          gsap.set(card, {
            yPercent: entered ? -6 * depth + (1 - eased) * 125 : 125,
            scale: entered ? Math.max(0.82, 1 - 0.055 * depth) : 0.94,
            opacity: entered ? Math.max(0.42, 1 - 0.16 * depth) : 0,
            rotation: entered ? (depth > 0 ? (i % 2 === 0 ? -1.5 : 1.5) : 0) : i % 2 === 0 ? -2 : 2,
          });
        });

        if (activeIdx !== activeIndexRef.current) {
          activeIndexRef.current = activeIdx;
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return;
            dot.style.opacity = i === activeIdx ? "1" : "0.35";
            dot.style.transform = i === activeIdx ? "scaleY(1)" : "scaleY(0.6)";
          });
        }
      };

      const readProgress = () => {
        if (!sectionRef.current) return 0;
        
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const windowHeight = window.innerHeight;
        
        // Animation starts when the section enters the viewport
        // Progress = 0 when section is at bottom of viewport, Progress = 1 when scrolled past
        const triggerStart = windowHeight; // Section enters from bottom
        const animationEnd = -windowHeight * SECTION_SCROLL_VH; // After scrolling through all cards
        
        // Calculate progress based on section position relative to viewport
        const progress = (triggerStart - sectionTop) / (triggerStart - animationEnd);
        
        return gsap.utils.clamp(0, 1, progress);
      };

      const requestUpdate = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          updateCards(readProgress());
        });
      };

      requestUpdate();
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);

      cleanup = () => {
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }, sectionRef);

    let cancelled = false;
    document.fonts?.ready?.then(() => {
      if (!cancelled) window.dispatchEvent(new Event("resize"));
    });

    return () => {
      cancelled = true;
      cleanup();
      ctx.revert();
    };
  }, []);

  return (
    <section id="products" className={`${display.variable} ${mono.variable} relative isolate w-full bg-[#FAF5EE] pb-[14dvh]`}>
      <div ref={sectionRef} className="relative w-full motion-reduce:h-auto" style={{ height: SECTION_HEIGHT }}>
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#FAF5EE] motion-reduce:h-auto motion-reduce:sticky motion-reduce:top-auto motion-reduce:overflow-visible">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src="/skin.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain object-center md:object-cover"
              fill
              sizes="100vw"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(180deg, rgba(250,245,238,0.35) 0%, rgba(250,245,238,0.12) 30%, rgba(250,245,238,0.18) 100%)",
            }}
          />

          <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 sm:right-10 md:flex">
            {WHY_CHOOSE.map((s, i) => (
              <span
                key={s.title}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className="h-8 w-[3px] origin-bottom rounded-full bg-[#2B2330] transition-[opacity,transform] duration-300"
                style={{ opacity: i === 0 ? 1 : 0.35, transform: i === 0 ? "scaleY(1)" : "scaleY(0.6)" }}
              />
            ))}
          </div>

          <div className="relative z-10 h-full w-full">
            {WHY_CHOOSE.map((item, i) => (
              <WhyCard
                key={item.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                item={item}
              />
            ))}
          </div>
        </div>

        <div className="hidden flex-col gap-8 bg-[#FAF5EE] px-4 py-16 motion-reduce:flex sm:py-24">
          {WHY_CHOOSE.map((item) => (
            <WhyCard key={item.title} item={item} variant="static" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseStack;
