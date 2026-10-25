import Avatar from "./Avatar";
import { profile } from "@/lib/content";

export default function Hero() {
  return (
    <header className="flex flex-col items-center">
      <p className="text-2xl font-medium sm:text-3xl">{profile.greeting}</p>
      <h1 className="mt-1 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        {profile.role}
      </h1>
      <Avatar className="mt-6 h-[min(32vh,22rem)] w-[min(32vh,22rem)] object-contain" />
    </header>
  );
}