"use client";

import { useEffect, useRef, useState } from "react";
import { Bodoni_Moda, Space_Grotesk } from "next/font/google";
import gsap from "gsap";

/**
 * KYS — Navbar
 * -----------------------------------------------------------------------
 * Kept structurally simple by design: this is a long single-page site, so
 * the nav's only job is orientation + smooth scroll. Same token set as
 * Hero/About (cream, ink, mauve, Bodoni Moda + Space Grotesk) so it reads
 * as part of the same system rather than a bolted-on UI kit component.
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

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Technology", href: "#technology" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.set(menuRef.current, { display: "flex" });
      gsap.fromTo(
        menuRef.current,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        autoAlpha: 0,
        y: -12,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => gsap.set(menuRef.current, { display: "none" }),
      });
    }
  }, [open]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`${display.variable} ${mono.variable} fixed inset-x-0 top-0 z-50 transition-colors duration-500`}
      style={{
        backgroundColor: solid ? "rgba(250,245,238,0.9)" : "transparent",
        backdropFilter: solid ? "blur(14px)" : "none",
        borderBottom: solid
          ? "1px solid rgba(43,35,48,0.08)"
          : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "body")}
          className="font-[family-name:var(--font-display)] text-2xl font-semibold italic text-[#2B2330]"
        >
          KYS
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#2B2330]/70 transition-colors hover:text-[#2B2330]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="hidden rounded-full px-6 py-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#FAF5EE] transition-transform duration-300 hover:scale-[1.03] md:inline-block"
          style={{
            backgroundImage:
              "linear-gradient(115deg, #3E1F3D 0%, #6E3F63 30%, #A45F86 55%, #C97AA0 75%, #E9B9CC 100%)",
          }}
        >
          Know Your Skin
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className="h-px w-6 bg-[#2B2330] transition-transform duration-300"
            style={open ? { transform: "translateY(3px) rotate(45deg)" } : undefined}
          />
          <span
            className="h-px w-6 bg-[#2B2330] transition-transform duration-300"
            style={open ? { transform: "translateY(-3px) rotate(-45deg)" } : undefined}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="hidden flex-col gap-1 border-t border-[#2B2330]/10 bg-[#FAF5EE] px-6 pb-6 pt-2 md:hidden"
        style={{ visibility: "hidden" }}
      >
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="border-b border-[#2B2330]/5 py-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#2B2330]/80"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="mt-4 rounded-full px-6 py-3 text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#FAF5EE]"
          style={{
            backgroundImage:
              "linear-gradient(115deg, #3E1F3D 0%, #6E3F63 30%, #A45F86 55%, #C97AA0 75%, #E9B9CC 100%)",
          }}
        >
          Know Your Skin
        </a>
      </div>
    </header>
  );
}