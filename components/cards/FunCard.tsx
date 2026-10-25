import { fun } from "@/lib/content";

export default function FunCard() {
  return (
    <ul className="max-w-2xl space-y-3">
      {fun.map((item) => (
        <li
          key={item.text}
          className="flex items-center gap-4 rounded-2xl bg-soft px-5 py-4 text-lg"
        >
          <span aria-hidden className="text-2xl">
            {item.emoji}
          </span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}
