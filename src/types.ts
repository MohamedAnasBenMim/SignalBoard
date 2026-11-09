export type MetricPoint = {
  time: string;
  requests: number;
  latency: number;
  errors: number;
};

export type EventRow = {
  id: number;
  timestamp: string;
  service: string;
  region: string;
  status: "healthy" | "degraded" | "critical";
  latency: number;
  requests: number;
};

export type WidgetKey = "metrics" | "chart" | "table";

