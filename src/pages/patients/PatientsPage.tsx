import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, Search, MoreHorizontal, Eye, Edit, Trash2, RotateCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataStatePanel } from "@/components/ui/data-state-panel";
import { getErrorMessage, runActionWithFeedback } from "@/lib/action-feedback";

type PatientRow = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  phone?: string | null;
  registration_completed?: boolean | null;
};

export default function PatientsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<PatientRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, active: 0, critical: 0 });

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPatients(data || []);
      
      // Calculate basic stats
      const total = data?.length || 0;
      const active = data?.filter(p => !p.registration_completed).length || 0; // Simplified logic
      setStats({ total, active, critical: 0 });
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(getErrorMessage(err, "Failed to load patients"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const filteredPatients = patients.filter((patient) => {
    const name = `${patient.first_name ?? ""} ${patient.last_name ?? ""}`.toLowerCase();
    const id = patient.id.toLowerCase();
    const query = searchQuery.toLowerCase();
    const phone = patient.phone ?? "";
    return name.includes(query) || id.includes(query) || phone.includes(searchQuery);
  });

  const handleView = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  const handleEdit = (patientId: string) => {
    navigate(`/patients/${patientId}/edit`);
  };

  const handleDelete = async (patientId: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await runActionWithFeedback({
          actionLabel: "Deleting patient...",
          run: async () => {
            const { error } = await supabase.from("patients").delete().eq("id", patientId);
            if (error) {
              throw error;
            }
            await fetchPatients();
          },
          successMessage: "Patient deleted successfully",
          errorMessage: "Delete failed",
        });
      } catch {
        // feedback already handled by helper
      }
    }
  };

  const handleRefresh = async () => {
    try {
      await runActionWithFeedback({
        actionLabel: "Refreshing patients...",
        run: fetchPatients,
        successMessage: "Patients refreshed",
        errorMessage: "Failed to refresh patients",
      });
    } catch {
      // feedback already handled by helper
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/40 p-5 sm:p-6 rounded-[24px] border border-border/40 backdrop-blur-sm shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10 mb-3">
              <Users className="h-3 w-3" />
              Patient Registry
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight uppercase leading-tight">Master <span className="text-primary/40">Patient Index</span></h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 font-medium">Search and manage centralized patient electronic records</p>
          </div>
          <Button className="h-11 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20" asChild>
            <Link to="/patients/register">
              <UserPlus className="mr-2 h-4 w-4" />
              Register Patient
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Total Records", value: stats.total, icon: Users, color: "text-primary" },
            { label: "Pending Setup", value: stats.active, icon: RotateCw, color: "text-medical-info" },
            { label: "Critical Priority", value: stats.critical, icon: AlertCircle, color: "text-medical-danger" },
          ].map((stat) => (
            <Card key={stat.label} className="rounded-2xl border-border/50 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground truncate">{stat.label}</p>
                    <p className={cn("mt-1.5 text-xl sm:text-2xl font-extrabold leading-none", stat.color)}>{stat.value}</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 flex items-center justify-center rounded-xl bg-muted/30">
                    <stat.icon className={cn("h-5 w-5 sm:h-6 sm:w-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-[24px] border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="p-4 sm:p-6 border-b border-border/40 bg-muted/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-lg font-bold text-foreground uppercase tracking-tight">Clinical Records</CardTitle>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name, ID or phone..." 
                    className="pl-10 h-10 rounded-xl bg-white border-border/60 text-sm font-medium focus:ring-primary/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 rounded-xl border-border/60 hover:bg-white" onClick={handleRefresh}>
                  <RotateCw className={cn("h-4 w-4 text-muted-foreground", isLoading && "animate-spin")} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="py-20">
                <DataStatePanel
                  state="loading"
                  title="Retrieving Records"
                  description="Connecting to secure clinical database..."
                />
              </div>
            ) : errorMessage ? (
              <div className="py-20 px-6">
                <DataStatePanel
                  state="error"
                  title="Database Connection Failed"
                  description={errorMessage}
                  actionLabel="Retry Connection"
                  onAction={handleRefresh}
                />
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="py-20 px-6">
                <DataStatePanel
                  state="empty"
                  title="No Matching Records"
                  description={searchQuery ? "Try refining your search parameters." : "The patient registry is currently empty."}
                  actionLabel={searchQuery ? "Clear Filters" : "Register First Patient"}
                  onAction={searchQuery ? () => setSearchQuery("") : () => navigate("/patients/register")}
                />
              </div>
            ) : (
              <>
                {/* Mobile List View */}
                <div className="md:hidden divide-y border-t">
                  {filteredPatients.map((patient) => (
                    <div 
                      key={patient.id} 
                      className="p-5 active:bg-muted/50 transition-colors"
                      onClick={() => handleView(patient.id)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/5 text-primary text-xs font-bold border border-primary/10 uppercase">
                            {patient.first_name?.[0]}{patient.last_name?.[0]}
                          </div>
                          <div>
                            <p className="font-bold text-card-foreground text-base leading-none">{patient.first_name} {patient.last_name}</p>
                            <p className="text-[10px] font-mono font-bold uppercase text-muted-foreground mt-1.5 tracking-tighter">ID: {patient.id.substring(0,12)}...</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={cn("rounded-full font-bold text-[9px] uppercase tracking-widest px-2 py-0.5", patient.registration_completed ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200")}>
                          {patient.registration_completed ? "Clinical" : "Pending"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs font-medium mb-4">
                        <div className="text-muted-foreground uppercase tracking-wider">Gender: <span className="text-foreground font-bold">{patient.gender || '-'}</span></div>
                        <div className="text-muted-foreground uppercase tracking-wider text-right">Age: <span className="text-foreground font-bold">
                          {patient.date_of_birth ? new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear() : "-"}
                        </span></div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border/40">
                        <div className="text-[11px] font-bold text-primary/80">
                          {patient.phone || 'No phone'}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={(e) => { e.stopPropagation(); handleView(patient.id); }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={(e) => { e.stopPropagation(); handleEdit(patient.id); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="font-bold uppercase text-[11px] tracking-wider pl-6">Patient ID</TableHead>
                        <TableHead className="font-bold uppercase text-[11px] tracking-wider">Clinical Name</TableHead>
                        <TableHead className="font-bold uppercase text-[11px] tracking-wider">Demographics</TableHead>
                        <TableHead className="font-bold uppercase text-[11px] tracking-wider">Contact</TableHead>
                        <TableHead className="font-bold uppercase text-[11px] tracking-wider">Status</TableHead>
                        <TableHead className="w-16 pr-6"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.map((patient) => (
                        <TableRow 
                          key={patient.id}
                          className="cursor-pointer hover:bg-muted/50 group"
                          onClick={() => handleView(patient.id)}
                        >
                          <TableCell className="font-mono text-[11px] uppercase font-bold text-muted-foreground tracking-tighter pl-6">{patient.id.substring(0,12)}...</TableCell>
                          <TableCell>
                            <p className="font-bold text-card-foreground group-hover:text-primary transition-colors">{patient.first_name} {patient.last_name}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-medium">{patient.date_of_birth ? new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear() + ' yrs' : "-"}</span>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{patient.gender || '-'}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm font-semibold text-primary/80">{patient.phone || '-'}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("rounded-full font-bold text-[10px] uppercase tracking-widest px-3 py-1", patient.registration_completed ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200")}>
                              {patient.registration_completed ? "Registered" : "Pending Setup"}
                            </Badge>
                          </TableCell>
                          <TableCell className="pr-6" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 p-2">
                                <DropdownMenuItem onClick={() => handleView(patient.id)} className="rounded-md">
                                  <Eye className="mr-2 h-4 w-4 text-primary" />
                                  <span className="font-semibold text-sm">Clinical View</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(patient.id)} className="rounded-md">
                                  <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="font-semibold text-sm">Update Details</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-medical-danger focus:text-medical-danger focus:bg-medical-danger/5 rounded-md"
                                  onClick={() => handleDelete(patient.id, `${patient.first_name} ${patient.last_name}`)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span className="font-bold text-sm">Delete Record</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
