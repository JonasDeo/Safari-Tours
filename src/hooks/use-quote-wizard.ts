import { QuoteState, QuoteFormFields } from "@/components/quote/Quote";
import { WIZARD_STEPS, INITIAL_FORM_STATE } from "@/constants/QuoteData";
import { useState, useCallback } from "react";

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
}

const useQuoteWizard = (): UseQuoteWizardReturn => {
  const totalSteps = WIZARD_STEPS.length;

  const [step,      setStep]      = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [state, setState] = useState<QuoteState>({
    tripTypes:     [],
    destinations:  [],
    experiences:   [],
    occasions:     [],
    accommodation: "",
    form:          INITIAL_FORM_STATE,
  });

  // ── Navigation — NO window.scrollTo here.
  // Scrolling is handled in QuotePage via a ref so it only scrolls
  // the right panel on mobile, and leaves desktop untouched.
  const next = useCallback(() => {
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps]);

  const back = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const goTo = useCallback((n: number) => {
    setStep(Math.max(0, Math.min(n, totalSteps - 1)));
  }, [totalSteps]);

  const handleSubmit = useCallback(() => {
    // TODO: replace with real API call
    // await fetch("/api/quote", { method: "POST", body: JSON.stringify(state) });
    setSubmitted(true);
  }, [state]);

  // ── State updaters ────────────────────────────────────────────────────────
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
  };
};

export default useQuoteWizard;