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
  const scanArcRef = useRef(null);
  const rotatingRingRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  // Refs for the corner images
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);

  // Phase 1 — Hidden starting state
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([headlineRef.current, subRef.current, ctaRef.current], {
          opacity: 0,
          y: 14,
        });

        gsap.set(img1Ref.current, { opacity: 0, scale: 0.7, x: -260, y: -200, rotation: -35 });
        gsap.set(img2Ref.current, { opacity: 0, scale: 0.7, x: 260, y: -200, rotation: 30 });
        gsap.set(img3Ref.current, { opacity: 0, scale: 0.7, x: -260, y: 200, rotation: -38 });
        gsap.set(img4Ref.current, { opacity: 0, scale: 0.7, x: 260, y: 200, rotation: 33 });

        gsap.set(ringRef.current, { opacity: 0, scale: 0.88 });
        gsap.set(glowRef.current, { opacity: 0 });

        // AI Tech Layer Initial States
        gsap.set('.ai-path-base', { strokeDasharray: 600, strokeDashoffset: 600 });
        gsap.set('.ai-label-group', { opacity: 0, scale: 0.9 });
        gsap.set('.ai-node-core', { opacity: 0, scale: 0 });
        gsap.set('.ai-marker', { opacity: 0 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            headlineRef.current, subRef.current, ctaRef.current, 
            ringRef.current, glowRef.current,
            img1Ref.current, img2Ref.current, img3Ref.current, img4Ref.current
          ], 
          { clearProps: "all", opacity: 1 }
        );
        gsap.set(img1Ref.current, { rotation: 15 });
        gsap.set(img2Ref.current, { rotation: -15 });
        gsap.set(img3Ref.current, { rotation: 12 });
        gsap.set(img4Ref.current, { rotation: -12 });
        
        gsap.set('.ai-path-base', { strokeDasharray: "none" });
        gsap.set('.ai-label-group', { opacity: 1, scale: 1 });
        gsap.set('.ai-node-core', { opacity: 1, scale: 1 });
        gsap.set('.ai-marker', { opacity: 1 });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Phase 2 — Reveal and continuous AI animations
  useEffect(() => {
    if (!introDone) return;

    let removeMove;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Core Hero Reveal
        tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0)
          .fromTo(
            headlineRef.current,
            { backgroundPosition: "0% 50%" },
            { backgroundPosition: "100% 50%", duration: 1.6, ease: "power2.inOut" },
            0
          )
          .to(glowRef.current, { opacity: 1, duration: 1.2, ease: "sine.out" }, 0)
          
          // 2. Reveal Central Analytical Engine
          .to(ringRef.current, { opacity: 1, scale: 1, duration: 1.5 }, 0.1)
          .to('.ai-marker', { opacity: 0.6, duration: 1, stagger: 0.1 }, 0.4)
          
          // 3. Products thrown into their analytical zones
          .to(img1Ref.current, { opacity: 1, scale: 1, x: 0, y: 0, rotate: 15, duration: 0.85 }, 0.7)
          .to(img2Ref.current, { opacity: 1, scale: 1, x: 0, y: 0, rotate: -15, duration: 0.85 }, 0.95)
          .to(img3Ref.current, { opacity: 1, scale: 1, x: 0, y: 0, rotate: 12, duration: 0.85 }, 1.2)
          .to(img4Ref.current, { opacity: 1, scale: 1, x: 0, y: 0, rotate: -12, duration: 0.85 }, 1.45)
          
          // 4. Extend AI Connection Pathways toward the products
          .to('.ai-path-base', { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", stagger: 0.1 }, 0.9)
          .to('.ai-node-core', { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(2)" }, 1.5)
          .to('.ai-label-group', { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }, 1.7)
          
          // 5. Reveal Content
          .to(subRef.current, { opacity: 1, y: 0, duration: 0.9 }, 1.95)
          .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.85 }, 2.15);

        // Continuous gradient shimmer on headline
        gsap.to(headlineRef.current, {
          backgroundPosition: "0% 50%",
          duration: 14,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2,
        });

        // Continuous AI Data Flow on the connection lines
        gsap.to('.ai-path-flow', {
          strokeDashoffset: -40,
          duration: 2,
          repeat: -1,
          ease: "none"
        });

        // Continuous AI Engine Animations (Rotating Dashboard Elements)
        gsap.to(scanArcRef.current, { 
          rotation: 360, 
          duration: 18, 
          repeat: -1, 
          ease: "none", 
          transformOrigin: "50% 50%" 
        });

        gsap.to(rotatingRingRef.current, {
          rotation: -360,
          duration: 30,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%"
        });

        // Pulsing Nodes
        gsap.to('.ai-node-pulse', {
          opacity: 0,
          scale: 2.5,
          duration: 2,
          repeat: -1,
          stagger: { each: 0.5, from: "random" },
          ease: "power2.out"
        });

        // Interactive Parallax
        const ringRotateTo = gsap.quickTo(ringRef.current, "rotation", { duration: 1.5, ease: "power3.out" });
        const glowXTo = gsap.quickTo(glowRef.current, "xPercent", { duration: 1.6, ease: "power2.out" });
        const glowYTo = gsap.quickTo(glowRef.current, "yPercent", { duration: 1.6, ease: "power2.out" });
        
        const handleMove = (e) => {
          const relX = e.clientX / window.innerWidth - 0.5;
          const relY = e.clientY / window.innerHeight - 0.5;
          
          ringRotateTo(relX * 6);
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
        {/* Soft Background Glow - Slightly richer to support the AI overlay */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[75vmax] w-[75vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(164,95,134,0.15) 0%, rgba(110,63,99,0.08) 40%, rgba(250,245,238,0) 70%)",
          }}
        />

        {/* Existing Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(43,35,48,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,35,48,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* AI Analytical Engine SVG - Significantly enhanced visibility */}
        <svg
          ref={ringRef}
          viewBox="0 0 800 800"
          className="pointer-events-none absolute top-[48%] h-[75vmin] w-[75vmin] max-h-[800px] max-w-[800px] -translate-y-1/2 overflow-visible"
        >
          <defs>
            <linearGradient id="scanBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C97AA0" stopOpacity="0" />
              <stop offset="50%" stopColor="#C97AA0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C97AA0" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Technical Crosshairs / HUD Markers */}
          <g className="ai-marker" stroke="#6E3F63" strokeOpacity="0.4" strokeWidth="1.5">
            <path d="M 400 120 L 400 150 M 400 650 L 400 680" />
            <path d="M 120 400 L 150 400 M 650 400 L 680 400" />
            {/* Corner brackets */}
            <path d="M 220 250 L 220 220 L 250 220" fill="none" />
            <path d="M 580 250 L 580 220 L 550 220" fill="none" />
            <path d="M 220 550 L 220 580 L 250 580" fill="none" />
            <path d="M 580 550 L 580 580 L 550 580" fill="none" />
          </g>

          {/* Core Analysis Rings - Bolder and more visible */}
          <circle cx="400" cy="400" r="320" fill="none" stroke="#2B2330" strokeOpacity="0.15" strokeWidth="1" />
          <circle cx="400" cy="400" r="280" fill="none" stroke="#6E3F63" strokeOpacity="0.25" strokeWidth="1.5" />
          
          {/* Animated Dashed Measurement Ring */}
          <g ref={rotatingRingRef}>
            <circle cx="400" cy="400" r="240" fill="none" stroke="#C97AA0" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 16" />
          </g>

          {/* Precision Ticks & Coordinates */}
          {[0, 90, 180, 270].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 400 + 315 * Math.cos(rad);
            const y1 = 400 + 315 * Math.sin(rad);
            const x2 = 400 + 325 * Math.cos(rad);
            const y2 = 400 + 325 * Math.sin(rad);
            const labels = ["AX-01", "AY-02", "AX-03", "AY-04"];
            return (
              <g key={i} className="ai-marker">
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6E3F63" strokeOpacity="0.5" strokeWidth="2" />
                <text x={400 + 340 * Math.cos(rad)} y={400 + 340 * Math.sin(rad) + 3} fontSize="9" fontFamily="var(--font-mono)" fill="#6E3F63" opacity="0.7" textAnchor="middle" dominantBaseline="middle" letterSpacing="0.1em">
                  {labels[i]}
                </text>
              </g>
            );
          })}

          {/* Animated Scanning Arc */}
          <g ref={scanArcRef}>
            <circle cx="400" cy="400" r="300" fill="none" stroke="url(#scanBeam)" strokeWidth="40" strokeDasharray="500 1500" strokeLinecap="round" />
            <line x1="400" y1="90" x2="400" y2="110" stroke="#C97AA0" strokeOpacity="0.8" strokeWidth="2.5" />
            <circle cx="400" cy="100" r="3" fill="#C97AA0" />
          </g>

          {/* AI Connection Pathways - More complex and highly visible */}
          <g>
            {/* Top Left -> Sunscreen */}
            <path className="ai-path-base" d="M 174 174 L 100 100 L 20 100" fill="none" stroke="#6E3F63" strokeOpacity="0.3" strokeWidth="2" />
            <path className="ai-path-flow" d="M 174 174 L 100 100 L 20 100" fill="none" stroke="#C97AA0" strokeOpacity="0.8" strokeWidth="2" strokeDasharray="4 20" />
            <circle className="ai-node-pulse" cx="20" cy="100" r="5" fill="#C97AA0" />
            <circle className="ai-node-core" cx="20" cy="100" r="4" fill="#6E3F63" filter="url(#glow)" />
            <g className="ai-label-group" transform="translate(-10, 100)">
              <rect x="-105" y="-9" width="95" height="18" fill="#FAF5EE" fillOpacity="0.9" rx="9" stroke="#6E3F63" strokeOpacity="0.2" />
              <text x="-57" y="3" fontSize="8" fontFamily="var(--font-mono)" fill="#6E3F63" fontWeight="500" textAnchor="middle" letterSpacing="0.1em">SKIN ANALYSIS</text>
            </g>

            {/* Top Right -> Moisturizer */}
            <path className="ai-path-base" d="M 626 174 L 700 100 L 780 100" fill="none" stroke="#6E3F63" strokeOpacity="0.3" strokeWidth="2" />
            <path className="ai-path-flow" d="M 626 174 L 700 100 L 780 100" fill="none" stroke="#C97AA0" strokeOpacity="0.8" strokeWidth="2" strokeDasharray="4 20" />
            <circle className="ai-node-pulse" cx="780" cy="100" r="5" fill="#C97AA0" />
            <circle className="ai-node-core" cx="780" cy="100" r="4" fill="#6E3F63" filter="url(#glow)" />
            <g className="ai-label-group" transform="translate(810, 100)">
              <rect x="10" y="-9" width="95" height="18" fill="#FAF5EE" fillOpacity="0.9" rx="9" stroke="#6E3F63" strokeOpacity="0.2" />
              <text x="57" y="3" fontSize="8" fontFamily="var(--font-mono)" fill="#6E3F63" fontWeight="500" textAnchor="middle" letterSpacing="0.1em">PERSONALIZED</text>
            </g>

            {/* Bottom Left -> Cleanser */}
            <path className="ai-path-base" d="M 174 626 L 100 700 L 20 700" fill="none" stroke="#6E3F63" strokeOpacity="0.3" strokeWidth="2" />
            <path className="ai-path-flow" d="M 174 626 L 100 700 L 20 700" fill="none" stroke="#C97AA0" strokeOpacity="0.8" strokeWidth="2" strokeDasharray="4 20" />
            <circle className="ai-node-pulse" cx="20" cy="700" r="5" fill="#C97AA0" />
            <circle className="ai-node-core" cx="20" cy="700" r="4" fill="#6E3F63" filter="url(#glow)" />
            <g className="ai-label-group" transform="translate(-10, 700)">
              <rect x="-95" y="-9" width="85" height="18" fill="#FAF5EE" fillOpacity="0.9" rx="9" stroke="#6E3F63" strokeOpacity="0.2" />
              <text x="-52" y="3" fontSize="8" fontFamily="var(--font-mono)" fill="#6E3F63" fontWeight="500" textAnchor="middle" letterSpacing="0.1em">PRECISION</text>
            </g>

            {/* Bottom Right -> Serum */}
            <path className="ai-path-base" d="M 626 626 L 700 700 L 780 700" fill="none" stroke="#6E3F63" strokeOpacity="0.3" strokeWidth="2" />
            <path className="ai-path-flow" d="M 626 626 L 700 700 L 780 700" fill="none" stroke="#C97AA0" strokeOpacity="0.8" strokeWidth="2" strokeDasharray="4 20" />
            <circle className="ai-node-pulse" cx="780" cy="700" r="5" fill="#C97AA0" />
            <circle className="ai-node-core" cx="780" cy="700" r="4" fill="#6E3F63" filter="url(#glow)" />
            <g className="ai-label-group" transform="translate(810, 700)">
              <rect x="10" y="-9" width="90" height="18" fill="#FAF5EE" fillOpacity="0.9" rx="9" stroke="#6E3F63" strokeOpacity="0.2" />
              <text x="55" y="3" fontSize="8" fontFamily="var(--font-mono)" fill="#6E3F63" fontWeight="500" textAnchor="middle" letterSpacing="0.1em">AI-POWERED</text>
            </g>
          </g>
        </svg>

        {/* Skincare Ecosystem Images - Keeping Z-index high so they float above tech */}
        <img 
          ref={img1Ref}
          src="/sunscreen.png" 
          alt="Sunscreen" 
          className="pointer-events-none absolute top-[5%] left-[2%] w-48 drop-shadow-2xl sm:w-64 md:left-[5%] md:w-80 lg:w-96 xl:w-[400px] z-10"
        />
        <img 
          ref={img2Ref}
          src="/moisturizer.png" 
          alt="Moisturizer" 
          className="pointer-events-none absolute top-[5%] right-[2%] w-48 drop-shadow-2xl sm:w-64 md:right-[5%] md:w-80 lg:w-96 xl:w-[400px] z-10"
        />
        <img 
          ref={img3Ref}
          src="/cleanser.png" 
          alt="Cleanser" 
          className="pointer-events-none absolute bottom-[5%] left-[2%] w-48 drop-shadow-2xl sm:w-64 md:left-[5%] md:w-80 lg:w-96 xl:w-[400px] z-10"
        />
        <img 
          ref={img4Ref}
          src="/serum.png" 
          alt="Serum" 
          className="pointer-events-none absolute bottom-[5%] right-[2%] w-48 drop-shadow-2xl sm:w-64 md:right-[5%] md:w-80 lg:w-96 xl:w-[400px] z-10"
        />

        {/* Primary Content */}
        <h2
          ref={headlineRef}
          className="relative z-20 mt-4 max-w-4xl px-6 text-center font-[family-name:var(--font-display)] text-4xl font-medium italic leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            backgroundImage:
              "linear-gradient(150deg, #E9B9CC 0%, #C97AA0 25%, #A45F86 50%, #6E3F63 75%, #3E1F3D 100%)",
            backgroundSize: "220% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0px 4px 20px rgba(250, 245, 238, 0.4)" // Added slight shadow to ensure legibility over the active tech layer
          }}
        >
          Your Skin. Your Story. Your Science.
        </h2>

        <div ref={subRef} className="relative z-20 mt-7 max-w-2xl px-6 text-center">
          <p className="font-[family-name:var(--font-mono)] text-base leading-relaxed text-[#2B2330]/80 sm:text-lg">
            Every skin has its own story: different needs, different concerns, different care.
          </p>
          <p className="mt-4 font-[family-name:var(--font-mono)] text-base leading-relaxed text-[#2B2330]/80 sm:text-lg">
            KYS never takes a one-size-fits-all approach. We analyze your skin first, then recommend, because healthy skin starts with knowing your skin.
          </p>
        </div>

        <div ref={ctaRef} className="relative z-20 mt-10 flex flex-col items-center gap-4 px-6 sm:flex-row">
          <a
            href="#technology"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#technology")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-full px-8 py-3.5 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#FAF5EE] transition-transform duration-300 hover:scale-[1.03] shadow-lg shadow-[#A45F86]/20"
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
            className="rounded-full border border-[#6E3F63]/30 px-8 py-3.5 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#2B2330] transition-colors duration-300 hover:border-[#6E3F63]/60 bg-[#FAF5EE]/70 backdrop-blur-md"
          >
            Explore Products
          </a>
        </div>
      </section>
    </>
  );
}