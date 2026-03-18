import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import AboutSustainability from "@/components/about/AboutSustainability";
import AboutTeam from "@/components/about/AboutTeam";
import AboutValues from "@/components/about/AboutValues";
import PageLayout from "@/components/PageLayout";

const AboutPage = () => (
  <PageLayout>
    <AboutHero />
    <AboutIntro />
    <AboutMissionVision />
    <AboutTeam />
    <AboutValues />
    <AboutSustainability />
  </PageLayout>
);

export default AboutPage;