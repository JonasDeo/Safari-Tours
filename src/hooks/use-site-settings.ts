import { useState, useEffect } from "react";
import { publicApi } from "@/lib/api";

export interface SiteContact {
  phone:     string;
  whatsapp:  string;
  email:     string;
  address:   string;
  website:   string;
}

export interface SiteSocials {
  facebook:    string;
  instagram:   string;
  youtube:     string;
  tripadvisor: string;
}

export interface SiteSettings {
  contact: SiteContact;
  socials:  SiteSocials;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  contact: {
    phone:    "+255 623 880844",
    whatsapp: "+255 685 808332",
    email:    "info@nativekilimanjaro.com",
    address:  "Arusha, Tanzania",
    website:  "https://nativekilimanjaro.com",
  },
  socials: {
    facebook:    "https://facebook.com/nativekilimanjaro",
    instagram:   "https://instagram.com/nativekilimanjaro",
    youtube:     "https://youtube.com/@nativekilimanjaro",
    tripadvisor: "https://tripadvisor.com",
  },
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    publicApi.getSettings()
      .then((data: any) => {
        setSettings({
          contact: { ...DEFAULT_SETTINGS.contact, ...(data.contact ?? {}) },
          socials:  { ...DEFAULT_SETTINGS.socials,  ...(data.socials  ?? {}) },
        });
      })
      .catch(() => {}); // keep defaults on failure
  }, []);

  return settings;
};