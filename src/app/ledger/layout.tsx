import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Identity Ledger | SkillByte",
  description: "Your compounding progress and neuro-plasticity tracker. The ultimate micro-app persistence dashboard.",
  keywords: ["habit tracker", "identity ledger", "SkillByte dashboard", "streak tracking"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
