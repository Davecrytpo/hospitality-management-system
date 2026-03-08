import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [stats, setStats] = useState({ total: 0, active: 0, critical: 0 });

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
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
      const message = err instanceof Error ? err.message : String(err);
      toast.error("Failed to load patients");
      console.error(message);
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
      const { error } = await supabase.from("patients").delete().eq("id", patientId);
      if (error) toast.error("Delete failed");
      else {
        toast.success("Patient deleted");
        fetchPatients();
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">All Patients</h1>
            <p className="text-muted-foreground">Manage and view all patient records</p>
          </div>
          <Button asChild>
            <Link to="/patients/register">
              <UserPlus className="mr-2 h-4 w-4" />
              Register Patient
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-primary">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-danger">{stats.critical}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Patient Records</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search patients..." 
                    className="pl-8 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-medical-primary" /></div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow 
                      key={patient.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleView(patient.id)}
                    >
                      <TableCell className="font-mono text-xs">{patient.id.substring(0,8)}</TableCell>
                      <TableCell className="font-medium">{patient.first_name} {patient.last_name}</TableCell>
                      <TableCell>
                        {patient.date_of_birth
                          ? new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()
                          : "-"}
                      </TableCell>
                      <TableCell className="capitalize">{patient.gender || '-'}</TableCell>
                      <TableCell>{patient.phone || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={patient.registration_completed ? "default" : "secondary"}>
                          {patient.registration_completed ? "Registered" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(patient.id)}>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(patient.id)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(patient.id, `${patient.first_name} ${patient.last_name}`)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPatients.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No patients found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
