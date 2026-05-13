"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { NoorLogoMark } from "@/components/shared/NoorGeometry";

const NAV_LINKS = [
  { l: "Home",    h: "/"        },
  { l: "Explore", h: "/explore" },
  { l: "About",   h: "/about"   },
  { l: "Contact", h: "/contact" },
];

export function Nav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
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
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass-panel" : ""}`}
        style={{ borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent" }}
      >
        <div className="wrap flex items-center justify-between py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <NoorLogoMark size={30} />
            <span className="font-display text-xl font-semibold tracking-tight">
              Noor<span style={{ color: "var(--pink-deep)" }}>Venture</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.slice(1).map((x) => (
              <Link
                key={x.l}
                href={x.h}
                className="text-sm font-medium transition-colors hover:opacity-100"
                style={{ color: "var(--ink-soft)" }}
              >
                {x.l}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-[var(--paper-2)]"
                style={{ borderColor: "var(--line)" }}
                title="Toggle theme"
              >
                {theme === "dark"
                  ? <Sun  className="h-4 w-4" style={{ color: "var(--ink)" }} />
                  : <Moon className="h-4 w-4" style={{ color: "var(--ink)" }} />}
              </button>
            )}

            {/* Desktop auth */}
            <Link
              href="/login"
              className="hidden rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:bg-[var(--paper-2)] md:inline-flex"
              style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:inline-flex"
              style={{ background: "var(--grad)", boxShadow: "0 4px 14px -4px rgba(231,83,149,0.45)" }}
            >
              Open account →
            </Link>

            {/* Mobile hamburger */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
              style={{ borderColor: "var(--line)", color: "var(--ink)" }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="border-t md:hidden"
            style={{ background: "var(--surface)", borderColor: "var(--line)" }}
          >
            <div className="wrap space-y-1 py-4">
              {NAV_LINKS.map((x) => (
                <Link
                  key={x.l}
                  href={x.h}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--paper-2)]"
                  style={{ color: "var(--ink)" }}
                >
                  {x.l}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 pt-3" style={{ borderTop: "1px solid var(--line)" }}>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border px-4 py-3 text-center text-sm font-semibold"
                  style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-white"
                  style={{ background: "var(--grad)" }}
                >
                  Open account
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
