"use client";

import { topics, type TopicId } from "@/lib/content";
import { TopicIcon } from "./icons";

type Props = {
  active: TopicId | null;
  onSelect: (id: TopicId) => void;
  /** "cards" = big landing tiles, "pills" = compact row used in the chat. */
  variant: "cards" | "pills";
};

const CARD =
  "flex h-20 w-[5.75rem] flex-col items-center justify-center gap-1.5 rounded-2xl bg-white/70 text-sm font-medium shadow-sm ring-1 ring-ink/10 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white md:w-[7.5rem]";

export default function TopicButtons({ active, onSelect, variant }: Props) {
  const cards = variant === "cards";

  return (
    <nav
      aria-label="Topics"
      className={`flex flex-wrap justify-center ${cards ? "gap-3" : "gap-2.5"}`}
    >
      {topics.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            aria-pressed={isActive}
            className={
              cards
                ? CARD
                : `flex items-center gap-2 rounded-full px-5 py-2.5 font-medium ring-1 transition ${
                    isActive
                      ? "bg-accent/10 ring-accent"
                      : "bg-white/80 ring-ink/10 hover:bg-white"
                  }`
            }
          >
            <TopicIcon id={t.id} className="h-6 w-6" />
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
