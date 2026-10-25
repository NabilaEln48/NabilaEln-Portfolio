import { contact } from "@/lib/content";

export default function ContactCard() {
  return (
    <div className="space-y-5">
      <a
        href={`mailto:${contact.email}`}
        className="inline-block rounded-full bg-ink px-6 py-3 text-lg font-medium text-white hover:opacity-90"
      >
        {contact.email}
      </a>
      <ul className="flex flex-wrap gap-3">
        {contact.links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-soft px-5 py-2.5 font-medium hover:bg-ink/10"
            >
              {l.label} <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
