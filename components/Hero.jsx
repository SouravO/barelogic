"use client";

import { useEffect, useRef, useState } from "react";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import IntroScreen from "@/components/IntroScreen"; 

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
  const [introDone, setIntroDone] = useState(false);

  const rootRef = useRef(null);
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  // Refs for the corner images
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);

  // Phase 1 — set the hidden starting state as soon as Hero mounts.
  // Each image starts thrown out past its corner (off past the screen edge)
  // with an exaggerated spin, so Phase 2 can fly it in toward its resting tilt.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([headlineRef.current, subRef.current, ctaRef.current], {
          opacity: 0,
          y: 14,
        });

        gsap.set(img1Ref.current, { opacity: 0, scale: 0.7, x: -260, y: -200, rotate: -35 });
        gsap.set(img2Ref.current, { opacity: 0, scale: 0.7, x: 260, y: -200, rotate: 30 });
        gsap.set(img3Ref.current, { opacity: 0, scale: 0.7, x: -260, y: 200, rotate: -38 });
        gsap.set(img4Ref.current, { opacity: 0, scale: 0.7, x: 260, y: 200, rotate: 33 });

        gsap.set(ringRef.current, { opacity: 0, scale: 0.88, rotate: -10 });
        gsap.set(glowRef.current, { opacity: 0 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            headlineRef.current, 
            subRef.current, 
            ctaRef.current, 
            ringRef.current, 
            glowRef.current,
            img1Ref.current,
            img2Ref.current,
            img3Ref.current,
            img4Ref.current
          ], 
          {
            clearProps: "all",
            opacity: 1,
          }
        );
        // Restore each image's resting tilt since it's no longer set via inline style.
        gsap.set(img1Ref.current, { rotate: 15 });
        gsap.set(img2Ref.current, { rotate: -15 });
        gsap.set(img3Ref.current, { rotate: 12 });
        gsap.set(img4Ref.current, { rotate: -12 });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Phase 2 — play the reveal once the intro screen has wiped away.
  useEffect(() => {
    if (!introDone) return;

    let removeMove;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Show Main Title — first thing to appear, right as the intro clears.
        tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0)
          .fromTo(
            headlineRef.current,
            { backgroundPosition: "0% 50%" },
            { backgroundPosition: "100% 50%", duration: 1.6, ease: "power2.inOut" },
            0
          )
          .to(glowRef.current, { opacity: 1, duration: 1.2, ease: "sine.out" }, 0)
          .to(ringRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 1.1 }, 0.1)
          // 2. Throw in Top-Left Image — flies in from off past the corner, settles into its tilt
          .to(
            img1Ref.current,
            { opacity: 1, scale: 1, x: 0, y: 0, rotate: 15, duration: 0.85, ease: "power3.out" },
            0.7
          )
          // 3. Throw in Top-Right Image
          .to(
            img2Ref.current,
            { opacity: 1, scale: 1, x: 0, y: 0, rotate: -15, duration: 0.85, ease: "power3.out" },
            0.95
          )
          // 4. Throw in Bottom-Left Image
          .to(
            img3Ref.current,
            { opacity: 1, scale: 1, x: 0, y: 0, rotate: 12, duration: 0.85, ease: "power3.out" },
            1.2
          )
          // 5. Throw in Bottom-Right Image
          .to(
            img4Ref.current,
            { opacity: 1, scale: 1, x: 0, y: 0, rotate: -12, duration: 0.85, ease: "power3.out" },
            1.45
          )
          // 6. Reveal Remaining Text and Buttons
          .to(subRef.current, { opacity: 1, y: 0, duration: 0.9 }, 1.95)
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.85 }, 2.15);

        gsap.to(headlineRef.current, {
          backgroundPosition: "0% 50%",
          duration: 14,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2,
        });

        const ringRotateTo = gsap.quickTo(ringRef.current, "rotate", { duration: 1.3, ease: "power3.out" });
        const glowXTo = gsap.quickTo(glowRef.current, "xPercent", { duration: 1.6, ease: "power2.out" });
        const glowYTo = gsap.quickTo(glowRef.current, "yPercent", { duration: 1.6, ease: "power2.out" });

        const handleMove = (e) => {
          const relX = e.clientX / window.innerWidth - 0.5;
          const relY = e.clientY / window.innerHeight - 0.5;
          ringRotateTo(relX * 8);
          glowXTo(relX * 12);
          glowYTo(relY * 12);
        };

        window.addEventListener("mousemove", handleMove);
        removeMove = () => window.removeEventListener("mousemove", handleMove);
      });
    }, rootRef);

    return () => {
      removeMove?.();
      ctx.revert();
    };
  }, [introDone]);

  return (
    <>
      {!introDone && <IntroScreen onComplete={() => setIntroDone(true)} />}

      <section
        id="hero"
        ref={rootRef}
        className={`${display.variable} ${mono.variable} relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#FAF5EE] pt-28 pb-16`}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(110,63,99,0.18) 0%, rgba(164,95,134,0.10) 45%, rgba(250,245,238,0) 75%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(43,35,48,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,35,48,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <svg
          ref={ringRef}
          viewBox="0 0 600 600"
          className="pointer-events-none absolute top-[26%] h-[46vmin] w-[46vmin] max-h-[460px] max-w-[460px] -translate-y-1/2"
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

        {/* Tilted Corner Images — thrown in from beyond each corner in Phase 2 */}
        <img 
          ref={img1Ref}
          src="/sunscreen.png" 
          alt="Sunscreen" 
          className="pointer-events-none absolute top-[5%] left-[2%] w-48 drop-shadow-2xl sm:w-64 md:left-[5%] md:w-80 lg:w-96 xl:w-[400px]"
        />
        <img 
          ref={img2Ref}
          src="/moisturizer.png" 
          alt="Moisturizer" 
          className="pointer-events-none absolute top-[5%] right-[2%] w-48 drop-shadow-2xl sm:w-64 md:right-[5%] md:w-80 lg:w-96 xl:w-[400px]"
        />
        <img 
          ref={img3Ref}
          src="/cleanser.png" 
          alt="Cleanser" 
          className="pointer-events-none absolute bottom-[5%] left-[2%] w-48 drop-shadow-2xl sm:w-64 md:left-[5%] md:w-80 lg:w-96 xl:w-[400px]"
        />
        <img 
          ref={img4Ref}
          src="/serum.png" 
          alt="Serum" 
          className="pointer-events-none absolute bottom-[5%] right-[2%] w-48 drop-shadow-2xl sm:w-64 md:right-[5%] md:w-80 lg:w-96 xl:w-[400px]"
        />

        <h2
          ref={headlineRef}
          className="relative z-10 mt-4 max-w-4xl px-6 text-center font-[family-name:var(--font-display)] text-4xl font-medium italic leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            backgroundImage:
              "linear-gradient(150deg, #E9B9CC 0%, #C97AA0 25%, #A45F86 50%, #6E3F63 75%, #3E1F3D 100%)",
            backgroundSize: "220% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Your Skin. Your Story. Your Science.
        </h2>

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
                "linear-gradient(150deg, #E9B9CC 0%, #C97AA0 25%, #A45F86 50%, #6E3F63 75%, #3E1F3D 100%)",
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
            className="rounded-full border border-[#6E3F63]/25 px-8 py-3.5 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#2B2330] transition-colors duration-300 hover:border-[#6E3F63]/45"
          >
            Explore Products
          </a>
        </div>
      </section>
    </>
  );
}
