import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FlaskConical, Search, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type LabStatus = "ordered" | "collected" | "processing" | "completed";

type LabTestRow = {
  id: string;
  test_name?: string | null;
  test_type?: string | null;
  priority?: string | null;
  status?: LabStatus | null;
  patients?: {
    first_name?: string | null;
    last_name?: string | null;
  } | null;
};

export default function LabSampleTrackingPage() {
  const { toast } = useToast();
  const [tests, setTests] = useState<LabTestRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("lab_tests")
      .select("*, patients(first_name, last_name)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
        setTests((data as LabTestRow[]) || []);
        setLoading(false);
      });
  }, [toast]);

  const updateStatus = async (id: string, newStatus: LabStatus) => {
    const { error } = await supabase.from("lab_tests").update({ status: newStatus, sample_collected_at: newStatus === "collected" ? new Date().toISOString() : undefined }).eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setTests(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    toast({ title: `Sample status updated to "${newStatus}"` });
  };

  const statusFlow: Partial<Record<LabStatus, LabStatus>> = {
    ordered: "collected",
    collected: "processing",
    processing: "completed",
  };
  const statusColors: Record<LabStatus, BadgeProps["variant"]> = {
    ordered: "secondary",
    collected: "outline",
    processing: "secondary",
    completed: "default",
  };

  const filtered = tests.filter((t) =>
    `${t.patients?.first_name ?? ""} ${t.patients?.last_name ?? ""} ${t.test_name ?? ""}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><FlaskConical className="h-6 w-6 text-primary" /> Lab Sample Tracking</h1>
            <p className="text-muted-foreground">Monitor samples from pickup to machine results</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search by patient or test..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <Card>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Patient</TableHead><TableHead>Test</TableHead><TableHead>Type</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No lab tests found.</TableCell></TableRow>
                ) : filtered.map(t => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.patients?.first_name} {t.patients?.last_name}</TableCell>
                    <TableCell>{t.test_name}</TableCell>
                    <TableCell>{t.test_type}</TableCell>
                    <TableCell><Badge variant={t.priority === "urgent" ? "destructive" : "outline"}>{t.priority}</Badge></TableCell>
                    <TableCell><Badge variant={t.status ? statusColors[t.status] : "secondary"}>{t.status}</Badge></TableCell>
                    <TableCell>
                      {t.status && statusFlow[t.status] && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(t.id, statusFlow[t.status] as LabStatus)}>
                          Mark {statusFlow[t.status]}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
