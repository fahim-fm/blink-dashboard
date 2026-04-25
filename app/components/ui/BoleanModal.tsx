import React from "react";
import { Button } from "@/app/components";

type BoleanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm?: () => void;
};

export const BoleanModal: React.FC<BoleanModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-form w-full max-w-[400px] rounded-[24px] p-[20px] shadow-lg relative ">
        <div className="mb-6">
          <h3 className="font-semibold text-[20px] text-text mb-2">{title}</h3>
          <p className="text-text-secondary font-medium text-[16px]">{description}</p>
        </div>

        <div className="flex justify-end gap-3 mt-[24px]">
          <Button
            type="button"
            variant="create"
            size="createBtnSize"
            className="bg-border"
            onClick={onClose}
          >
            No
          </Button>
          <Button
            type="button"
            variant="create"
            size="createBtnSize"
            className="bg-green"
            onClick={() => {
              if (onConfirm) onConfirm(); // ✅ execute the confirm callback
              onClose();
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};
