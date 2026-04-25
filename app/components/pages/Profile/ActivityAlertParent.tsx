import React, { useState } from 'react';
import { ActivityAlert } from './ActivityAlert';

interface AlertSettings {
  reports: boolean;
  payments: boolean;
  system: boolean;
  userActivity: boolean;
}

export const ActivityAlertParent: React.FC = () => {
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    reports: true,
    payments: true,
    system: false,
    userActivity: true,
  });

  const handleToggle = (type: keyof AlertSettings, enabled: boolean) => {
    setAlertSettings((prev) => ({ ...prev, [type]: enabled }));
    // Here you can add API call to save settings
    console.log(`${type} alerts ${enabled ? 'enabled' : 'disabled'}`);
  };

  const alerts = [
    {
      type: 'Report Alerts',
      description: 'Get notified about new reports',
      settingKey: 'reports' as keyof AlertSettings,
      border: true,
    },
    {
      type: 'Payment Alerts',
      description: 'Get notified about payment activities',
      settingKey: 'payments' as keyof AlertSettings,
      border: true,
    },
    {
      type: 'System Alerts',
      description: 'Get notified about system updates',
      settingKey: 'system' as keyof AlertSettings,
      border: true,
    },
    {
      type: 'User Activity Alerts',
      description: 'Get notified about user activities',
      settingKey: 'userActivity' as keyof AlertSettings,
      border: false,
    },
  ];

  return (
    <div className="rounded-[20px] border border-border py-[12px] px-[16px] text-text-secondary w-full mt-[10px] lg:mt-0">
      <h6 className="font-semibold text-[18px] mb-[12px]">Activity Alert</h6>
      {alerts.map((alert) => (
        <ActivityAlert
          key={alert.settingKey}
          alertType={alert.type}
          description={alert.description}
          border={alert.border}
          onToggle={(enabled) => handleToggle(alert.settingKey, enabled)}
        />
      ))}
    </div>
  );
};

export default ActivityAlertParent;