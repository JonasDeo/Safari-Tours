import selfDriveImg from "@/assets/self-drive.jpg";
import guidedImg from "@/assets/guided-safari.jpg";
import kiliImg from "@/assets/kilimanjaro.jpg";
import beachImg from "@/assets/beach.jpg";

const services = [
  {
    title: "Self-Drive Safari Adventures",
    desc: "Plan your own route. We provide the 4×4, maps, support, and insider tips.",
    image: selfDriveImg,
  },
  {
    title: "Balbina Guided Safaris",
    desc: "Travel with an experienced guide for a richer and more relaxed safari experience.",
    image: guidedImg,
  },
  {
    title: "Mountain Climbing",
    desc: "Whether it's your first major trek or your next big summit, we'll help you prepare, pace, and reach the top.",
    image: kiliImg,
  },
  {
    title: "Beach Holidays",
    desc: "After your safari or climb, unwind on the white sands of Zanzibar, Mafia Island, or the Kenyan coast.",
    image: beachImg,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
            >
              <img
                src={svc.image}
                alt={svc.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-overlay/90 via-dark-overlay/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl font-semibold text-sand mb-2">{svc.title}</h3>
                <p className="font-body text-sand/70 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block font-body text-sm uppercase tracking-widest px-10 py-4 bg-primary text-primary-foreground hover:bg-terracotta-light transition-colors rounded-sm"
          >
            Plan Your Dream Safari
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
