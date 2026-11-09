import type { EventRow, MetricPoint } from "./types";

const services = ["gateway", "billing", "identity", "catalog", "notifications"];
const regions = ["eu-west", "us-east", "ap-south"];

export function createPoint(index: number, base = Date.now()): MetricPoint {
  const wave = Math.sin(index / 4);
  return {
    time: new Date(base + index * 1_000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    requests: Math.round(840 + wave * 180 + (index % 7) * 12),
    latency: Math.round(112 - wave * 22 + (index % 5) * 3),
    errors: Number((0.7 + Math.abs(wave) * 0.8).toFixed(2)),
  };
}

export function createEvents(count: number): EventRow[] {
  const base = Date.now();
  return Array.from({ length: count }, (_, index) => {
    const latency = 48 + ((index * 37) % 410);
    return {
      id: index + 1,
      timestamp: new Date(base - index * 780).toISOString(),
      service: services[index % services.length],
      region: regions[index % regions.length],
      status: latency > 380 ? "critical" : latency > 220 ? "degraded" : "healthy",
      latency,
      requests: 120 + ((index * 83) % 2_400),
    };
  });
}

export const initialPoints = Array.from({ length: 24 }, (_, index) =>
  createPoint(index - 24, Date.now()),
);

