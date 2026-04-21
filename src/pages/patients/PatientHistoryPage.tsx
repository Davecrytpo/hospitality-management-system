import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Stethoscope, Pill, FlaskConical, FileText, Calendar } from "lucide-react";

const mockHistory = [
  { id: 1, date: "2024-01-15", type: "Consultation", doctor: "Dr. Smith", description: "General checkup", icon: Stethoscope },
  { id: 2, date: "2024-01-10", type: "Lab Test", doctor: "Lab Tech", description: "Blood work results normal", icon: FlaskConical },
  { id: 3, date: "2024-01-05", type: "Prescription", doctor: "Dr. Johnson", description: "Antibiotics for infection", icon: Pill },
  { id: 4, date: "2023-12-20", type: "Report", doctor: "Dr. Davis", description: "X-Ray results reviewed", icon: FileText },
  { id: 5, date: "2023-12-15", type: "Appointment", doctor: "Dr. Smith", description: "Follow-up scheduled", icon: Calendar },
];

export default function PatientHistoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Patient History</h1>
          <p className="text-muted-foreground">View complete medical history timeline</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Select Patient</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by patient ID or name..." className="pl-8 w-80" />
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-4">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              {mockHistory.map((item) => (
                <div key={item.id} className="relative flex gap-4 pl-10">
                  <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-medical-primary/10 text-medical-primary">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline">{item.type}</Badge>
                          <h4 className="mt-2 font-semibold">{item.description}</h4>
                          <p className="text-sm text-muted-foreground">{item.doctor}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
