import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Eye, EyeOff, User, Mail, Lock, CheckCircle } from "lucide-react";
import { useAdminAuth } from "../AdminAuth";
import { authApi, ApiError } from "@/lib/api";

const iStyle = {
  background: "hsl(var(--muted)/0.5)",
  border:     "1px solid hsl(var(--border)/0.6)",
  color:      "hsl(var(--foreground))",
};
const inputCls = "w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all duration-200";
const onF = (e: React.FocusEvent<any>) => e.currentTarget.style.borderColor = "hsl(var(--primary)/0.5)";
const onB = (e: React.FocusEvent<any>) => e.currentTarget.style.borderColor = "hsl(var(--border)/0.6)";

const SectionCard = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="rounded-2xl p-6 space-y-5"
    style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: "hsl(var(--primary)/0.1)" }}>
        <Icon className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
      </div>
      <p className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground">{title}</p>
    </div>
    {children}
  </div>
);

type PwFieldProps = {
  label: string;
  field: "current" | "next" | "confirm";
  value: string;
  onChange: (val: string) => void;
  show: boolean;
  toggle: () => void;
};

const PwField = ({ label, value, onChange, show, toggle }: PwFieldProps) => (
  <div className="space-y-1.5">
    <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
      {label}
    </label>

    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className={`${inputCls} pr-11`}
        style={iStyle}
        onFocus={onF}
        onBlur={onB}
      />

      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  </div>
);

const ProfilePage = () => {
  const { adminName } = useAdminAuth();

  const [profile, setProfile] = useState({ name: adminName, email: "" });

  useEffect(() => {
    authApi.me().then((data: any) => {
      setProfile({ name: data.name, email: data.email });
    }).catch(() => {});
  }, []);
  const [pw,      setPw]      = useState({ current: "", next: "", confirm: "" });
  const [showPw,  setShowPw]  = useState({ current: false, next: false, confirm: false });
  const [saving,  setSaving]  = useState<"profile" | "password" | null>(null);
  const [success, setSuccess] = useState<"profile" | "password" | null>(null);
  const [pwError, setPwError] = useState("");

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving("profile");
    try {
      await authApi.updateMe({ name: profile.name, email: profile.email });
      setSuccess("profile");
      setTimeout(() => setSuccess(null), 2500);
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed to save profile.");
    } finally {
      setSaving(null);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    if (pw.next !== pw.confirm) { setPwError("New passwords don't match."); return; }
    if (pw.next.length < 8)     { setPwError("Password must be at least 8 characters."); return; }
    setSaving("password");
    try {
      await authApi.updateMe({ current_password: pw.current, password: pw.next, password_confirmation: pw.confirm });
      setSuccess("password");
      setPw({ current: "", next: "", confirm: "" });
      setTimeout(() => setSuccess(null), 2500);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Failed to update password.";
      setPwError(msg);
    } finally {
      setSaving(null);
    }
  };

  const toggleShow = (k: keyof typeof showPw) =>
    setShowPw(v => ({ ...v, [k]: !v[k] }));

  return (
    <div className="max-w-2xl space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl text-foreground mb-1">Profile</h1>
        <p className="font-body text-sm text-muted-foreground">Manage your account details and password</p>
      </motion.div>

      {/* Avatar display */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="flex items-center gap-4 p-5 rounded-2xl"
        style={{ border: "1px solid hsl(var(--border)/0.6)", background: "hsl(var(--muted)/0.2)" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold font-body"
          style={{ background: "hsl(var(--primary)/0.15)", color: "hsl(var(--primary))" }}>
          {profile.name.charAt(0)}
        </div>
        <div>
          <p className="font-body font-semibold text-foreground">{profile.name}</p>
          <p className="font-body text-sm text-muted-foreground">{profile.email}</p>
          <p className="font-body text-xs text-muted-foreground mt-0.5">Administrator</p>
        </div>
      </motion.div>

      {/* Profile form */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
        <SectionCard title="Account Info" icon={User}>
          <form onSubmit={saveProfile} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground">
                Display Name
              </label>
              <input value={profile.name} onChange={e => setProfile(v => ({ ...v, name: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-[0.15em] font-body text-muted-foreground flex items-center gap-1.5">
                <Mail className="w-3 h-3" /> Email
              </label>
              <input type="email" value={profile.email}
                onChange={e => setProfile(v => ({ ...v, email: e.target.value }))}
                className={inputCls} style={iStyle} onFocus={onF} onBlur={onB} />
            </div>
            <div className="flex items-center gap-3">
              <motion.button type="submit" disabled={saving === "profile"}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body
                  font-semibold transition-all duration-200"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                {saving === "profile"
                  ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  : <Save className="w-4 h-4" />}
                Save Profile
              </motion.button>
              {success === "profile" && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5 text-sm font-body"
                  style={{ color: "hsl(var(--olive))" }}>
                  <CheckCircle className="w-4 h-4" /> Saved
                </motion.span>
              )}
            </div>
          </form>
        </SectionCard>
      </motion.div>

      {/* Password form */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
        <SectionCard title="Change Password" icon={Lock}>
          <form onSubmit={savePassword} className="space-y-4">
            <PwField
  label="Current Password"
  field="current"
  value={pw.current}
  onChange={(val) => setPw(v => ({ ...v, current: val }))}
  show={showPw.current}
  toggle={() => toggleShow("current")}
/>

<PwField
  label="New Password"
  field="next"
  value={pw.next}
  onChange={(val) => setPw(v => ({ ...v, next: val }))}
  show={showPw.next}
  toggle={() => toggleShow("next")}
/>

<PwField
  label="Confirm New Password"
  field="confirm"
  value={pw.confirm}
  onChange={(val) => setPw(v => ({ ...v, confirm: val }))}
  show={showPw.confirm}
  toggle={() => toggleShow("confirm")}
/>
            {pwError && (
              <p className="text-xs font-body" style={{ color: "hsl(0 70% 65%)" }}>{pwError}</p>
            )}
            <div className="flex items-center gap-3">
              <motion.button type="submit" disabled={saving === "password"}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-body
                  font-semibold transition-all duration-200"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                {saving === "password"
                  ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  : <Lock className="w-4 h-4" />}
                Update Password
              </motion.button>
              {success === "password" && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5 text-sm font-body"
                  style={{ color: "hsl(var(--olive))" }}>
                  <CheckCircle className="w-4 h-4" /> Password updated
                </motion.span>
              )}
            </div>
          </form>
        </SectionCard>
      </motion.div>
    </div>
  );
};

export default ProfilePage;