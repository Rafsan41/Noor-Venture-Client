"use client";
import Link from "next/link";
import { NoorLogoMark, LiveDot } from "@/components/shared/NoorGeometry";

const COLS = [
  {
    t: "Platform",
    items: [
      { l: "Home",         h: "/"         },
      { l: "Explore deals",h: "/explore"  },
      { l: "About us",     h: "/about"    },
      { l: "Contact",      h: "/contact"  },
      { l: "NoorAI tools", h: "/register" },
    ],
  },
  {
    t: "Invest",
    items: [
      { l: "Open account",     h: "/register?role=INVESTOR"       },
      { l: "Sign in",          h: "/login"                         },
      { l: "How it works",     h: "/#how"                          },
      { l: "Shariah board",    h: "/about#team"                    },
      { l: "Risk disclosure",  h: "#"                               },
    ],
  },
  {
    t: "Business",
    items: [
      { l: "Raise capital",   h: "/register?role=BUSINESS_OWNER" },
      { l: "Create proposal", h: "/register"                       },
      { l: "Musharakah guide",h: "/#musharakah"                    },
      { l: "5% flat fee",     h: "/about"                          },
      { l: "Press kit",       h: "#"                                },
    ],
  },
];

const SOCIALS = ["𝕏", "in", "◉", "f"];

export function Footer() {
  return (
    <footer
      className="pt-16 pb-8"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      <div className="wrap">
        {/* Top grid */}
        <div className="mb-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <NoorLogoMark size={30} />
              <span className="font-display text-lg font-semibold">
                Noor<span style={{ color: "var(--pink)" }}>Venture</span>
              </span>
            </div>
            <p
              className="mb-5 max-w-[280px] text-sm leading-relaxed"
              style={{ color: "var(--paper)", opacity: 0.7 }}
            >
              Ethical peer-to-business financing grounded in Islamic finance.
              True Musharakah. Zero riba. Built for everyone who believes money
              should serve people, not exploit them.
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <div
                  key={s}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-colors hover:bg-white/20"
                  style={{ background: "rgba(255,245,181,0.1)" }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((c) => (
            <div key={c.t}>
              <div
                className="mb-4 text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--paper)" }}
              >
                {c.t}
              </div>
              {c.items.map((it) => (
                <Link
                  key={it.l}
                  href={it.h}
                  className="mb-2.5 block text-sm transition-opacity hover:opacity-100"
                  style={{ color: "var(--paper)", opacity: 0.7 }}
                >
                  {it.l}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 border-t pb-8 pt-7 text-xs"
          style={{
            borderColor: "rgba(255,245,181,0.15)",
            color: "var(--paper)",
            opacity: 0.7,
          }}
        >
          <div>
            © 2026 NoorVenture Ltd. · Bangladesh Bank Fintech Sandbox · AAOIFI compliant
          </div>
          <div className="flex items-center gap-2">
            <LiveDot color="#10b981" />
            All systems operational
          </div>
        </div>

        {/* Big wordmark */}
        <div
          className="font-display noor-gradient-text text-center font-medium leading-none"
          style={{
            fontSize: "clamp(60px,12vw,180px)",
            letterSpacing: "-0.04em",
          }}
        >
          NoorVenture
        </div>
      </div>
    </footer>
  );
}
