"use client";

import { useEffect, useRef, Suspense } from "react";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Html } from "@react-three/drei";

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

// Preload the 3D model
useGLTF.preload("/model.glb");

/**
 * 3D Model Component
 */
function SkinAnalyzerScene({ proxy }) {
  const modelRef = useRef(null);
  const { scene } = useGLTF("/model.glb");

  useFrame((state) => {
    if (!modelRef.current) return;
    
    // Smoothly apply transforms
    modelRef.current.position.set(proxy.x, proxy.y, proxy.z);
    modelRef.current.rotation.set(proxy.rotX, proxy.rotY, proxy.rotZ);
    modelRef.current.scale.setScalar(proxy.scale);
    
    // Subtle breathing/floating effect independent of scroll
    const time = state.clock.getElapsedTime();
    modelRef.current.position.y += Math.sin(time * 1.5) * 0.02;
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#fff8f0" castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#e9b9cc" />
      
      <group ref={modelRef} dispose={null}>
        {/* If the model is naturally uncentered in Blender, you can offset it here like position={[0, -0.5, 0]} */}
        <primitive object={scene} />
        
        {/* Shadow grouped WITH the model so it moves perfectly under it */}
        <ContactShadows
          position={[0, -0.4, 0]} // Adjusted closer to the base of the model
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
          color="#2B2330"
        />
        
        {/* Callout 01 */}
        <Html
          position={[0.5, 1.2, 0.5]}
          center
          className="callout-1 opacity-0 pointer-events-none"
        >
          <div className="relative flex items-center md:items-start flex-row md:flex-col gap-4 md:gap-0 w-[240px]">
            <div className="w-2 h-2 rounded-full bg-[#3E1F3D] shadow-[0_0_10px_rgba(62,31,61,0.5)] z-10" />
            <div className="hidden md:block w-[1px] h-12 bg-gradient-to-b from-[#3E1F3D] to-transparent ml-[3px] -mt-1" />
            <div className="bg-[#FAF5EE]/90 backdrop-blur-sm p-4 border border-[#2B2330]/10 rounded-sm shadow-xl">
              <p className="font-[family-name:var(--font-mono)] text-xs font-bold text-[#A45F86] mb-1">01 / IMAGING</p>
              <p className="font-[family-name:var(--font-mono)] text-sm text-[#2B2330]">Advanced skin analysis</p>
            </div>
          </div>
        </Html>

        {/* Callout 02 */}
        <Html
          position={[-0.6, 0.5, 0.5]}
          center
          className="callout-2 opacity-0 pointer-events-none"
        >
          <div className="relative flex items-center flex-row-reverse gap-4 w-[240px] right-[100%] md:right-auto">
            <div className="w-2 h-2 rounded-full bg-[#3E1F3D] shadow-[0_0_10px_rgba(62,31,61,0.5)] z-10" />
            <div className="hidden md:block w-12 h-[1px] bg-gradient-to-l from-[#3E1F3D] to-transparent -mr-1" />
            <div className="bg-[#FAF5EE]/90 backdrop-blur-sm p-4 border border-[#2B2330]/10 rounded-sm shadow-xl text-right md:text-left">
              <p className="font-[family-name:var(--font-mono)] text-xs font-bold text-[#A45F86] mb-1">02 / DIAGNOSTICS</p>
              <p className="font-[family-name:var(--font-mono)] text-sm text-[#2B2330]">Multi-parameter evaluation</p>
            </div>
          </div>
        </Html>
      </group>
    </>
  );
}

/**
 * Main Section Component
 */
export default function Model() {
  const sectionRef = useRef(null);
  
  const introCopyRef = useRef(null);
  const analysisCopyRef = useRef(null);
  const analysisLinesRef = useRef([]);

  // UPDATED Y VALUES: Brought everything up so it is fully visible in the viewport
  const proxy = useRef({
    x: 0,
    y: -0.2, // Changed from -1.2
    z: 0,
    rotX: 0,
    rotY: -0.2, 
    rotZ: 0,
    scale: 0.75, 
  }).current;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(analysisCopyRef.current, { opacity: 0, pointerEvents: "none" });
        gsap.set(analysisLinesRef.current, { opacity: 0, y: 20 });
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=400%", 
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.addLabel("intro")
          .to(introCopyRef.current, { opacity: 0, y: -40, duration: 1 }, "intro")
          .to(proxy, {
            scale: 1.1,
            y: 0, // Brought up from -1.0
            rotY: 0.1,
            duration: 1.5,
            ease: "power2.inOut",
          }, "intro");

        tl.addLabel("callouts", "+=0.2")
          .to(".callout-1", { opacity: 1, duration: 0.5 }, "callouts")
          .to(proxy, { rotY: 0.4, duration: 1, ease: "power1.inOut" }, "callouts")
          .to(".callout-2", { opacity: 1, duration: 0.5 }, "callouts+=0.5");

        tl.addLabel("analysis", "+=0.5")
          .to(".callout-1, .callout-2", { opacity: 0, duration: 0.3 }, "analysis")
          .to(proxy, {
            scale: 1.3, 
            x: window.innerWidth > 768 ? -1.5 : 0, 
            y: -0.2, // Brought up from -1.5
            rotY: -0.3,
            rotX: 0.1,
            duration: 2,
            ease: "power2.inOut",
          }, "analysis")
          .to(analysisCopyRef.current, { opacity: 1, duration: 0.5 }, "analysis+=0.5")
          .to(
            analysisLinesRef.current,
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.4, ease: "power2.out" },
            "analysis+=0.7"
          );

        tl.addLabel("conclusion", "+=0.5")
          .to(proxy, {
            scale: 1,
            x: 0,
            y: -0.2, // Brought up from -1.2
            rotY: -0.1,
            rotX: 0,
            duration: 1.5,
            ease: "power2.inOut"
          }, "conclusion");
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([introCopyRef.current, analysisCopyRef.current], { opacity: 1, position: "relative" });
        gsap.set(analysisLinesRef.current, { opacity: 1, y: 0 });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="model"
      ref={sectionRef}
      className={`${display.variable} ${mono.variable} relative overflow-hidden bg-[#FAF5EE] h-screen w-full`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(43,35,48,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,35,48,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <SkinAnalyzerScene proxy={proxy} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-20 h-full w-full mx-auto max-w-7xl px-6 pointer-events-none">
        
        <div 
          ref={introCopyRef}
          className="absolute top-[15%] md:top-[25%] left-6 md:left-12 max-w-md pointer-events-auto"
        >
          <h2
            className="mb-8 font-[family-name:var(--font-display)] text-5xl font-semibold italic leading-[1.05] sm:text-6xl"
            style={{
              backgroundImage: GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Don&rsquo;t Guess.
            <br />
            Know.
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/80">
            <p>Every skincare journey starts with one question.</p>
            <p className="italic">What does your skin actually need?</p>
            <p>
              Our advanced skin analysis machine provides detailed insights about your skin
              health before any product recommendation.
            </p>
            <p className="font-semibold text-[#2B2330]">
              No assumptions.
              <br />
              Only science.
            </p>
          </div>
        </div>

        <div 
          ref={analysisCopyRef}
          className="absolute bottom-[10%] md:top-[25%] right-6 md:right-12 max-w-md pointer-events-auto"
        >
          <h2
            className="mb-8 font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl text-[#2B2330]"
          >
            Precision Meets Personal Care
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/80">
            <p ref={(el) => (analysisLinesRef.current[0] = el)}>
              Our skin analysis system evaluates multiple skin parameters within minutes.
            </p>
            <p ref={(el) => (analysisLinesRef.current[1] = el)}>
              It helps identify visible and underlying concerns that cannot always be seen with
              naked eye.
            </p>
            <p ref={(el) => (analysisLinesRef.current[2] = el)}>
              This allows us to recommend products with greater accuracy and confidence.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}