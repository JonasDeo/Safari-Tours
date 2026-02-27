import selfDriveImg from "@/assets/self-drive.jpg";

const SelfDriveSection = () => {
  return (
    <section className="py-20 bg-warm-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={selfDriveImg}
              alt="Self-drive safari adventure in Tanzania"
              className="w-full h-[400px] object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-3">
              Looking for a Self-Drive Safari?
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Just Rent a Car and Camping Equipment
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Whether you're navigating the vast savannas of Tanzania, the lush landscapes of Uganda, or the scenic beauty of Kenya, Balbina Safari puts you in the driver's seat of your adventure. Our Balbina and self-drive safaris are designed for travelers seeking the thrill of the open road, with the confidence of knowing every detail has been meticulously planned.
            </p>
            <a
              href="#"
              className="inline-block font-body text-sm uppercase tracking-widest px-8 py-3.5 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-sm"
            >
              Read More About Self Drive
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfDriveSection;
