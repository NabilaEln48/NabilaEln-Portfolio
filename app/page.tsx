"use client";

import { useRef, useState } from "react";
import Hero from "@/components/Hero";
import Watermark from "@/components/Watermark";
import TopicButtons from "@/components/TopicButtons";
import ChatInput from "@/components/ChatInput";
import ChatView, { type Message } from "@/components/ChatView";
import { getReply, type BotReply } from "@/lib/bot";
import { topics, type TopicId } from "@/lib/content";

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const nextId = useRef(0);

  const add = (question: string, reply: BotReply) =>
    setMessages((m) => [...m, { id: nextId.current++, question, reply }]);

  const selectTopic = (id: TopicId) =>
    add(topics.find((t) => t.id === id)!.question, { kind: "topic", topic: id });

  const send = (text: string) => add(text, getReply(text));

  const last = messages[messages.length - 1];
  const activeTopic = last?.reply.kind === "topic" ? last.reply.topic : null;

  if (messages.length > 0) {
    return (
      <main>
        <ChatView
          messages={messages}
          activeTopic={activeTopic}
          onSelect={selectTopic}
          onSend={send}
          onReset={() => setMessages([])}
        />
      </main>
    );
  }

  return (
    <main className="relative min-h-dvh">
      <Watermark />
      <div className="mx-auto flex min-h-dvh max-w-5xl flex-col items-center px-5 pb-16 pt-8 text-center">
        <Hero />
        <div className="mt-6 w-full max-w-xl">
          <ChatInput size="large" onSend={send} />
        </div>
        <div className="mt-4 w-full max-w-3xl">
          <TopicButtons variant="cards" active={null} onSelect={selectTopic} />
        </div>
      </div>
    </main>
  );
}
