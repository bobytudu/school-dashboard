import { useState } from 'react';
import { type NotificationItem } from '../types';
import { markNotificationAsRead, getUnreadCount } from '../utils';

export const useNotifications = (initialNotifications: NotificationItem[]) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    initialNotifications
  );

  const markAsRead = (id: string) => {
    setNotifications(prev => markNotificationAsRead(prev, id));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = getUnreadCount(notifications);

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    unreadCount,
  };
};