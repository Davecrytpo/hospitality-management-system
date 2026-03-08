import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Filter, Mail, Phone, MoreHorizontal, Save, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type StaffMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: string;
};

export default function StaffManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", role: "nurse", email: "", phone: "", department: "" });

  useEffect(() => {
    const fetchStaff = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, role, email, phone")
        .neq("role", "patient")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load staff");
        setLoading(false);
        return;
      }

      const mapped: StaffMember[] = (data || []).map(p => ({
        id: p.id,
        name: p.full_name || p.email,
        role: p.role,
        department: getRoleDepartment(p.role),
        email: p.email,
        phone: p.phone || "N/A",
        status: "Active",
      }));
      setStaff(mapped);
      setLoading(false);
    };
    fetchStaff();
  }, []);

  const getRoleDepartment = (role: string): string => {
    const map: Record<string, string> = {
      admin: "Administration",
      doctor: "Clinical",
      nurse: "Nursing",
      pharmacist: "Pharmacy",
      lab_tech: "Laboratory",
      finance: "Finance",
      receptionist: "Front Office",
    };
    return map[role] || "General";
  };

  const handleAddStaff = async () => {
    if (!form.name || !form.email) {
      toast.error("Please fill in name and email");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: "TempPassword123!",
      options: {
        data: {
          full_name: form.name,
          role: form.role,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Staff member "${form.name}" invited! They will receive an email to set their password.`);
    setShowForm(false);
    setForm({ name: "", role: "nurse", email: "", phone: "", department: "" });
    
    // Add to local list immediately
    setStaff(prev => [{
      id: Date.now().toString(),
      name: form.name,
      role: form.role,
      department: getRoleDepartment(form.role),
      email: form.email,
      phone: form.phone || "N/A",
      status: "Pending",
    }, ...prev]);
  };

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleCounts = {
    total: staff.length,
    nurses: staff.filter(s => s.role === "nurse").length,
    doctors: staff.filter(s => s.role === "doctor").length,
    active: staff.filter(s => s.status === "Active").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Staff Management</h1>
            <p className="text-muted-foreground">Manage hospital employees and roles</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? <><X className="mr-2 h-4 w-4" /> Cancel</> : <><Plus className="mr-2 h-4 w-4" /> Add Employee</>}
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>Add New Staff Member</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1">
                  <Label>Full Name *</Label>
                  <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Enter full name" />
                </div>
                <div className="space-y-1">
                  <Label>Email *</Label>
                  <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="staff@hospital.com" />
                </div>
                <div className="space-y-1">
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+234..." />
                </div>
                <div className="space-y-1">
                  <Label>Role *</Label>
                  <Select value={form.role} onValueChange={v => setForm(p => ({ ...p, role: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[
                        { value: "doctor", label: "Doctor" },
                        { value: "nurse", label: "Nurse" },
                        { value: "pharmacist", label: "Pharmacist" },
                        { value: "lab_tech", label: "Lab Technician" },
                        { value: "finance", label: "Finance" },
                        { value: "receptionist", label: "Receptionist" },
                        { value: "admin", label: "Administrator" },
                      ].map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddStaff}><Save className="mr-2 h-4 w-4" /> Add Staff Member</Button>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Staff</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{roleCounts.total}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Doctors</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-primary">{roleCounts.doctors}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Nurses</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{roleCounts.nurses}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-medical-success">{roleCounts.active}</div></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle>Employee List</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search staff..." 
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-6 px-6">
              {loading ? (
                <p className="text-center text-muted-foreground py-8">Loading staff...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead className="hidden md:table-cell">Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{s.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{s.name}</p>
                              <p className="text-xs text-muted-foreground md:hidden">{s.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline" className="capitalize">{s.role.replace("_", " ")}</Badge></TableCell>
                        <TableCell>{s.department}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {s.email}</span>
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {s.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={s.status === "Active" ? "default" : "secondary"}>{s.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.success(`Viewing profile for ${s.name}`)}>View Profile</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info(`Editing ${s.name}`)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => {
                                setStaff(prev => prev.map(st => st.id === s.id ? { ...st, status: st.status === "Active" ? "Inactive" : "Active" } : st));
                                toast.success(`${s.name} ${s.status === "Active" ? "deactivated" : "reactivated"}`);
                              }}>
                                {s.status === "Active" ? "Deactivate" : "Reactivate"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredStaff.length === 0 && !loading && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          {searchQuery ? `No staff found matching "${searchQuery}"` : "No staff members found"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}