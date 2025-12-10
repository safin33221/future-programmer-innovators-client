
import { AboutClub } from "@/components/modules/Home/AboutClub";
import CodingTracksSection from "@/components/modules/Home/CodingTracksSection";
import { CtaSection } from "@/components/modules/Home/CtaSection";
import { FeaturesSection } from "@/components/modules/Home/FeaturesSection";
import HeroSection from "@/components/modules/Home/HeroSection";

import { StarSection } from "@/components/modules/Home/StarSection";
import { WhyJoin } from "@/components/modules/Home/WhyJoin";


export default function page() {
  return (
    <div className="mx-auto">
      <HeroSection />
      <AboutClub />
      <FeaturesSection />
      <CodingTracksSection />
      <StarSection />
      <WhyJoin />
      <CtaSection />
    </div>
  );
};
