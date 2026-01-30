import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", admissions: 120, discharges: 110, outpatients: 340 },
  { name: "Feb", admissions: 145, discharges: 130, outpatients: 380 },
  { name: "Mar", admissions: 162, discharges: 155, outpatients: 420 },
  { name: "Apr", admissions: 138, discharges: 142, outpatients: 390 },
  { name: "May", admissions: 175, discharges: 168, outpatients: 450 },
  { name: "Jun", admissions: 189, discharges: 180, outpatients: 480 },
  { name: "Jul", admissions: 195, discharges: 188, outpatients: 510 },
];

export function PatientChart() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Patient Statistics</h3>
          <p className="text-sm text-muted-foreground">Monthly patient flow overview</p>
        </div>
        <select className="rounded-lg border bg-background px-3 py-1.5 text-sm">
          <option>Last 7 months</option>
          <option>Last 12 months</option>
          <option>This year</option>
        </select>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--medical-primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--medical-primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutpatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--medical-accent))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--medical-accent))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="name" 
              className="text-xs" 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey="outpatients"
              stroke="hsl(var(--medical-accent))"
              fillOpacity={1}
              fill="url(#colorOutpatients)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="admissions"
              stroke="hsl(var(--medical-primary))"
              fillOpacity={1}
              fill="url(#colorAdmissions)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-medical-primary" />
          <span className="text-sm text-muted-foreground">Admissions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-medical-accent" />
          <span className="text-sm text-muted-foreground">Outpatients</span>
        </div>
      </div>
    </div>
  );
}
