'use client';

import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// CONTENT
// Each word is its own object so it can be individually animated.
// Set `highlight: true` on the words you want the marker to sweep over.
// Order matters for the highlight: strokes fire in array order, so as the
// paragraph wraps across lines, the marker naturally reads top -> bottom,
// exactly like the reference (line 1 highlights first, then line 2, etc).
// ---------------------------------------------------------------------------
const words = [
  { text: 'This' },
  { text: 'section' },
  { text: 'introduces' },
  { text: 'who' },
  { text: 'we' },
  { text: 'are' },
  { text: 'and' },
  { text: 'what' },
  { text: 'we' },
  { text: 'stand' },
  { text: 'for' },
  { text: '—' },
  { text: 'every', highlight: true },
  { text: 'detail,', highlight: true },
  { text: 'every', highlight: true },
  { text: 'decision,', highlight: true },
  { text: 'made', highlight: true },
  { text: 'to', highlight: true },
  { text: 'be', highlight: true },
  { text: 'felt,', highlight: true },
  { text: 'not', highlight: true },
  { text: 'just', highlight: true },
  { text: 'seen.', highlight: true },
];

// ---------------------------------------------------------------------------
// TIMING
// Tune these to speed up / slow down the whole sequence.
// ---------------------------------------------------------------------------
const STAGGER_CHILDREN = 0.045; // gap between each word bouncing in
const DELAY_CHILDREN = 0.1; // pause before the first word starts
const SETTLE_TIME = 0.35; // buffer after the last relevant word lands, before marker starts
const HIGHLIGHT_STAGGER = 0.16; // gap between each highlighted word's marker stroke

const lastHighlightIndex = words.reduce(
  (acc, w, i) => (w.highlight ? i : acc),
  -1
);
const highlightStartDelay =
  DELAY_CHILDREN + lastHighlightIndex * STAGGER_CHILDREN + SETTLE_TIME;
const wordsWithHighlightOrder = words.reduce(
  (result, word) => {
    const highlightOrder = word.highlight ? result.highlightCount : -1;

    return {
      highlightCount: word.highlight ? result.highlightCount + 1 : result.highlightCount,
      items: [...result.items, { ...word, highlightOrder }],
    };
  },
  { highlightCount: 0, items: [] }
).items;

// ---------------------------------------------------------------------------
// ANIMATION VARIANTS
// ---------------------------------------------------------------------------
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: DELAY_CHILDREN,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 11, stiffness: 190, mass: 0.6 },
  },
};

// Hand-drawn marker stroke, sitting behind a single word and drawn on with
// `pathLength` so it looks pulled across the text left -> right.
//
// IMPORTANT: this SVG is placed BEFORE the text span in the DOM on purpose,
// with no z-index at all. Two siblings with no z-index paint in DOM order,
// so it naturally sits behind the letters. A negative z-index here would
// escape the word wrapper (position:relative with no z-index does NOT
// create its own stacking context) and paint behind the whole page instead
// of just behind the word — which is why the highlight was invisible before.
function MarkerStroke({ delay }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute -left-1 -right-1 inset-y-0"
    >
      <motion.path
        d="M3,58 C25,42 45,68 62,50 C78,34 92,60 97,48"
        fill="none"
        stroke="#F4E834"
        strokeWidth={60}
        strokeLinecap="round"
        className="mix-blend-multiply"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ delay, duration: 0.45, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function About() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-6 py-20 md:px-16">
      <motion.p
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="max-w-6xl text-left text-[clamp(2rem,1rem+5vw,5.5rem)] font-extrabold leading-[1.12] tracking-tight text-slate-900"
      >
        {wordsWithHighlightOrder.map((w, i) => {
          const isHighlighted = Boolean(w.highlight);
          const highlightDelay =
            highlightStartDelay + w.highlightOrder * HIGHLIGHT_STAGGER;

          return (
            // The plain space after motion.span is a real text node (not a
            // margin) so the browser has an actual wrap point between
            // words — margins alone won't let inline-block spans break
            // onto a new line at any viewport width.
            <span key={i}>
              <motion.span
                variants={wordVariants}
                className="relative inline-block"
              >
                {isHighlighted && <MarkerStroke delay={highlightDelay} />}
                <span className="relative">{w.text}</span>
              </motion.span>{' '}
            </span>
          );
        })}
      </motion.p>
    </section>
  );
}
