import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";



import heroImg from "@/assets/tour-1.jpg";
import StepAccommodation from "@/components/quote/steps/StepAccommodation";
import StepContact from "@/components/quote/steps/StepContact";
import StepDestinations from "@/components/quote/steps/StepDestinations";
import StepExperiences from "@/components/quote/steps/StepExperiences";
import StepGroupDate from "@/components/quote/steps/StepGroupDate";
import StepMessage from "@/components/quote/steps/StepMessage";
import StepOccasion from "@/components/quote/steps/StepOccasion";
import StepTripType from "@/components/quote/steps/StepTripType";
import QuoteSuccess from "@/components/QuoteSuccess";
import WizardNav from "@/components/WizardNav";
import WizardProgress from "@/components/WizardProgress";
import { WIZARD_STEPS } from "@/constants/QuoteData";
import useQuoteWizard from "@/hooks/use-quote-wizard";
import PageLayout from "@/components/PageLayout";

// ─── Animation ────────────────────────────────────────────────────────────────

const SLIDE_VARIANTS = {
  enter:  (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center:               ({ x: 0, opacity: 1 }),
  exit:   (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

const SLIDE_TRANSITION = { duration: 0.35, ease: [0.32, 0.72, 0, 1] as const };

// ─── Page ─────────────────────────────────────────────────────────────────────

const QuotePage = () => {
  const {
    step, totalSteps, next, back, goTo,
    submitted, handleSubmit,
    state,
    setTripTypes, setDestinations, setExperiences,
    setOccasions, setAccommodation, setFormField,
  } = useQuoteWizard();

  // On mobile: scroll the wizard section into view when step changes.
  // On desktop (lg+): the two panels are side-by-side and fully visible —
  // no scrolling needed or wanted.
  const wizardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop && wizardRef.current) {
      wizardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step, submitted]);

  const direction   = 1;
  const currentStep = WIZARD_STEPS[step];

  const renderStep = () => {
    switch (step) {
      case 0: return <StepTripType      selected={state.tripTypes}     onChange={setTripTypes}     />;
      case 1: return <StepDestinations  selected={state.destinations}  onChange={setDestinations}  />;
      case 2: return <StepExperiences   selected={state.experiences}   onChange={setExperiences}   />;
      case 3: return <StepOccasion      selected={state.occasions}     onChange={setOccasions}     />;
      case 4: return <StepAccommodation selected={state.accommodation} onChange={setAccommodation} />;
      case 5: return <StepGroupDate     form={state.form}              onFieldChange={setFormField}/>;
      case 6: return <StepContact       form={state.form}              onFieldChange={setFormField}/>;
      case 7: return (
        <StepMessage
          message={state.form.message}
          onChange={(v) => setFormField("message", v)}
          state={state}
        />
      );
      default: return null;
    }
  };

  return (
    <PageLayout>
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Safari landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-overlay/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sand mb-3 text-shadow-hero">
            Request a Quote
          </h1>
          <p className="font-body text-sand/70 text-lg">
            Tell us your dream — we'll craft your perfect African safari
          </p>
        </div>
      </section>

      {/* Wizard */}
      <div ref={wizardRef} className="flex flex-col lg:flex-row bg-background">

        {/* ── Left panel ───────────────────────────────────────────────
          Background: bg-muted gives the warm off-white/grey tint that
          your design system defines — it's subtly darker than bg-background
          without any dark overlay. Matches the light theme perfectly.
          sticky top accounts for your navbar height (adjust --navbar-h
          if your navbar is a different size).
        ─────────────────────────────────────────────────────────────── */}
        <aside
          className="
            w-full lg:w-[38%] xl:w-[34%]
            bg-muted
            border-b lg:border-b-0 lg:border-r border-border
            flex flex-col justify-between gap-8
            px-6 py-10 sm:px-10 lg:px-12 lg:py-14
            lg:sticky lg:top-[var(--navbar-h,64px)]
            lg:h-[calc(100vh-var(--navbar-h,64px))]
          "
        >
          {/* Step headline — animates on every step change */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.p
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs tracking-[0.2em] uppercase text-primary font-body"
                >
                  All done
                </motion.p>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-primary font-body mb-4">
                    Step {step + 1} of {totalSteps}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight mb-3">
                    {currentStep.headline}
                  </h2>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed max-w-xs">
                    {currentStep.sub}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact nudge — desktop only, pinned to bottom of panel */}
          <div className="hidden lg:block pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground font-body mb-2">Need help planning?</p>
            <a
              href="tel:+255685808332"
              className="text-sm text-foreground/60 hover:text-primary transition-colors duration-200"
            >
              +255 685 808332
            </a>
            <span className="mx-2 text-border">·</span>
            <a
              href="https://wa.me/255685808332"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-foreground/60 hover:text-primary transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>
        </aside>

        {/* Right panel */}
        <main className="flex-1 px-6 py-10 sm:px-10 lg:px-14 lg:py-14 min-h-[60vh]">

          {!submitted && (
            <div className="mb-8 lg:mb-12 max-w-2xl">
              <WizardProgress step={step} goTo={goTo} />
            </div>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={SLIDE_TRANSITION}
                className="flex items-center justify-center py-20"
              >
                <QuoteSuccess firstName={state.form.firstName} />
              </motion.div>
            ) : (
              <motion.div
                key={step}
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SLIDE_TRANSITION}
                className="max-w-2xl"
              >
                {renderStep()}
                <WizardNav
                  step={step}
                  totalSteps={totalSteps}
                  onBack={back}
                  onNext={next}
                  onSubmit={handleSubmit}
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