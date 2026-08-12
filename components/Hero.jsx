"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { Center, Environment, Text3D } from "@react-three/drei";
import gsap from "gsap";

function HeroBackground() {
  return (
    <div className="hero-bg pointer-events-none absolute inset-0 overflow-hidden bg-[#0a0a0a]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 700px at 68% -8%, rgba(255,255,255,0.14), transparent 60%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1456 819"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <circle cx="1120" cy="430" r="480" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="748" cy="135" r="3" fill="rgba(255,255,255,0.6)" />
        <circle cx="1331" cy="436" r="3" fill="rgba(255,255,255,0.6)" />
      </svg>

      <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <svg
        className="absolute inset-x-0 bottom-0 h-[45%] w-full"
        viewBox="0 0 1456 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2a2e" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          <linearGradient id="wave2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1c1f" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          <linearGradient id="wave3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#131316" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <path
          d="M0,180 C240,120 420,220 680,160 C900,110 1080,200 1456,140 L1456,400 L0,400 Z"
          fill="url(#wave1)"
          opacity="0.55"
        />
        <path
          d="M0,240 C260,190 480,260 760,210 C980,170 1160,250 1456,200 L1456,400 L0,400 Z"
          fill="url(#wave2)"
          opacity="0.75"
        />
        <path
          d="M0,300 C300,260 520,320 800,280 C1040,250 1220,310 1456,270 L1456,400 L0,400 Z"
          fill="url(#wave3)"
        />
      </svg>
    </div>
  );
}

function Letter({ onReady }) {
  const groupRef = useRef(null);

  useEffect(() => {
    if (groupRef.current) onReady?.(groupRef.current);
  }, [onReady]);

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.1, -0.5, 0]} scale={1}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={2.2}
          height={0.55}
          curveSegments={24}
          bevelEnabled
          bevelThickness={0.06}
          bevelSize={0.035}
          bevelSegments={8}
        >
          B
          <meshPhysicalMaterial
            color="#475569"
            emissive="#0f172a"
            emissiveIntensity={0.28}
            metalness={0.62}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.12}
            envMapIntensity={2.8}
          />
        </Text3D>
      </Center>
    </group>
  );
}

function HeroLetter3D({ onReady }) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 35 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 5]} intensity={1.7} />
      <directionalLight position={[-4, 2, 6]} intensity={1.5} color="#e0f2fe" />
      <pointLight position={[-4, -2, 3]} intensity={1} color="#7dd3fc" />
      <Suspense fallback={null}>
        <Letter onReady={onReady} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

function HeroLetterMark({ onReady }) {
  const [isReady, setIsReady] = useState(false);

  const handleReady = (group) => {
    setIsReady(true);
    onReady?.(group);
  };

  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden="true"
        className={`absolute inset-0 grid place-items-center font-black leading-none text-slate-300 transition-opacity duration-700 ${
          isReady ? "opacity-20" : "opacity-45"
        }`}
        style={{ fontSize: "clamp(22rem, 46vw, 46rem)" }}
      >
        B
      </div>
      <div className="absolute inset-0">
        <HeroLetter3D onReady={handleReady} />
      </div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const linesRef = useRef([]);

  const { contextSafe } = useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .set(containerRef.current, { autoAlpha: 1 })
        .from(".hero-bg", { autoAlpha: 0, duration: 1.2 })
        .from(linesRef.current, { yPercent: 120, duration: 1, stagger: 0.12 }, "-=0.6")
        .from(".hero-sub", { autoAlpha: 0, y: 20, duration: 0.8 }, "-=0.4")
        .from(".hero-cta", { autoAlpha: 0, y: 10, duration: 0.6 }, "-=0.5");
    },
    { scope: containerRef }
  );

  const playLetterIntro = contextSafe((group) => {
    gsap
      .timeline({ defaults: { ease: "power4.out" } })
      .to(group.position, { x: 0, duration: 1.6 })
      .to(group.rotation, { x: 0.1, y: -0.5, duration: 1.6 }, "<")
      .to(group.scale, { x: 1, y: 1, z: 1, duration: 1.6, ease: "back.out(1.3)" }, "<")
      .call(() => {
        gsap.to(group.rotation, {
          y: "+=0.15",
          duration: 6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
  });

  const lines = ["DESIGN /", "WHICH /", "MOVES"];

  return (
    <section
      ref={containerRef}
      className="invisible relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] px-6 sm:px-10 lg:px-20"
    >
      <HeroBackground />

      <div className="pointer-events-none absolute inset-y-0 right-[-10%] z-0 w-[70vw] max-w-[950px] sm:right-[-4%]">
        <HeroLetterMark onReady={playLetterIntro} />
      </div>

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-[13vw] font-semibold leading-[0.9] text-white sm:text-[7vw] lg:text-[6.5vw]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span ref={(el) => (linesRef.current[i] = el)} className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-8 max-w-md text-slate-400">
          We build sites, apps and systems that give brands a bold digital identity.
        </p>

        <a
          href="#projects"
          className="hero-cta mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white"
        >
          View projects
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30">
            {"\u2192"}
          </span>
        </a>
      </div>
    </section>
  );
}
