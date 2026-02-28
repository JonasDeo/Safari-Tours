import type { LucideIcon } from "lucide-react";

// ─── Option shapes ────────────────────────────────────────────────────────────

export interface TripTypeOption {
  id:    string;
  label: string;
  icon:  LucideIcon;
}

export interface AccommodationOption {
  id:    string;
  label: string;
  sub:   string;
}

// ─── Form state ───────────────────────────────────────────────────────────────

export interface QuoteFormFields {
  adults:      string;
  children:    string;
  firstName:   string;
  lastName:    string;
  country:     string;
  email:       string;
  phone:       string;
  message:     string;
  arrivalDate: string;
}

export interface QuoteState {
  tripTypes:     string[];
  destinations:  string[];
  experiences:   string[];
  occasions:     string[];
  accommodation: string;
  form:          QuoteFormFields;
}

// ─── Wizard step definition ───────────────────────────────────────────────────

export interface WizardStep {
  id:       string;
  label:    string;
  headline: string;
  sub:      string;
}

// ─── Wizard hook return ───────────────────────────────────────────────────────

export interface WizardControls {
  step:       number;
  totalSteps: number;
  next:       () => void;
  back:       () => void;
  goTo:       (n: number) => void;
  canAdvance: boolean;
}