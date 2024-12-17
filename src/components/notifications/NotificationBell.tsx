import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Notification } from '../../types/notification';

interface NotificationBellProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export function NotificationBell({ notifications, onMarkAsRead }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="relative p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
            <div className="mt-2 space-y-2">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500">No notifications</p>
              ) : (
                notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-2 rounded-md ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            onMarkAsRead(notification.id);
                            setIsOpen(false);
                          }}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            {notifications.length > 5 && (
              <div className="mt-4 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  View all notifications
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}