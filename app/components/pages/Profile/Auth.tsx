import React, { useState } from 'react';
import { Button } from '@/app/components';
import { cn } from '@/app/utils';

export const Auth: React.FC = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handlePasswordChange = () => {
    console.log('Opening password change modal');
  };

  const handle2FAToggle = () => {
    setIs2FAEnabled(!is2FAEnabled);
    console.log(`2FA ${!is2FAEnabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="text-text-secondary w-full mt-[10px] lg:mt-0">
      {/* Change Password Card */}
      <div className="w-full rounded-[20px] border border-border py-[24px] px-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]">
        <div>
          <h6 className="font-semibold text-[18px]">Change Password</h6>
          <p className="font-medium text-text-muted text-[16px] w-11/12 md:w-full">
            Update your password regularly for security
          </p>
        </div>

        <Button
          onClick={handlePasswordChange}
          size="paymentSize"
          className={cn(
            "bg-blue text-white text-[14px] shrink-0 w-full sm:w-auto"
          )}
        >
          Change Password
        </Button>
      </div>

      {/* Two-Factor Authentication Card */}
      <div className="w-full rounded-[20px] border border-border py-[24px] px-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between mt-[10px] gap-[16px]">
        <div>
          <h6 className="font-semibold text-[18px]">Two-Factor Authentication</h6>
          <p className="font-medium text-text-muted text-[16px] w-11/12 md:w-full">
            Protect your account with 2FA
          </p>
        </div>

        <Button
          onClick={handle2FAToggle}
          variant="create"
          className={cn(
            "text-text-secondary font-medium border border-border bg-form rounded-[32px] text-[16px] shrink-0 w-full sm:w-auto"
          )}
        >
          {is2FAEnabled ? '✓ 2FA Enabled' : 'Enable 2FA'}
        </Button>
      </div>
    </div>
  );
};
