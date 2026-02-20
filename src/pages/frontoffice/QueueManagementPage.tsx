import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, Users, Clock, ArrowRight } from "lucide-react";

export default function QueueManagementPage() {
  const [currentlyServing, setCurrentlyServing] = useState<Record<string, string>>({ "OPD": "Q012", "Lab": "Q003", "Pharmacy": "Q007", "Billing": "Q005" });
  const [queue] = useState([
    { ticket: "Q013", name: "Adaeze Obi", dept: "OPD", time: "09:45 AM" },
    { ticket: "Q014", name: "Emeka Johnson", dept: "OPD", time: "09:47 AM" },
    { ticket: "Q008", name: "Fatima Al-Hassan", dept: "Pharmacy", time: "09:48 AM" },
    { ticket: "Q004", name: "Chidi Nwosu", dept: "Lab", time: "09:50 AM" },
    { ticket: "Q015", name: "Ngozi Eze", dept: "OPD", time: "09:52 AM" },
  ]);

  const callNext = (dept: string) => {
    const next = queue.find(q => q.dept === dept);
    if (next) setCurrentlyServing(prev => ({ ...prev, [dept]: next.ticket }));
  };

  const depts = Object.keys(currentlyServing);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Monitor className="h-6 w-6 text-primary" /> Queue Management System</h1>
          <p className="text-muted-foreground">Control the display screens in waiting areas</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {depts.map(dept => (
            <Card key={dept} className="text-center">
              <CardHeader><CardTitle className="text-lg">{dept}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="text-4xl font-bold text-primary">{currentlyServing[dept]}</div>
                <Badge variant="secondary">Now Serving</Badge>
                <Button className="w-full" size="sm" onClick={() => callNext(dept)}><ArrowRight className="mr-1 h-4 w-4" /> Call Next</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Waiting Queue</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {queue.map((q, i) => (
                <div key={q.ticket} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{i + 1}</div>
                    <div>
                      <p className="font-medium">{q.name}</p>
                      <p className="text-sm text-muted-foreground">{q.ticket} • {q.dept} • {q.time}</p>
                    </div>
                  </div>
                  <Badge>{q.dept}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
