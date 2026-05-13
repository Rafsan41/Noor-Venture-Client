import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon?:        LucideIcon;
  title:        string;
  description?: string;
  action?:      { label: string; href: string } | { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      {Icon && (
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl mb-4"
          style={{
            background: "var(--paper-2)",
            border: "1.5px solid var(--line)",
          }}
        >
          <Icon className="h-6 w-6" style={{ color: "var(--muted-brand)" }} />
        </div>
      )}

      <h3
        className="font-display font-semibold text-base mb-1"
        style={{ color: "var(--ink)" }}
      >
        {title}
      </h3>

      {description && (
        <p className="text-sm mb-5 max-w-xs" style={{ color: "var(--muted-brand)" }}>
          {description}
        </p>
      )}

      {action && (
        "href" in action ? (
          <Link
            href={action.href}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--ink)" }}
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--ink)" }}
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
