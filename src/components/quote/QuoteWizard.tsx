import { AnimatePresence, motion } from "framer-motion";
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

const SLIDE_VARIANTS = {
  enter:  (dir: number) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -32 : 32, opacity: 0 }),
};
const SLIDE_TRANSITION = { duration: 0.32, ease: [0.32, 0.72, 0, 1] as const };

interface QuoteWizardProps {
  mainRef:    React.RefObject<HTMLDivElement>;
  step:       number;
  totalSteps: number;
  submitted:  boolean;
  state:      any;
  canAdvance: boolean;
  errors:     Record<string, string>;
  showErrors: boolean;
  goTo:       (i: number) => void;
  back:       () => void;
  next:       () => void;
  handleSubmit: () => void;
  setTripTypes:     (v: any) => void;
  setDestinations:  (v: any) => void;
  setExperiences:   (v: any) => void;
  setOccasions:     (v: any) => void;
  setAccommodation: (v: any) => void;
  setFormField:     (k: string, v: any) => void;
}

const QuoteWizard = ({
  mainRef, step, totalSteps, submitted, state,
  canAdvance, errors, showErrors,
  goTo, back, next, handleSubmit,
  setTripTypes, setDestinations, setExperiences,
  setOccasions, setAccommodation, setFormField,
}: QuoteWizardProps) => {

  const errs = showErrors ? errors : {};

  const renderStep = () => {
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
  );
};

export default QuoteWizard;