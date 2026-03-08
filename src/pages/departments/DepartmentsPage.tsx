import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, BedDouble, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const departments = [
  { name: "Emergency", href: "/departments/emergency", patients: 23, beds: 30, staff: 15, status: "Active" },
  { name: "Outpatient (OPD)", href: "/departments/opd", patients: 156, beds: 0, staff: 25, status: "Active" },
  { name: "Inpatient (IPD)", href: "/departments/ipd", patients: 198, beds: 250, staff: 45, status: "Active" },
  { name: "Cardiology", href: "/departments/ipd", patients: 34, beds: 40, staff: 12, status: "Active" },
  { name: "Neurology", href: "/departments/ipd", patients: 28, beds: 35, staff: 10, status: "Active" },
  { name: "Pediatrics", href: "/departments/opd", patients: 45, beds: 50, staff: 18, status: "Active" },
  { name: "Orthopedics", href: "/departments/ipd", patients: 32, beds: 40, staff: 14, status: "Active" },
  { name: "ICU", href: "/departments/er-board", patients: 12, beds: 15, staff: 20, status: "Critical" },
  { name: "Mortuary", href: "/departments/mortuary", patients: 0, beds: 0, staff: 3, status: "Active" },
  { name: "Telemedicine", href: "/departments/telemedicine", patients: 8, beds: 0, staff: 5, status: "Active" },
  { name: "Ambulance Services", href: "/departments/ambulance", patients: 0, beds: 0, staff: 8, status: "Active" },
];

export default function DepartmentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">All Departments</h1>
          <p className="text-muted-foreground">Hospital department overview</p>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.reduce((a, b) => a + b.patients, 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.reduce((a, b) => a + b.beds, 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.reduce((a, b) => a + b.staff, 0)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {departments.map((dept) => (
            <Link key={dept.name} to={dept.href}>
              <Card className="cursor-pointer transition-shadow hover:shadow-md h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <Badge variant={dept.status === "Critical" ? "destructive" : "default"}>
                      {dept.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Patients</p>
                      <p className="font-semibold">{dept.patients}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Beds</p>
                      <p className="font-semibold">{dept.beds || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Staff</p>
                      <p className="font-semibold">{dept.staff}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}