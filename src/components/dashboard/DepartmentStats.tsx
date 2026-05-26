import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Department {
  name: string;
  patients: number;
  capacity: number;
  color: string;
  path: string;
}

const departments: Department[] = [
  { name: "Emergency", patients: 23, capacity: 30, color: "bg-medical-danger", path: "/departments/emergency" },
  { name: "ICU", patients: 18, capacity: 20, color: "bg-medical-warning", path: "/departments/ipd" },
  { name: "General Ward", patients: 85, capacity: 120, color: "bg-medical-success", path: "/departments/ipd" },
  { name: "Pediatrics", patients: 32, capacity: 50, color: "bg-medical-info", path: "/departments" },
  { name: "Maternity", patients: 28, capacity: 40, color: "bg-medical-accent", path: "/departments" },
  { name: "Surgery", patients: 12, capacity: 15, color: "bg-medical-secondary", path: "/departments/opd" },
];

export function DepartmentStats() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base sm:text-lg font-bold text-card-foreground tracking-tight uppercase">Occupancy Rates</h3>
        <button type="button" 
          onClick={() => navigate("/departments")}
          className="text-[11px] font-bold uppercase tracking-widest text-medical-primary hover:underline"
        >
          Manage Units
        </button>
      </div>
      
      <div className="space-y-5 flex-1">
        {departments.map((dept) => {
          const occupancy = Math.round((dept.patients / dept.capacity) * 100);
          
          return (
            <div 
              key={dept.name}
              onClick={() => navigate(dept.path)}
              className="cursor-pointer rounded-xl p-3 -mx-1 hover:bg-muted/30 transition-all group border border-transparent hover:border-border/50"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold text-card-foreground group-hover:text-primary transition-colors tracking-tight">{dept.name}</span>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  {dept.patients}/{dept.capacity} <span className="opacity-40">Beds</span>
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted/60">
                <div 
                  className={cn("h-full transition-all duration-1000 ease-out rounded-full shadow-sm", dept.color)}
                  style={{ width: `${occupancy}%` }}
                />
              </div>
              <div className="mt-1.5 flex justify-end">
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                  occupancy > 90 ? "text-medical-danger bg-medical-danger/5" : 
                  occupancy > 70 ? "text-medical-warning bg-medical-warning/5" : 
                  "text-medical-success bg-medical-success/5"
                )}>
                  {occupancy}% Capacity
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
