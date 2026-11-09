import { describe, expect, it } from "vitest";

import { createEvents } from "./data";

describe("large dataset generation", () => {
  it("creates 100,000 stable rows within the rendering budget", () => {
    const started = performance.now();
    const events = createEvents(100_000);
    const elapsed = performance.now() - started;
    expect(events).toHaveLength(100_000);
    expect(new Set(events.map((event) => event.id)).size).toBe(100_000);
    expect(elapsed).toBeLessThan(500);
  });
});

