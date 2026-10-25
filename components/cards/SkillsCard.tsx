import { skills } from "@/lib/content";

export default function SkillsCard() {
  return (
    <div className="space-y-6">
      {skills.map((group) => (
        <div key={group.name}>
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-ink/50">
            {group.name}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-full bg-soft px-4 py-2 text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
