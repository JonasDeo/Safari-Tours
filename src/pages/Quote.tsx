import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";

import heroImg   from "@/assets/tour-1.jpg";
import safariImg from "@/assets/safari-landscape.jpg";
import StepAccommodation from "@/components/quote/steps/StepAccommodation";
import StepContact       from "@/components/quote/steps/StepContact";
import StepDestinations  from "@/components/quote/steps/StepDestinations";
import StepExperiences   from "@/components/quote/steps/StepExperiences";
import StepGroupDate     from "@/components/quote/steps/StepGroupDate";
import StepMessage       from "@/components/quote/steps/StepMessage";
import StepOccasion      from "@/components/quote/steps/StepOccasion";
import StepTripType      from "@/components/quote/steps/StepTripType";
import QuoteSuccess      from "@/components/QuoteSuccess";
import WizardNav         from "@/components/WizardNav";
import WizardProgress    from "@/components/WizardProgress";
import { WIZARD_STEPS }  from "@/constants/QuoteData";
import useQuoteWizard    from "@/hooks/use-quote-wizard";
import PageLayout        from "@/components/PageLayout";

const SLIDE_VARIANTS = {
  enter:  (dir: number) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -32 : 32, opacity: 0 }),
};
const SLIDE_TRANSITION = { duration: 0.32, ease: [0.32, 0.72, 0, 1] as const };

const TRUST_ITEMS = [
  { icon: "🦁", label: "Big Five Guaranteed Routes"      },
  { icon: "🌍", label: "10+ Years in East Africa"        },
  { icon: "💚", label: "20% Profits Fund Local Education" },
];

const QuotePage = () => {
  const {
    step, totalSteps, next, back, goTo,
    submitted, handleSubmit, isSubmitting, submitError,
    state,
    setTripTypes, setDestinations, setExperiences,
    setOccasions, setAccommodation, setFormField,
    canAdvance, errors, showErrors,
  } = useQuoteWizard();

  const formRef = useRef<HTMLDivElement>(null);

  // On mobile: scroll form into view when step changes — but only after
  // the initial mount so we don't hijack the first load scroll position.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step, submitted]);

  const currentStep = WIZARD_STEPS[step];

  const renderStep = () => {
    const errs = showErrors ? errors : {};
    switch (step) {
      case 0: return <StepTripType      selected={state.tripTypes}     onChange={setTripTypes}     errors={errs} />;
      case 1: return <StepDestinations  selected={state.destinations}  onChange={setDestinations}  errors={errs} />;
      case 2: return <StepExperiences   selected={state.experiences}   onChange={setExperiences}   errors={errs} />;
      case 3: return <StepOccasion      selected={state.occasions}     onChange={setOccasions}     errors={errs} />;
      case 4: return <StepAccommodation selected={state.accommodation} onChange={setAccommodation} errors={errs} />;
      case 5: return <StepGroupDate     form={state.form}              onFieldChange={setFormField} errors={errs} />;
      case 6: return <StepContact       form={state.form}              onFieldChange={setFormField} errors={errs} />;
      case 7: return (
        <StepMessage
          message={state.form.message}
          onChange={(v) => setFormField("message", v)}
          state={state}
          errors={errs}
        />
      );
      default: return null;
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-background">

        {/* ══════════════════════════════════════════════════════════════
            MOBILE HEADER  (< lg)
            Hero photo + step info + progress bar — all in one compact block.
            Hidden on desktop where the side panel takes over.
        ══════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden relative overflow-hidden"
          style={{ paddingTop: "var(--nav-total-h, 64px)" }}>

          {/* Background photo */}
          <div className="absolute inset-0 z-0">
            <img src={heroImg} alt="" aria-hidden
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.35) saturate(0.8)" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/75" />
            <div className="absolute inset-0"
              style={{ background: "hsl(var(--primary)/0.06)" }} />
          </div>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--primary)/0.2))" }} />

          {/* Content */}
          <div className="relative z-10 px-5 pt-6 pb-0">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="done"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="pb-6">
                  <p className="text-xs tracking-[0.25em] uppercase font-body text-primary mb-1">
                    All done
                  </p>
                  <p className="font-display text-xl text-sand/90">
                    Your safari journey starts here.
                  </p>
                </motion.div>
              ) : (
                <motion.div key={step}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}>

                  {/* Step counter */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full
                      text-xs font-bold font-body flex-shrink-0"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--dark))",
                        boxShadow: "0 0 10px hsl(var(--primary)/0.5)",
                      }}>
                      {step + 1}
                    </span>
                    <span className="text-xs tracking-[0.18em] uppercase font-body"
                      style={{ color: "hsl(var(--primary)/0.8)" }}>
                      of {totalSteps} steps
                    </span>
                  </div>

                  {/* Step headline */}
                  <h1 className="font-display text-xl sm:text-2xl text-sand leading-tight mb-1">
                    {currentStep.headline}
                  </h1>
                  <p className="font-body text-xs sm:text-sm mb-5"
                    style={{ color: "hsl(var(--sand)/0.5)" }}>
                    {currentStep.sub}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress bar — sits flush at the bottom of the header */}
            {!submitted && (
              <div className="h-[3px] w-full rounded-full overflow-hidden -mx-5 px-0"
                style={{
                  width: "calc(100% + 2.5rem)",
                  marginLeft: "-1.25rem",
                  background: "hsl(var(--sand)/0.1)",
                }}>
                <motion.div className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)/0.6))",
                    boxShadow: "0 0 6px hsl(var(--primary)/0.5)",
                  }}
                  initial={false}
                  animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} />
              </div>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            DESKTOP LAYOUT  (lg+)
            Classic side-by-side: left panel | right form
        ══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row">

          {/* ── Desktop left panel ── */}
          <aside className={[
            "hidden lg:flex flex-col",
            "relative w-full lg:w-[36%] xl:w-[32%] overflow-hidden",
            submitted
              ? ""
              : "lg:sticky lg:top-[var(--nav-total-h,64px)] lg:h-[calc(100vh-var(--nav-total-h,64px))]",
          ].join(" ")}>

            {/* Background */}
            <div className="absolute inset-0 z-0">
              <img src={safariImg} alt="" aria-hidden
                className="w-full h-full object-cover object-center"
                style={{ filter: "brightness(0.28) saturate(0.7)" }} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-0"
                style={{ background: "hsl(var(--primary)/0.05)" }} />
            </div>

            {/* Accent lines */}
            <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--primary)/0.2))" }} />
            <div className="absolute top-0 left-0 bottom-0 w-[2px] z-10"
              style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary)/0.08) 70%, transparent)" }} />

            {/* Panel content */}
            <div className="relative z-10 flex flex-col justify-between h-full gap-6
              px-10 py-12 xl:px-12 xl:py-14">

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="done"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <p className="text-xs tracking-[0.25em] uppercase font-body mb-3"
                        style={{ color: "hsl(var(--primary))" }}>All done</p>
                      <p className="font-display text-2xl text-sand/90 leading-snug">
                        Your safari journey<br />starts here.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key={step}
                      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.36, ease: [0.32, 0.72, 0, 1] }}>

                      <div className="flex items-center gap-2.5 mb-5">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full
                          text-xs font-bold font-body flex-shrink-0"
                          style={{
                            background: "hsl(var(--primary))",
                            color: "hsl(var(--dark))",
                            boxShadow: "0 0 14px hsl(var(--primary)/0.45)",
                          }}>
                          {step + 1}
                        </span>
                        <span className="text-xs tracking-[0.18em] uppercase font-body"
                          style={{ color: "hsl(var(--primary)/0.75)" }}>
                          of {totalSteps} steps
                        </span>
                      </div>

                      <h2 className="font-display text-2xl lg:text-[1.85rem] text-sand leading-tight mb-3">
                        {currentStep.headline}
                      </h2>
                      <p className="font-body text-sm leading-relaxed"
                        style={{ color: "hsl(var(--sand)/0.48)", maxWidth: "22rem" }}>
                        {currentStep.sub}
                      </p>

                      {/* Progress */}
                      <div className="mt-8">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-body"
                            style={{ color: "hsl(var(--sand)/0.3)" }}>Progress</span>
                          <span className="text-xs font-body"
                            style={{ color: "hsl(var(--primary)/0.8)" }}>
                            {Math.round(((step + 1) / totalSteps) * 100)}%
                          </span>
                        </div>
                        <div className="h-[3px] w-full rounded-full overflow-hidden"
                          style={{ background: "hsl(var(--sand)/0.1)" }}>
                          <motion.div className="h-full rounded-full"
                            style={{
                              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)/0.6))",
                              boxShadow: "0 0 8px hsl(var(--primary)/0.5)",
                            }}
                            initial={false}
                            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} />
                        </div>
                        <div className="flex gap-1.5 mt-2.5">
                          {Array.from({ length: totalSteps }).map((_, i) => (
                            <div key={i} className="rounded-full transition-all duration-300"
                              style={{
                                width: i === step ? "14px" : "4px",
                                height: "4px",
                                background: i <= step
                                  ? "hsl(var(--primary))"
                                  : "hsl(var(--sand)/0.12)",
                              }} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Trust badges */}
              {!submitted && (
                <div className="space-y-2.5">
                  <p className="text-xs tracking-[0.18em] uppercase font-body mb-3"
                    style={{ color: "hsl(var(--sand)/0.28)" }}>Why Balbina</p>
                  {TRUST_ITEMS.map((item, i) => (
                    <motion.div key={item.label} className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07 }}>
                      <span className="text-sm w-5 text-center flex-shrink-0">{item.icon}</span>
                      <span className="font-body text-xs"
                        style={{ color: "hsl(var(--sand)/0.5)" }}>{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Contact footer */}
              <div className="pt-5" style={{ borderTop: "1px solid hsl(var(--sand)/0.08)" }}>
                <p className="text-xs font-body mb-3"
                  style={{ color: "hsl(var(--sand)/0.28)" }}>Need help planning?</p>
                <div className="flex flex-col gap-2.5">
                  <a href="tel:+255685808332"
                    className="flex items-center gap-2 text-sm font-body group w-fit"
                    style={{ color: "hsl(var(--sand)/0.5)" }}>
                    <Phone className="w-3.5 h-3.5 flex-shrink-0 transition-colors group-hover:text-primary" />
                    <span className="transition-colors group-hover:text-sand">+255 685 808332</span>
                  </a>
                  <a href="https://wa.me/255685808332" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-body group w-fit"
                    style={{ color: "hsl(var(--sand)/0.5)" }}>
                    <MessageCircle className="w-3.5 h-3.5 flex-shrink-0 transition-colors group-hover:text-primary" />
                    <span className="transition-colors group-hover:text-sand">WhatsApp us</span>
                  </a>
                </div>
                <div className="flex items-center gap-1.5 mt-4"
                  style={{ color: "hsl(var(--sand)/0.2)" }}>
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="text-xs font-body">Based in Arusha, Tanzania</span>
                </div>
              </div>

            </div>
          </aside>

          {/* ── Form panel (both mobile + desktop) ── */}
          <main ref={formRef}
            className="flex-1 flex flex-col
              px-4 py-6 sm:px-6 sm:py-8 lg:px-12 lg:py-12 xl:px-16 xl:py-14">

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={SLIDE_TRANSITION}
                  className="flex-1 flex items-center justify-center py-8">
                  <QuoteSuccess firstName={state.form.firstName} />
                </motion.div>
              ) : (
                <motion.div key="wizard" className="flex-1 flex flex-col w-full max-w-2xl mx-auto lg:mx-0">

                  {/* WizardProgress — desktop only; mobile uses the header bar */}
                  <div className="hidden lg:block mb-10">
                    <WizardProgress step={step} goTo={goTo} />
                  </div>

                  {/* Step content */}
                  <div className="flex-1">
                    <AnimatePresence mode="wait" custom={1}>
                      <motion.div key={step} custom={1}
                        variants={SLIDE_VARIANTS}
                        initial="enter" animate="center" exit="exit"
                        transition={SLIDE_TRANSITION}>
                        {renderStep()}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {submitError && (
                    <div className="mb-4 px-4 py-3 rounded-xl text-sm font-body"
                      style={{ background: "hsl(0 70% 50%/0.1)", color: "hsl(0 70% 65%)", border: "1px solid hsl(0 70% 50%/0.2)" }}>
                      {submitError}
                    </div>
                  )}
                  <WizardNav
                    step={step}
                    totalSteps={totalSteps}
                    onBack={back}
                    onNext={next}
                    onSubmit={handleSubmit}
                    canAdvance={canAdvance}
                    isSubmitting={isSubmitting}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

      </div>
    </PageLayout>
  );
};

export default QuotePage;