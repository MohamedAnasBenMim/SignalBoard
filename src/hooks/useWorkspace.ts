import { useEffect, useState } from "react";

import type { WidgetKey } from "../types";

const defaultWidgets: Record<WidgetKey, boolean> = {
  metrics: true,
  chart: true,
  table: true,
};

export function useWorkspace() {
  const [widgets, setWidgets] = useState<Record<WidgetKey, boolean>>(() => {
    const saved = localStorage.getItem("signalboard:workspace");
    return saved ? (JSON.parse(saved) as Record<WidgetKey, boolean>) : defaultWidgets;
  });

  useEffect(() => {
    localStorage.setItem("signalboard:workspace", JSON.stringify(widgets));
  }, [widgets]);

  const toggle = (key: WidgetKey) => {
    setWidgets((current) => ({ ...current, [key]: !current[key] }));
  };

  return { widgets, toggle };
}

