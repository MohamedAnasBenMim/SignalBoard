import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "./App";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AreaChart: ({ children }: { children: React.ReactNode }) => <svg>{children}</svg>,
  Area: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null,
}));

beforeEach(() => localStorage.clear());

describe("SignalBoard workspace", () => {
  it("shows live operational metrics and the event workspace", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "System pulse" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Request volume" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Service events" })).toBeInTheDocument();
  });

  it("lets keyboard and pointer users customize visible widgets", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Customize view" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Real-time chart" }));
    expect(screen.queryByRole("heading", { name: "Request volume" })).not.toBeInTheDocument();
  });
});

