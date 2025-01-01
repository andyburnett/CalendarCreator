import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TutorialStep {
  title: string;
  description: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome! 👋",
    description: "Let's get you started with creating your learning schedule.",
    position: { top: "50%", left: "50%" },
  },
  {
    title: "Choose Your Start Date",
    description: "Pick a date when you'd like to begin your learning journey.",
    position: { top: "40%", left: "50%" },
  },
  {
    title: "Set Your Learning Time",
    description: "Select a time that fits your daily schedule best.",
    position: { top: "40%", left: "50%" },
  },
  {
    title: "Pick Your Pace",
    description: "Choose how often you want to schedule your learning sessions.",
    position: { top: "40%", left: "50%" },
  },
  {
    title: "You're All Set!",
    description: "Click 'Create Calendar File' to download your personalized schedule.",
    position: { bottom: "20%", right: "20%" },
  },
];

export function TutorialOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            style={tutorialSteps[currentStep].position}
            className="absolute"
          >
            <Card className="w-[300px] shadow-lg">
              <CardContent className="pt-6">
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
                <h3 className="text-lg font-semibold mb-2">
                  {tutorialSteps[currentStep].title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {tutorialSteps[currentStep].description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {tutorialSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentStep
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Button onClick={handleNext}>
                    {currentStep === tutorialSteps.length - 1 ? "Got it!" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
