import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MonitorCheck, Search, UserPlus, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ReceptionDeskPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("patients").select("id, first_name, last_name, phone, email, gender").order("created_at", { ascending: false }).limit(20)
      .then(({ data }) => { setPatients(data || []); setLoading(false); });
  }, []);

  const addToQueue = (patient: any) => {
    if (queue.find(q => q.id === patient.id)) return toast({ title: "Patient already in queue" });
    setQueue(prev => [...prev, { ...patient, time: new Date().toLocaleTimeString(), ticket: `Q${String(prev.length + 1).padStart(3, "0")}` }]);
    toast({ title: `${patient.first_name} added to queue` });
  };

  const filtered = patients.filter(p => `${p.first_name} ${p.last_name} ${p.phone}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><MonitorCheck className="h-6 w-6 text-primary" /> Reception Desk</h1>
            <p className="text-muted-foreground">High-speed check-in for walk-in patients</p>
          </div>
          <Button asChild><Link to="/patients/register"><UserPlus className="mr-2 h-4 w-4" /> Register New Patient</Link></Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Patient Search & Check-in</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="max-h-80 overflow-y-auto space-y-2">
                {loading ? <p className="text-center text-muted-foreground py-4">Loading...</p>
                  : filtered.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{p.first_name} {p.last_name}</p>
                        <p className="text-sm text-muted-foreground">{p.phone || "No phone"}</p>
                      </div>
                      <Button size="sm" onClick={() => addToQueue(p)}>Check In</Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Current Queue ({queue.length})</CardTitle></CardHeader>
            <CardContent>
              {queue.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Queue is empty</p>
              ) : (
                <div className="space-y-2">
                  {queue.map((q, i) => (
                    <div key={q.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">{i + 1}</div>
                        <div>
                          <p className="font-medium">{q.first_name} {q.last_name}</p>
                          <p className="text-sm text-muted-foreground">{q.ticket} • {q.time}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setQueue(prev => prev.filter(item => item.id !== q.id))}>Call</Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
