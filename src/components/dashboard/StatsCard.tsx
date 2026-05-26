import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
  href?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "bg-medical-primary/10 text-medical-primary",
  description,
  href,
  className
}: StatsCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "rounded-xl border bg-card p-4 sm:p-6 shadow-sm transition-all hover:shadow-md",
        href && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground truncate">{title}</p>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-card-foreground tracking-tight">{value}</p>
          
          {(change || description) && (
            <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {change && (
                <span className={cn(
                  "flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-sm font-bold",
                  changeType === "increase" && "text-medical-success",
                  changeType === "decrease" && "text-medical-danger",
                  changeType === "neutral" && "text-muted-foreground"
                )}>
                  {changeType === "increase" && <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />}
                  {changeType === "decrease" && <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />}
                  {change}
                </span>
              )}
              {description && (
                <span className="text-[10px] sm:text-sm text-muted-foreground font-medium truncate">{description}</span>
              )}
            </div>
          )}
        </div>
        
        <div className={cn("rounded-lg sm:rounded-xl p-2 sm:p-3 shrink-0", iconColor)}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      </div>
    </div>
  );
}
