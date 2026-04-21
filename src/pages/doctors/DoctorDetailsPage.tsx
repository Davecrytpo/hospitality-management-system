import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Mail, 
  Phone, 
  Award, 
  BookOpen,
  MapPin
} from "lucide-react";

// Mock doctor data
const doctorData = {
  id: "DOC-001",
  name: "Dr. Sarah Johnson",
  specialty: "Cardiology",
  rating: 4.9,
  reviews: 124,
  experience: "15 Years",
  education: "MD - Cardiology, Harvard Medical School",
  status: "Available",
  email: "sarah.johnson@hospital.com",
  phone: "+1 234-567-8910",
  bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating complex cardiovascular conditions. She specializes in interventional cardiology and heart failure management.",
  schedule: [
    { day: "Monday", time: "09:00 AM - 05:00 PM" },
    { day: "Tuesday", time: "09:00 AM - 05:00 PM" },
    { day: "Wednesday", time: "09:00 AM - 01:00 PM" },
    { day: "Thursday", time: "09:00 AM - 05:00 PM" },
    { day: "Friday", time: "09:00 AM - 04:00 PM" },
  ]
};

export default function DoctorDetailsPage() {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/doctors"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Doctor Profile</h1>
            <p className="text-muted-foreground">{id || doctorData.id}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-medical-primary/10">
                  <AvatarFallback className="text-3xl">{doctorData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{doctorData.name}</h2>
                <p className="text-medical-primary font-medium">{doctorData.specialty}</p>
                <div className="mt-4 flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{doctorData.rating}</span>
                  <span className="text-muted-foreground text-sm">({doctorData.reviews} reviews)</span>
                </div>
                <Badge className="mt-4" variant={doctorData.status === "Available" ? "default" : "secondary"}>
                  {doctorData.status}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{doctorData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{doctorData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>OPD Block A, Room 302</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="about" className="space-y-4">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="patients">Recent Patients</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Biography</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{doctorData.bio}</p>
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-lg bg-medical-primary/10 flex items-center justify-center text-medical-primary shrink-0">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Experience</p>
                          <p className="text-muted-foreground">{doctorData.experience}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-lg bg-medical-secondary/10 flex items-center justify-center text-medical-secondary shrink-0">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Education</p>
                          <p className="text-muted-foreground">{doctorData.education}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">248</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Operations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Consultations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,450</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Availability</CardTitle>
                    <CardDescription>Standard working hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {doctorData.schedule.map((slot) => (
                        <div key={slot.day} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                          <span className="font-medium">{slot.day}</span>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{slot.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="patients">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Consultations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>P</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Patient {i}</p>
                              <p className="text-xs text-muted-foreground">Consultation • Today</p>
                            </div>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
