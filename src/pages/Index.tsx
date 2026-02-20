import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentPatients } from "@/components/dashboard/RecentPatients";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DepartmentStats } from "@/components/dashboard/DepartmentStats";
import { PatientChart } from "@/components/dashboard/PatientChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import {
  Users,
  UserCheck,
  Calendar,
  BedDouble,
  Stethoscope,
  Activity,
  DollarSign,
  AlertTriangle,
  HeartPulse,
  Scan,
  Zap
} from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">System Command Center</h1>
          <p className="text-muted-foreground font-medium">Real-time biometrics and hospital throughput monitoring.</p>
        </div>
        <div className="hidden md:flex gap-2">
          <div className="px-3 py-1 rounded-full bg-medical-success/10 text-medical-success text-xs font-bold flex items-center gap-1 border border-medical-success/20">
            <div className="h-2 w-2 rounded-full bg-medical-success animate-pulse" />
            SYSTEM LIVE
          </div>
          <div className="px-3 py-1 rounded-full bg-medical-primary/10 text-medical-primary text-xs font-bold border border-medical-primary/20">
            SYNC: 0.4ms
          </div>
        </div>
      </div>

      {/* Main High-Tech Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Patient Throughput"
          value="2,847"
          change="+12.5%"
          changeType="increase"
          icon={Users}
          iconColor="bg-blue-500/10 text-blue-500"
          description="Live capacity: 84%"
          className="border-t-4 border-t-blue-500 shadow-lg hover:translate-y-[-4px] transition-transform duration-300"
        />
        <StatsCard
          title="Active Consults"
          value="156"
          change="+8.2%"
          changeType="increase"
          icon={HeartPulse}
          iconColor="bg-red-500/10 text-red-500"
          description="Avg response: 12m"
          className="border-t-4 border-t-red-500 shadow-lg hover:translate-y-[-4px] transition-transform duration-300 animate-pulse"
        />
        <StatsCard
          title="Occupancy Rate"
          value="92%"
          change="-3.1%"
          changeType="decrease"
          icon={BedDouble}
          iconColor="bg-amber-500/10 text-amber-500"
          description="14 beds available"
          className="border-t-4 border-t-amber-500 shadow-lg hover:translate-y-[-4px] transition-transform duration-300"
        />
        <StatsCard
          title="Revenue Stream"
          value="$48.2k"
          change="+15.3%"
          changeType="increase"
          icon={DollarSign}
          iconColor="bg-emerald-500/10 text-emerald-500"
          description="Projected: $52k"
          className="border-t-4 border-t-emerald-500 shadow-lg hover:translate-y-[-4px] transition-transform duration-300"
        />
      </div>

      {/* Quick Actions & High-Tech Visuals */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        <div className="relative overflow-hidden rounded-xl border bg-slate-950 p-6 text-white shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 animate-scan" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-cyan-400">
                <Scan className="h-4 w-4 animate-spin-slow" /> Diagnostic Core
              </h3>
              <Badge variant="outline" className="text-[10px] border-cyan-500/50 text-cyan-400">ACTIVE SCAN</Badge>
            </div>
            <div className="space-y-3">
              <div className="h-24 w-full rounded bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
                <Activity className="h-12 w-12 text-cyan-400 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 rounded bg-white/5 border border-white/10 italic text-cyan-200/70 uppercase">
                  HEART_RATE: 72bpm
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10 italic text-cyan-200/70 uppercase">
                  O2_LEVEL: 98.4%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Charts and Real-time Activity */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PatientChart />
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-4">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" /> ER Pressure Index
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Waiting Area</span>
                  <span className="font-bold">85%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-red-500 animate-pulse" style={{ width: '85%' }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>OR Availability</span>
                  <span className="font-bold">2/5</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
          </div>
          <ActivityFeed />
        </div>
      </div>

      {/* Row 3: Appointments and Department Stats */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingAppointments />
        </div>
        <div>
          <DepartmentStats />
        </div>
      </div>

      {/* Recent Patients Table */}
      <div className="mb-8">
        <RecentPatients />
      </div>
    </DashboardLayout>
  );
};

export default Index;
