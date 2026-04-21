import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DataStatePanelProps = {
  state: "loading" | "empty" | "error";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

const stateIcon = {
  loading: Loader2,
  empty: Inbox,
  error: AlertCircle,
} as const;

export function DataStatePanel({
  state,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: DataStatePanelProps) {
  const Icon = stateIcon[state];

  return (
    <div className={cn("flex min-h-56 flex-col items-center justify-center gap-3 rounded-md border border-dashed px-4 py-10 text-center", className)}>
      <Icon className={cn("h-7 w-7 text-muted-foreground", state === "loading" && "animate-spin")} />
      <div className="space-y-1">
        <p className="font-medium">{title ?? "No data available"}</p>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actionLabel && onAction ? (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
