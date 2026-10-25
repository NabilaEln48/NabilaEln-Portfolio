import { me } from "@/lib/content";

export default function MeCard() {
  return (
    <div className="space-y-6">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {me.stats.map((s) => (
          <li key={s.label} className="rounded-2xl bg-soft p-4 text-center">
            <p className="text-3xl font-bold tracking-tight">{s.value}</p>
            <p className="mt-0.5 text-sm text-ink/60">{s.label}</p>
          </li>
        ))}
      </ul>
      <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-ink/80">
        {me.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}
