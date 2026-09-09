import dynamic from "next/dynamic";
import { Marquee } from "@/components/home/Marquee";
import { PhoneJourneyLazy } from "@/components/home/PhoneJourneyLazy";

const StatsStrip = dynamic(
  () => import("@/components/home/Sections").then((m) => m.StatsStrip)
);
const ConversionSection = dynamic(
  () => import("@/components/home/Sections").then((m) => m.ConversionSection)
);
const ServicesPreview = dynamic(
  () => import("@/components/home/Sections").then((m) => m.ServicesPreview)
);
const CasesPreview = dynamic(
  () => import("@/components/home/Sections").then((m) => m.CasesPreview)
);
const FinalCTA = dynamic(
  () => import("@/components/home/Sections").then((m) => m.FinalCTA)
);

export default function HomePage() {
  return (
    <>
      <PhoneJourneyLazy />
      <Marquee
        items={[
          "App Development",
          "Landing Pages",
          "App Store",
          "Google Play",
          "Market Release",
          "Ongoing Support",
          "Appigon",
        ]}
      />
      <StatsStrip />
      <ConversionSection />
      <ServicesPreview />
      <CasesPreview />
      <FinalCTA />
    </>
  );
}
