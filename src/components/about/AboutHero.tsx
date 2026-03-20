import PageHero from "@/components/PageHero";
import elephantsImg from "@/assets/safari-elephants.jpg";

const AboutHero = () => (
  <PageHero
    image={elephantsImg}
    imageAlt="About Balbina Safaris"
    eyebrow="Est. 2020 · Arusha, Tanzania"
    title="About Balbina Safaris"
    subtitle="A locally owned Tanzania tour operator — born from a deep love for the land, its people, and the wildlife that calls it home."
  />
);

export default AboutHero;