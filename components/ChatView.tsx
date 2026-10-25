"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Avatar from "./Avatar";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TopicButtons from "./TopicButtons";
import { ChevronIcon } from "./icons";
import type { BotReply } from "@/lib/bot";
import type { TopicId } from "@/lib/content";

export type Message = { id: number; question: string; reply: BotReply };

type Props = {
  messages: Message[];
  activeTopic: TopicId | null;
  onSelect: (id: TopicId) => void;
  onSend: (text: string) => void;
  onReset: () => void;
};

export default function ChatView({
  messages,
  activeTopic,
  onSelect,
  onSend,
  onReset,
}: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const [showTopics, setShowTopics] = useState(true);

  const scrollToEnd = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    endRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "end",
    });
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages.length, scrollToEnd]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto flex h-dvh max-w-4xl flex-col px-5"
    >
      <header className="flex justify-center pb-2 pt-4">
        <button
          onClick={onReset}
          aria-label="Back to start"
          className="rounded-full"
        >
          <Avatar className="h-14 w-14 object-contain" />
        </button>
      </header>

      <div
        aria-live="polite"
        className="no-scrollbar flex-1 overflow-y-auto py-6"
      >
        <div className="flex flex-col gap-12">
          {messages.map((m, i) => (
            <ChatBubble
              key={m.id}
              question={m.question}
              reply={m.reply}
              animate={i === messages.length - 1}
              onReveal={scrollToEnd}
            />
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <div className="pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          onClick={() => setShowTopics((v) => !v)}
          aria-expanded={showTopics}
          className="mx-auto flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink"
        >
          <ChevronIcon
            className={`h-4 w-4 transition-transform ${
              showTopics ? "" : "rotate-180"
            }`}
          />
          {showTopics ? "Hide quick questions" : "Show quick questions"}
        </button>

        <AnimatePresence initial={false}>
          {showTopics && (
            <motion.div
              key="topics"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="py-3">
                <TopicButtons
                  variant="pills"
                  active={activeTopic}
                  onSelect={onSelect}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-1">
          <ChatInput size="compact" onSend={onSend} />
        </div>
      </div>
    </motion.div>
  );
}
