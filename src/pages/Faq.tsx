import FAQBody from "@/components/faq/FaqBody";
import PageHero from "@/components/PageHero";
import PageLayout from "@/components/PageLayout";
import faqImg from "@/assets/faq-2.jpg"

const FAQPage = () => (
  <PageLayout>
    <PageHero
      image={faqImg}
      imageAlt="Tanzania safari landscape"
      eyebrow="Help Centre"
      title={<>Frequently Asked<br />Questions</>}
      subtitle="Everything you need to know before your Tanzania safari. Tanzania has the reputation of the best country for wildlife safaris — and you probably have questions. We've answered the most popular ones below."
    />
    <FAQBody />
  </PageLayout>
);

export default FAQPage;