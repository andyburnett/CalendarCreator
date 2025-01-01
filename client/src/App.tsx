import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateCalendarFile } from "./lib/calendar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TutorialOverlay } from "@/components/TutorialOverlay";

function App() {
  const today = new Date().toISOString().split('T')[0];
  const defaultTime = "09:00"; // Default to 9 AM
  const [step, setStep] = useState(0);

  // Track form values in state
  const [formData, setFormData] = useState({
    startDate: today,
    startTime: defaultTime,
    frequency: "daily"
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    generateCalendarFile(dateTime, formData.frequency);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent handling if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (step < 2) {
            setStep(step + 1);
          } else {
            const form = document.querySelector('form');
            if (form) form.requestSubmit();
          }
        }
        return;
      }

      switch (e.key) {
        case 'Escape':
          if (step > 0) {
            e.preventDefault();
            setStep(step - 1);
          }
          break;
        case 'ArrowRight':
          if (step < 2) {
            e.preventDefault();
            setStep(step + 1);
          }
          break;
        case 'ArrowLeft':
          if (step > 0) {
            e.preventDefault();
            setStep(step - 1);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  const formSections = [
    {
      component: (
        <motion.div
          key="date-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          <Label 
            htmlFor="start-date" 
            className="text-sm sm:text-base font-medium"
          >
            When would you like to start the class?
          </Label>
          <Input
            type="date"
            id="start-date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            min={today}
            required
            className="w-full p-2 sm:p-3"
          />
          <div className="flex justify-end mt-4">
            <Button 
              type="button"
              onClick={() => setStep(1)}
              className="px-6"
            >
              Next
            </Button>
          </div>
        </motion.div>
      )
    },
    {
      component: (
        <motion.div
          key="time-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          <Label 
            htmlFor="start-time" 
            className="text-sm sm:text-base font-medium"
          >
            Typically, what time of day works best for you?
          </Label>
          <Input
            type="time"
            id="start-time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
            className="w-full p-2 sm:p-3"
          />
          <div className="flex justify-between mt-4">
            <Button 
              type="button"
              onClick={() => setStep(0)}
              variant="outline"
              className="px-6"
            >
              Back
            </Button>
            <Button 
              type="button"
              onClick={() => setStep(2)}
              className="px-6"
            >
              Next
            </Button>
          </div>
        </motion.div>
      )
    },
    {
      component: (
        <motion.div
          key="frequency-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          <Label className="text-sm sm:text-base font-medium">
            How often would you like to schedule your class?
          </Label>
          <Select 
            name="frequency" 
            value={formData.frequency}
            onValueChange={(value) => setFormData({ ...formData, frequency: value })}
          >
            <SelectTrigger className="w-full p-2 sm:p-3">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="two-days">Every two days</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-between mt-4">
            <Button 
              type="button"
              onClick={() => setStep(1)}
              variant="outline"
              className="px-6"
            >
              Back
            </Button>
            <Button 
              type="submit"
              onClick={handleSubmit}
              className="px-6"
            >
              Create Calendar File
            </Button>
          </div>
        </motion.div>
      )
    }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <TutorialOverlay />
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2 text-center sm:text-left">
          <CardTitle className="text-xl sm:text-2xl font-bold">Create Your Learning Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {formSections[step].component}
            </AnimatePresence>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;