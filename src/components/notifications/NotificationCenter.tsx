import { Bell, CheckCheck, CircleAlert, Info, Link as LinkIcon, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGlobalNotifications } from "@/hooks/use-global-notifications";
import type { NotificationAudience, NotificationPriority } from "@/data/notifications";

type NotificationCenterProps = {
  audience: NotificationAudience;
  compact?: boolean;
};

const priorityConfig: Record<NotificationPriority, { icon: React.ComponentType<{ className?: string }>; badge: "default" | "secondary" | "destructive" }> = {
  info: { icon: Info, badge: "secondary" },
  warning: { icon: TriangleAlert, badge: "default" },
  critical: { icon: CircleAlert, badge: "destructive" },
};

export function NotificationCenter({ audience, compact = false }: NotificationCenterProps) {
  const { notifications, unreadCount, isRead, markAsRead, markAllAsRead } = useGlobalNotifications(audience);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={compact ? "icon" : "sm"} className={cn("relative", compact ? "h-9 w-9" : "gap-2")}>
          <Bell className="h-4 w-4" />
          {!compact ? <span className="hidden sm:inline">Notifications</span> : null}
          {unreadCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[min(92vw,24rem)]">
        <DropdownMenuLabel className="flex items-center justify-between gap-2">
          <span>General Notifications</span>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={markAllAsRead}>
            <CheckCheck className="mr-1 h-3.5 w-3.5" />
            Mark all read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <DropdownMenuItem disabled className="text-muted-foreground">
            No notifications yet.
          </DropdownMenuItem>
        ) : (
          notifications.map((notification) => {
            const config = priorityConfig[notification.priority];
            const Icon = config.icon;
            const isUnread = !isRead(notification.id);

            return (
              <div key={notification.id}>
                <DropdownMenuItem
                  className="cursor-pointer items-start gap-3 py-3"
                  onSelect={() => markAsRead(notification.id)}
                >
                  <div className="mt-0.5 rounded-full bg-muted p-1.5">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold leading-tight">{notification.title}</p>
                      <Badge variant={config.badge} className="capitalize">
                        {notification.priority}
                      </Badge>
                      {!isUnread ? null : <span className="h-2 w-2 rounded-full bg-accent" />}
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{notification.message}</p>
                    {notification.link && notification.linkLabel ? (
                      <Link to={notification.link} className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                        <LinkIcon className="h-3 w-3" />
                        {notification.linkLabel}
                      </Link>
                    ) : null}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
