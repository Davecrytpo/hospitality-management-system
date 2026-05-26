import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentPatients } from "@/components/dashboard/RecentPatients";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DepartmentStats } from "@/components/dashboard/DepartmentStats";
import { PatientChart } from "@/components/dashboard/PatientChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import {
  Users, HeartPulse, BedDouble, DollarSign, Activity, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-6 bg-white/40 p-4 sm:p-6 rounded-[24px] border border-border/40 backdrop-blur-sm shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10 mb-3">
            <Activity className="h-3 w-3" />
            Operational Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight leading-tight uppercase">Hospital Command <span className="text-primary/40">Center</span></h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 font-medium">Real-time clinical, operational, and financial orchestration</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-medical-success/10 text-medical-success text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-medical-success/20 shadow-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-medical-success animate-pulse" />
            Clinical System Live
          </div>
          <Button size="sm" className="h-9 rounded-lg font-bold text-[10px] uppercase tracking-wider bg-primary hover:bg-primary/90">
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Patient Volume"
          value="2,847"
          change="+12.5%"
          changeType="increase"
          icon={Users}
          iconColor="bg-primary/10 text-primary"
          description="Capacity: 84%"
          className="shadow-sm"
        />
        <StatsCard
          title="Active Consults"
          value="156"
          change="+8.2%"
          changeType="increase"
          icon={HeartPulse}
          iconColor="bg-medical-danger/10 text-medical-danger"
          description="Avg response: 12m"
          className="shadow-sm"
        />
        <StatsCard
          title="Occupancy"
          value="92%"
          change="-3.1%"
          changeType="decrease"
          icon={BedDouble}
          iconColor="bg-medical-warning/10 text-medical-warning"
          description="14 beds open"
          className="shadow-sm"
        />
        <StatsCard
          title="Revenue"
          value="$48.2k"
          change="+15.3%"
          changeType="increase"
          icon={DollarSign}
          iconColor="bg-medical-success/10 text-medical-success"
          description="Target: $52k"
          className="shadow-sm"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3 mb-8">
        {/* Quick Actions & ER Pressure */}
        <div className="lg:col-span-2 grid gap-8">
          <QuickActions />
          <div className="grid gap-8 sm:grid-cols-2">
            <UpcomingAppointments />
            <DepartmentStats />
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-8">
          <div className="rounded-[24px] border border-border bg-card p-6 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="h-12 w-12 text-medical-warning" />
            </div>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold flex items-center gap-2 text-foreground text-sm uppercase tracking-wider">
                  <Zap className="h-4 w-4 text-medical-warning" /> ER Pressure Index
                </h3>
                <Badge variant="outline" className="rounded-full bg-medical-danger/5 text-medical-danger border-medical-danger/20 font-bold text-[9px] uppercase tracking-widest">High Load</Badge>
              </div>
              <div className="space-y-5">
                {[
                  { label: "Waiting Area", value: "85%", color: "bg-medical-danger" },
                  { label: "OR Availability", value: "2/5", color: "bg-primary", width: "40%" },
                  { label: "ICU Beds", value: "3/8", color: "bg-medical-info", width: "62%" },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="text-foreground">{item.value}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-1000", item.color)} 
                        style={{ width: item.width || item.value }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ActivityFeed />
        </div>
      </div>

      {/* Main Analytics Row */}
      <div className="mb-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PatientChart />
        </div>
        <div className="hidden lg:block">
          {/* Placeholder for more desktop-only analytics or just leave as is */}
        </div>
      </div>

      <div className="mb-8"><RecentPatients /></div>
    </DashboardLayout>
  );
};

export default Index;
