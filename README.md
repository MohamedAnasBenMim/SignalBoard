# SignalBoard

SignalBoard is a real-time analytics workspace for operating distributed systems. It combines streaming metrics, a configurable dashboard, accessible controls, and a virtualized 100,000-row event table in a responsive React interface.

## What makes it an engineering project

- React 18 and strict TypeScript
- Live WebSocket ingestion with a deterministic demo stream fallback
- Recharts time-series visualization without per-tick animation overhead
- `@tanstack/react-virtual` event table that renders only visible rows
- Persistent workspace customization through local storage
- Keyboard navigation, semantic landmarks, focus indicators, reduced-motion support
- Desktop and mobile Playwright coverage
- Lighthouse performance, accessibility, and best-practice budgets
- Rendering-performance guard for a 100,000-row dataset

## Architecture

```text
WebSocket / demo source -> useMetricStream -> bounded time-series buffer
                                           -> metric cards
                                           -> Recharts visualization

100k events -> filter memoization -> virtualizer -> visible DOM rows only
```

The live buffer is capped at 40 points, preventing memory growth during long sessions. The data table keeps all records available for filtering but mounts only the rows in and around the viewport.

## Run locally

```bash
npm install
npm run dev
```

To consume a real stream, create `.env.local`:

```bash
VITE_STREAM_URL=wss://your-service.example/metrics
```

Each WebSocket message must match:

```json
{"time":"12:04:31","requests":981,"latency":104,"errors":0.82}
```

## Quality checks

```bash
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run lighthouse
```

Vitest covers workspace behavior and large dataset generation. Playwright validates the complete dashboard on desktop Chromium and a mobile viewport. Lighthouse CI enforces 95+ accessibility and 90+ best-practice targets, with an explicit performance budget.

## Performance decisions

- The 100,000-row fixture is created once with `useMemo`.
- Filtering is memoized and virtualization overscans only eight rows.
- Chart animation is disabled for continuous updates.
- Streaming history is bounded rather than appended forever.
- Responsive layouts use CSS grids and avoid JavaScript resize loops.

## Roadmap

- Drag-and-drop widget ordering and saved server-side workspaces
- User-defined alert thresholds
- OpenTelemetry and Prometheus adapters
- Shareable dashboard URLs
- Server-side filtering for billion-row event stores

## Author

Mohamed Anas Ben Mim — Frontend Engineering portfolio project.
