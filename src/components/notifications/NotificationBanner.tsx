import { CircleAlert, Info, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGlobalNotifications } from "@/hooks/use-global-notifications";
import type { NotificationAudience, NotificationPriority } from "@/data/notifications";

type NotificationBannerProps = {
  audience: NotificationAudience;
};

const priorityStyles: Record<NotificationPriority, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  critical: "border-red-200 bg-red-50 text-red-900",
};

const priorityIcons: Record<NotificationPriority, React.ComponentType<{ className?: string }>> = {
  info: Info,
  warning: TriangleAlert,
  critical: CircleAlert,
};

export function NotificationBanner({ audience }: NotificationBannerProps) {
  const { notifications } = useGlobalNotifications(audience);
  const pinned = notifications.find((notification) => notification.pinned);

  if (!pinned) {
    return null;
  }

  const Icon = priorityIcons[pinned.priority];

  return (
    <div className={`rounded-xl border px-4 py-3 ${priorityStyles[pinned.priority]}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2">
          <Icon className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="text-sm font-semibold">{pinned.title}</p>
            <p className="text-sm">{pinned.message}</p>
          </div>
        </div>
        {pinned.link && pinned.linkLabel ? (
          <Button asChild size="sm" variant="outline" className="border-current bg-transparent text-current hover:bg-white/40">
            <Link to={pinned.link}>{pinned.linkLabel}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
