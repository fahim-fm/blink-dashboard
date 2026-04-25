import React from "react";
import { Computer, Mobile } from "@/app/utils/image/icon.image";
import { HistoryForm } from "../../ui/HistoryForm";

export const LoginHistory: React.FC = () => {
  return (
    <div className="rounded-[20px] text-text-secondary border border-border py-[12px] px-[16px] w-full">
      <h6 className="font-semibold text-[18px] mb-[12px]">Login History</h6>
      <HistoryForm icon={Computer} device="Desktop - Chrome" status={true} />
      <HistoryForm icon={Computer} device="Desktop - Chrome" status={false} />
      <HistoryForm icon={Mobile} device="Mobile - Chrome" status={false} border={false} />
    </div>
  );
};