import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Bell, Shield, Building, Palette, Check } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    appointments: true
  });

  const handleSaveGeneral = () => {
    toast.success("Hospital information saved successfully");
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleChangePassword = () => {
    toast.success("Password changed successfully");
  };

  const handleToggle2FA = (enabled: boolean) => {
    if (enabled) {
      toast.success("Two-Factor Authentication enabled");
    } else {
      toast.info("Two-Factor Authentication disabled");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your hospital system settings</p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general"><Settings className="mr-2 h-4 w-4" />General</TabsTrigger>
            <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" />Profile</TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4" />Appearance</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
            <TabsTrigger value="security"><Shield className="mr-2 h-4 w-4" />Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Hospital Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Hospital Name</Label>
                    <Input defaultValue="On Time Medical Group" />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Number</Label>
                    <Input defaultValue="HSP-2024-001" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue="+1 234-567-8900" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="care@ontimemedical.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input defaultValue="123 Healthcare Avenue, Medical District" />
                </div>
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="admin@ontimemedical.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input defaultValue="System Administrator" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input defaultValue="Administration" />
                  </div>
                </div>
                <Button onClick={handleSaveProfile}>Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base">Color Theme</Label>
                  <p className="text-sm text-muted-foreground mb-4">Select your preferred color theme for the application</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <button type="button"
                      onClick={() => {
                        setTheme("light");
                        toast.success("Light theme activated");
                      }}
                      className={`relative flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary ${theme === "light" ? "border-primary bg-primary/5" : "border-muted"}`}
                    >
                      <div className="h-20 w-full rounded-md bg-white border shadow-sm flex items-center justify-center">
                        <div className="w-8 h-8 rounded bg-blue-500"></div>
                      </div>
                      <span className="text-sm font-medium">Light</span>
                      {theme === "light" && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                    </button>
                    
                    <button type="button"
                      onClick={() => {
                        setTheme("dark");
                        toast.success("Dark theme activated");
                      }}
                      className={`relative flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary ${theme === "dark" ? "border-primary bg-primary/5" : "border-muted"}`}
                    >
                      <div className="h-20 w-full rounded-md bg-slate-900 border shadow-sm flex items-center justify-center">
                        <div className="w-8 h-8 rounded bg-blue-400"></div>
                      </div>
                      <span className="text-sm font-medium">Dark</span>
                      {theme === "dark" && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                    </button>
                    
                    <button type="button"
                      onClick={() => {
                        setTheme("system");
                        toast.success("System theme activated");
                      }}
                      className={`relative flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary ${theme === "system" ? "border-primary bg-primary/5" : "border-muted"}`}
                    >
                      <div className="h-20 w-full rounded-md bg-gradient-to-r from-white to-slate-900 border shadow-sm flex items-center justify-center">
                        <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-blue-400"></div>
                      </div>
                      <span className="text-sm font-medium">System</span>
                      {theme === "system" && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email updates for important events</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, email: checked }));
                      toast.success(checked ? "Email notifications enabled" : "Email notifications disabled");
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get SMS alerts for critical updates</p>
                  </div>
                  <Switch 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, sms: checked }));
                      toast.success(checked ? "SMS notifications enabled" : "SMS notifications disabled");
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, push: checked }));
                      toast.success(checked ? "Push notifications enabled" : "Push notifications disabled");
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders for upcoming appointments</p>
                  </div>
                  <Switch 
                    checked={notifications.appointments}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, appointments: checked }));
                      toast.success(checked ? "Appointment reminders enabled" : "Appointment reminders disabled");
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" />
                </div>
                <Button onClick={handleChangePassword}>Change Password</Button>

                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch onCheckedChange={handleToggle2FA} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
