import { QuoteState, QuoteFormFields } from "@/components/quote/Quote";
import { WIZARD_STEPS, INITIAL_FORM_STATE } from "@/constants/QuoteData";
import { useState, useCallback, useMemo } from "react";
import { StepErrors } from "@/components/quote/Quote";

/** Pure toggle — returns a new array without mutation */
export const toggleItem = (arr: string[], id: string): string[] =>
  arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];

export interface UseQuoteWizardReturn {
  step:            number;
  totalSteps:      number;
  next:            () => void;
  back:            () => void;
  goTo:            (n: number) => void;
  submitted:       boolean;
  handleSubmit:    () => void;
  state:           QuoteState;
  setTripTypes:    (ids: string[]) => void;
  setDestinations: (ids: string[]) => void;
  setExperiences:  (ids: string[]) => void;
  setOccasions:    (ids: string[]) => void;
  setAccommodation:(id: string)    => void;
  setFormField:    (key: keyof QuoteFormFields, value: string) => void;
  canAdvance:      boolean;
  errors:          StepErrors;
  showErrors:      boolean;
  triggerValidation: () => void;
}

// ── Per-step validation ────────────────────────────────────────────────────────

function validateStep(step: number, state: QuoteState): StepErrors {
  const errs: StepErrors = {};

  switch (step) {
    case 0: // Trip Type
      if (state.tripTypes.length === 0)
        errs.tripTypes = "Please select at least one trip type.";
      break;

    case 1: // Destinations
      if (state.destinations.length === 0)
        errs.destinations = "Please select at least one destination.";
      break;

    case 2: // Experiences
      if (state.experiences.length === 0)
        errs.experiences = "Please select at least one experience.";
      break;

    case 3: // Occasion — optional, no hard requirement
      break;

    case 4: // Accommodation
      if (!state.accommodation)
        errs.accommodation = "Please select an accommodation style.";
      break;

    case 5: { // Group & Date
      const { adults, children, arrivalDate } = state.form;

      if (!adults || isNaN(Number(adults)) || Number(adults) < 1)
        errs.adults = "Please enter at least 1 adult.";

      if (!children || isNaN(Number(children)) || Number(children) < 0)
        errs.children = "Children must be 0 or more.";

      if (!arrivalDate || arrivalDate.trim() === "")
        errs.arrivalDate = "Please enter your preferred arrival date.";

      break;
    }

    case 6: { // Contact
      const { firstName, lastName, email, phone } = state.form;
      if (!firstName?.trim()) errs.firstName = "First name is required.";
      if (!lastName?.trim())  errs.lastName  = "Last name is required.";
      if (!email?.trim())     errs.email     = "Email address is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errs.email = "Please enter a valid email address.";
      if (!phone?.trim())     errs.phone     = "Phone number is required.";
      break;
    }

    case 7: // Message — optional
      break;

    default:
      break;
  }

  return errs;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

const useQuoteWizard = (): UseQuoteWizardReturn => {
  const totalSteps = WIZARD_STEPS.length;

  const [step,       setStep]       = useState<number>(0);
  const [submitted,  setSubmitted]  = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const [state, setState] = useState<QuoteState>({
    tripTypes:     [],
    destinations:  [],
    experiences:   [],
    occasions:     [],
    accommodation: "",
    form:          INITIAL_FORM_STATE,
  });

  // Recompute errors whenever step or state changes
  const errors     = useMemo(() => validateStep(step, state), [step, state]);
  const canAdvance = useMemo(() => Object.keys(errors).length === 0, [errors]);

  // Show errors inline only after the user has tried to advance
  const triggerValidation = useCallback(() => {
    setShowErrors(true);
  }, []);

  // Navigation
  const next = useCallback(() => {
    if (!canAdvance) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [canAdvance, totalSteps]);

  const back = useCallback(() => {
    setShowErrors(false);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const goTo = useCallback((n: number) => {
    setShowErrors(false);
    setStep(Math.max(0, Math.min(n, totalSteps - 1)));
  }, [totalSteps]);

  const handleSubmit = useCallback(() => {
    if (!canAdvance) {
      setShowErrors(true);
      return;
    }
    // TODO: replace with real API call
    setSubmitted(true);
  }, [canAdvance, state]);

  // State updaters
  const setTripTypes     = (ids: string[])  => setState((s) => ({ ...s, tripTypes: ids }));
  const setDestinations  = (ids: string[])  => setState((s) => ({ ...s, destinations: ids }));
  const setExperiences   = (ids: string[])  => setState((s) => ({ ...s, experiences: ids }));
  const setOccasions     = (ids: string[])  => setState((s) => ({ ...s, occasions: ids }));
  const setAccommodation = (id: string)     => setState((s) => ({ ...s, accommodation: id }));
  const setFormField     = (key: keyof QuoteFormFields, value: string) =>
    setState((s) => ({ ...s, form: { ...s.form, [key]: value } }));

  return {
    step, totalSteps, next, back, goTo,
    submitted, handleSubmit,
    state,
    setTripTypes, setDestinations, setExperiences,
    setOccasions, setAccommodation, setFormField,
    canAdvance,
    errors,
    showErrors,
    triggerValidation,
  };
};

export default useQuoteWizard;