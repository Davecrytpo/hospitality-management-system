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

const Index = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">Command Center</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time hospital operations monitoring</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1.5 rounded-full bg-medical-success/10 text-medical-success text-[11px] font-semibold flex items-center gap-1.5 border border-medical-success/20">
            <div className="h-1.5 w-1.5 rounded-full bg-medical-success animate-pulse" />
            SYSTEM LIVE
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Patient Throughput"
          value="2,847"
          change="+12.5%"
          changeType="increase"
          icon={Users}
          iconColor="bg-primary/10 text-primary"
          description="Live capacity: 84%"
          className="card-hover"
        />
        <StatsCard
          title="Active Consults"
          value="156"
          change="+8.2%"
          changeType="increase"
          icon={HeartPulse}
          iconColor="bg-medical-danger/10 text-medical-danger"
          description="Avg response: 12m"
          className="card-hover"
        />
        <StatsCard
          title="Occupancy Rate"
          value="92%"
          change="-3.1%"
          changeType="decrease"
          icon={BedDouble}
          iconColor="bg-medical-warning/10 text-medical-warning"
          description="14 beds available"
          className="card-hover"
        />
        <StatsCard
          title="Revenue Stream"
          value="$48.2k"
          change="+15.3%"
          changeType="increase"
          icon={DollarSign}
          iconColor="bg-medical-success/10 text-medical-success"
          description="Projected: $52k"
          className="card-hover"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold flex items-center gap-2 text-foreground text-sm">
                <Zap className="h-4 w-4 text-medical-warning" /> ER Pressure Index
              </h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Waiting Area</span>
                  <span className="font-semibold text-foreground">85%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-medical-danger rounded-full transition-all" style={{ width: '85%' }} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">OR Availability</span>
                  <span className="font-semibold text-foreground">2/5</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: '40%' }} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">ICU Beds</span>
                  <span className="font-semibold text-foreground">3/8</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-medical-info rounded-full transition-all" style={{ width: '62%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PatientChart />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>

      {/* Appointments & Department Stats */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><UpcomingAppointments /></div>
        <div><DepartmentStats /></div>
      </div>

      <div className="mb-6"><RecentPatients /></div>
    </DashboardLayout>
  );
};

export default Index;
