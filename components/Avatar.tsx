"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/content";

/** Shared avatar: glides from big (landing) to small (chat) via layoutId. */
export default function Avatar({ className }: { className: string }) {
  return (
    <motion.img
      layoutId="avatar"
      src={profile.avatar}
      alt={`${profile.name}'s avatar`}
      draggable={false}
      className={className}
      transition={{ type: "spring", stiffness: 260, damping: 32 }}
    />
  );
}
