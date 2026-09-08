import dynamic from "next/dynamic";
import { PhoneJourney } from "@/components/home/PhoneJourney";
import { Marquee } from "@/components/home/Marquee";

const StatsStrip = dynamic(
  () => import("@/components/home/Sections").then((m) => m.StatsStrip),
  { ssr: true }
);
const ConversionSection = dynamic(
  () => import("@/components/home/Sections").then((m) => m.ConversionSection),
  { ssr: true }
);
const ServicesPreview = dynamic(
  () => import("@/components/home/Sections").then((m) => m.ServicesPreview),
  { ssr: true }
);
const CasesPreview = dynamic(
  () => import("@/components/home/Sections").then((m) => m.CasesPreview),
  { ssr: true }
);
const FinalCTA = dynamic(
  () => import("@/components/home/Sections").then((m) => m.FinalCTA),
  { ssr: true }
);

export default function HomePage() {
  return (
    <>
      <PhoneJourney />
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
