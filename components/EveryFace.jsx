'use client';

import { motion } from 'framer-motion';

const FACTORS = ["Age", "Lifestyle", "Climate", "Diet", "Stress", "Hormones", "Genetics"];

const GRADIENT =
  "linear-gradient(115deg, #3E1F3D 0%, #6E3F63 30%, #A45F86 55%, #C97AA0 75%, #E9B9CC 100%)";

const TAG_COLORS = ["#6E3F63", "#A45F86", "#8C5A82", "#C97AA0"];

export default function EveryFace() {
  // Title Animation: moves from viewport center upward to final top position
  const titleVariants = {
    hidden: { opacity: 0, y: 120 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1], // Smooth custom ease curve
      },
    },
  };

  // Background image wipe reveal (bottom-to-top clip-path), same technique as the Approach section
  const imageVariants = {
    hidden: { clipPath: "inset(0% 0% 100% 0%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 1.4,
        ease: "easeInOut",
      },
    },
  };

  // Container to orchestrate sequential appearance of text groups
  const contentContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5, // Waits for title move to finish
      },
    },
  };

  // Individual text item reveal animation
  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  // Dedicated container for fast tag cascade
  const tagContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.7,
      },
    },
  };

  // Tag scale & fade pop-in effect
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      data-stage
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-4 py-10 text-center md:py-12"
    >
      {/* Soft color wash so the image reads intentional, not just faded */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,251,246,0.68) 0%, rgba(250,245,238,0.42) 38%, rgba(250,245,238,0.92) 82%), linear-gradient(115deg, rgba(62,31,61,0.05) 0%, rgba(201,122,160,0.12) 58%, rgba(233,185,204,0.18) 100%)",
        }}
      />

      {/* Background reveal image, wipes in bottom-to-top on scroll */}
      <motion.div
        aria-hidden="true"
        variants={imageVariants}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/drawpic.png')",
          backgroundSize: "clamp(420px, 58vw, 760px) auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.72,
        }}
      />

      {/* Title starts centered and transitions upward */}
      <motion.h2
        variants={titleVariants}
        data-reveal
        className="relative z-10 mb-10 font-[family-name:var(--font-display)] text-4xl font-semibold italic leading-[1.1] sm:text-5xl md:text-6xl"
        style={{
          backgroundImage: GRADIENT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Every Face Is Different.
      </motion.h2>

      <motion.div variants={contentContainerVariants} className="relative z-10 w-full max-w-3xl space-y-8">
        <div className="space-y-5 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/90 md:text-xl">
          <motion.p variants={textItemVariants} data-reveal>
            No two fingerprints are same.
          </motion.p>
          <motion.p variants={textItemVariants} data-reveal>
            No two skins are same.
          </motion.p>
        </div>

        {/* Tags popping in rapidly one by one */}
        <motion.div
          variants={tagContainerVariants}
          className="my-10 flex flex-wrap justify-center gap-3"
        >
          {FACTORS.map((factor, i) => {
            const accent = TAG_COLORS[i % TAG_COLORS.length];
            return (
              <motion.span
                key={factor}
                variants={tagVariants}
                data-tag
                className="rounded-full px-5 py-2.5 font-[family-name:var(--font-mono)] text-sm font-medium uppercase tracking-[0.1em] shadow-[0_10px_25px_-15px_rgba(89,46,86,0.35)]"
                style={{
                  color: accent,
                  border: `1px solid ${accent}55`,
                  backgroundColor: `${accent}14`,
                }}
              >
                {factor}
              </motion.span>
            );
          })}
        </motion.div>

        <div className="space-y-5 font-[family-name:var(--font-mono)] text-lg leading-relaxed text-[#2B2330]/90 md:text-xl">
          <motion.p variants={textItemVariants} data-reveal>
            Everything affects your skin.
          </motion.p>
          <motion.p variants={textItemVariants} data-reveal>
            Why should everyone use same skincare?
          </motion.p>
          <motion.p
            variants={textItemVariants}
            data-reveal
            className="text-2xl font-semibold md:text-3xl"
            style={{ color: "#3E1F3D" }}
          >
            They shouldn&rsquo;t.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
