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

const GUESS_WORDS = [
  { text: "Oily?", top: "6%", left: "4%" },
  { text: "Dry?", top: "16%", left: "76%" },
  { text: "Combination?", top: "46%", left: "0%" },
  { text: "Sensitive?", top: "60%", left: "80%" },
  { text: "Normal?", top: "82%", left: "8%" },
  { text: "Dehydrated?", top: "90%", left: "66%" },
];

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

const MARKERS = [
  { top: "23%", left: "50%" },
  { top: "41%", left: "33%" },
  { top: "41%", left: "67%" },
  { top: "39%", left: "50%" },
  { top: "80%", left: "50%" },
];

const READOUTS = ["Hydration", "Oil Balance", "Texture", "Pigmentation"];

export default function SkinType() {
  const stageRef = useRef(null);
  const climaxRef = useRef(null);
  const canvasRef = useRef(null);
  const faceRef = useRef(null);
  const glowRef = useRef(null);
  const flashRef = useRef(null);
  const bracketsRef = useRef(null);
  const scanTrackRef = useRef(null);
  const scanLineRef = useRef(null);
  const scanGlowRef = useRef(null);
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

        gsap.set(faceRef.current, { opacity: 0.16, filter: "blur(11px) saturate(0.35)" });
        gsap.set(glowRef.current, { opacity: 0, scale: 0.85 });
        gsap.set(flashRef.current, { opacity: 0, scale: 0.8 });
        gsap.set(markers, { opacity: 0, scale: 0 });
        gsap.set(readouts, { opacity: 0, y: 10 });
        gsap.set([scanLineRef.current, scanGlowRef.current], { y: 0, opacity: 0 });
        particles.forEach((el, i) => {
          gsap.set(el, { x: PARTICLES[i].x, y: PARTICLES[i].y, opacity: 0 });
        });

        gsap.to(words, {
          y: (i) => (i % 2 === 0 ? "+=14" : "-=14"),
          x: (i) => (i % 3 === 0 ? "+=8" : "-=8"),
          rotate: (i) => (i % 2 === 0 ? 3 : -3),
          duration: (i) => 4 + (i % 4),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.25 },
          scrollTrigger: {
            trigger: canvasRef.current,
            start: "top 90%",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });

        gsap.to(bracketsRef.current, {
          opacity: 0.85,
          duration: 2.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: canvasRef.current,
            start: "top 90%",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });

        const runEntranceScan = () => {
          const track = scanTrackRef.current;
          const line = scanLineRef.current;
          const glowBand = scanGlowRef.current;
          if (!track || !line) return;

          const travel = track.offsetHeight;

          ctx.add(() => {
            gsap
              .timeline()
              .set([line, glowBand], { y: 0 })
              .to([line, glowBand], { opacity: 1, duration: 0.15, ease: "none" }, 0)
              .to([line, glowBand], { y: travel, duration: 1.1, ease: "sine.inOut" }, 0)
              .to([line, glowBand], { opacity: 0, duration: 0.25, ease: "none" }, 0.95)
              .to(
                particles,
                { opacity: 0.55, stagger: 0.03, duration: 0.5, ease: "power1.out" },
                0.9
              );
          });
        };

        if (canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          const alreadyInView = rect.top < window.innerHeight * 0.8;

          if (alreadyInView) {
            runEntranceScan();
          } else {
            ScrollTrigger.create({
              trigger: canvasRef.current,
              start: "top 80%",
              once: true,
              onEnter: runEntranceScan,
            });
          }
        }

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
        gsap.set([scanLineRef.current, scanGlowRef.current], { opacity: 0 });
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      data-stage
      className={`${display.variable} ${mono.variable} border-b border-[#2B2330]/10 py-16 first:pt-0 md:-mx-8 md:w-[calc(100%+4rem)] md:py-24 lg:-mx-12 lg:w-[calc(100%+6rem)] xl:-mx-20 xl:w-[calc(100%+10rem)] 2xl:-mx-32 2xl:w-[calc(100%+16rem)]`}
    >
      <div className="grid grid-cols-1 items-stretch gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div className="flex h-full flex-col justify-center">
          <h2
            data-reveal
            className="mb-10 font-[family-name:var(--font-display)] text-3xl font-semibold italic leading-[1.1] sm:text-4xl md:text-5xl"
            style={{
              backgroundImage: GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            We Don&rsquo;t Sell Products.
            <br />
            We Build Personalized
            <br />
            Skin Journeys.
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

        <div
          ref={canvasRef}
          aria-hidden="true"
          className="order-first mx-auto flex h-full w-full max-w-[280px] select-none flex-col items-stretch gap-5 sm:max-w-sm md:order-last md:sticky md:top-28 md:mx-0 md:max-w-none"
        >
          <div className="relative h-full min-h-[420px] w-full md:min-h-[540px]">
            <div className="absolute inset-0 rounded-[28px] border border-[#2B2330]/10 bg-gradient-to-b from-[#FFFBF6]/70 to-[#FFFBF6]/15" />

            <div ref={bracketsRef} className="pointer-events-none absolute inset-5 opacity-40">
              <span className="absolute left-0 top-0 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-[#8C5A82]" />
              <span className="absolute right-0 top-0 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-[#8C5A82]" />
              <span className="absolute bottom-0 left-0 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-[#8C5A82]" />
              <span className="absolute bottom-0 right-0 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-[#8C5A82]" />
            </div>

            <div
              ref={glowRef}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,122,160,0.55) 0%, rgba(140,90,130,0.25) 45%, rgba(250,245,238,0) 75%)",
              }}
            />

            <div
              ref={flashRef}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,251,246,0.95) 0%, rgba(255,251,246,0) 70%)",
              }}
            />

            <img
              ref={faceRef}
              src="/facescan.png"
              alt=""
              className="absolute inset-5 rounded-[20px] object-cover"
            />

            <div
              ref={scanTrackRef}
              className="pointer-events-none absolute inset-5 overflow-hidden rounded-[20px]"
            >
              <div
                ref={scanGlowRef}
                className="absolute left-0 top-0 h-16 w-full opacity-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(201,122,160,0) 0%, rgba(201,122,160,0.4) 100%)",
                }}
              />
              <div
                ref={scanLineRef}
                className="absolute left-0 top-0 h-[3px] w-full opacity-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #C97AA0 15%, #FCEFE3 50%, #C97AA0 85%, transparent 100%)",
                  boxShadow: "0 0 18px 3px rgba(201,122,160,0.85)",
                }}
              />
            </div>

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
