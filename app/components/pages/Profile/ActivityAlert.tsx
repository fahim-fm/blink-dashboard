import React from 'react';
import { ToggleButton } from '@/app/components/ui/ToggleButton';

type ActivityAlertProps = {
  alertType: string;
  description: string;
  border?: boolean;
  onToggle?: (enabled: boolean) => void;
};

export const ActivityAlert: React.FC<ActivityAlertProps> = ({
  alertType,
  description,
  border = true,
  onToggle,
}) => {
  return (
    <div
      className={`flex items-center justify-between ${
        border ? 'border-b border-border' : ''
      } py-[15px]`}
    >
      <div className="w-full min-w-0">
        <h5 className="font-semibold text-[18px] truncate">{alertType}</h5>
        <p className="text-text-muted font-medium line-clamp-2">{description}</p>
      </div>
      <div className="shrink-0">
        <ToggleButton />
      </div>
    </div>
  );
};