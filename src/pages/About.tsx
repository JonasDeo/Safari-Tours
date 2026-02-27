import PageLayout from "@/components/PageLayout";
import { Heart, TreePine, Users, Award } from "lucide-react";
import elephantsImg from "@/assets/safari-elephants.jpg";
import guidedImg from "@/assets/guided-safari.jpg";

const AboutPage = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img src={elephantsImg} alt="About Balbina Safari" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-overlay/60" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sand mb-3 text-shadow-hero">About Us</h1>
          <p className="font-body text-sand/70 text-lg">Our Heart is in Africa</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-3">Our Story</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Travel With Purpose, Where Every Journey Gives Back
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Based in Tanzania with on-the-ground teams across East Africa, Balbina Safari was born from a deep love for the land and its people. We design luxury safaris that deliver more than unforgettable wildlife experiences — they change lives.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                20% of every safari profit goes directly to supporting children, education, and local communities in Tanzania. When you book with us, you're not just exploring Africa — you're investing in it.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src={guidedImg} alt="Our experienced safari guides" className="w-full h-[400px] object-cover rounded-lg" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-warm-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TreePine, title: "Local Roots", desc: "Based in Tanzania with on-the-ground teams across East Africa." },
              { icon: Heart, title: "Sustainable Travel", desc: "Every trip supports youth and community programs." },
              { icon: Users, title: "Expert Guides", desc: "Experienced, passionate guides who know Africa inside out." },
              { icon: Award, title: "Top Rated", desc: "Consistently rated excellent on TripAdvisor by travelers worldwide." },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="font-body text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
