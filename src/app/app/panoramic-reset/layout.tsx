import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panoramic Reset | SkillByte",
  description: "Manually turn off your body's stress response with a hardwired biological hack. Expand your visual field to trigger the parasympathetic nervous system.",
  keywords: ["stress relief", "panoramic vision", "parasympathetic nervous system", "biology hack", "SkillByte"],
  openGraph: {
    title: "Panoramic Reset | SkillByte",
    description: "Manually turn off your body's stress response with a hardwired biological hack.",
    url: "https://skillbyte.us/app/panoramic-reset",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
