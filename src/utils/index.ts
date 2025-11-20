import { type NotificationItem } from '../types';

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const markNotificationAsRead = (
  notifications: NotificationItem[],
  id: string
): NotificationItem[] => {
  return notifications.map(notif =>
    notif.id === id ? { ...notif, read: true } : notif
  );
};

export const getUnreadCount = (notifications: NotificationItem[]): number => {
  return notifications.filter(notif => !notif.read).length;
};