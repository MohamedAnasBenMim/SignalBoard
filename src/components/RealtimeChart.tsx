import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { MetricPoint } from "../types";

export function RealtimeChart({ points }: { points: MetricPoint[] }) {
  return (
    <section className="panel chart-panel" aria-labelledby="traffic-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Streaming now</p>
          <h2 id="traffic-title">Request volume</h2>
        </div>
        <div className="legend"><span /> Requests / second</div>
      </div>
      <div className="chart" role="img" aria-label="Live request volume over the last 40 seconds">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 16, right: 8, bottom: 0, left: -18 }}>
            <defs>
              <linearGradient id="requestFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#57e6c1" stopOpacity={0.38} />
                <stop offset="100%" stopColor="#57e6c1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#202a42" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: "#8290aa", fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={34} />
            <YAxis tick={{ fill: "#8290aa", fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "#111a2e", border: "1px solid #2c3956", borderRadius: 10 }} />
            <Area type="monotone" dataKey="requests" stroke="#57e6c1" strokeWidth={2.5} fill="url(#requestFill)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

