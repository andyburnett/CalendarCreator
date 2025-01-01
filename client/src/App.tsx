import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateCalendarFile } from "./lib/calendar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function App() {
  const today = new Date().toISOString().split('T')[0];
  const defaultTime = "09:00"; // Default to 9 AM
  const [step, setStep] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const startDate = (form.querySelector('#start-date') as HTMLInputElement).value;
    const startTime = (form.querySelector('#start-time') as HTMLInputElement).value;
    const frequency = (form.querySelector('[name="frequency"]') as HTMLSelectElement).value;

    // Combine date and time
    const dateTime = new Date(`${startDate}T${startTime}`);
    generateCalendarFile(dateTime, frequency);
  };

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
            defaultValue={today}
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
            defaultValue={defaultTime}
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
          <Select name="frequency" defaultValue="daily">
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