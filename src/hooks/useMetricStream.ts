import { useEffect, useRef, useState } from "react";

import { createPoint, initialPoints } from "../data";
import type { MetricPoint } from "../types";

const MAX_POINTS = 40;

export function useMetricStream(url?: string) {
  const [points, setPoints] = useState<MetricPoint[]>(initialPoints);
  const [connected, setConnected] = useState(false);
  const sequence = useRef(1);

  useEffect(() => {
    if (url) {
      const socket = new WebSocket(url);
      socket.onopen = () => setConnected(true);
      socket.onclose = () => setConnected(false);
      socket.onmessage = (event) => {
        const point = JSON.parse(event.data) as MetricPoint;
        setPoints((current) => [...current.slice(-(MAX_POINTS - 1)), point]);
      };
      return () => socket.close();
    }

    setConnected(true);
    const timer = window.setInterval(() => {
      const point = createPoint(sequence.current++);
      setPoints((current) => [...current.slice(-(MAX_POINTS - 1)), point]);
    }, 1_000);
    return () => {
      window.clearInterval(timer);
      setConnected(false);
    };
  }, [url]);

  return { points, connected };
}

