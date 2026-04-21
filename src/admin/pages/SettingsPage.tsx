import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { adminApi, ApiError } from "@/lib/api";
import { Save, CheckCircle, Phone, Mail, MapPin, Globe, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

const iStyle = {
  background: "hsl(var(--muted)/0.5)",
  border:     "1px solid hsl(var(--border)/0.6)",
  color:      "hsl(var(--foreground))",
};
const inputCls = "w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200";
const onF = (e: React.FocusEvent<any>) => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)";
const onB = (e: React.FocusEvent<any>) => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)";

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl p-6 space-y-5"
    style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
    <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">{title}</p>
    {children}
  </div>
);

const FieldRow = ({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
    <label className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] font-body text-muted-foreground">
      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
      {label}
    </label>
    <div className="sm:col-span-2">{children}</div>
  </div>
);

const SettingsPage = () => {
  const [contact, setContact] = useState({
    phone:     "+255 623 880844",
    whatsapp:  "+255 685 808332",
    email:     "info@nativekilimanjaro.com",
    address:   "Moshi, Tanzania",
    website:   "https://nativekilimanjaro.com",
  });

  const [socials, setSocials] = useState({
    facebook:    "https://facebook.com/nativekilimanjaro",
    instagram:   "https://instagram.com/nativekilimanjaro",
    youtube:     "https://youtube.com/@nativekilimanjaro",
    tripadvisor: "https://tripadvisor.com",
  });

  const [seo, setSeo] = useState({
    metaTitle:       "Native Kilimanjaro — East Africa Safari Tours",
    metaDescription: "Luxury and custom safari tours across Tanzania, Kenya, Rwanda, and Zanzibar. Guided safaris, self-drive, mountain treks, and beach holidays.",
    googleAnalytics: "",
  });

  const [saving,  setSaving]  = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getSettings().then((data: any) => {
      if (data.contact) setContact(data.contact);
      if (data.socials) setSocials(data.socials);
      if (data.seo)     setSeo(data.seo);
    }).catch(() => {}); // silently fall back to defaults
  }, []);

  const save = async (section: string) => {
    setSaving(section);
    const payload = section === "contact" ? contact : section === "socials" ? socials : seo;
    try {
      await adminApi.updateSettings(section, payload);
      setSuccess(section);
      setTimeout(() => setSuccess(null), 2500);
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed to save settings.");
    } finally {
      setSaving(null);
    }
  };

  const SaveBtn = ({ section }: { section: string }) => (
    <div className="flex items-center gap-3 pt-2">
      <motion.button type="button" onClick={() => save(section)}
        disabled={saving === section}
        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body
          font-semibold transition-all duration-200"
        style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
        {saving === section
          ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          : <Save className="w-4 h-4" />}
        Save
      </motion.button>
      {success === section && (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 text-sm font-body"
          style={{ color: "hsl(var(--olive))" }}>
          <CheckCircle className="w-4 h-4" /> Saved
        </motion.span>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl text-foreground mb-1">Site Settings</h1>
        <p className="font-body text-sm text-muted-foreground">
          Manage contact details, social links, and SEO settings
        </p>
      </motion.div>

      {/* Contact info */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <SectionCard title="Contact Information">
          <div className="space-y-4">
            <FieldRow icon={Phone} label="Phone">
              <input value={contact.phone} onChange={e => setContact(v => ({ ...v, phone: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </FieldRow>
            <FieldRow icon={MessageCircle} label="WhatsApp">
              <input value={contact.whatsapp} onChange={e => setContact(v => ({ ...v, whatsapp: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </FieldRow>
            <FieldRow icon={Mail} label="Email">
              <input type="email" value={contact.email} onChange={e => setContact(v => ({ ...v, email: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </FieldRow>
            <FieldRow icon={MapPin} label="Address">
              <input value={contact.address} onChange={e => setContact(v => ({ ...v, address: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </FieldRow>
            <FieldRow icon={Globe} label="Website">
              <input type="url" value={contact.website} onChange={e => setContact(v => ({ ...v, website: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </FieldRow>
          </div>
          <SaveBtn section="contact" />
        </SectionCard>
      </motion.div>

      {/* Social links */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
        <SectionCard title="Social Media Links">
          <div className="space-y-4">
            <FieldRow icon={Facebook} label="Facebook">
              <input type="url" value={socials.facebook} onChange={e => setSocials(v => ({ ...v, facebook: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </FieldRow>
            <FieldRow icon={Instagram} label="Instagram">
              <input type="url" value={socials.instagram} onChange={e => setSocials(v => ({ ...v, instagram: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </FieldRow>
            <FieldRow icon={Youtube} label="YouTube">
              <input type="url" value={socials.youtube} onChange={e => setSocials(v => ({ ...v, youtube: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </FieldRow>
            <FieldRow icon={Globe} label="TripAdvisor">
              <input type="url" value={socials.tripadvisor} onChange={e => setSocials(v => ({ ...v, tripadvisor: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </FieldRow>
          </div>
          <SaveBtn section="socials" />
        </SectionCard>
      </motion.div>

      {/* SEO */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <SectionCard title="SEO & Analytics">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                Meta Title
              </label>
              <input value={seo.metaTitle} onChange={e => setSeo(v => ({ ...v, metaTitle: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
              <p className="text-xs font-body text-muted-foreground">{seo.metaTitle.length} / 60 chars</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                Meta Description
              </label>
              <textarea value={seo.metaDescription} onChange={e => setSeo(v => ({ ...v, metaDescription: e.target.value }))}
                rows={3} className={`${inputCls} resize-none`} style={iStyle} onFocus={onF} onBlur={onB} />
              <p className="text-xs font-body text-muted-foreground">{seo.metaDescription.length} / 160 chars</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                Google Analytics ID
              </label>
              <input value={seo.googleAnalytics} onChange={e => setSeo(v => ({ ...v, googleAnalytics: e.target.value }))}
                placeholder="G-XXXXXXXXXX"
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </div>
          </div>
          <SaveBtn section="seo" />
        </SectionCard>
      </motion.div>
    </div>
  );
};

export default SettingsPage;