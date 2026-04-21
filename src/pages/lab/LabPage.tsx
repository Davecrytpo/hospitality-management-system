import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Clock, CheckCircle, Beaker, RotateCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DataStatePanel } from "@/components/ui/data-state-panel";
import { getErrorMessage, runActionWithFeedback } from "@/lib/action-feedback";

type LabTestRow = {
  id: string;
  test_name?: string | null;
  priority?: string | null;
  status?: string | null;
  patients?: {
    first_name?: string | null;
    last_name?: string | null;
  } | null;
  doctors?: {
    first_name?: string | null;
    last_name?: string | null;
  } | null;
};

export default function LabPage() {
  const navigate = useNavigate();
  const [tests, setTests] = useState<LabTestRow[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase
        .from("lab_tests")
        .select("*, patients(first_name, last_name), doctors(first_name, last_name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTests(data || []);
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(getErrorMessage(err, "Failed to load lab orders"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("lab-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "lab_tests" },
        (payload) => {
          fetchOrders();
          if (payload.eventType === "INSERT") {
            toast.info("New lab test requested!");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  const filteredTests = tests.filter((test) => {
    const query = searchQuery.toLowerCase();
    const patientName = `${test.patients?.first_name ?? ""} ${test.patients?.last_name ?? ""}`.toLowerCase();
    const testName = (test.test_name ?? "").toLowerCase();
    return patientName.includes(query) || testName.includes(query) || test.id.toLowerCase().includes(query);
  });

  const handleRefresh = async () => {
    try {
      await runActionWithFeedback({
        actionLabel: "Refreshing lab queue...",
        run: fetchOrders,
        successMessage: "Lab queue refreshed",
        errorMessage: "Failed to refresh lab queue",
      });
    } catch {
      // feedback already handled by helper
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Laboratory Queue</h1>
            <p className="text-muted-foreground font-medium flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Real-time Test Monitoring
            </p>
          </div>
          <Button asChild>
            <Link to="/lab/new">
              <Plus className="mr-2 h-4 w-4" />
              Order Test
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tests.filter(t => t.status === 'ordered').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-primary">{tests.filter(t => t.status === 'in_progress').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Finalized Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-success">{tests.filter(t => t.status === 'completed').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Stat/Urgent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-danger">{tests.filter(t => t.priority === 'stat').length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Incoming Orders</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh lab orders">
                  <RotateCw className="h-4 w-4" />
                </Button>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <DataStatePanel
                state="loading"
                title="Loading lab orders"
                description="Please wait while the laboratory queue is updated."
              />
            ) : errorMessage ? (
              <DataStatePanel
                state="error"
                title="Could not load lab orders"
                description={errorMessage}
                actionLabel="Try again"
                onAction={handleRefresh}
              />
            ) : filteredTests.length === 0 ? (
              <DataStatePanel
                state="empty"
                title="No matching lab orders"
                description={searchQuery ? "Try a different patient or test keyword." : "New lab orders will appear here."}
                actionLabel={searchQuery ? "Clear search" : undefined}
                onAction={searchQuery ? () => setSearchQuery("") : undefined}
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lab ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTests.map((test) => (
                    <TableRow key={test.id} className="animate-in fade-in duration-500">
                      <TableCell className="font-mono text-[10px]">#{test.id.substring(0,8)}</TableCell>
                      <TableCell className="font-bold">{test.patients?.first_name} {test.patients?.last_name}</TableCell>
                      <TableCell>{test.test_name}</TableCell>
                      <TableCell>
                        <Badge variant={test.priority === "stat" ? "destructive" : "outline"} className="capitalize">
                          {test.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {test.status === "completed" ? <CheckCircle className="h-3 w-3 text-medical-success" /> : <Clock className="h-3 w-3 text-medical-warning" />}
                          <span className="text-xs capitalize">{(test.status || "unknown").replace("_", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => navigate(`/lab/${test.id}/entry`)}>
                          <Beaker className="mr-1 h-3 w-3" /> Results
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

