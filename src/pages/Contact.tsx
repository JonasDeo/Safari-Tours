import PageLayout from "@/components/PageLayout";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import kiliImg from "@/assets/kilimanjaro.jpg";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
        <img src={kiliImg} alt="Contact us" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark-overlay/60" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sand mb-3 text-shadow-hero">Contact Us</h1>
          <p className="font-body text-sand/70 text-lg">Plan your dream African safari today</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Ready to start planning? Reach out to our team and we'll craft the perfect itinerary for your East African adventure.
              </p>
              <div className="space-y-5">
                <a href="tel:+255685808332" className="flex items-center gap-4 font-body text-foreground hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone / WhatsApp</p>
                    <p className="font-semibold">+255 685 808332</p>
                  </div>
                </a>
                <a href="mailto:info@Balbinasafaris.com" className="flex items-center gap-4 font-body text-foreground hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">info@Balbinasafaris.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 font-body text-foreground">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Office</p>
                    <p className="font-semibold">Arusha, Tanzania</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card border border-border rounded-lg p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="font-body text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Request a Safari Quote</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-1.5">Full Name *</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-1.5">Email *</label>
                      <input type="email" required className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-1.5">Travel Date</label>
                      <input type="date" className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="font-body text-sm text-muted-foreground block mb-1.5">Number of Travelers</label>
                      <input type="number" min="1" className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-1.5">Safari Type</label>
                    <select className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                      <option value="">Select a type...</option>
                      <option>Self-Drive Safari</option>
                      <option>Balbina Guided Safari</option>
                      <option>Mountain Climbing</option>
                      <option>Beach Holiday</option>
                      <option>Combined Package</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-sm text-muted-foreground block mb-1.5">Message</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="Tell us about your dream safari..." />
                  </div>
                  <button type="submit" className="w-full font-body text-sm uppercase tracking-widest px-8 py-4 bg-primary text-primary-foreground hover:bg-terracotta-light transition-colors rounded-sm">
                    Send Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
