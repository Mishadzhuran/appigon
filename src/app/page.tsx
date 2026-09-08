import { PhoneJourney } from "@/components/home/PhoneJourney";
import { Marquee } from "@/components/home/Marquee";
import {
  CasesPreview,
  ConversionSection,
  FinalCTA,
  ServicesPreview,
  StatsStrip,
} from "@/components/home/Sections";

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
