import { botLines, type TopicId } from "./content";

export type BotReply =
  | { kind: "topic"; topic: TopicId }
  | { kind: "text"; text: string };

// Words that point to each topic. Add your own to teach the bot new phrasings.
// Single words match whole words (or word starts, for words of 4+ letters,
// so "project" also catches "projects"). Phrases match anywhere in the text.
const KEYWORDS: Record<TopicId, string[]> = {
  me: [
    "who", "about", "yourself", "background", "bio", "story", "introduce",
    "education", "study", "studied", "degree", "university", "experience",
    "founder", "eleri", "hawkeye", "career", "economics",
    "where do you live", "tell me about you",
  ],
  projects: [
    "project", "built", "build", "made", "make", "portfolio", "work",
    "app", "apps", "github", "demo", "demos", "side project", "case study",
    "showcase", "created", "elinsi", "apolo", "ptfms", "fleet", "pacman",
  ],
  skills: [
    "skill", "stack", "tech", "technology", "technologies", "tools",
    "language", "languages", "framework", "frameworks", "good at",
    "expert", "expertise", "react", "next", "typescript", "javascript",
    "python", "node", "sql", "tailwind", "fastapi", "java", "postgresql",
    "docker", "backend", "database", "databases",
  ],
  fun: [
    "fun", "hobby", "hobbies", "interests", "interest", "free time",
    "weekend", "play", "game", "games", "gaming", "music", "outside",
    "travel", "sport", "sports", "like to do", "for fun",
    "art", "photo", "photography", "coffee", "draw", "drawing", "paint",
  ],
  contact: [
    "contact", "email", "mail", "reach", "hire", "hiring", "linkedin",
    "twitter", "social", "message", "talk", "resume", "cv", "available",
    "availability", "connect", "freelance", "get in touch", "collaborate",
  ],
};

// If two topics score the same, the earlier one here wins.
const PRIORITY: TopicId[] = ["contact", "projects", "skills", "fun", "me"];

const GREETINGS = ["hi", "hello", "hey", "yo", "sup", "hola", "howdy", "hiya"];
const THANKS = ["thanks", "thank", "thx", "cheers", "ty", "appreciate"];

function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hits(text: string, words: string[], keyword: string) {
  if (keyword.includes(" ")) return text.includes(keyword);
  return words.some(
    (w) => w === keyword || (keyword.length >= 4 && w.startsWith(keyword)),
  );
}

function scoreTopics(text: string, words: string[]) {
  const scores = {} as Record<TopicId, number>;
  for (const topic of PRIORITY) {
    scores[topic] = KEYWORDS[topic].filter((k) => hits(text, words, k)).length;
  }
  return scores;
}

/** Picks the best scripted reply for whatever the visitor typed. */
export function getReply(input: string): BotReply {
  const text = normalize(input.slice(0, 200));
  const words = text.split(" ").filter(Boolean);

  if (words.length === 0) return { kind: "text", text: botLines.fallback };

  const scores = scoreTopics(text, words);
  let best: TopicId | null = null;
  for (const topic of PRIORITY) {
    if (scores[topic] > 0 && (best === null || scores[topic] > scores[best])) {
      best = topic;
    }
  }
  if (best) return { kind: "topic", topic: best };

  if (words.some((w) => GREETINGS.includes(w))) {
    return { kind: "text", text: botLines.greeting };
  }
  if (words.some((w) => THANKS.includes(w))) {
    return { kind: "text", text: botLines.thanks };
  }
  return { kind: "text", text: botLines.fallback };
}
