import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resonance Pacer: Breath Biofeedback | SkillByte",
  description: "A stunning, interactive biofeedback tool that forces the user into the scientifically proven 5.5-second resonance frequency to lower stress.",
  keywords: ["resonance frequency", "heart rate variability", "vagus nerve", "breathing app", "stress relief", "SkillByte"],
  openGraph: {
    title: "Resonance Pacer: Breath Biofeedback | SkillByte",
    description: "A stunning, interactive biofeedback tool that forces the user into the scientifically proven 5.5-second resonance frequency.",
    url: "https://skillbyte.us/app/resonance",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
