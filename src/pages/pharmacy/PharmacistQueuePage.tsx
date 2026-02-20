import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pill, Search, Filter, Clock, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PharmacistQueuePage() {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQueue();

    // Set up REALTIME subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prescriptions'
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchQueue();
          toast.info("Queue updated with new prescription!");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchQueue = async () => {
    try {
      const { data, error } = await supabase
        .from("prescriptions")
        .select("*, patients(first_name, last_name), doctors(first_name, last_name)")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPrescriptions(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dispensing Queue</h1>
            <p className="text-muted-foreground font-medium flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-medical-success"></span>
              </span>
              Real-time feed from Consultation Rooms
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="h-8 px-3">Active: {prescriptions.length}</Badge>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Incoming Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-24"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptions.map((rx) => (
                  <TableRow key={rx.id} className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <TableCell className="text-xs font-mono">
                      {new Date(rx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                    <TableCell className="font-bold">
                      {rx.patients?.first_name} {rx.patients?.last_name}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <span className="font-medium">{rx.medication}</span>
                        <p className="text-[10px] text-muted-foreground">{rx.dosage} • {rx.duration}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      Dr. {rx.doctors?.first_name}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-medical-warning/20 text-medical-warning hover:bg-medical-warning/20 border-none">
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" className="gap-2 text-medical-primary" onClick={() => navigate("/pharmacy/dispense")}>
                        Process <ArrowRight className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {prescriptions.length === 0 && !isLoading && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-20">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Pill className="h-10 w-10 opacity-20" />
                        <p>No active prescriptions in the queue</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-20">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
