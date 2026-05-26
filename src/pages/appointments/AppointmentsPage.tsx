import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Plus, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const mockAppointments = [
  { id: "A001", patient: "John Smith", doctor: "Dr. Sarah Johnson", date: "2024-01-15", time: "09:00", type: "Consultation", status: "Confirmed" },
  { id: "A002", patient: "Emily Davis", doctor: "Dr. Michael Chen", date: "2024-01-15", time: "10:30", type: "Follow-up", status: "Pending" },
  { id: "A003", patient: "Robert Wilson", doctor: "Dr. Emily Davis", date: "2024-01-15", time: "11:00", type: "Emergency", status: "Confirmed" },
  { id: "A004", patient: "Sarah Johnson", doctor: "Dr. James Wilson", date: "2024-01-15", time: "14:00", type: "Checkup", status: "Cancelled" },
  { id: "A005", patient: "Michael Brown", doctor: "Dr. Lisa Anderson", date: "2024-01-15", time: "15:30", type: "Consultation", status: "Confirmed" },
];

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAppointments = mockAppointments.filter(apt =>
    apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (apt: typeof mockAppointments[0]) => {
    toast.success(`Viewing appointment ${apt.id}`, {
      description: `${apt.patient} with ${apt.doctor}`
    });
  };

  const handleEdit = (apt: typeof mockAppointments[0]) => {
    navigate("/appointments/new");
    toast.info(`Editing appointment ${apt.id}`);
  };

  const handleCancel = (apt: typeof mockAppointments[0]) => {
    toast.error(`Cancel appointment?`, {
      description: `${apt.patient} - ${apt.date} at ${apt.time}`,
      action: {
        label: "Confirm",
        onClick: () => toast.success("Appointment cancelled")
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/40 p-5 sm:p-6 rounded-[24px] border border-border/40 backdrop-blur-sm shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10 mb-3">
              <Calendar className="h-3 w-3" />
              Scheduling Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight uppercase leading-tight">Master <span className="text-primary/40">Appointments</span></h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 font-medium">Coordinate visits and optimize clinic resource allocation</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="h-11 rounded-xl font-bold text-xs uppercase tracking-wider flex-1 sm:flex-initial" onClick={() => navigate("/appointments/calendar")}>
              Calendar
            </Button>
            <Button className="h-11 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 flex-1 sm:flex-initial" asChild>
              <Link to="/appointments/new">
                <Plus className="mr-2 h-4 w-4" />
                New Booking
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Today's Total", value: "24", icon: Calendar, color: "text-primary" },
            { label: "Confirmed", value: "18", icon: CheckCircle, color: "text-medical-success" },
            { label: "In Queue", value: "4", icon: AlertCircle, color: "text-medical-warning" },
            { label: "Cancelled", value: "2", icon: XCircle, color: "text-medical-danger" },
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
              <CardTitle className="text-lg font-bold text-foreground uppercase tracking-tight">Active Schedule</CardTitle>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name, ID or doctor..." 
                    className="pl-10 h-10 rounded-xl bg-white border-border/60 text-sm font-medium focus:ring-primary/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  variant={showFilters ? "default" : "outline"} 
                  size="icon" 
                  className="h-10 w-10 shrink-0 rounded-xl border-border/60 hover:bg-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className={cn("h-4 w-4 text-muted-foreground", showFilters && "text-white")} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mobile List View */}
            <div className="md:hidden divide-y">
              {filteredAppointments.map((apt) => (
                <div 
                  key={apt.id} 
                  className="p-5 active:bg-muted/50 transition-colors"
                  onClick={() => handleView(apt)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 flex flex-col items-center justify-center rounded-xl bg-primary/5 text-primary ring-1 ring-primary/10">
                        <span className="text-[10px] font-bold uppercase">{apt.time.split(':')[0]}</span>
                        <span className="text-[8px] font-bold opacity-60 leading-none">{apt.time.split(':')[1]}</span>
                      </div>
                      <div>
                        <p className="font-bold text-card-foreground text-base leading-none">{apt.patient}</p>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mt-1.5 tracking-wider">{apt.doctor}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("rounded-full font-bold text-[9px] uppercase tracking-widest px-2 py-0.5", 
                      apt.status === "Confirmed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      apt.status === "Cancelled" ? "bg-red-50 text-red-700 border-red-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    )}>
                      {apt.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-wider mb-4">
                    <div className="text-muted-foreground">Type: <span className="text-foreground">{apt.type}</span></div>
                    <div className="text-muted-foreground text-right">Date: <span className="text-foreground">{apt.date}</span></div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="text-[11px] font-bold font-mono text-muted-foreground tracking-tighter">
                      REF: {apt.id}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={(e) => { e.stopPropagation(); handleView(apt); }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={(e) => { e.stopPropagation(); handleEdit(apt); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredAppointments.length === 0 && (
                <div className="py-20 text-center text-muted-foreground text-sm font-medium">
                  No appointments found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="font-bold uppercase text-[11px] tracking-wider pl-6">Ref ID</TableHead>
                    <TableHead className="font-bold uppercase text-[11px] tracking-wider">Patient</TableHead>
                    <TableHead className="font-bold uppercase text-[11px] tracking-wider">Practitioner</TableHead>
                    <TableHead className="font-bold uppercase text-[11px] tracking-wider">Schedule</TableHead>
                    <TableHead className="font-bold uppercase text-[11px] tracking-wider">Type</TableHead>
                    <TableHead className="font-bold uppercase text-[11px] tracking-wider">Status</TableHead>
                    <TableHead className="w-16 pr-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((apt) => (
                    <TableRow 
                      key={apt.id}
                      className="cursor-pointer hover:bg-muted/50 group"
                      onClick={() => handleView(apt)}
                    >
                      <TableCell className="font-mono text-[11px] uppercase font-bold text-muted-foreground tracking-tighter pl-6">{apt.id}</TableCell>
                      <TableCell>
                        <p className="font-bold text-card-foreground group-hover:text-primary transition-colors">{apt.patient}</p>
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-primary/70">{apt.doctor}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-foreground">{apt.date}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {apt.time}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-lg font-bold text-[10px] uppercase tracking-widest border-border/60">
                          {apt.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={apt.status === "Confirmed" ? "default" : apt.status === "Cancelled" ? "destructive" : "secondary"} className="rounded-full font-bold text-[10px] uppercase tracking-widest px-3 py-1">
                          {apt.status}
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
                            <DropdownMenuItem onClick={() => handleView(apt)} className="rounded-md">
                              <Eye className="mr-2 h-4 w-4 text-primary" />
                              <span className="font-semibold text-sm">Case Notes</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(apt)} className="rounded-md">
                              <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold text-sm">Reschedule</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/5 rounded-md" onClick={() => handleCancel(apt)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span className="font-bold text-sm">Cancel Visit</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredAppointments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-20 text-muted-foreground font-medium">
                        No appointments found matching "{searchQuery}"
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
