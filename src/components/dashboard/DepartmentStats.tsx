import { useNavigate } from "react-router-dom";

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
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">Department Occupancy</h3>
        <button 
          onClick={() => navigate("/departments")}
          className="text-sm text-medical-primary hover:underline"
        >
          Manage
        </button>
      </div>
      
      <div className="space-y-5">
        {departments.map((dept) => {
          const occupancy = Math.round((dept.patients / dept.capacity) * 100);
          
          return (
            <div 
              key={dept.name}
              onClick={() => navigate(dept.path)}
              className="cursor-pointer rounded-lg p-2 -mx-2 hover:bg-muted/50 transition-colors"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">{dept.name}</span>
                <span className="text-sm text-muted-foreground">
                  {dept.patients}/{dept.capacity} beds ({occupancy}%)
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div 
                  className={`h-full transition-all ${dept.color}`}
                  style={{ width: `${occupancy}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
