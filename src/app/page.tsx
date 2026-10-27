import { Hero } from "@/components/home/Hero";
import { ConvinceRail } from "@/components/home/ConvinceRail";
import { ProductPopups } from "@/components/home/ProductPopups";
import {
  FinalCTA,
  ScrollChapters,
  WorkSection,
} from "@/components/home/PortfolioSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ConvinceRail />
      <ProductPopups />
      <ScrollChapters />
      <WorkSection />
      <FinalCTA />
    </>
  );
}
