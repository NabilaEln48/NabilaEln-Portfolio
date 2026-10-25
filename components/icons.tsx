import type { TopicId } from "@/lib/content";

type IconProps = { className?: string };

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function SmileIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8 14s1.5 2.2 4 2.2S16 14 16 14" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </svg>
  );
}

function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3 13h18" />
    </svg>
  );
}

function LayersIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 12.5 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

function SparkIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5l-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3Z" />
    </svg>
  );
}

function UserSearchIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <circle cx="10" cy="8" r="4" />
      <path d="M3 21v-1a6 6 0 0 1 6-6h2" />
      <circle cx="17.5" cy="17.5" r="3" />
      <path d="m21 21-1.4-1.4" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} strokeWidth={2.2} className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} strokeWidth={2} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const TOPIC_ICONS: Record<
  TopicId,
  { Icon: (p: IconProps) => React.JSX.Element; color: string }
> = {
  me: { Icon: SmileIcon, color: "text-teal-600" },
  projects: { Icon: BriefcaseIcon, color: "text-green-600" },
  skills: { Icon: LayersIcon, color: "text-violet-500" },
  fun: { Icon: SparkIcon, color: "text-pink-500" },
  contact: { Icon: UserSearchIcon, color: "text-amber-500" },
};

export function TopicIcon({ id, className = "" }: { id: TopicId } & IconProps) {
  const { Icon, color } = TOPIC_ICONS[id];
  return <Icon className={`${color} ${className}`} />;
}
