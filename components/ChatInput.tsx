"use client";

import { useState, type FormEvent } from "react";
import { botLines } from "@/lib/content";
import { ArrowIcon } from "./icons";

type Props = {
  onSend: (text: string) => void;
  /** "large" on the landing page, "compact" when docked in the chat. */
  size?: "large" | "compact";
};

export default function ChatInput({ onSend, size = "compact" }: Props) {
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
  };

  const large = size === "large";

  return (
    <form
      onSubmit={submit}
      className={`flex w-full items-center rounded-full bg-white/80 shadow-sm ring-1 ring-ink/10 backdrop-blur focus-within:ring-2 focus-within:ring-accent ${
        large ? "h-16 pl-7 pr-2.5 sm:h-[4.75rem]" : "h-14 pl-6 pr-2"
      }`}
    >
      <label htmlFor={`chat-input-${size}`} className="sr-only">
        Ask a question
      </label>
      <input
        id={`chat-input-${size}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
        autoComplete="off"
        placeholder={botLines.placeholder}
        className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink/40 sm:text-lg"
      />
      <button
        type="submit"
        aria-label="Send"
        disabled={!value.trim()}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-opacity disabled:opacity-50 sm:h-12 sm:w-12"
      >
        <ArrowIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
