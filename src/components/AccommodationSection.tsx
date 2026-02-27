import lodge1 from "@/assets/lodge-1.jpg";
import lodge2 from "@/assets/lodge-2.jpg";

const lodges = [
  { name: "Oldeani Ngorongoro Lodge", image: lodge1 },
  { name: "Serengeti Mawe Tented Camp", image: lodge2 },
  { name: "Lake Manyara Kilimamoja Lodge", image: lodge1 },
  { name: "Gran Meliá Arusha", image: lodge2 },
];

const AccommodationSection = () => {
  return (
    <section className="py-20 bg-warm-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-3">
            In Africa, It's All About Who You Know
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Accommodation Designed to Leave You with Memories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lodges.map((lodge, i) => (
            <div
              key={`${lodge.name}-${i}`}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg mb-4 aspect-[4/3]">
                <img
                  src={lodge.image}
                  alt={lodge.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {lodge.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block font-body text-sm uppercase tracking-widest px-10 py-4 bg-primary text-primary-foreground hover:bg-terracotta-light transition-colors rounded-sm"
          >
            More Accommodation Options
          </a>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;
