"use client";

import { useRef, useState } from "react";
import { projects } from "@/lib/content";
import { ArrowIcon } from "../icons";

const STEP = 296; // card width + gap

export default function ProjectsCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  const go = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * STEP, behavior: "smooth" });

  return (
    <div>
      <div
        ref={ref}
        onScroll={update}
        tabIndex={0}
        role="region"
        aria-label="Projects, scroll horizontally"
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2"
      >
        {projects.map((p) => (
          <article
            key={p.title}
            className="flex h-[26rem] w-[17.5rem] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] p-6 text-white"
            style={{
              background: `radial-gradient(120% 70% at 50% 118%, ${p.accent} 0%, transparent 65%), #0b0c10`,
            }}
          >
            <p className="text-base font-medium text-white/80">{p.category}</p>
            <h3 className="mt-1 text-3xl font-semibold tracking-tight">
              {p.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {p.description}
            </p>
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt={`${p.title} screenshot`}
                className="mt-4 h-28 w-full rounded-xl object-cover"
              />
            )}
            <div className="mt-auto">
              <ul className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-white/10 px-2.5 py-1 text-xs"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink"
                >
                  Visit
                  <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={() => go(-1)}
          disabled={edge.start}
          aria-label="Previous project"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-soft transition-opacity disabled:opacity-40"
        >
          <ArrowIcon className="h-5 w-5 rotate-180" />
        </button>
        <button
          onClick={() => go(1)}
          disabled={edge.end}
          aria-label="Next project"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-soft transition-opacity disabled:opacity-40"
        >
          <ArrowIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
