import Image, { StaticImageData } from "next/image";
import Badge, { BadgeStatus } from "./Badge"; // Import the type

type StatusBadgeProps = {
  label: string;
  status: BadgeStatus; // Use the imported type
  icon: StaticImageData;
};

export function StatusBadge({ label, status, icon }: StatusBadgeProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-semibold text-text-secondary">{label}</label>
      <div className=" flex items-center gap-2 rounded-full bg-border px-4 py-2">
        <Image src={icon} alt={label} width={20} height={20} />
        <Badge status={status} suffix="User" className="rounded-[30px]  "/>
      </div>
    </div>
  );
}