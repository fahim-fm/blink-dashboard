import React from "react";
import { cn } from "../../utils/cn";

export type BadgeStatus =
  | "Active" | "Blocked" | "Resolved" | "Rejected" | "Pending" | "Complete"
  | "active" | "blocked" | "resolved" | "rejected" | "pending" | "complete";

interface BadgeProps {
  status: BadgeStatus;
  suffix?: string;
  className?: string;
}

type NormalizedStatus =
  | "active"
  | "blocked"
  | "resolved"
  | "rejected"
  | "pending"
  | "complete";

const statusStyles: Record<NormalizedStatus, string> = {
  active: "bg-green text-text-primary",
  blocked: "bg-red text-white",
  resolved: "bg-green text-text-primary",
  rejected: "bg-red text-white",
  pending: "bg-orange text-text-primary",
  complete: "bg-green text-text-primary",
};

const statusLabel: Record<NormalizedStatus, string> = {
  active: "Active",
  blocked: "Blocked",
  resolved: "Resolved",
  rejected: "Rejected",
  pending: "Pending",
  complete: "Complete",
};

const Badge: React.FC<BadgeProps> = ({ status, suffix, className }) => {
  const lowerStatus = status.toLowerCase();
  const normalizedStatus: NormalizedStatus =
    lowerStatus in statusStyles
      ? (lowerStatus as NormalizedStatus)
      : "pending";

  return (
    <span
      role="status"
      aria-label={`Status: ${statusLabel[normalizedStatus]}`}
      className={cn(
        "inline-flex items-center justify-center rounded-[10px] text-[14px] font-medium",
        "py-[6px] px-[10px] md:py-[8px] md:px-[12px]",
        statusStyles[normalizedStatus],
        className
      )}
    >
      {statusLabel[normalizedStatus]}
      {suffix ? ` ${suffix}` : ""}
    </span>
  );
};

export default Badge;
