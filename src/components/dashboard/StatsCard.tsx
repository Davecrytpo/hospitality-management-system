import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "bg-medical-primary/10 text-medical-primary",
  description
}: StatsCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-card-foreground">{value}</p>
          
          {(change || description) && (
            <div className="mt-2 flex items-center gap-2">
              {change && (
                <span className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  changeType === "increase" && "text-medical-success",
                  changeType === "decrease" && "text-medical-danger",
                  changeType === "neutral" && "text-muted-foreground"
                )}>
                  {changeType === "increase" && <TrendingUp className="h-4 w-4" />}
                  {changeType === "decrease" && <TrendingDown className="h-4 w-4" />}
                  {change}
                </span>
              )}
              {description && (
                <span className="text-sm text-muted-foreground">{description}</span>
              )}
            </div>
          )}
        </div>
        
        <div className={cn("rounded-xl p-3", iconColor)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
