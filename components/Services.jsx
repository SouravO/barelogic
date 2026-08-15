"use client";

import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import Image from "next/image";
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
      style={{ backgroundColor: bg, color: text, willChange: variant === "stack" ? "transform, opacity" : undefined }}
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
  const pinRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);
  const activeIndexRef = useRef(0);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: 130,
          scale: 0.9,
          opacity: 0,
          rotation: i % 2 === 0 ? -2 : 2,
          zIndex: i + 1,
          transformOrigin: "50% 100%",
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(cards.length - 1, Math.floor(self.progress * cards.length));
            if (idx !== activeIndexRef.current) {
              activeIndexRef.current = idx;
              dotRefs.current.forEach((dot, i) => {
                if (!dot) return;
                dot.style.opacity = i === idx ? "1" : "0.35";
                dot.style.transform = i === idx ? "scaleY(1)" : "scaleY(0.6)";
              });
            }
          },
        },
      });

      cards.forEach((card, i) => {
        const revealEls = card.querySelectorAll("[data-reveal]");
        tl.to(card, { yPercent: 0, scale: 1, opacity: 1, rotation: 0 }, i);
        tl.from(revealEls, { yPercent: 30, opacity: 0, stagger: 0.06, duration: 0.7, ease: "power2.out" }, i + 0.15);

        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cards[j],
            {
              yPercent: -6 * depth,
              scale: Math.max(0.82, 1 - 0.055 * depth),
              opacity: Math.max(0.4, 1 - 0.16 * depth),
              rotation: j % 2 === 0 ? -1.5 : 1.5,
            },
            i
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full h-[700dvh] motion-reduce:h-auto">
      <div ref={pinRef} className="relative h-[100dvh] w-full overflow-hidden bg-[#FAF5EE] motion-reduce:hidden">
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
              ref={(el) => (dotRefs.current[i] = el)}
              className="h-8 w-[3px] origin-bottom rounded-full bg-[#2B2330] transition-[opacity,transform] duration-300"
              style={{ opacity: i === 0 ? 1 : 0.35, transform: i === 0 ? "scaleY(1)" : "scaleY(0.6)" }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full w-full">
          {WHY_CHOOSE.map((item, i) => (
            <WhyCard key={item.title} ref={(el) => (cardRefs.current[i] = el)} item={item} />
          ))}
        </div>
      </div>

      <div className="hidden flex-col gap-8 bg-[#FAF5EE] px-4 py-16 motion-reduce:flex sm:py-24">
        {WHY_CHOOSE.map((item) => (
          <WhyCard key={item.title} item={item} variant="static" />
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const productsRef = useRef(null);
  const promiseRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        [productsRef, promiseRef].forEach((ref) => {
          if (!ref.current) return;
          const items = ref.current.querySelectorAll("[data-reveal]");
          gsap.set(items, { opacity: 0, y: 26 });
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: "top 72%", toggleActions: "play none none none" },
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { clearProps: "all", opacity: 1 });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={`${display.variable} ${mono.variable}`}>
      <section id="products" ref={productsRef} className="relative overflow-hidden bg-[#FAF5EE] px-6 py-28 md:py-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(43,35,48,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,35,48,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <div>
            <h2
              data-reveal
              className="mb-8 font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl"
              style={{
                backgroundImage: GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Designed Around Your Skin.
              <br />
              Not Around Trends.
            </h2>
            <div className="space-y-4 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/80">
              <p data-reveal>
                Every KYS formulation developed with one purpose. Deliver targeted care for
                different skin conditions rather than creating generic products for everyone.
              </p>
              <p data-reveal>
                Whether your skin needs hydration, oil control, brightening, acne care, or
                anti-aging support, your recommendations begin with understanding not marketing.
              </p>
            </div>
          </div>

          <div data-reveal className="relative mx-auto flex h-[320px] w-full max-w-sm items-center justify-center sm:h-[380px]">
            <div
              className="absolute inset-0 rounded-[2.5rem] opacity-90"
              style={{ backgroundImage: GRADIENT }}
            />
            <div className="absolute inset-6 rounded-[2rem] border border-white/25 backdrop-blur-sm" />
            <svg viewBox="0 0 200 200" className="relative z-10 h-24 w-24 text-[#FAF5EE] sm:h-28 sm:w-28">
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="6" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>

      <WhyChooseStack />

      <section
        ref={promiseRef}
        className="relative flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF5EE] px-6 py-28 text-center md:py-36"
      >
        <h2
          data-reveal
          className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl italic leading-[1.4] text-[#2B2330] sm:text-4xl md:text-5xl"
        >
          We promise to recommend only what your skin needs.
          <br />
          Nothing more.
          <br />
          Nothing less.
        </h2>
        <p data-reveal className="mt-8 font-[family-name:var(--font-mono)] text-lg text-[#2B2330]/70">
          Because trust begins with honesty.
        </p>
      </section>
    </div>
  );
}
