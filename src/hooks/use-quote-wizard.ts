// src/hooks/use-quote-wizard.ts
import { useState, useCallback } from "react";
import { publicApi, ApiError } from "@/lib/api";

export interface QuoteForm {
  adults: string; children: string; arrivalDate: string;
  firstName: string; lastName: string; email: string;
  phone: string; country: string; message: string;
}

export interface QuoteState {
  tripTypes: string[]; destinations: string[]; experiences: string[];
  occasions: string[]; accommodation: string; form: QuoteForm;
}

const EMPTY_STATE: QuoteState = {
  tripTypes: [], destinations: [], experiences: [], occasions: [], accommodation: "",
  form: { adults: "2", children: "0", arrivalDate: "", firstName: "", lastName: "",
          email: "", phone: "", country: "", message: "" },
};

type Errors = Record<string, string>;

const validate = (step: number, state: QuoteState): Errors => {
  const errs: Errors = {};
  if (step === 0 && state.tripTypes.length === 0)    errs.tripTypes    = "Select at least one trip type.";
  if (step === 1 && state.destinations.length === 0) errs.destinations = "Select at least one destination.";
  if (step === 5 && Number(state.form.adults) < 1)   errs.adults       = "At least 1 adult required.";
  if (step === 6) {
    if (!state.form.firstName.trim()) errs.firstName = "First name is required.";
    if (!state.form.lastName.trim())  errs.lastName  = "Last name is required.";
    if (!state.form.email.trim())     errs.email     = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.form.email))
      errs.email = "Please enter a valid email.";
  }
  return errs;
};

const useQuoteWizard = () => {
  const [step,         setStep]         = useState(0);
  const [state,        setState]        = useState<QuoteState>(EMPTY_STATE);
  const [submitted,    setSubmitted]    = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError,  setSubmitError]  = useState("");
  const [showErrors,   setShowErrors]   = useState(false);

  const errors     = validate(step, state);
  const canAdvance = Object.keys(errors).length === 0;

  const setTripTypes     = useCallback((v: string[]) => setState(s => ({ ...s, tripTypes:     v })), []);
  const setDestinations  = useCallback((v: string[]) => setState(s => ({ ...s, destinations:  v })), []);
  const setExperiences   = useCallback((v: string[]) => setState(s => ({ ...s, experiences:   v })), []);
  const setOccasions     = useCallback((v: string[]) => setState(s => ({ ...s, occasions:     v })), []);
  const setAccommodation = useCallback((v: string)   => setState(s => ({ ...s, accommodation: v })), []);
  const setFormField     = useCallback((key: keyof QuoteForm, value: string) =>
    setState(s => ({ ...s, form: { ...s.form, [key]: value } })), []);

  const next = useCallback(() => {
    if (!canAdvance) { setShowErrors(true); return; }
    setShowErrors(false);
    setStep(s => s + 1);
  }, [canAdvance]);

  const back  = useCallback(() => { setShowErrors(false); setStep(s => Math.max(s - 1, 0)); }, []);
  const goTo  = useCallback((n: number) => { setShowErrors(false); setStep(n); }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    const finalErrors = validate(6, state);
    if (Object.keys(finalErrors).length > 0) { setShowErrors(true); return; }
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await publicApi.submitQuote({
        first_name:    state.form.firstName,
        last_name:     state.form.lastName,
        email:         state.form.email,
        phone:         state.form.phone      || undefined,
        country:       state.form.country    || undefined,
        trip_types:    state.tripTypes,
        destinations:  state.destinations,
        experiences:   state.experiences,
        occasions:     state.occasions,
        accommodation: state.accommodation   || undefined,
        adults:        Number(state.form.adults)   || 1,
        children:      Number(state.form.children) || 0,
        arrival_date:  state.form.arrivalDate       || undefined,
        message:       state.form.message           || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [state]);

  return {
    step, totalSteps: 8, state, submitted, isSubmitting, submitError,
    errors, canAdvance, showErrors,
    setTripTypes, setDestinations, setExperiences, setOccasions,
    setAccommodation, setFormField,
    next, back, goTo, handleSubmit,
    reset: useCallback(() => { setStep(0); setState(EMPTY_STATE); setSubmitted(false); setSubmitError(""); }, []),
  };
};

export default useQuoteWizard;