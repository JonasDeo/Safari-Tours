import PageHero from "@/components/PageHero";
import blogImg from "@/assets/safari-elephants.jpg";

const BlogHero = () => (
  <PageHero
    image={blogImg}
    imageAlt="Balbina Safaris Travel Journal"
    eyebrow="Stories from the Field"
    title="Travel Journal"
    subtitle="Destination guides, safari tips, and stories from across East Africa."
  />
);

export default BlogHero;