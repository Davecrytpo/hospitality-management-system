import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Pill, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface Prescription {
  id: string;
  medication_name: string;
  dosage?: string | null;
  frequency?: string | null;
  duration?: string | null;
  instructions?: string | null;
  start_date: string;
  end_date?: string | null;
  status?: string | null;
  refills_remaining?: number | null;
  doctor?: {
    first_name?: string | null;
    last_name?: string | null;
    specialization?: string | null;
  } | null;
}

export default function PatientPrescriptionsPage() {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPrescriptions = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/patient-portal/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (!profile) return;

      const { data: patient } = await supabase
        .from("patients")
        .select("id")
        .eq("profile_id", profile.id)
        .single();

      if (!patient) return;

      const { data } = await supabase
        .from("prescriptions")
        .select(`
          *,
          doctor:doctors(first_name, last_name, specialization)
        `)
        .eq("patient_id", patient.id)
        .order("start_date", { ascending: false });

      if (data) {
        setPrescriptions(data as Prescription[]);
      }
    } catch (error) {
      console.error("Error loading prescriptions:", error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadPrescriptions();
  }, [loadPrescriptions]);

  const activePrescriptions = prescriptions.filter((rx) => rx.status === "active");
  const completedPrescriptions = prescriptions.filter((rx) => rx.status !== "active");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link to="/patient-portal">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">My Prescriptions</h1>
            <p className="text-muted-foreground">View your medications and prescriptions</p>
          </div>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">
              Active ({activePrescriptions.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              History ({completedPrescriptions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activePrescriptions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No active prescriptions</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activePrescriptions.map((rx) => (
                  <Card key={rx.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                          <Pill className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-lg">{rx.medication_name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Prescribed by Dr. {rx.doctor?.first_name} {rx.doctor?.last_name}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Active
                            </Badge>
                          </div>
                          
                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Dosage</p>
                              <p className="text-sm text-muted-foreground">{rx.dosage}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Frequency</p>
                              <p className="text-sm text-muted-foreground">{rx.frequency}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Start Date</p>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(rx.start_date), "MMMM d, yyyy")}
                              </p>
                            </div>
                            {rx.end_date && (
                              <div className="space-y-1">
                                <p className="text-sm font-medium">End Date</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(rx.end_date), "MMMM d, yyyy")}
                                </p>
                              </div>
                            )}
                          </div>

                          {rx.instructions && (
                            <div className="mt-4 p-3 bg-muted rounded-lg">
                              <p className="text-sm font-medium mb-1">Instructions</p>
                              <p className="text-sm text-muted-foreground">{rx.instructions}</p>
                            </div>
                          )}

                          {rx.refills_remaining > 0 && (
                            <p className="mt-3 text-sm text-muted-foreground">
                              <strong>Refills remaining:</strong> {rx.refills_remaining}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedPrescriptions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No prescription history</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {completedPrescriptions.map((rx) => (
                  <Card key={rx.id} className="opacity-80">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <Pill className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold">{rx.medication_name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {rx.dosage} - {rx.frequency}
                              </p>
                            </div>
                            <Badge variant="secondary">{rx.status}</Badge>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {format(new Date(rx.start_date), "MMM d, yyyy")}
                            {rx.end_date && ` - ${format(new Date(rx.end_date), "MMM d, yyyy")}`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
