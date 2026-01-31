import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Search, Filter, Star } from "lucide-react";
import { Link } from "react-router-dom";

const mockDoctors = [
  { id: "D001", name: "Dr. Sarah Johnson", specialty: "Cardiology", status: "Available", rating: 4.9, patients: 156 },
  { id: "D002", name: "Dr. Michael Chen", specialty: "Neurology", status: "In Consultation", rating: 4.8, patients: 142 },
  { id: "D003", name: "Dr. Emily Davis", specialty: "Pediatrics", status: "Available", rating: 4.7, patients: 198 },
  { id: "D004", name: "Dr. James Wilson", specialty: "Orthopedics", status: "On Leave", rating: 4.9, patients: 167 },
  { id: "D005", name: "Dr. Lisa Anderson", specialty: "Dermatology", status: "Available", rating: 4.6, patients: 134 },
];

export default function DoctorsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">All Doctors</h1>
            <p className="text-muted-foreground">Manage medical staff and their schedules</p>
          </div>
          <Button asChild>
            <Link to="/doctors/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Doctor
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-success">32</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-warning">5</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Doctor List</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search doctors..." className="pl-8 w-64" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockDoctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            variant={
                              doctor.status === "Available" ? "default" :
                              doctor.status === "On Leave" ? "secondary" : "outline"
                            }
                          >
                            {doctor.status}
                          </Badge>
                          <span className="flex items-center text-sm">
                            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {doctor.rating}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{doctor.patients} patients</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
