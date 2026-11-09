import { useMemo, useState } from "react";
import { Activity, Bell, Gauge, Menu, Settings2, TriangleAlert, Zap } from "lucide-react";

import { MetricCard } from "./components/MetricCard";
import { RealtimeChart } from "./components/RealtimeChart";
import { VirtualizedTable } from "./components/VirtualizedTable";
import { WorkspaceSettings } from "./components/WorkspaceSettings";
import { createEvents } from "./data";
import { useMetricStream } from "./hooks/useMetricStream";
import { useWorkspace } from "./hooks/useWorkspace";

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { points, connected } = useMetricStream(import.meta.env.VITE_STREAM_URL);
  const { widgets, toggle } = useWorkspace();
  const events = useMemo(() => createEvents(100_000), []);
  const latest = points.at(-1);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to analytics</a>
      <header className="topbar">
        <a className="brand" href="/" aria-label="SignalBoard home"><span><Activity size={20} /></span>SignalBoard</a>
        <nav aria-label="Primary navigation"><a className="active" href="#overview">Overview</a><a href="#events-title">Events</a><a href="#services">Services</a></nav>
        <div className="header-actions">
          <span className={`connection ${connected ? "online" : ""}`}><i />{connected ? "Live" : "Reconnecting"}</span>
          <button className="icon-button" aria-label="Notifications"><Bell size={19} /></button>
          <button className="avatar" aria-label="AM — open account menu">AM</button>
          <button className="menu-button" aria-label="Open navigation"><Menu size={21} /></button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="overview">
          <div><p className="eyebrow">Production workspace</p><h1>System pulse</h1><p>Live operational signals across every service and region.</p></div>
          <button className="customize-button" onClick={() => setSettingsOpen(true)}><Settings2 size={17} />Customize view</button>
        </section>

        {widgets.metrics && (
          <section className="metrics-grid" aria-label="Current metrics">
            <MetricCard label="Requests / sec" value={(latest?.requests ?? 0).toLocaleString()} change="↑ 12.4% vs last hour" icon={<Zap size={21} />} />
            <MetricCard label="p95 latency" value={`${latest?.latency ?? 0} ms`} change="↓ 8.1% vs last hour" icon={<Gauge size={21} />} />
            <MetricCard label="Error rate" value={`${latest?.errors ?? 0}%`} change="↑ 0.2% requires attention" tone="warning" icon={<TriangleAlert size={21} />} />
            <MetricCard label="Active services" value="24 / 25" change="1 service degraded" tone="warning" icon={<Activity size={21} />} />
          </section>
        )}

        {widgets.chart && <RealtimeChart points={points} />}
        {widgets.table && <VirtualizedTable rows={events} />}
      </main>

      <WorkspaceSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} widgets={widgets} toggle={toggle} />
      {settingsOpen && <button className="settings-backdrop" onClick={() => setSettingsOpen(false)} aria-label="Close settings" />}
    </div>
  );
}

