import { ShieldCheck, TrendingUp, Users, Clock } from "lucide-react";

const SIGNALS = [
  {
    icon: ShieldCheck,
    value: "Shariah Certified",
    sub: "3-scholar ethics board",
    color: "var(--coral)",
  },
  {
    icon: TrendingUp,
    value: "17.4% avg return",
    sub: "Across active proposals",
    color: "var(--pink)",
  },
  {
    icon: Users,
    value: "200+ investors",
    sub: "From 12 countries",
    color: "var(--purple)",
  },
  {
    icon: Clock,
    value: "72h review",
    sub: "From submission to live",
    color: "#10b981",
  },
];

export function TrustBar() {
  return (
    <section
      className="border-y py-6"
      style={{
        background: "var(--surface)",
        borderColor: "var(--line)",
      }}
    >
      <div className="wrap grid grid-cols-2 gap-6 sm:grid-cols-4">
        {SIGNALS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.value} className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${s.color}15`, border: `1.5px solid ${s.color}30` }}
              >
                <Icon className="h-4.5 w-4.5" style={{ color: s.color }} strokeWidth={2} />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: "var(--ink)" }}>
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: "var(--ink-soft)" }}>
                  {s.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
