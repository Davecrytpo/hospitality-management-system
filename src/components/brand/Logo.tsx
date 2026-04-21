import { Link } from "react-router-dom";
import logo from "@/assets/logo-ontime.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
  to?: string;
  variant?: "dark" | "light";
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

export function Logo({ size = "md", showWordmark = true, className, to = "/", variant = "dark" }: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("rounded-xl overflow-hidden ring-1 ring-border bg-white shadow-card flex items-center justify-center", sizeMap[size])}>
        <img src={logo} alt="On Time Medical Group" className="h-full w-full object-contain p-0.5" width={56} height={56} />
      </div>
      {showWordmark && (
        <div className="leading-tight">
          <p className={cn("font-display font-bold tracking-tight", variant === "light" ? "text-white" : "text-foreground", size === "sm" ? "text-sm" : "text-base")}>
            On Time Medical
          </p>
          <p className={cn("text-[10px] uppercase tracking-[0.22em]", variant === "light" ? "text-white/60" : "text-muted-foreground")}>
            Hospital Group
          </p>
        </div>
      )}
    </div>
  );

  return to ? <Link to={to} className="inline-flex">{content}</Link> : content;
}
