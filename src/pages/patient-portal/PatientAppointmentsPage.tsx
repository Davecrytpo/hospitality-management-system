import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  reason: string;
  notes: string;
  doctor: {
    first_name: string;
    last_name: string;
    specialization: string;
  };
}

export default function PatientAppointmentsPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
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
        .from("appointments")
        .select(`
          *,
          doctor:doctors(first_name, last_name, specialization)
        `)
        .eq("patient_id", patient.id)
        .order("appointment_date", { ascending: false });

      if (data) {
        setAppointments(data as any);
      }
    } catch (error) {
      console.error("Error loading appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.appointment_date) >= new Date() && apt.status !== "cancelled"
  );
  
  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.appointment_date) < new Date() || apt.status === "completed"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "scheduled":
        return "secondary";
      case "completed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

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
            <h1 className="text-2xl font-bold">My Appointments</h1>
            <p className="text-muted-foreground">View and manage your appointments</p>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingAppointments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No upcoming appointments</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <Card key={apt.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold">
                                Dr. {apt.doctor?.first_name} {apt.doctor?.last_name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {apt.doctor?.specialization}
                              </p>
                            </div>
                            <Badge variant={getStatusColor(apt.status)}>
                              {apt.status}
                            </Badge>
                          </div>
                          <div className="mt-4 flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{format(new Date(apt.appointment_date), "MMMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{apt.appointment_time}</span>
                            </div>
                          </div>
                          {apt.reason && (
                            <p className="mt-3 text-sm text-muted-foreground">
                              <strong>Reason:</strong> {apt.reason}
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

          <TabsContent value="past">
            {pastAppointments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No past appointments</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pastAppointments.map((apt) => (
                  <Card key={apt.id} className="opacity-80">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold">
                                Dr. {apt.doctor?.first_name} {apt.doctor?.last_name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {apt.doctor?.specialization}
                              </p>
                            </div>
                            <Badge variant={getStatusColor(apt.status)}>
                              {apt.status}
                            </Badge>
                          </div>
                          <div className="mt-4 flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{format(new Date(apt.appointment_date), "MMMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{apt.appointment_time}</span>
                            </div>
                          </div>
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
