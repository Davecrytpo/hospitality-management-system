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
    <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-card-foreground tracking-tight uppercase">Clinical Volume</h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">Real-time patient throughput analysis</p>
        </div>
        <select className="rounded-lg border border-border/60 bg-muted/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground focus:ring-1 focus:ring-primary outline-none transition-all w-full sm:w-auto">
          <option>Last 7 months</option>
          <option>Last 12 months</option>
          <option>This year</option>
        </select>
      </div>
      
      <div className="h-[240px] sm:h-[300px] w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--medical-primary))" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(var(--medical-primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutpatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--medical-accent))" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(var(--medical-accent))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/30" />
            <XAxis 
              dataKey="name" 
              className="text-[10px] font-bold uppercase tracking-tighter" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              className="text-[10px] font-bold"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
              axisLine={false}
              tickLine={false}
              dx={-5}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '8px 12px'
              }}
              labelStyle={{ fontWeight: 800, color: 'hsl(var(--primary))', marginBottom: '4px', fontSize: '12px' }}
              itemStyle={{ fontSize: '11px', fontWeight: 600, padding: '2px 0' }}
            />
            <Area
              type="monotone"
              dataKey="outpatients"
              stroke="hsl(var(--medical-accent))"
              fillOpacity={1}
              fill="url(#colorOutpatients)"
              strokeWidth={3}
              activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--medical-accent))' }}
            />
            <Area
              type="monotone"
              dataKey="admissions"
              stroke="hsl(var(--medical-primary))"
              fillOpacity={1}
              fill="url(#colorAdmissions)"
              strokeWidth={3}
              activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--medical-primary))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-4 border-t border-border/40">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-5 rounded-full bg-medical-primary shadow-sm" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">In-Patient</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-5 rounded-full bg-medical-accent shadow-sm" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Out-Patient</span>
        </div>
      </div>
    </div>
  );
}
