import heroImg from "@/assets/tour-1.jpg";

const BlogHero = () => (
  <section
    className="relative min-h-[40vh] flex items-center justify-center overflow-hidden"
    style={{ paddingTop: "var(--nav-total-h, 100px)" }}
  >
    <img
      src={heroImg}
      alt="Safari travel blog"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-dark-overlay/60" />

    <div className="relative z-10 text-center px-4 py-12">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-sand mb-3 text-shadow-hero">
        Travel Journal
      </h1>
      <p className="font-body text-sand/70 text-lg">
        Stories, guides, and insider knowledge from the wild heart of Africa
      </p>
    </div>
  </section>
);

export default BlogHero;