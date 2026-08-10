import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Belly Fat Buster | SkillByte",
  description: "A functional, equipment-free core training micro-app. Build a stronger core with science-backed exercises like the Hollow Body Hold, Deadbug, and Bird-Dog.",
  keywords: ["core workout", "ab exercises", "belly fat", "fitness app", "SkillByte"],
  openGraph: {
    title: "Belly Fat Buster | SkillByte",
    description: "A functional, equipment-free core training micro-app.",
    url: "https://skillbyte.us/app/belly-fat-buster",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
