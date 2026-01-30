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
  AlertTriangle
} from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening at your hospital today.</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value="2,847"
          change="+12.5%"
          changeType="increase"
          icon={Users}
          iconColor="bg-medical-primary/10 text-medical-primary"
          description="vs last month"
        />
        <StatsCard
          title="Today's Appointments"
          value="156"
          change="+8.2%"
          changeType="increase"
          icon={Calendar}
          iconColor="bg-medical-secondary/10 text-medical-secondary"
          description="vs yesterday"
        />
        <StatsCard
          title="Admitted Patients"
          value="198"
          change="-3.1%"
          changeType="decrease"
          icon={BedDouble}
          iconColor="bg-medical-accent/10 text-medical-accent"
          description="vs last week"
        />
        <StatsCard
          title="Available Doctors"
          value="45"
          change="2 on leave"
          changeType="neutral"
          icon={Stethoscope}
          iconColor="bg-medical-success/10 text-medical-success"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActions />
      </div>

      {/* Charts and Activity Row */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PatientChart />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>

      {/* Appointments and Department Stats */}
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

      {/* Secondary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Consultations"
          value="23"
          icon={UserCheck}
          iconColor="bg-medical-info/10 text-medical-info"
        />
        <StatsCard
          title="Lab Tests Pending"
          value="67"
          icon={Activity}
          iconColor="bg-medical-warning/10 text-medical-warning"
        />
        <StatsCard
          title="Today's Revenue"
          value="$48,250"
          change="+15.3%"
          changeType="increase"
          icon={DollarSign}
          iconColor="bg-medical-success/10 text-medical-success"
        />
        <StatsCard
          title="Emergency Cases"
          value="8"
          icon={AlertTriangle}
          iconColor="bg-medical-danger/10 text-medical-danger"
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
