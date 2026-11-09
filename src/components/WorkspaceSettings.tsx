import { Settings2, X } from "lucide-react";

import type { WidgetKey } from "../types";

type Props = {
  open: boolean;
  onClose: () => void;
  widgets: Record<WidgetKey, boolean>;
  toggle: (key: WidgetKey) => void;
};

const labels: Record<WidgetKey, string> = {
  metrics: "Summary metrics",
  chart: "Real-time chart",
  table: "Event table",
};

export function WorkspaceSettings({ open, onClose, widgets, toggle }: Props) {
  if (!open) return null;
  return (
    <aside className="settings-panel" aria-label="Customize workspace">
      <div className="panel-heading">
        <div><p className="eyebrow">Workspace</p><h2><Settings2 size={19} /> Customize</h2></div>
        <button className="icon-button" onClick={onClose} aria-label="Close settings"><X size={19} /></button>
      </div>
      <p>Choose the widgets shown in your analytics workspace. Your selection is saved locally.</p>
      {(Object.keys(labels) as WidgetKey[]).map((key) => (
        <label className="toggle-row" key={key}>
          <span>{labels[key]}</span>
          <input type="checkbox" checked={widgets[key]} onChange={() => toggle(key)} />
        </label>
      ))}
    </aside>
  );
}

