import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, DollarSign, ArrowUp, ArrowDown, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type PaymentRow = {
  amount?: number | string | null;
};

type ClaimRow = {
  claim_amount?: number | string | null;
  status?: string | null;
};

export default function RevenueDashboardPage() {
  const [stats, setStats] = useState({ total: 0, paid: 0, pending: 0, claims: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("payments").select("amount"),
      supabase.from("insurance_claims").select("claim_amount, status"),
    ]).then(([payments, claims]) => {
      const paymentsData = (payments.data ?? []) as PaymentRow[];
      const claimsData = (claims.data ?? []) as ClaimRow[];
      const totalRevenue = paymentsData.reduce((sum, p) => sum + Number(p.amount ?? 0), 0);
      const pendingClaims = claimsData.filter((c) => c.status === "pending").reduce((sum, c) => sum + Number(c.claim_amount ?? 0), 0);
      const approvedClaims = claimsData.filter((c) => c.status === "approved").reduce((sum, c) => sum + Number(c.claim_amount ?? 0), 0);
      setStats({ total: totalRevenue, paid: totalRevenue, pending: pendingClaims, claims: approvedClaims });
    });
  }, []);

  const monthlyRevenue = [
    { month: "Sep", revenue: 450000 }, { month: "Oct", revenue: 520000 }, { month: "Nov", revenue: 480000 },
    { month: "Dec", revenue: 610000 }, { month: "Jan", revenue: 590000 }, { month: "Feb", revenue: 680000 },
  ];

  const revenueByDept = [
    { dept: "OPD", value: 240000 }, { dept: "IPD", value: 310000 }, { dept: "Lab", value: 95000 },
    { dept: "Pharmacy", value: 125000 }, { dept: "Imaging", value: 85000 },
  ];

  const fmt = (n: number) => `NGN ${n.toLocaleString()}`;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary" /> Revenue Dashboard</h1>
          <p className="text-muted-foreground">Financial overview for management</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Total Collections", value: fmt(stats.total || 855000), icon: DollarSign, trend: "+12%", up: true },
            { label: "This Month", value: "NGN 680,000", icon: CreditCard, trend: "+5%", up: true },
            { label: "Pending Insurance", value: fmt(stats.pending || 125000), icon: TrendingUp, trend: "-3%", up: false },
            { label: "Insurance Approved", value: fmt(stats.claims || 230000), icon: ArrowUp, trend: "+8%", up: true },
          ].map(({ label, value, icon: Icon, trend, up }) => (
            <Card key={label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className={`flex items-center text-sm mt-1 ${up ? "text-green-600" : "text-destructive"}`}>
                  {up ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}{trend} vs last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Monthly Revenue Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" /><YAxis tickFormatter={v => `NGN ${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number | string) => [`NGN ${Number(value).toLocaleString()}`, "Revenue"]} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Revenue by Department</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueByDept}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dept" /><YAxis tickFormatter={v => `NGN ${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number | string) => [`NGN ${Number(value).toLocaleString()}`, "Revenue"]} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
