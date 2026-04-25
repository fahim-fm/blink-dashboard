import React, { useState } from 'react';
import { General } from './General';
import { Mail, Bell } from '@/app/utils/image/icon.image';

interface NotificationSettings {
  email: boolean;
  push: boolean;
}

export const GeneralParent: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: false,
  });

  const handleToggle = (type: keyof NotificationSettings, enabled: boolean) => {
    setSettings((prev) => ({ ...prev, [type]: enabled }));
    // Here you can add API call to save settings
    console.log(`${type} notifications ${enabled ? 'enabled' : 'disabled'}`);
  };

  const notifications = [
    {
      icon: Mail,
      type: 'Email Notifications',
      description: 'Receive updates via email',
      settingKey: 'email' as keyof NotificationSettings,
      border: true,
    },
    {
      icon: Bell,
      type: 'Push Notifications',
      description: 'Receive push notifications in browser',
      settingKey: 'push' as keyof NotificationSettings,
      border: false,
    },
  ];

  return (
    <div className="rounded-[20px] border border-border text-text-secondary py-[12px] px-[16px] w-full">
      <h6 className="font-semibold text-[18px] mb-[12px]">General</h6>
      {notifications.map((notif) => (
        <General
          key={notif.settingKey}
          icon={notif.icon}
          notificationType={notif.type}
          description={notif.description}
          border={notif.border}
          onToggle={(enabled) => handleToggle(notif.settingKey, enabled)}
        />
      ))}
    </div>
  );
};