import React from "react";
import Image from "next/image";
import { ToggleButton } from "@/app/components/ui/ToggleButton";

type GeneralProps = {
  icon: string;
  notificationType: string;
  description: string;
  border?: boolean;
  onToggle?: (enabled: boolean) => void;
};

export const General: React.FC<GeneralProps> = ({
  icon,
  notificationType,
  description,
  border = true,
  onToggle,
}) => {
  return (
    <div
      className={`flex items-center justify-between text-text-secondary ${
        border ? "border-b border-border" : ""
      } py-[15px] gap-[12px]`}
    >
      <div className="max-h-[42px] rounded-[21px] py-[12px] px-[11px] bg-border shrink-0">
        <Image src={icon} width={20} height={20} alt="icon" />
      </div>
      <div className="w-full min-w-0">
        <h5 className="font-semibold text-[18px] truncate">{notificationType}</h5>
        <p className="text-text-muted font-medium line-clamp-2">{description}</p>
      </div>
      <div className="shrink-0">
        <ToggleButton  />
      </div>
    </div>
  );
};