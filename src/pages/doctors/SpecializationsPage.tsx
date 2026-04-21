import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Baby, Bone, Stethoscope, Eye, Pill } from "lucide-react";

const specializations = [
  { name: "Cardiology", icon: Heart, doctors: 8, color: "text-red-500" },
  { name: "Neurology", icon: Brain, doctors: 5, color: "text-purple-500" },
  { name: "Pediatrics", icon: Baby, doctors: 10, color: "text-pink-500" },
  { name: "Orthopedics", icon: Bone, doctors: 6, color: "text-orange-500" },
  { name: "General Medicine", icon: Stethoscope, doctors: 12, color: "text-blue-500" },
  { name: "Ophthalmology", icon: Eye, doctors: 4, color: "text-cyan-500" },
  { name: "Pharmacy", icon: Pill, doctors: 3, color: "text-green-500" },
];

export default function SpecializationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Specializations</h1>
          <p className="text-muted-foreground">Medical departments and their specialists</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {specializations.map((spec) => (
            <Card key={spec.name} className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg bg-muted p-3 ${spec.color}`}>
                    <spec.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{spec.name}</h3>
                    <p className="text-sm text-muted-foreground">{spec.doctors} doctors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
