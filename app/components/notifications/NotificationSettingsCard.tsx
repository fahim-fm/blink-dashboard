import { Setting } from '@/app/utils/image/notify.image';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui';

export const NotificationSettingsCard: React.FC = () => {
  return (
    <div className="flex flex-col items-start p-4 sm:p-5 gap-8 sm:gap-[58px] bg-form backdrop-blur-[4px] rounded-[32px] w-full">
      <div className="flex flex-col justify-center items-start gap-4 sm:gap-[22px] self-stretch">
        <div className="flex flex-col items-start gap-2 w-full">
          <h3 className="text-text-muted text-left sm:text-center font-medium text-sm sm:text-base leading-[18px] w-full">
            Notification Settings
          </h3>
          <p className="text-text-secondary text-left sm:text-center font-semibold text-base sm:text-lg leading-[18px] w-full">
            Manage how you receive notifications
          </p>
        </div>

        <Button
          leftIcon={<Image src={Setting} alt="setting" width={20} height={20} />}
          type="button"
          variant="setting"
          size="paymentSize"
          className="flex flex-row items-center justify-center px-3 sm:px-4 py-3 sm:py-4 h-10 sm:h-12 bg-gray backdrop-blur-[4px] hover:bg-border/50 transition-colors w-full text-sm sm:text-base"
        >
          Configure Notifications
        </Button>
      </div>
    </div>
  );
};
