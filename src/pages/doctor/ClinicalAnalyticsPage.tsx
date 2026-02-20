import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Activity, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "#10b981", "#f59e0b"];

export default function ClinicalAnalyticsPage() {
  const [stats, setStats] = useState({ totalPatients: 0, totalAppointments: 0, completed: 0, prescriptions: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("patients").select("id", { count: "exact", head: true }),
      supabase.from("appointments").select("id", { count: "exact", head: true }),
      supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "completed"),
      supabase.from("prescriptions").select("id", { count: "exact", head: true }),
    ]).then(([p, a, c, rx]) => {
      setStats({ totalPatients: p.count || 0, totalAppointments: a.count || 0, completed: c.count || 0, prescriptions: rx.count || 0 });
    });
  }, []);

  const barData = [
    { month: "Oct", patients: 32 }, { month: "Nov", patients: 45 }, { month: "Dec", patients: 38 },
    { month: "Jan", patients: 52 }, { month: "Feb", patients: 41 },
  ];

  const pieData = [
    { name: "Recovered", value: 65 }, { name: "Ongoing", value: 25 }, { name: "Referred", value: 7 }, { name: "Critical", value: 3 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary" /> Clinical Analytics</h1>
          <p className="text-muted-foreground">Patient outcomes and recovery tracking</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Total Patients", value: stats.totalPatients, icon: Users },
            { label: "Total Appointments", value: stats.totalAppointments, icon: Activity },
            { label: "Completed Visits", value: stats.completed, icon: CheckCircle },
            { label: "Prescriptions Issued", value: stats.prescriptions, icon: TrendingUp },
          ].map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent><div className="text-3xl font-bold">{value}</div></CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Monthly Patient Volume</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="patients" fill="hsl(var(--primary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Patient Outcomes</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
