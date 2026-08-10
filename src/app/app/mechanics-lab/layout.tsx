import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mechanics Lab | SkillByte",
  description: "An interactive physics micro-app that takes you from layman to inventor. Experiment with levers, fulcrums, and mechanical advantage.",
  keywords: ["physics simulator", "mechanics lab", "levers", "mechanical advantage", "education app", "SkillByte"],
  openGraph: {
    title: "Mechanics Lab | SkillByte",
    description: "An interactive physics micro-app that takes you from layman to inventor.",
    url: "https://skillbyte.us/app/mechanics-lab",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
