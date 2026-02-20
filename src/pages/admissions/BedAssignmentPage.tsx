import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Bed, Users, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function BedAssignmentPage() {
  const navigate = useNavigate();
  const [selectedWard, setSelectedWard] = useState("general-a");

  const wards = [
    { id: "general-a", name: "General Ward A", total: 20, occupied: 18, type: "General" },
    { id: "icu-1", name: "ICU - 1", total: 10, occupied: 4, type: "Critical" },
    { id: "maternity", name: "Maternity Ward", total: 15, occupied: 12, type: "Specialized" },
    { id: "pediatrics", name: "Pediatrics Ward", total: 12, occupied: 10, type: "Specialized" }
  ];

  const beds = Array.from({ length: 10 }, (_, i) => ({
    id: `B-${i + 101}`,
    status: i % 3 === 0 ? "available" : "occupied",
    patient: i % 3 === 0 ? null : "Patient " + (i + 100)
  }));

  const handleAssign = (bedId: string) => {
    toast.success(`Patient assigned to ${bedId}`);
    navigate("/admissions");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/admissions"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Bed Assignment</h1>
              <p className="text-muted-foreground">Manage real-time bed occupancy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Pending Admissions: <Badge variant="destructive" className="ml-1">4</Badge></span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Select Ward</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {wards.map((ward) => (
                <button
                  key={ward.id}
                  onClick={() => setSelectedWard(ward.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedWard === ward.id 
                      ? "border-medical-primary bg-medical-primary/5 ring-1 ring-medical-primary" 
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm">{ward.name}</span>
                    <Badge variant="outline" className="text-[10px] h-4 uppercase">{ward.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-medical-primary" 
                        style={{ width: `${(ward.occupied / ward.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {ward.occupied}/{ward.total} Beds
                    </span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Ward Layout - {wards.find(w => w.id === selectedWard)?.name}</CardTitle>
                <CardDescription>Click on an available bed to assign the patient</CardDescription>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-medical-success/20 border border-medical-success/40"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-muted border border-border"></div>
                  <span>Occupied</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {beds.map((bed) => (
                  <button
                    key={bed.id}
                    disabled={bed.status === "occupied"}
                    onClick={() => handleAssign(bed.id)}
                    className={`group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                      bed.status === "available"
                        ? "border-medical-success/20 bg-medical-success/5 hover:border-medical-success hover:bg-medical-success/10 cursor-pointer"
                        : "bg-muted/50 border-muted opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <Bed className={`h-8 w-8 mb-2 ${bed.status === "available" ? "text-medical-success" : "text-muted-foreground"}`} />
                    <span className="font-bold text-sm">{bed.id}</span>
                    {bed.status === "occupied" && (
                      <span className="text-[10px] mt-1 text-muted-foreground truncate w-full text-center">
                        {bed.patient}
                      </span>
                    )}
                    {bed.status === "available" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-medical-primary text-white opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                        <span className="text-xs font-bold">Assign Patient</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
