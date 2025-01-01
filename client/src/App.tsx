import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateCalendarFile } from "./lib/calendar";

function App() {
  const today = new Date().toISOString().split('T')[0];
  const defaultTime = "09:00"; // Default to 9 AM

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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2 text-center sm:text-left">
          <CardTitle className="text-xl sm:text-2xl font-bold">Create a Calendar File</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label 
                htmlFor="start-date" 
                className="text-sm sm:text-base font-medium"
              >
                When would you like to start learning
              </Label>
              <Input
                type="date"
                id="start-date"
                defaultValue={today}
                min={today}
                required
                className="w-full p-2 sm:p-3"
              />
            </div>

            <div className="space-y-3">
              <Label 
                htmlFor="start-time" 
                className="text-sm sm:text-base font-medium"
              >
                What time of day would you like to schedule your learning sessions
              </Label>
              <Input
                type="time"
                id="start-time"
                defaultValue={defaultTime}
                required
                className="w-full p-2 sm:p-3"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm sm:text-base font-medium">
                How often would you like to schedule your learning sessions?
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
            </div>

            <Button 
              type="submit" 
              className="w-full py-3 text-sm sm:text-base font-medium mt-6"
            >
              Create Calendar File
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;