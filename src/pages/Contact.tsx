import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { publicApi, ApiError } from "@/lib/api";
import tour1 from "@/assets/tour-1.jpg";
import { useSiteSettings } from "@/hooks/use-site-settings";

// ── Data ──────────────────────────────────────────────────────────────────────

const SUBJECTS = [
  "Plan a Safari",
  "Quote Follow-up",
  "Booking Question",
  "Partnership Inquiry",
  "Other",
];

const inputBase = `w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200`;
const inputStyle = {
  background: "hsl(var(--muted)/0.5)",
  border:     "1px solid hsl(var(--border)/0.6)",
  color:      "hsl(var(--foreground))",
};

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.32, 0.72, 0, 1] as const },
});

// ── Page ──────────────────────────────────────────────────────────────────────

const ContactPage = () => {
  const { contact } = useSiteSettings();

  const CONTACT_INFO = [
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      sub:   "Mon – Sat, 8am – 6pm EAT",
      href:  `tel:${contact.phone.replace(/\s/g,"")}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.whatsapp,
      sub:   "Fastest response",
      href:  `https://wa.me/${contact.whatsapp.replace(/\D/g,"")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      sub:   "Reply within 24 hours",
      href:  `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: "Office",
      value: contact.address,
      sub:   "Near the Arusha Clock Tower",
      href:  "https://maps.google.com/?q=Arusha,Tanzania",
    },
  ];
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await publicApi.submitQuote({ ...form, trip_types: ["Contact Form"] });
      setSubmitted(true);
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Send failed. Please email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>

      {/* ── Hero ── */}
      <section className="relative flex items-center overflow-hidden"
        style={{ height: "clamp(200px, 35vh, 360px)", paddingTop: "var(--nav-total-h, 64px)" }}>
        <img src={tour1} alt="Contact Balbina Safaris"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-dark-overlay/70" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs tracking-[0.28em] uppercase font-body mb-3"
            style={{ color: "hsl(var(--primary))" }}>
            We're Here to Help
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-sand leading-tight"
            style={{ fontFamily: '"Yeseva One", serif', fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Get in Touch
          </motion.h1>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* ── Left: contact info ── */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div {...fadeUp()}>
                <p className="text-xs tracking-[0.2em] uppercase font-body text-primary mb-3">
                  Contact Details
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-4"
                  style={{ fontFamily: '"Yeseva One", serif' }}>
                  Talk to a Safari Specialist
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed text-sm">
                  Our team is based in East Africa — not in a call centre. When you reach us,
                  you're talking to someone who has actually been to the places you want to go.
                </p>
              </motion.div>

              {/* Contact cards */}
              <div className="space-y-3">
                {CONTACT_INFO.map((c, i) => (
                  <motion.a key={c.label} href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    {...fadeUp(0.08 + i * 0.06)}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group"
                    style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "hsl(var(--primary)/0.35)";
                      e.currentTarget.style.background  = "hsl(var(--primary)/0.04)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)";
                      e.currentTarget.style.background  = "hsl(var(--muted)/0.2)";
                    }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                      transition-all duration-200"
                      style={{ background: "hsl(var(--primary)/0.1)", border: "1px solid hsl(var(--primary)/0.2)" }}>
                      <c.icon className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-body text-muted-foreground mb-0.5">
                        {c.label}
                      </p>
                      <p className="font-body text-sm font-semibold text-foreground group-hover:text-primary
                        transition-colors duration-200">
                        {c.value}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">{c.sub}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Office hours */}
              <motion.div {...fadeUp(0.35)}
                className="p-5 rounded-2xl"
                style={{ border: "1px solid hsl(var(--border)/0.5)", background: "hsl(var(--muted)/0.15)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
                  <p className="text-xs uppercase tracking-widest font-body text-muted-foreground">
                    Office Hours (EAT)
                  </p>
                </div>
                <div className="space-y-1.5 font-body text-sm">
                  {[
                    { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
                    { day: "Saturday",        hours: "9:00 AM – 3:00 PM" },
                    { day: "Sunday",          hours: "WhatsApp only"      },
                  ].map(row => (
                    <div key={row.day} className="flex justify-between">
                      <span className="text-muted-foreground">{row.day}</span>
                      <span className="text-foreground">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* WhatsApp CTA */}
              <motion.a {...fadeUp(0.4)}
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g,"")}`}
                target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl
                  text-sm font-body font-semibold tracking-wide transition-all duration-200"
                style={{
                  background: "hsl(142 70% 42%)",
                  color: "#fff",
                  boxShadow: "0 4px 20px hsl(142 70% 42% / 0.3)",
                }}>
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </motion.a>
            </div>

            {/* ── Right: form ── */}
            <motion.div {...fadeUp(0.1)} className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center
                    py-20 px-8 rounded-2xl"
                  style={{ border: "1px solid hsl(var(--primary)/0.25)", background: "hsl(var(--primary)/0.04)" }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{ background: "hsl(var(--primary)/0.12)", border: "1px solid hsl(var(--primary)/0.3)" }}>
                    <CheckCircle className="w-7 h-7" style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-3"
                    style={{ fontFamily: '"Yeseva One", serif' }}>
                    Message Sent!
                  </h3>
                  <p className="font-body text-muted-foreground max-w-sm leading-relaxed">
                    Thank you for reaching out. One of our safari specialists will get back to you
                    within 24 hours — usually much sooner.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl"
                  style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.15)" }}>

                  <div>
                    <h3 className="font-display text-xl text-foreground mb-1"
                      style={{ fontFamily: '"Yeseva One", serif' }}>
                      Send a Message
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      Fill in the form and we'll be in touch shortly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                        Full Name <span style={{ color: "hsl(var(--primary))" }}>*</span>
                      </label>
                      <input value={form.name} onChange={set("name")} required
                        placeholder="Sarah Mitchell"
                        className={inputBase} style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
                        onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                        Email <span style={{ color: "hsl(var(--primary))" }}>*</span>
                      </label>
                      <input type="email" value={form.email} onChange={set("email")} required
                        placeholder="sarah@example.com"
                        className={inputBase} style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
                        onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                        Phone / WhatsApp
                      </label>
                      <input type="tel" value={form.phone} onChange={set("phone")}
                        placeholder="+1 555 000 0000"
                        className={inputBase} style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
                        onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                        Subject <span style={{ color: "hsl(var(--primary))" }}>*</span>
                      </label>
                      <select value={form.subject} onChange={set("subject")} required
                        className={`${inputBase} appearance-none cursor-pointer`} style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
                        onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"}>
                        <option value="">Select a subject…</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                      Message <span style={{ color: "hsl(var(--primary))" }}>*</span>
                    </label>
                    <textarea value={form.message} onChange={set("message")} required rows={5}
                      placeholder="Tell us about your travel plans, dates, group size, or any questions you have…"
                      className={`${inputBase} resize-none`} style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)"}
                      onBlur={e  => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)"} />
                  </div>

                  {/* Submit */}
                  <motion.button type="submit" disabled={submitting}
                    whileHover={!submitting ? { scale: 1.01 } : {}}
                    whileTap={!submitting ? { scale: 0.98 } : {}}
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl
                      text-sm font-body font-semibold tracking-wide transition-all duration-200"
                    style={{
                      background: submitting ? "hsl(var(--primary)/0.5)" : "hsl(var(--primary))",
                      color: "hsl(var(--dark))",
                      cursor: submitting ? "not-allowed" : "pointer",
                    }}>
                    {submitting
                      ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      : <Send className="w-4 h-4" />}
                    {submitting ? "Sending…" : "Send Message"}
                  </motion.button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default ContactPage;