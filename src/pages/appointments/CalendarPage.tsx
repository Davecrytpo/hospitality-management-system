import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 10 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);

const mockEvents = [
  { id: 1, day: 0, hour: 9, title: "John Smith", type: "Consultation", duration: 1 },
  { id: 2, day: 0, hour: 11, title: "Emily Davis", type: "Follow-up", duration: 1 },
  { id: 3, day: 1, hour: 10, title: "Robert Wilson", type: "Emergency", duration: 2 },
  { id: 4, day: 2, hour: 14, title: "Sarah Johnson", type: "Checkup", duration: 1 },
  { id: 5, day: 3, hour: 9, title: "Michael Brown", type: "Consultation", duration: 1 },
  { id: 6, day: 4, hour: 15, title: "Lisa Anderson", type: "Follow-up", duration: 1 },
];

const typeColors: Record<string, string> = {
  Consultation: "bg-medical-primary",
  "Follow-up": "bg-medical-secondary",
  Emergency: "bg-medical-danger",
  Checkup: "bg-medical-success",
};

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Calendar View</h1>
            <p className="text-muted-foreground">Weekly appointment calendar</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                <SelectItem value="d001">Dr. Sarah Johnson</SelectItem>
                <SelectItem value="d002">Dr. Michael Chen</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <Link to="/appointments/new">
                <Plus className="mr-2 h-4 w-4" />
                New
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>January 2024</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline">Today</Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              {Object.entries(typeColors).map(([type, color]) => (
                <Badge key={type} className={`${color} text-white`}>{type}</Badge>
              ))}
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="grid grid-cols-8 border-b">
                  <div className="p-2 text-center text-sm text-muted-foreground">Time</div>
                  {days.map((day, i) => (
                    <div key={day} className="p-2 text-center">
                      <div className="font-medium">{day}</div>
                      <div className="text-sm text-muted-foreground">{15 + i}</div>
                    </div>
                  ))}
                </div>

                <div className="relative">
                  {hours.map((hour, hourIndex) => (
                    <div key={hour} className="grid grid-cols-8 border-b" style={{ height: "60px" }}>
                      <div className="p-2 text-xs text-muted-foreground border-r">{hour}</div>
                      {days.map((_, dayIndex) => (
                        <div key={dayIndex} className="border-r relative" />
                      ))}
                    </div>
                  ))}

                  {mockEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`absolute rounded-md p-2 text-white text-xs cursor-pointer transition-opacity hover:opacity-90 ${typeColors[event.type]}`}
                      style={{
                        left: `calc(${(event.day + 1) * 12.5}% + 2px)`,
                        top: `${(event.hour - 8) * 60 + 4}px`,
                        width: "calc(12.5% - 6px)",
                        height: `${event.duration * 60 - 8}px`,
                      }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="truncate opacity-90">{event.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
