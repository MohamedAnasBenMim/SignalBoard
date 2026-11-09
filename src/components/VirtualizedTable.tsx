import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Search } from "lucide-react";

import type { EventRow } from "../types";

export function VirtualizedTable({ rows }: { rows: EventRow[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rows;
    return rows.filter(
      (row) => row.service.includes(normalized) || row.region.includes(normalized) || row.status.includes(normalized),
    );
  }, [query, rows]);
  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 8,
  });

  return (
    <section className="panel table-panel" aria-labelledby="events-title">
      <div className="panel-heading table-heading">
        <div>
          <p className="eyebrow">Virtualized dataset</p>
          <h2 id="events-title">Service events</h2>
        </div>
        <label className="search-field">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Filter events</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter events…" />
        </label>
      </div>
      <div className="data-table" role="table" aria-rowcount={filtered.length}>
        <div className="table-header" role="row">
          <span role="columnheader">Service</span><span role="columnheader">Region</span><span role="columnheader">Status</span><span role="columnheader">Latency</span><span role="columnheader">Requests</span>
        </div>
        <div ref={parentRef} className="table-scroll" role="rowgroup">
          <div role="presentation" style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
            {virtualizer.getVirtualItems().map((item) => {
              const row = filtered[item.index];
              return (
                <div
                  className="table-row"
                  role="row"
                  key={row.id}
                  style={{ transform: `translateY(${item.start}px)` }}
                >
                  <span role="cell"><b>{row.service}</b><small>{new Date(row.timestamp).toLocaleTimeString()}</small></span>
                  <span role="cell">{row.region}</span>
                  <span role="cell"><i className={`status ${row.status}`} />{row.status}</span>
                  <span role="cell">{row.latency} ms</span>
                  <span role="cell">{row.requests.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <p className="table-summary">Showing {filtered.length.toLocaleString()} events with only visible rows rendered.</p>
    </section>
  );
}

