import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, FileText, Calendar, User, Lock } from "lucide-react";
import { format } from "date-fns";

interface MedicalRecord {
  id: string;
  record_type: string;
  title: string;
  description?: string | null;
  diagnosis?: string | null;
  treatment?: string | null;
  record_date: string;
  is_confidential?: boolean | null;
  doctor?: {
    first_name?: string | null;
    last_name?: string | null;
    specialization?: string | null;
  } | null;
}

export default function PatientRecordsPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecords = useCallback(async () => {
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
        .from("medical_records")
        .select(`
          *,
          doctor:doctors(first_name, last_name, specialization)
        `)
        .eq("patient_id", patient.id)
        .order("record_date", { ascending: false });

      if (data) {
        setRecords(data as MedicalRecord[]);
      }
    } catch (error) {
      console.error("Error loading records:", error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case "diagnosis":
        return "bg-red-500/10 text-red-500";
      case "lab_result":
        return "bg-blue-500/10 text-blue-500";
      case "imaging":
        return "bg-purple-500/10 text-purple-500";
      case "procedure":
        return "bg-orange-500/10 text-orange-500";
      case "consultation":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
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
            <h1 className="text-2xl font-bold">Medical Records</h1>
            <p className="text-muted-foreground">Your complete medical history</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <p>
                Your medical records are encrypted and securely stored. Only you and authorized healthcare providers can access this information.
              </p>
            </div>
          </CardContent>
        </Card>

        {records.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No medical records found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <Card key={record.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${getRecordTypeColor(record.record_type)}`}>
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">{record.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="capitalize">
                              {record.record_type.replace("_", " ")}
                            </Badge>
                            {record.is_confidential && (
                              <Badge variant="secondary">
                                <Lock className="h-3 w-3 mr-1" />
                                Confidential
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(record.record_date), "MMM d, yyyy")}
                        </span>
                      </div>

                      {record.doctor && (
                        <p className="mt-2 text-sm text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Dr. {record.doctor.first_name} {record.doctor.last_name} ({record.doctor.specialization})
                        </p>
                      )}

                      {record.description && (
                        <p className="mt-3 text-sm">{record.description}</p>
                      )}

                      {record.diagnosis && (
                        <div className="mt-3 p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium mb-1">Diagnosis</p>
                          <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                        </div>
                      )}

                      {record.treatment && (
                        <div className="mt-3 p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium mb-1">Treatment</p>
                          <p className="text-sm text-muted-foreground">{record.treatment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
