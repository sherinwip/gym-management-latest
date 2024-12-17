import { useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import type { Notification } from '../../types/notification';

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Class Schedule',
    message: 'The yoga class schedule has been updated for next week.',
    type: 'info',
    createdAt: '2024-03-10T10:00:00',
    read: false
  },
  {
    id: '2',
    title: 'Membership Renewal',
    message: 'Your membership will expire in 7 days. Please renew to continue.',
    type: 'warning',
    createdAt: '2024-03-09T15:30:00',
    read: true
  }
];

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <Button variant="outline" onClick={markAllAsRead}>
          <Check className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-sm p-4 ${
              !notification.read ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div
                  className={`mt-1 rounded-full p-1 ${
                    notification.type === 'warning'
                      ? 'bg-yellow-100 text-yellow-600'
                      : notification.type === 'error'
                      ? 'bg-red-100 text-red-600'
                      : notification.type === 'success'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}