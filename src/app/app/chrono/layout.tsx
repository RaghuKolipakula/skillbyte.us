import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chrono: Time Perception | SkillByte",
  description: "An interactive psychological sandbox that proves time is a biological illusion. Learn to stretch your internal clock for deep focus.",
  keywords: ["time perception", "dopamine", "deep focus", "neuroscience", "flow state", "SkillByte"],
  openGraph: {
    title: "Chrono: Time Perception | SkillByte",
    description: "An interactive psychological sandbox that proves time is a biological illusion.",
    url: "https://skillbyte.us/app/chrono",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
