import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

export default function NewAppointmentPage() {
  const [reminders, setReminders] = useState({
    inApp: true,
    email: true,
    sms: false,
    webPush: false,
    timing: "24h"
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/appointments"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Schedule New Appointment</h1>
            <p className="text-muted-foreground">Book a new patient appointment</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p001">John Smith (P001)</SelectItem>
                    <SelectItem value="p002">Emily Davis (P002)</SelectItem>
                    <SelectItem value="p003">Robert Wilson (P003)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="d001">Dr. Sarah Johnson - Cardiology</SelectItem>
                    <SelectItem value="d002">Dr. Michael Chen - Neurology</SelectItem>
                    <SelectItem value="d003">Dr. Emily Davis - Pediatrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time Slot</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="checkup">General Checkup</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes for the appointment" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Reminder Settings
              </CardTitle>
              <CardDescription>Configure how the patient will be reminded</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>In-App Notification</Label>
                      <p className="text-xs text-muted-foreground">Show notification in the app</p>
                    </div>
                  </div>
                  <Switch 
                    checked={reminders.inApp} 
                    onCheckedChange={(checked) => setReminders(prev => ({ ...prev, inApp: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Email Reminder</Label>
                      <p className="text-xs text-muted-foreground">Send email notification</p>
                    </div>
                  </div>
                  <Switch 
                    checked={reminders.email} 
                    onCheckedChange={(checked) => setReminders(prev => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>SMS Reminder</Label>
                      <p className="text-xs text-muted-foreground">Send SMS notification</p>
                    </div>
                  </div>
                  <Switch 
                    checked={reminders.sms} 
                    onCheckedChange={(checked) => setReminders(prev => ({ ...prev, sms: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label>Web Push</Label>
                      <p className="text-xs text-muted-foreground">Browser push notification</p>
                    </div>
                  </div>
                  <Switch 
                    checked={reminders.webPush} 
                    onCheckedChange={(checked) => setReminders(prev => ({ ...prev, webPush: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <Label>Reminder Timing</Label>
                <Select 
                  value={reminders.timing}
                  onValueChange={(value) => setReminders(prev => ({ ...prev, timing: value }))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour before</SelectItem>
                    <SelectItem value="2h">2 hours before</SelectItem>
                    <SelectItem value="24h">24 hours before</SelectItem>
                    <SelectItem value="48h">48 hours before</SelectItem>
                    <SelectItem value="1w">1 week before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link to="/appointments">Cancel</Link>
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
