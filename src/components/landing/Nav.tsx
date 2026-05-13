"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { NoorLogoMark } from "@/components/shared/NoorGeometry";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,252,240,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="wrap flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <NoorLogoMark size={30} />
          <span className="font-display font-semibold text-xl tracking-tight">
            Noor<span style={{ color: "var(--pink-deep)" }}>Venture</span>
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-7">
          {[
            { l: "Explore", h: "/proposals" },
            { l: "How it Works", h: "#how" },
            { l: "Shariah", h: "#shariah" },
            { l: "For Business", h: "#features" },
          ].map((x) => (
            <a
              key={x.l}
              href={x.h}
              className="text-sm font-medium transition-colors hover:text-foreground"
              style={{ color: "var(--ink-soft)" }}
            >
              {x.l}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-muted"
              style={{ borderColor: "var(--line)" }}
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <Link
            href="/login"
            className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
            style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--ink)" }}
          >
            Open account →
          </Link>
        </div>
      </div>
    </nav>
  );
}
