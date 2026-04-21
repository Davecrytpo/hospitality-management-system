import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

const mockSchedule = {
  "Monday": { "09:00": "Available", "10:00": "Booked", "11:00": "Available", "14:00": "Booked", "15:00": "Available" },
  "Tuesday": { "09:00": "Booked", "10:00": "Available", "11:00": "Booked", "14:00": "Available", "16:00": "Booked" },
  "Wednesday": { "09:00": "Available", "10:00": "Available", "14:00": "Booked", "15:00": "Available" },
  "Thursday": { "10:00": "Booked", "11:00": "Available", "14:00": "Available", "16:00": "Booked" },
  "Friday": { "09:00": "Available", "10:00": "Booked", "11:00": "Booked", "14:00": "Available" },
};

export default function DoctorSchedulesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Doctor Schedules</h1>
            <p className="text-muted-foreground">View and manage doctor availability</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                <SelectItem value="d001">Dr. Sarah Johnson</SelectItem>
                <SelectItem value="d002">Dr. Michael Chen</SelectItem>
                <SelectItem value="d003">Dr. Emily Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Schedule</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">Jan 15 - Jan 19, 2024</span>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-6 gap-2">
                  <div className="p-2 font-medium text-muted-foreground">
                    <Clock className="h-4 w-4" />
                  </div>
                  {days.map((day) => (
                    <div key={day} className="p-2 text-center font-medium">{day}</div>
                  ))}
                </div>
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-6 gap-2 border-t py-2">
                    <div className="p-2 text-sm text-muted-foreground">{time}</div>
                    {days.map((day) => {
                      const status = mockSchedule[day as keyof typeof mockSchedule]?.[time as keyof typeof mockSchedule["Monday"]];
                      return (
                        <div key={`${day}-${time}`} className="p-1">
                          {status && (
                            <Badge
                              variant={status === "Available" ? "default" : "secondary"}
                              className="w-full justify-center"
                            >
                              {status}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
