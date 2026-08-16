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
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const mono = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

const GRADIENT =
  "linear-gradient(115deg, #3E1F3D 0%, #6E3F63 30%, #A45F86 55%, #C97AA0 75%, #E9B9CC 100%)";

const FACTORS = ["Age", "Lifestyle", "Climate", "Diet", "Stress", "Hormones", "Genetics"];

/* ------------------------------------------------------------------ */
/* Section 1 storytelling-canvas data                                 */
/* Deterministic (no Math.random in render) so server and client       */
/* markup match — positions are hand-tuned, not randomized.            */
/* ------------------------------------------------------------------ */

// Uncertain guesses, scattered around the face, ambient-floating.
const GUESS_WORDS = [
  { text: "Oily?", top: "6%", left: "4%" },
  { text: "Dry?", top: "16%", left: "76%" },
  { text: "Combination?", top: "46%", left: "0%" },
  { text: "Sensitive?", top: "60%", left: "80%" },
  { text: "Normal?", top: "82%", left: "8%" },
  { text: "Dehydrated?", top: "90%", left: "66%" },
];

// Particles scattered around the face center, converge inward at the climax.
const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const radius = i % 2 === 0 ? 168 : 128;
  return {
    id: i,
    x: Math.round(Math.cos(angle) * radius),
    y: Math.round(Math.sin(angle) * radius * 0.85),
    size: i % 3 === 0 ? 6 : 3.5,
  };
});

// Diagnostic points that light up on the face once "read".
const MARKERS = [
  { top: "23%", left: "50%" }, // forehead
  { top: "41%", left: "33%" }, // left cheek
  { top: "41%", left: "67%" }, // right cheek
  { top: "39%", left: "50%" }, // nose bridge
  { top: "80%", left: "50%" }, // chin
];

// Results readout, revealed only once the scan resolves.
const READOUTS = ["Hydration", "Oil Balance", "Texture", "Pigmentation"];

/* ------------------------------------------------------------------ */
/* Section 1 — "We Don't Sell Products..."                             */
/* Copy is unchanged. The added right-hand canvas visualizes the       */
/* guesswork-to-clarity journey and resolves exactly as the reader     */
/* reaches "At KYS, guessing ends."                                    */
/* ------------------------------------------------------------------ */
function OurPhilosophy() {
  const stageRef = useRef(null);
  const climaxRef = useRef(null);

  const canvasRef = useRef(null);
  const faceRef = useRef(null);
  const glowRef = useRef(null);
  const flashRef = useRef(null);
  const bracketsRef = useRef(null);
  const scanLineRef = useRef(null);
  const wordsWrapRef = useRef(null);
  const particlesWrapRef = useRef(null);
  const markersWrapRef = useRef(null);
  const readoutWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray("[data-guess-word]", wordsWrapRef.current);
        const particles = gsap.utils.toArray("[data-particle]", particlesWrapRef.current);
        const markers = gsap.utils.toArray("[data-marker]", markersWrapRef.current);
        const readouts = gsap.utils.toArray("[data-readout]", readoutWrapRef.current);

        /* ---- Baseline / starting state ---- */
        gsap.set(faceRef.current, { opacity: 0.16, filter: "blur(11px) saturate(0.35)" });
        gsap.set(glowRef.current, { opacity: 0, scale: 0.85 });
        gsap.set(flashRef.current, { opacity: 0, scale: 0.8 });
        gsap.set(markers, { opacity: 0, scale: 0 });
        gsap.set(readouts, { opacity: 0, y: 10 });
        particles.forEach((el, i) => {
          gsap.set(el, { x: PARTICLES[i].x, y: PARTICLES[i].y, opacity: 0.55 });
        });

        /* ---- Ambient, scroll-independent atmosphere ---- */
        // Uncertainty never sits still — words drift like unresolved guesses.
        words.forEach((word, i) => {
          gsap.to(word, {
            y: i % 2 === 0 ? "+=14" : "-=14",
            x: i % 3 === 0 ? "+=8" : "-=8",
            rotate: i % 2 === 0 ? 3 : -3,
            duration: 4 + (i % 4),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.25,
          });
        });

        // A quiet, looping scan sweep — the machine is always half-listening.
        gsap.fromTo(
          scanLineRef.current,
          { yPercent: -20, opacity: 0 },
          {
            yPercent: 120,
            opacity: 0.5,
            duration: 3.6,
            ease: "sine.inOut",
            repeat: -1,
            repeatDelay: 0.6,
          }
        );

        gsap.to(bracketsRef.current, {
          opacity: 0.85,
          duration: 2.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        /* ---- Scroll-scrubbed convergence: guesswork -> resolved scan ---- */
        // Runs from the top of this section to the "guessing ends" line —
        // reversible, so scrolling back up dissolves clarity into doubt again.
        if (stageRef.current && climaxRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 65%",
              endTrigger: climaxRef.current,
              end: "center 55%",
              scrub: 0.7,
            },
          });

          tl.to(
            faceRef.current,
            { opacity: 1, filter: "blur(0px) saturate(1)", duration: 1, ease: "none" },
            0
          )
            .to(particles, { x: 0, y: 0, opacity: 0, scale: 0.15, stagger: 0.025, duration: 0.85, ease: "none" }, 0.08)
            .to(
              words,
              { opacity: 0, y: -16, scale: 0.85, filter: "blur(4px)", stagger: 0.04, duration: 0.7, ease: "none" },
              0.22
            )
            .to(glowRef.current, { opacity: 0.9, scale: 1.15, duration: 0.8, ease: "none" }, 0.35)
            .to(flashRef.current, { opacity: 0.55, scale: 1.25, duration: 0.2, ease: "none" }, 0.78)
            .to(flashRef.current, { opacity: 0, duration: 0.3, ease: "none" }, 0.95)
            .to(bracketsRef.current, { opacity: 1, borderColor: "#3E1F3D", duration: 0.4, ease: "none" }, 0.75)
            .to(markers, { opacity: 1, scale: 1, stagger: 0.06, duration: 0.4, ease: "back.out(2)" }, 0.8)
            .to(readouts, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "none" }, 0.88);
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            faceRef.current,
            glowRef.current,
            flashRef.current,
            wordsWrapRef.current,
            particlesWrapRef.current,
            markersWrapRef.current,
            readoutWrapRef.current,
          ],
          { clearProps: "all", opacity: 1, filter: "none" }
        );
        gsap.set(wordsWrapRef.current, { opacity: 0 });
        gsap.set(particlesWrapRef.current, { opacity: 0 });
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      data-stage
      className="border-b border-[#2B2330]/10 py-16 first:pt-0 md:-mx-8 md:w-[calc(100%+4rem)] md:py-24 lg:-mx-12 lg:w-[calc(100%+6rem)] xl:-mx-20 xl:w-[calc(100%+10rem)] 2xl:-mx-32 2xl:w-[calc(100%+16rem)]"
    >
      <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        {/* ---- Copy column (unchanged text) ---- */}
        <div className="flex h-full flex-col justify-center">
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
            <p data-reveal ref={climaxRef} className="font-semibold text-[#2B2330]">
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

        {/* ---- Storytelling canvas: guesswork -> AI scan clarity ---- */}
        <div
          ref={canvasRef}
          aria-hidden="true"
          className="order-first mx-auto flex h-full w-full max-w-[280px] select-none flex-col items-stretch gap-5 sm:max-w-sm md:order-last md:sticky md:top-28 md:mx-0 md:max-w-none"
        >
          <div className="relative h-full min-h-[420px] w-full md:min-h-[540px]">
            {/* Frame */}
            <div className="absolute inset-0 rounded-[28px] border border-[#2B2330]/10 bg-gradient-to-b from-[#FFFBF6]/70 to-[#FFFBF6]/15" />

            {/* Corner reticle — reads as a scanner viewfinder */}
            <div ref={bracketsRef} className="pointer-events-none absolute inset-5 opacity-40">
              <span className="absolute left-0 top-0 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-[#8C5A82]" />
              <span className="absolute right-0 top-0 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-[#8C5A82]" />
              <span className="absolute bottom-0 left-0 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-[#8C5A82]" />
              <span className="absolute bottom-0 right-0 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-[#8C5A82]" />
            </div>

            {/* Glow halo behind the face, blooms at resolution */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,122,160,0.55) 0%, rgba(140,90,130,0.25) 45%, rgba(250,245,238,0) 75%)",
              }}
            />

            {/* Convergence flash — a brief bloom the instant the scan locks in */}
            <div
              ref={flashRef}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,251,246,0.95) 0%, rgba(255,251,246,0) 70%)",
              }}
            />

            {/* Face scan photo — real model image swapped in for the placeholder illustration */}
            <img
              ref={faceRef}
              src="/facescan.png"
              alt=""
              className="absolute inset-5 rounded-[20px] object-cover"
            />

            {/* Scan-line sweep */}
            <div className="pointer-events-none absolute inset-5 overflow-hidden rounded-[20px]">
              <div
                ref={scanLineRef}
                className="absolute left-0 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #C97AA0 20%, #FCEFE3 50%, #C97AA0 80%, transparent 100%)",
                  boxShadow: "0 0 12px 1px rgba(201,122,160,0.6)",
                }}
              />
            </div>

            {/* Uncertain guesses, floating */}
            <div ref={wordsWrapRef} className="pointer-events-none absolute inset-0">
              {GUESS_WORDS.map((w) => (
                <span
                  key={w.text}
                  data-guess-word
                  className="absolute font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-[#2B2330]/70 sm:text-xs"
                  style={{ top: w.top, left: w.left }}
                >
                  {w.text}
                </span>
              ))}
            </div>

            {/* Particles that converge on the face at the climax */}
            <div ref={particlesWrapRef} className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0">
              {PARTICLES.map((p) => (
                <span
                  key={p.id}
                  data-particle
                  className="absolute rounded-full bg-[#C97AA0]"
                  style={{ width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
                />
              ))}
            </div>

            {/* Diagnostic markers that light up once the face resolves */}
            <div ref={markersWrapRef} className="pointer-events-none absolute inset-0">
              {MARKERS.map((m, i) => (
                <span
                  key={i}
                  data-marker
                  className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FCEFE3] ring-2 ring-[#8C5A82]"
                  style={{ top: m.top, left: m.left }}
                />
              ))}
            </div>
          </div>

          {/* Results readout, revealed after the scan resolves */}
          <div ref={readoutWrapRef} className="flex w-full flex-wrap justify-center gap-2">
            {READOUTS.map((label) => (
              <span
                key={label}
                data-readout
                className="rounded-full border border-[#2B2330]/10 bg-[#FFFBF6] px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[#2B2330]/70 shadow-[0_8px_18px_-12px_rgba(89,46,86,0.3)]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 2 — "Know Your Skin Before You Treat It."                   */
/* Portrait reveals top-to-bottom on scroll-in via clip-path, then the */
/* copy fades in line-by-line securely over a protective gradient.     */
/* ------------------------------------------------------------------ */
function OurApproach() {
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = textRef.current.querySelectorAll("[data-approach-reveal]");

        // 1. Initial State: Image clipped entirely from the bottom, text hidden and shifted down
        gsap.set(imageRef.current, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(items, { opacity: 0, y: 30 }); 

        gsap
          .timeline({
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 60%", // Triggers when section is comfortably in view
              toggleActions: "play none none none",
            },
          })
          // 2. Animate Image: Reveal cleanly from top to bottom
          .to(imageRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4, // Not too slow, not too fast
            ease: "power2.inOut",
          })
          // 3. Animate Text: Fade in line by line AFTER image reveal starts resolving
          .to(
            items,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.2, // Creates the distinct line-by-line reveal
            },
            "-=0.2" // Starts just slightly before the image animation completely finishes
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(imageRef.current, { clearProps: "all" });
        gsap.set(textRef.current.querySelectorAll("[data-approach-reveal]"), {
          clearProps: "all",
          opacity: 1,
        });
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      data-stage
      className="relative overflow-hidden border-b border-[#2B2330]/10 py-20 md:py-32 flex items-center min-h-[75vh]"
    >
      {/* Background Image layer — clips in top-to-bottom independent of the text */}
      <div
        ref={imageRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/drawpic.png')",
          backgroundSize: "clamp(350px, 65vw, 700px) auto", // Fully responsive sizing
          backgroundPosition: "right center", // Anchors correctly like your screenshot
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local",
          opacity: 0.9,
        }}
      />

      {/* Text Content overlay */}
      <div ref={textRef} className="relative z-10 w-full max-w-3xl">
        {/* Protective semi-transparent gradient box to ensure perfect legibility against the overlapped PNG */}
        <div
          className="rounded-3xl p-6 md:p-10 lg:p-12"
          style={{
            background:
              "linear-gradient(90deg, rgba(250,245,238,0.92) 0%, rgba(250,245,238,0.7) 50%, rgba(250,245,238,0) 100%)",
            backdropFilter: "blur(2px)",
          }}
        >
          <h2
            data-approach-reveal
            className="mb-8 font-[family-name:var(--font-display)] text-5xl font-bold italic leading-[1.1] sm:text-6xl md:text-7xl text-[#3E1F3D]"
          >
            Know Your Skin<br />Before You Treat It.
          </h2>

          <div className="space-y-4 font-[family-name:var(--font-mono)] text-xl font-semibold leading-relaxed text-[#2B2330] md:text-2xl">
            <p data-approach-reveal>Modern skincare has become confusing.</p>

            {/* Split elements so GSAP stagger catches them for a perfect line-by-line reveal */}
            <div className="space-y-2 py-3 text-[#6E3F63] font-medium text-lg md:text-xl">
              <p data-approach-reveal>Thousands of products.</p>
              <p data-approach-reveal>Thousands of ingredients.</p>
              <p data-approach-reveal>Thousands of opinions.</p>
            </div>

            <p data-approach-reveal>But only one thing truly matters.</p>

            <p
              data-approach-reveal
              className="font-bold text-[#3E1F3D] text-2xl md:text-3xl pt-4 pb-2"
            >
              Understanding your skin.
            </p>

            <p
              data-approach-reveal
              className="font-medium text-lg md:text-xl text-[#2B2330]/80 max-w-xl"
            >
              KYS exists to help people make informed skincare decisions through advanced skin
              diagnostics and personalized product recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 3 — Mission statement                                       */
/* Pins once it reaches the CENTER of the viewport, then each phrase   */
/* is dialed from faint to fully readable one at a time as the user    */
/* keeps scrolling. Background decoration (dot-grid, squares, rings,   */
/* particles) is full-bleed — sized to the viewport width via the      */
/* left-1/2 + w-screen + -translate-x-1/2 trick, NOT the page's        */
/* max-w-4xl content column — and the stage is min-h-screen so it      */
/* covers the entire visible viewport top-to-bottom while pinned.      */
/* ------------------------------------------------------------------ */

// Phrase-by-phrase breakdown of the mission line, revealed in sequence.
const VISION_LINES = [
  "To become India\u2019s most trusted ",
  "personalized skincare company ",
  "by combining technology, science, ",
  "and skincare into one seamless experience.",
];

// Small ambient dots — deterministic (no Math.random) so SSR/CSR markup matches.
// Spread across the full viewport now that the layer is full-bleed.
const VISION_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${(i * 23 + 5) % 94}%`,
  left: `${(i * 41 + 7) % 98}%`,
  size: i % 4 === 0 ? 6 : i % 3 === 0 ? 4 : 2.5,
}));

// Larger decorative outlines (squares + rings) that drift slowly for depth.
// Positions run edge-to-edge since the wrapper is now viewport-wide.
const VISION_SHAPES = [
  { type: "square", top: "8%", left: "5%", size: 46, rotate: 12, duration: 9 },
  { type: "ring", top: "68%", left: "3%", size: 64, rotate: -8, duration: 11 },
  { type: "square", top: "14%", left: "93%", size: 34, rotate: -18, duration: 8 },
  { type: "ring", top: "74%", left: "94%", size: 52, rotate: 20, duration: 10 },
  { type: "square", top: "42%", left: "1%", size: 22, rotate: 45, duration: 7 },
  { type: "ring", top: "4%", left: "48%", size: 30, rotate: 0, duration: 12 },
  { type: "square", top: "90%", left: "48%", size: 26, rotate: -30, duration: 9.5 },
  { type: "ring", top: "92%", left: "22%", size: 40, rotate: 10, duration: 10.5 },
  { type: "square", top: "28%", left: "97%", size: 28, rotate: 8, duration: 8.5 },
];

function OurMission() {
  const stageRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef(null);
  const shapesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray("[data-vision-line]", textRef.current);
        const particles = gsap.utils.toArray("[data-vision-particle]", particlesRef.current);
        const shapes = gsap.utils.toArray("[data-vision-shape]", shapesRef.current);

        /* ---- Baseline: text present but faint, not yet "readable" ---- */
        gsap.set(lines, { opacity: 0.14 });

        /* ---- Ambient particles drifting gently behind the text ---- */
        particles.forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? "+=24" : "-=24",
            x: i % 3 === 0 ? "+=16" : "-=16",
            opacity: i % 2 === 0 ? 0.55 : 0.22,
            duration: 6 + (i % 5),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.3,
          });
        });

        /* ---- Larger square/ring outlines, slow drift + rotation ---- */
        shapes.forEach((el, i) => {
          const s = VISION_SHAPES[i];
          gsap.to(el, {
            y: i % 2 === 0 ? "+=18" : "-=18",
            x: i % 2 === 0 ? "-=12" : "+=12",
            rotate: `+=${i % 2 === 0 ? 20 : -20}`,
            duration: s.duration,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.35,
          });
        });

        /* ---- Pin once the section reaches the CENTER of the screen ---- */
        // start: "center center" means pinning only kicks in when the
        // section's own center lines up with the viewport's center —
        // not the moment its top edge appears. Scrolling further scrubs
        // the one-by-one phrase reveal while the section holds in place.
        if (stageRef.current && lines.length) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stageRef.current,
              start: "center center",
              end: `+=${lines.length * 70}%`,
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
            },
          });

          lines.forEach((line, i) => {
            tl.to(line, { opacity: 1, duration: 1, ease: "none" }, i);
          });
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-vision-line]", { clearProps: "all", opacity: 1 });
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      data-stage
      className="relative flex min-h-screen flex-col justify-center border-b border-[#2B2330]/10 py-16 text-center md:py-24"
    >
      {/* Subtle dot-grid texture — full-bleed to the true viewport width, */}
      {/* not the page's max-w-4xl content column. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-screen -translate-x-1/2 opacity-[0.4]"
      >
        <defs>
          <pattern id="vision-dot-grid" width="34" height="34" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#8C5A82" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vision-dot-grid)" />
      </svg>

      {/* Drifting square/ring outlines — same full-bleed treatment */}
      <div
        ref={shapesRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2"
      >
        {VISION_SHAPES.map((s, i) => (
          <span
            key={i}
            data-vision-shape
            className={`absolute border border-[#8C5A82]/25 ${
              s.type === "ring" ? "rounded-full" : "rounded-md"
            }`}
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              transform: `rotate(${s.rotate}deg)`,
            }}
          />
        ))}
      </div>

      {/* Small ambient particle dots — same full-bleed treatment */}
      <div
        ref={particlesRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2"
      >
        {VISION_PARTICLES.map((p) => (
          <span
            key={p.id}
            data-vision-particle
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.id % 2 === 0 ? "#C97AA0" : "#8C5A82",
              opacity: 0.35,
            }}
          />
        ))}
      </div>

      <h2
        ref={textRef}
        className="relative z-10 mx-auto max-w-4xl px-4 font-[family-name:var(--font-display)] text-4xl font-medium italic leading-[1.25] sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {VISION_LINES.map((line, i) => (
          <span
            key={i}
            data-vision-line
            style={{
              backgroundImage: GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {line}
          </span>
        ))}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 4 — "Every Face Is Different." + skin factor tags           */
/* ------------------------------------------------------------------ */
function SkinUniqueness() {
  return (
    <div data-stage className="py-16 md:py-24">
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
  );
}

/* ------------------------------------------------------------------ */
/* Main About section                                                 */
/* Owns the page-level scroll-animation logic and chrome (background   */
/* glow, grid). Just composes the four sections above — don't add      */
/* section content here, add it to the relevant function instead.      */
/* OurPhilosophy now owns its own additional canvas timeline; it       */
/* still exposes data-stage / data-reveal so this loop keeps working.  */
/* OurMission now owns its own pin + reveal timeline; it still exposes */
/* data-stage, but no longer uses data-reveal, so this loop no-ops     */
/* harmlessly for that section. Its full-bleed background layers rely  */
/* on this <section>'s own overflow-hidden to stay clipped exactly at  */
/* the true viewport edges — don't remove that from the outer section. */
/* ------------------------------------------------------------------ */
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
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 68% 22%, rgba(233,185,204,0.34) 0%, rgba(233,185,204,0.18) 22%, rgba(233,185,204,0.06) 44%, rgba(250,245,238,0) 70%), radial-gradient(circle at 18% 82%, rgba(233,185,204,0.14) 0%, rgba(233,185,204,0.06) 18%, rgba(250,245,238,0) 52%)",
        }}
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-0 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(233,185,204,0.24) 0%, rgba(201,122,160,0.12) 40%, rgba(250,245,238,0) 72%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl">
        <OurPhilosophy />
        <OurApproach />
        <OurMission />
        <SkinUniqueness />
      </div>
    </section>
  );
}