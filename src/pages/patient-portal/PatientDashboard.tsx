import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  Calendar, 
  Pill, 
  FileText, 
  User, 
  LogOut, 
  Heart,
  Clock,
  Activity,
  Bell
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface PatientInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  bloodType?: string;
}

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status?: string | null;
  reason?: string | null;
  doctor?: {
    first_name?: string | null;
    last_name?: string | null;
    specialization?: string | null;
  } | null;
}

interface Prescription {
  id: string;
  medication_name: string;
  dosage?: string | null;
  frequency?: string | null;
  status?: string | null;
  start_date: string;
  end_date?: string | null;
}

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const checkAuthAndLoadData = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/patient-portal/login");
        return;
      }

      // Get patient info
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (!profile || profile.role !== "patient") {
        toast.error("Access denied. This portal is for patients only.");
        await supabase.auth.signOut();
        navigate("/patient-portal/login");
        return;
      }

      const { data: patient } = await supabase
        .from("patients")
        .select("*")
        .eq("profile_id", profile.id)
        .single();

      if (patient) {
        setPatientInfo({
          id: patient.id,
          firstName: patient.first_name,
          lastName: patient.last_name,
          email: patient.email || profile.email,
          dateOfBirth: patient.date_of_birth,
          bloodType: patient.blood_type || undefined,
        });

        // Load appointments
        const { data: appointmentsData } = await supabase
          .from("appointments")
          .select(`
            *,
            doctor:doctors(first_name, last_name, specialization)
          `)
          .eq("patient_id", patient.id)
          .gte("appointment_date", new Date().toISOString().split("T")[0])
          .order("appointment_date", { ascending: true })
          .limit(5);

        if (appointmentsData) {
          setAppointments(appointmentsData as Appointment[]);
        }

        // Load prescriptions
        const { data: prescriptionsData } = await supabase
          .from("prescriptions")
          .select("*")
          .eq("patient_id", patient.id)
          .eq("status", "active")
          .order("start_date", { ascending: false })
          .limit(5);

        if (prescriptionsData) {
          setPrescriptions(prescriptionsData);
        }
      }
    } catch (error) {
      console.error("Error loading patient data:", error);
      toast.error("Failed to load your data");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuthAndLoadData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/patient-portal/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAuthAndLoadData, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/patient-portal/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 medical-grid opacity-20" />
        <div className="ambient-orb -top-24 -right-24 h-72 w-72" />
        <div className="relative container mx-auto px-4 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/60 font-semibold">Patient Portal</p>
              <h1 className="font-display text-2xl font-bold">Welcome, {patientInfo?.firstName}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white hover:bg-white/10">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 -mt-6 relative z-10">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { icon: Calendar, label: "Upcoming Appointments", value: appointments.length, color: "text-accent", bg: "bg-accent/10" },
            { icon: Pill, label: "Active Prescriptions", value: prescriptions.length, color: "text-medical-success", bg: "bg-medical-success/10" },
            { icon: Activity, label: "Blood Type", value: patientInfo?.bloodType || "N/A", color: "text-primary", bg: "bg-primary/10" },
            { icon: FileText, label: "Medical Records", value: "View", color: "text-medical-warning", bg: "bg-medical-warning/10" },
          ].map((s) => (
            <Card key={s.label} className="card-hover border-border/60 shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`h-6 w-6 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled visits</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/patient-portal/appointments">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No upcoming appointments
                </p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Dr. {apt.doctor?.first_name} {apt.doctor?.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {apt.doctor?.specialization}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {format(new Date(apt.appointment_date), "MMM d, yyyy")}
                        </p>
                        <p className="text-sm text-muted-foreground">{apt.appointment_time}</p>
                      </div>
                      <Badge variant={apt.status === "confirmed" ? "default" : "secondary"}>
                        {apt.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Prescriptions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Prescriptions</CardTitle>
                  <CardDescription>Your current medications</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/patient-portal/prescriptions">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {prescriptions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No active prescriptions
                </p>
              ) : (
                <div className="space-y-4">
                  {prescriptions.map((rx) => (
                    <div key={rx.id} className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-medical-success/10 flex items-center justify-center">
                        <Pill className="h-5 w-5 text-medical-success" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{rx.medication_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {rx.dosage} - {rx.frequency}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-medical-success border-medical-success">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access your health information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-24 flex-col gap-2" asChild>
                  <Link to="/patient-portal/appointments">
                    <Calendar className="h-6 w-6" />
                    <span>My Appointments</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2" asChild>
                  <Link to="/patient-portal/prescriptions">
                    <Pill className="h-6 w-6" />
                    <span>My Prescriptions</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2" asChild>
                  <Link to="/patient-portal/records">
                    <FileText className="h-6 w-6" />
                    <span>Medical Records</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2" asChild>
                  <Link to="/patient-portal/profile">
                    <User className="h-6 w-6" />
                    <span>My Profile</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
