import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateCalendarFile } from "./lib/calendar";

function App() {
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const startDate = (form.querySelector('#start-date') as HTMLInputElement).value;
    const frequency = (form.querySelector('[name="frequency"]') as HTMLSelectElement).value;
    
    generateCalendarFile(new Date(startDate), frequency);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create a Calendar File</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="start-date">When would you like to start learning</Label>
              <Input
                type="date"
                id="start-date"
                defaultValue={today}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select name="frequency" defaultValue="daily">
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="two-days">Every two days</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Create Calendar File
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
