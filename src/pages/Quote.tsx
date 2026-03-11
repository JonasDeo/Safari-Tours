import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";

import heroImg    from "@/assets/tour-1.jpg";
import safariImg  from "@/assets/safari-landscape.jpg";
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

const QuotePage = () => {
  const {
    step, totalSteps, next, back, goTo,
    submitted, handleSubmit,
    state,
    setTripTypes, setDestinations, setExperiences,
    setOccasions, setAccommodation, setFormField,
    canAdvance, errors, showErrors,
  } = useQuoteWizard();

  const mainRef    = useRef<HTMLDivElement>(null);
  const isFirstRef = useRef(true);

  // Only scroll on mobile, and only after the first render,
  // so clicking Next doesn't yank the page down on every step.
  useEffect(() => {
    if (isFirstRef.current) { isFirstRef.current = false; return; }
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop && mainRef.current) {
      // Scroll just enough to keep the form top in view, not to the very bottom.
      const top = mainRef.current.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top, behavior: "smooth" });
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

        {/* ── Hero ── */}
        <section className="relative overflow-hidden"
          style={{
            height: "clamp(220px, 40vh, 380px)",
            paddingTop: "var(--nav-total-h, 64px)",
          }}>

          <img src={heroImg} alt="Safari landscape"
            className="absolute inset-0 w-full h-full object-cover object-[center_40%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="absolute top-0 inset-x-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)/0.15))" }} />

          {/* Desktop: centred title */}
          <div className="hidden sm:flex absolute inset-0 items-end justify-center pb-10 z-10">
            <div className="text-center px-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "hsl(var(--sand)/0.97)" }}>
                Request a Quote
              </h1>
              <p className="font-body text-sm md:text-base"
                style={{ color: "hsl(var(--sand)/0.5)" }}>
                Tell us your dream — we'll craft your perfect African safari
              </p>
            </div>
          </div>

          {/* Mobile: left-aligned, step headline overlaid on photo */}
          <div className="sm:hidden absolute inset-0 flex flex-col justify-end px-5 pb-0 z-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="done" className="pb-5"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-body mb-1"
                    style={{ color: "hsl(var(--primary))" }}>All done</p>
                  <p className="font-display text-2xl" style={{ color: "hsl(var(--sand)/0.95)" }}>
                    Your safari journey<br />starts here.
                  </p>
                </motion.div>
              ) : (
                <motion.div key={step}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}>

                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full
                      text-[11px] font-bold font-body flex-shrink-0"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--dark))",
                        boxShadow: "0 0 10px hsl(var(--primary)/0.5)",
                      }}>
                      {step + 1}
                    </span>
                    <span className="text-[10px] tracking-[0.18em] uppercase font-body"
                      style={{ color: "hsl(var(--primary)/0.8)" }}>
                      of {totalSteps} steps
                    </span>
                  </div>

                  <h2 className="font-display text-2xl leading-tight mb-1"
                    style={{ color: "hsl(var(--sand)/0.96)" }}>
                    {currentStep.headline}
                  </h2>
                  <p className="font-body text-[12px] mb-0"
                    style={{ color: "hsl(var(--sand)/0.42)" }}>
                    {currentStep.sub}
                  </p>

                  <div className="mt-4 h-[2px] rounded-full overflow-hidden"
                    style={{
                      width: "calc(100% + 2.5rem)",
                      marginLeft: "-1.25rem",
                      background: "hsl(var(--sand)/0.1)",
                    }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)/0.4))" }}
                      initial={false}
                      animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── Wizard ── */}
        <div className="flex flex-col lg:flex-row min-h-screen bg-background">

          {/* Left panel — desktop only */}
          <aside
            className={[
              "hidden lg:flex flex-col",
              "relative w-full lg:w-[36%] xl:w-[32%] overflow-hidden",
              submitted ? "" : "lg:sticky lg:top-[var(--nav-total-h,64px)] lg:h-[calc(100vh-var(--nav-total-h,64px))]",
            ].join(" ")}
          >
            <div className="absolute inset-0 z-0">
              <img src={safariImg} alt="" aria-hidden
                className="w-full h-full object-cover object-center"
                style={{ filter: "brightness(0.28) saturate(0.7)" }} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-0" style={{ background: "hsl(var(--primary)/0.05)" }} />
            </div>
            <div className="absolute top-0 inset-x-0 h-[2px] z-10"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--primary)/0.2))" }} />
            <div className="absolute inset-y-0 left-0 w-[2px] z-10"
              style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary)/0.06) 80%, transparent)" }} />

            <div className="relative z-10 flex flex-col justify-between h-full
              px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">

              {/* Step info */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="done"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}>
                      <p className="text-xs tracking-[0.25em] uppercase font-body mb-3"
                        style={{ color: "hsl(var(--primary))" }}>All done</p>
                      <p className="font-display text-xl sm:text-2xl text-sand/90 leading-snug">
                        Your safari journey<br />starts here.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key={step}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
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

                      <h2 className="font-display text-xl sm:text-2xl lg:text-[1.85rem]
                        text-sand leading-tight mb-3">
                        {currentStep.headline}
                      </h2>

                      <p className="font-body text-sm leading-relaxed"
                        style={{ color: "hsl(var(--sand)/0.48)", maxWidth: "22rem" }}>
                        {currentStep.sub}
                      </p>

                      {/* Progress */}
                      <div className="mt-7 lg:mt-9">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-body" style={{ color: "hsl(var(--sand)/0.3)" }}>
                            Progress
                          </span>
                          <span className="text-xs font-body" style={{ color: "hsl(var(--primary)/0.8)" }}>
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

              {/* Contact footer */}
              <div className="pt-5" style={{ borderTop: "1px solid hsl(var(--sand)/0.08)" }}>
                <p className="text-xs font-body mb-3" style={{ color: "hsl(var(--sand)/0.28)" }}>
                  Need help planning?
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-2.5">
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

          {/* Right panel */}
          <main ref={mainRef}
            className="flex-1 flex flex-col px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16 xl:py-14">

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={SLIDE_TRANSITION}
                  className="flex-1 flex items-center justify-center py-12">
                  <QuoteSuccess firstName={state.form.firstName} />
                </motion.div>
              ) : (
                <motion.div key="wizard" className="flex-1 flex flex-col w-full max-w-2xl mx-auto lg:mx-0">
                  <div className="mb-8 lg:mb-10">
                    <WizardProgress step={step} goTo={goTo} />
                  </div>
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
                  <WizardNav
                    step={step}
                    totalSteps={totalSteps}
                    onBack={back}
                    onNext={next}
                    onSubmit={handleSubmit}
                    canAdvance={canAdvance}
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