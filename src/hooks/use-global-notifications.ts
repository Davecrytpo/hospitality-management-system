import { useMemo, useState } from "react";
import { globalNotifications, type NotificationAudience } from "@/data/notifications";

const STORAGE_KEY = "global-notification-read-map";

function readStorage(): Record<string, boolean> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed as Record<string, boolean> : {};
  } catch {
    return {};
  }
}

export function useGlobalNotifications(audience: NotificationAudience) {
  const [readMap, setReadMap] = useState<Record<string, boolean>>(() => readStorage());

  const notifications = useMemo(
    () => globalNotifications
      .filter((notification) => notification.audience === "all" || notification.audience === audience)
      .sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))),
    [audience],
  );

  const unreadCount = notifications.filter((notification) => !readMap[notification.id]).length;

  const persist = (next: Record<string, boolean>) => {
    setReadMap(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  };

  const markAsRead = (id: string) => {
    if (readMap[id]) {
      return;
    }
    persist({ ...readMap, [id]: true });
  };

  const markAllAsRead = () => {
    const next = { ...readMap };
    notifications.forEach((notification) => {
      next[notification.id] = true;
    });
    persist(next);
  };

  return {
    notifications,
    unreadCount,
    isRead: (id: string) => Boolean(readMap[id]),
    markAsRead,
    markAllAsRead,
  };
}
