import HomeHero from "@/components/sections/home/HomeHero";
import FeaturedProject from "@/components/sections/home/FeaturedProject";
import ServicesSection from "@/components/sections/home/ServicesSection";
import StorySection from "@/components/sections/home/StorySection";
import ProcessSection from "@/components/sections/home/ProcessSection";
import ReviewsSection from "@/components/sections/home/ReviewsSection";
import HomeCta from "@/components/sections/home/HomeCta";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedProject />
      <ServicesSection />
      <StorySection />
      <ProcessSection />
      <ReviewsSection />
      <HomeCta />
    </>
  );
}