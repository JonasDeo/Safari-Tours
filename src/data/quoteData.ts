import { WizardStep, TripTypeOption, AccommodationOption, QuoteFormFields } from "@/components/quote/Quote";
import {
  Binoculars,
  Mountain,
  Waves,
  Car,
  Landmark,
  HandHeart,
  Wind,
  Sunset,
  Footprints,
  Bird,
  Anchor,
  Heart,
  Cake,
  Users,
  Gem,
  Sparkles,
  CircleEllipsis,
} from "lucide-react";



export const WIZARD_STEPS: WizardStep[] = [
  { id: "tripType",      label: "Trip",         headline: "What kind of adventure?",      sub: "Choose everything that calls to you."                  },
  { id: "destinations",  label: "Where",        headline: "Where do you want to go?",     sub: "Pick one destination or build a route."                },
  { id: "experiences",   label: "Experiences",  headline: "What are you dreaming of?",    sub: "The moments you'll talk about for years."              },
  { id: "occasion",      label: "Occasion",     headline: "Is this a special occasion?",  sub: "We'll make it unforgettable."                          },
  { id: "accommodation", label: "Stay",         headline: "How do you like to sleep?",    sub: "From canvas under stars to luxury lodges."             },
  { id: "groupDate",     label: "Group & Date", headline: "Who's coming, and when?",      sub: "We'll plan everything around your group."              },
  { id: "contact",       label: "You",          headline: "How do we reach you?",         sub: "Your details stay private. No spam, ever."             },
  { id: "message",       label: "Finish",       headline: "Any final wishes?",            sub: "This is your journey — shape it exactly as you want." },
];

export const TRIP_TYPES: TripTypeOption[] = [
  { id: "safari",    label: "Safari",           icon: Binoculars },
  { id: "mountain",  label: "Mountain Trek",    icon: Mountain   },
  { id: "beach",     label: "Beach Holiday",    icon: Waves      },
  { id: "selfDrive", label: "Self-Drive Safari",icon: Car        },
  { id: "cultural",  label: "Cultural Tours",   icon: Landmark   },
  { id: "volunteer", label: "Volunteering",     icon: HandHeart  },
];

export const DESTINATIONS: string[] = [
  "Serengeti",
  "Ngorongoro",
  "Tarangire",
  "Lake Manyara",
  "Lake Natron",
  "Lake Eyasi",
  "Arusha National Park",
  "Mount Kilimanjaro",
  "Mount Meru",
  "Day Trip Moshi",
  "Day Trip Arusha",
];

export const EXPERIENCES: string[] = [
  "Calving Season",
  "Balloon Safari",
  "Walking Safari",
  "Serengeti Migration",
  "Mara River Crossing",
];

export const OCCASIONS: string[] = [
  "Anniversary",
  "Birthday",
  "Family Holiday",
  "Honeymoon",
  "Marriage Proposal",
  "Wedding",
  "Other",
];

export const ACCOMMODATION: AccommodationOption[] = [
  { id: "camping",     label: "Camping",                 sub: "$160–$200 pp/night"  },
  { id: "midTented",   label: "Mid-Luxury Tented Camps", sub: "$280–$400 pp/night"  },
  { id: "highTented",  label: "High-End Tented Camps",   sub: "Above $400 pp/night" },
  { id: "budgetLodge", label: "Budget Lodges",           sub: "$160–$200 pp/night"  },
  { id: "midLodge",    label: "Mid-Luxury Lodges",       sub: "$280–$400 pp/night"  },
  { id: "highLodge",   label: "High-End Lodges",         sub: "Above $400 pp/night" },
  { id: "mix",         label: "Mix of the Above",        sub: "Flexible"            },
];

export const INITIAL_FORM_STATE: QuoteFormFields = {
  adults:      "2",
  children:    "0",
  firstName:   "",
  lastName:    "",
  country:     "",
  email:       "",
  phone:       "",
  message:     "",
  arrivalDate: "",
};