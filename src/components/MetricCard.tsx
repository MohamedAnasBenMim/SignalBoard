import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string;
  change: string;
  tone?: "positive" | "warning";
  icon: ReactNode;
};

export function MetricCard({ label, value, change, tone = "positive", icon }: Props) {
  return (
    <article className="metric-card" aria-label={`${label}: ${value}`}>
      <div className="metric-icon" aria-hidden="true">
        {icon}
      </div>
      <div>
        <p className="eyebrow">{label}</p>
        <strong>{value}</strong>
        <span className={`change ${tone}`}>{change}</span>
      </div>
    </article>
  );
}

