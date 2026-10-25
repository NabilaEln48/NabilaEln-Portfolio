// Edit this file to make the site yours. Everything on screen comes from here.

export type TopicId = "me" | "projects" | "skills" | "fun" | "contact";

export type Project = {
  category: string;
  title: string;
  description: string;
  tags: string[];
  accent: string; // glow color of the card
  href?: string;
  image?: string; // optional screenshot, e.g. "/projects/elinsi.png"
};

export const profile = {
  name: "Nabila ELN",
  logo: "ELN.",
  greeting: "Hey, I'm Nabila ELN 👋",
  role: "Software Engineer",
  avatar: "/memoji.png",
};

export const topics: {
  id: TopicId;
  label: string;
  title: string;
  question: string;
  intro: string;
}[] = [
  {
    id: "me",
    label: "Me",
    title: "About Me",
    question: "Who are you?",
    intro: "Glad you asked. Here's the short version.",
  },
  {
    id: "projects",
    label: "Projects",
    title: "My Projects",
    question: "What have you built?",
    intro: "A few things I'm proud of. Swipe to see more.",
  },
  {
    id: "skills",
    label: "Skills",
    title: "My Skills",
    question: "What are you good at?",
    intro: "These are the tools I reach for most.",
  },
  {
    id: "fun",
    label: "Fun",
    title: "Beyond the Code",
    question: "What do you do for fun?",
    intro: "Away from the keyboard, you'll find me here.",
  },
  {
    id: "contact",
    label: "Contact",
    title: "Let's Talk",
    question: "How can I reach you?",
    intro: "I'd love to hear from you.",
  },
];

export const me = {
  stats: [
    { value: "4", label: "Years Experience" },
    { value: "25+", label: "Projects" },
    { value: "10+", label: "Technologies" },
    { value: "3", label: "SaaS products" },
  ],
  paragraphs: [
    "I'm a backend developer working in Python, APIs, databases, and automation that runs itself. I built Elinsi, an autonomous hiring engine, and backend systems for three products at Eleri Tech. Before that, I led frontend on the Hawkeye Early Detection System and shipped freelance projects for international clients.",
  ],
};

export const projects: Project[] = [
  {
    category: "Autonomous System",
    title: "ELINSI",
    description:
      "A high-performance Python backend powering an autonomous hiring engine, built with FastAPI and optimized SQL schemas.",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    accent: "#7c5cff",
    href: "https://www.elinsi.online/",
  },
  {
    category: "Financial Platform",
    title: "APOLO Suite",
    description:
      "A financial analysis platform for backtesting trading strategies, with real-time dashboards and optimized ingestion pipelines.",
    tags: ["Python", "Dashboards", "Data pipelines"],
    accent: "#10b981",
    href: "https://github.com/NabilaEln48/Apolo",
  },
  {
    category: "Enterprise System",
    title: "PTFMS Fleet",
    description:
      "A Java enterprise application for public-transport fleet operations, with secure auth and CRUD workflows.",
    tags: ["Java", "Auth", "CRUD"],
    accent: "#f59e0b",
    href: "https://github.com/NabilaEln48/Public-Transit-Fleet-Management-System",
  },
  {
    category: "Backend API",
    title: "Secure Document API",
    description:
      "An API for encrypted document storage with JWT authentication and role-based access control.",
    tags: ["Java", "Servlets", "JWT"],
    accent: "#3b82f6",
  },
  {
    category: "Web App",
    title: "BookRegistryApp",
    description:
      "A CRUD application that uses Singleton and Factory design patterns for a clean backend architecture.",
    tags: ["Java", "JSP", "Design Patterns"],
    accent: "#f43f5e",
  },
  {
    category: "AI Game",
    title: "Pacman: AI Edition",
    description:
      "A logic-heavy Pacman where BFS and DFS pathfinding drive the ghosts' behavior.",
    tags: ["Python", "AI", "Pathfinding"],
    accent: "#eab308",
  },
];

export const skills = [
  { name: "Languages", items: ["Python", "Java", "JavaScript", "SQL"] },
  {
    name: "Backend",
    items: ["FastAPI", "Jakarta EE", "Hibernate", "REST APIs", "JWT"],
  },
  { name: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  { name: "Tools", items: ["Docker", "Git", "Postman", "Tailwind CSS"] },
];

export const fun = [
  { emoji: "🎨", text: "Making art" },
  {
    emoji: "📷",
    text: "Photography: 35mm, street, architecture, and light & shadow",
  },
  { emoji: "☕", text: "Running on coffee" },
  { emoji: "🧩", text: "Side projects, like an AI-powered Pacman" },
];

export const contact = {
  email: "nabilajen@icloud.com",
  links: [
    { label: "GitHub", href: "https://github.com/NabilaEln48" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nabilaeln48/" },
    { label: "X", href: "https://x.com/nabila_eln48" },
    { label: "ELINSI", href: "https://www.elinsi.online/" },
  ],
};

// What the bot says when it isn't answering with a topic card.
export const botLines = {
  placeholder: "Ask me anything...",
  greeting: "Hey, good to meet you! Tap a topic or type a question.",
  thanks: "Anytime! Is there anything else you'd like to know?",
  fallback:
    "I don't have an answer for that yet. Try asking about my projects, skills, hobbies, or how to contact me.",
};
