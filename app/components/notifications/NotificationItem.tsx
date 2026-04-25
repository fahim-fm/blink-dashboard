import React, { useState } from 'react';
import Image from 'next/image';
import { CheckGreen, Delete, Inquiry, Payment, Registration, UserReport } from '@/app/utils/image/notify.image';

interface Notification {
  id: number;
  type: 'report' | 'inquiry' | 'payment' | 'registration';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  isSelected: boolean;
  onSelect: (id: number, checked: boolean) => void;
  onMarkAsRead: (id: number) => void;
  onMarkAsUnread: (id: number) => void;
  onDelete: (id: number) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  isSelected,
  onSelect,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (notification.type) {
      case 'report':
        return <Image src={UserReport} alt="report" width={20} height={20} className="w-5 h-5" />;
      case 'inquiry':
        return <Image src={Inquiry} alt="inquiry" width={20} height={20} className="w-5 h-5" />;
      case 'payment':
        return <Image src={Payment} alt="payment" width={20} height={20} className="w-5 h-5" />;
      case 'registration':
        return <Image src={Registration} alt="registration" width={20} height={20} className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`box-border flex flex-col justify-center items-start px-3 py-4 gap-1.5 self-stretch min-h-[114px] transition-all duration-200 ${
        isSelected
          ? 'bg-[rgba(250,250,250,0.06)] border-l-2 border-l-green rounded-2xl'
          : !notification.isRead && isHovered
          ? 'bg-[rgba(250,250,250,0.06)] border-l-2 border-l-green rounded-2xl'
          : 'bg-form border-t-2 border-t-[rgba(250,250,250,0.06)]'
      }`}
    >
      <div className="flex flex-row items-start gap-3 self-stretch">
        <div className="flex flex-row items-center pt-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(notification.id, e.target.checked)}
            className="w-4 h-4 bg-form border border-border rounded cursor-pointer accent-green"
          />
        </div>

        <div className="relative flex flex-col items-start pt-2 px-2 pb-0 w-9 h-9 rounded-[10px] flex-shrink-0">
          <div className="absolute w-9 h-9 left-0 top-0 bg-text-muted opacity-10 rounded-[10px]" />
          <div className="relative z-10">{getIcon()}</div>
        </div>

        <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
          <h3 className="font-bold text-base sm:text-lg leading-[26px] text-text self-stretch">
            {notification.title}
          </h3>

          <p className="font-normal text-sm sm:text-lg leading-[26px] text-text-secondary self-stretch truncate">
            {notification.message}
          </p>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center self-stretch mt-1 gap-2 sm:gap-0">
            <div className="flex flex-row items-center gap-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.835" stroke="#8A8A8A" strokeWidth="1.25" />
                <path d="M7 3.5V7L9.33 8.17" stroke="#8A8A8A" strokeWidth="1.25" />
              </svg>
              <span className="font-medium text-sm sm:text-base leading-6 text-text-muted whitespace-nowrap">
                {notification.time}
              </span>
            </div>

            <div className="flex flex-row items-center gap-3">
              {(isSelected || isHovered) && (
                <>
                  {notification.isRead ? (
                    <button
                      onClick={() => onMarkAsUnread(notification.id)}
                      className="flex flex-row items-center py-0.5 px-0 gap-1 rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <span className="font-medium text-sm sm:text-base leading-4 text-green whitespace-nowrap">
                        Mark as unread
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="flex flex-row items-center py-0.5 px-0 gap-1 rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <Image src={CheckGreen} width={20} height={20} alt="check" className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-medium text-sm sm:text-base leading-4 text-green whitespace-nowrap">
                        Mark as Read
                      </span>
                    </button>
                  )}
                </>
              )}

              {(isHovered || isSelected) && (
                <button
                  onClick={() => onDelete(notification.id)}
                  className="flex flex-row justify-center items-center w-5 h-5 rounded-lg hover:opacity-60 transition-opacity flex-shrink-0"
                >
                  <Image src={Delete} width={20} height={20} alt="delete" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export type { Notification, NotificationItemProps };