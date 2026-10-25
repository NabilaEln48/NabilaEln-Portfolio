import { profile } from "@/lib/content";

/** Giant faded first name behind the bottom of the landing page. */
export default function Watermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 flex select-none justify-center overflow-hidden"
    >
      <span className="translate-y-[28%] text-[26vw] font-extrabold leading-none tracking-tighter text-ink/[0.045]">
        {profile.name.split(" ")[0]}
      </span>
    </div>
  );
}
