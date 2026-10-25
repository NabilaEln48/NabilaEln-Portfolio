"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Dot = {
  x: number;
  y: number;
  born: number;
  hue: number;
  size: number;
};

// --- tweak these ---
const LIFE_MS = 1200;   // how long a trace takes to vanish
const SPACING = 12;     // px between dots (smaller = smoother trail)
const BASE_SIZE = 38;   // dot radius in px
const MAX_ALPHA = 0.16; // trace strength (0 to 1)
const MAX_DOTS = 300;

export default function MouseGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dots: Dot[] = [];
    let last: { x: number; y: number } | null = null;
    let travel = 0;
    let raf = 0;
    let running = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const addDot = (x: number, y: number) => {
      // cycle cyan (190) -> indigo (250) -> pink (330) as the mouse travels
      const hue = 190 + 140 * (0.5 + 0.5 * Math.sin(travel / 150));
      dots.push({
        x,
        y,
        born: performance.now(),
        hue,
        size: BASE_SIZE * (0.8 + Math.random() * 0.5),
      });
      if (dots.length > MAX_DOTS) dots.shift();
    };

    const frame = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        const t = (now - d.born) / LIFE_MS;
        if (t >= 1) {
          dots.splice(i, 1);
          continue;
        }
        const alpha = Math.pow(1 - t, 3) * MAX_ALPHA; // quick comet-tail fade
        const r = d.size * (1 + t * 0.6);             // grows slightly as it fades
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r);
        g.addColorStop(0, `hsla(${d.hue}, 75%, 72%, ${alpha})`);
        g.addColorStop(1, `hsla(${d.hue}, 75%, 72%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (dots.length > 0) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false; // nothing left to draw, stop the loop
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.floor(dist / SPACING);
        // fill the gap so fast mouse moves leave a continuous trail
        for (let s = 1; s <= steps; s++) {
          const p = s / (steps + 1);
          travel += SPACING;
          addDot(last.x + dx * p, last.y + dy * p);
        }
        if (steps > 0) {
          last = { x, y };
        } else {
          return; // moved less than SPACING, wait for more movement
        }
      } else {
        last = { x, y };
      }
      travel += SPACING;
      addDot(x, y);
      start();
    };

    const onLeave = () => {
      last = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
}