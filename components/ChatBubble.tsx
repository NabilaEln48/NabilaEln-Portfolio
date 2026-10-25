"use client";

import { useEffect, useState, type ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { topics, type TopicId } from "@/lib/content";
import type { BotReply } from "@/lib/bot";
import MeCard from "./cards/MeCard";
import ProjectsCard from "./cards/ProjectsCard";
import SkillsCard from "./cards/SkillsCard";
import FunCard from "./cards/FunCard";
import ContactCard from "./cards/ContactCard";

const cards: Record<TopicId, ComponentType> = {
  me: MeCard,
  projects: ProjectsCard,
  skills: SkillsCard,
  fun: FunCard,
  contact: ContactCard,
};

type Props = {
  question: string;
  reply: BotReply;
  /** Only the newest message types out; older ones show instantly. */
  animate: boolean;
  /** Called when the card appears, so the chat can scroll it into view. */
  onReveal?: () => void;
};

export default function ChatBubble({ question, reply, animate, onReveal }: Props) {
  const topic =
    reply.kind === "topic" ? topics.find((x) => x.id === reply.topic)! : null;
  const intro = topic ? topic.intro : (reply as { text: string }).text;
  const Card = topic ? cards[topic.id] : null;

  const reduce = useReducedMotion();
  const instant = !animate || !!reduce;
  const [typed, setTyped] = useState(0);

  // Type one character at a time. Skipped when the message should show instantly.
  useEffect(() => {
    if (instant) return;
    const id = setInterval(() => {
      setTyped((n) => {
        if (n >= intro.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 18);
    return () => clearInterval(id);
  }, [intro, instant]);

  const shown = instant ? intro.length : typed;
  const done = shown >= intro.length;

  useEffect(() => {
    if (done && animate && Card) onReveal?.();
  }, [done, animate, Card, onReveal]);

  const typedText = (
    <>
      <span aria-hidden>{intro.slice(0, shown)}</span>
      <span className="sr-only">{intro}</span>
      {!done && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 animate-pulse bg-ink/50"
        />
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={animate ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        className="ml-auto max-w-[85%] rounded-3xl rounded-br-lg bg-accent px-5 py-2.5 text-white [overflow-wrap:anywhere]"
      >
        {question}
      </motion.div>

      {topic ? (
        <div>
          <motion.h2
            initial={animate ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {topic.title}
          </motion.h2>
          <p className="mt-2 text-lg text-ink/60">{typedText}</p>
          {done && Card && (
            <motion.div
              initial={animate ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8"
            >
              <Card />
            </motion.div>
          )}
        </div>
      ) : (
        <p className="max-w-[85%] rounded-3xl rounded-bl-lg bg-soft px-5 py-3 text-lg">
          {typedText}
        </p>
      )}
    </div>
  );
}
