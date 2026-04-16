import { useRef, useEffect } from "react";
import PageLayout  from "@/components/PageLayout";
import { WIZARD_STEPS } from "@/data/quoteData"; 
import useQuoteWizard   from "@/hooks/use-quote-wizard";
import QuoteHero from "@/components/quote/QuoteHero";
import QuoteSidebar from "@/components/quote/QuoteSidebar";
import QuoteWizard from "@/components/quote/QuoteWizard";

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

  // Scroll on mobile only, skip first render
  useEffect(() => {
    if (isFirstRef.current) { isFirstRef.current = false; return; }
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop && mainRef.current) {
      const top = mainRef.current.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [step, submitted]);

  const currentStep = WIZARD_STEPS[step];

  return (
    <PageLayout>
      <div className="min-h-screen bg-background">

        <QuoteHero
          step={step}
          totalSteps={totalSteps}
          submitted={submitted}
          headline={currentStep.headline}
          sub={currentStep.sub}
        />

        <div className="flex flex-col lg:flex-row min-h-screen bg-background">
          <QuoteSidebar
            step={step}
            totalSteps={totalSteps}
            submitted={submitted}
            headline={currentStep.headline}
            sub={currentStep.sub}
          />
          <QuoteWizard
            mainRef={mainRef}
            step={step}
            totalSteps={totalSteps}
            submitted={submitted}
            state={state}
            canAdvance={canAdvance}
            errors={errors}
            showErrors={showErrors}
            goTo={goTo}
            back={back}
            next={next}
            handleSubmit={handleSubmit}
            setTripTypes={setTripTypes}
            setDestinations={setDestinations}
            setExperiences={setExperiences}
            setOccasions={setOccasions}
            setAccommodation={setAccommodation}
            setFormField={setFormField}
          />
        </div>

      </div>
    </PageLayout>
  );
};

export default QuotePage;