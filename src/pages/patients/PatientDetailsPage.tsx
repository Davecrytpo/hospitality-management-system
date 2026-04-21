import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Activity, 
  FileText, 
  Pill, 
  FlaskConical, 
  CreditCard,
  Edit,
  Clock,
  AlertCircle
} from "lucide-react";

// Mock data - in a real app this would be fetched via ID
const patientData = {
  id: "PAT-2024-001",
  name: "John Smith",
  age: 45,
  gender: "Male",
  dob: "1979-05-15",
  bloodGroup: "O+",
  phone: "+1 234-567-8901",
  email: "john.smith@example.com",
  address: "123 Maple Avenue, Springfield, IL",
  emergencyContact: "Jane Smith (Wife) - +1 234-567-8999",
  insurance: {
    provider: "BlueCross BlueShield",
    policyNumber: "BCBS-123456789",
    expiry: "2025-12-31"
  },
  allergies: ["Penicillin", "Peanuts"],
  chronicConditions: ["Hypertension"],
  stats: {
    visits: 12,
    admissions: 2,
    surgeries: 0
  }
};

export default function PatientDetailsPage() {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/patients"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {patientData.name}
                <Badge variant="outline" className="ml-2">{patientData.id || id}</Badge>
              </h1>
              <p className="text-muted-foreground">Patient Profile & Medical History</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={`/patients/register?id=${id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
            <Button>New Appointment</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Sidebar Info */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">{patientData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{patientData.name}</h2>
                <p className="text-muted-foreground">{patientData.age} Years • {patientData.gender}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary" className="bg-medical-primary/10 text-medical-primary">
                    Blood: {patientData.bloodGroup}
                  </Badge>
                  <Badge variant="outline" className="border-medical-danger text-medical-danger">
                    {patientData.allergies.length} Allergies
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{patientData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{patientData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">{patientData.address}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="font-medium mb-1">Emergency Contact</p>
                  <p className="text-muted-foreground">{patientData.emergencyContact}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Insurance Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="font-medium">{patientData.insurance.provider}</p>
                <p className="text-muted-foreground">Policy: {patientData.insurance.policyNumber}</p>
                <p className="text-xs text-muted-foreground">Expires: {patientData.insurance.expiry}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="visits">Visits & History</TabsTrigger>
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="labs">Lab Results</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Jan 15, 2024</div>
                      <p className="text-xs text-muted-foreground">Dr. Sarah Johnson</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{patientData.stats.visits}</div>
                      <p className="text-xs text-muted-foreground">Since registration</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Feb 22, 2024</div>
                      <p className="text-xs text-muted-foreground">Follow-up Checkup</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Vitals Snapshot (Last Visit)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Blood Pressure</p>
                          <p className="text-lg font-bold">120/80 <span className="text-xs font-normal text-muted-foreground">mmHg</span></p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Heart Rate</p>
                          <p className="text-lg font-bold">72 <span className="text-xs font-normal text-muted-foreground">bpm</span></p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Temperature</p>
                          <p className="text-lg font-bold">98.6 <span className="text-xs font-normal text-muted-foreground">°F</span></p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Weight</p>
                          <p className="text-lg font-bold">75 <span className="text-xs font-normal text-muted-foreground">kg</span></p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Medical Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-900 dark:text-red-300">Allergies</p>
                            <p className="text-sm text-red-800 dark:text-red-400">Patient is allergic to: {patientData.allergies.join(", ")}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/20">
                          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-amber-900 dark:text-amber-300">Chronic Conditions</p>
                            <p className="text-sm text-amber-800 dark:text-amber-400">{patientData.chronicConditions.join(", ")}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="visits">
                <Card>
                  <CardHeader>
                    <CardTitle>Visit History</CardTitle>
                    <CardDescription>Past appointments and consultations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">General Consultation</h4>
                              <span className="text-sm text-muted-foreground">Jan {16-i}, 2024</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Dr. Sarah Johnson • Cardiology</p>
                            <p className="text-sm mt-2">Patient reported mild chest pain. EKG performed - Normal sinus rhythm.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medications">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Medications</CardTitle>
                    <CardDescription>Active prescriptions and dosage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <Pill className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Lisinopril 10mg</h4>
                              <Badge>Active</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">1 tablet daily in the morning</p>
                            <p className="text-xs text-muted-foreground mt-2">Prescribed by Dr. Johnson • Expires Feb 2025</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="labs">
                <Card>
                  <CardHeader>
                    <CardTitle>Lab Results</CardTitle>
                    <CardDescription>Recent laboratory test reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                              <FlaskConical className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Complete Blood Count (CBC)</h4>
                              <p className="text-sm text-muted-foreground">Jan 15, 2024 • Finalized</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">View Report</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing & Invoices</CardTitle>
                    <CardDescription>Financial history and pending payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Invoice #INV-2024-00{i}</h4>
                              <p className="text-sm text-muted-foreground">Jan 15, 2024 • Consultation & Lab</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">$150.00</p>
                            <Badge variant="outline" className="mt-1">Paid</Badge>
                          </div>
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
