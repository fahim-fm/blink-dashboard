import React from 'react';
import { ActivityAlertParent } from './ActivityAlertParent';
import { GeneralParent } from './GeneralParent';

export const Notification: React.FC = () => {
  return (
    <div className="w-full flex items-start justify-between flex-col lg:flex-row gap-[10px]">
      <div className="w-full lg:w-1/2">
        <GeneralParent />
      </div>
      <div className="w-full lg:w-1/2">
        <ActivityAlertParent />
      </div>
    </div>
  );
};