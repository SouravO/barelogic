import { Bodoni_Moda, Space_Grotesk } from "next/font/google";

/**
 * KYS — Footer
 * -----------------------------------------------------------------------
 * Deliberately minimal: brand mark, the three-line tagline exactly as
 * supplied, and a bare utility row. No extra marketing copy, no invented
 * nav columns.
 * -----------------------------------------------------------------------
 */

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

export default function Footer() {
  return (
    <footer className={`${display.variable} ${mono.variable} bg-[#2B2330] px-6 py-16 text-[#FAF5EE] md:py-20`}>
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <span className="font-[family-name:var(--font-display)] text-3xl font-semibold italic">KYS</span>

        <p className="mt-6 font-[family-name:var(--font-mono)] text-base leading-relaxed text-[#FAF5EE]/70 sm:text-lg">
          Know Your Skin.
          <br />
          Personalize Your Care.
          <br />
          Transform Your Confidence.
        </p>

        <div className="mt-12 flex w-full flex-col items-center justify-between gap-4 border-t border-[#FAF5EE]/10 pt-8 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#FAF5EE]/40 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} KYS</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-[#FAF5EE]/70">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-[#FAF5EE]/70">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}