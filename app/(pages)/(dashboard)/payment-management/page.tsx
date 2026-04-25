"use client";

import { useState } from "react";
import { DashboardLayout } from "@/app/components";
import { PaymentTable } from "@/app/components/tables/columns/payment/paymentTable";
import { StatCard } from "@/app/components/ui/StatCard";
import { paymentStatCardsData } from "@/app/data/payment/paymentStatCardsData";
import { Money } from "@/app/utils/image/icon.image";
import Image from "next/image";
import { BoleanModal } from "@/app/components/ui/BoleanModal";

export default function PaymentManagement() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isCancelDisabled = selectedIds.length === 0;

  const handleConfirmCancel = () => {
    console.log("Cancelled payment IDs:", selectedIds);
    setSelectedIds([]);
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout
      title="Payment Management"
      buttons={[
        {
          label: "Cancel Payment",
          variant: "danger",
          disabled: isCancelDisabled,
          icon: (
            <Image src={Money} alt="Cancel Payment" width={20} height={20} />
          ),
          onConfirm: () => setIsModalOpen(true),
        },
      ]}
    >
      <div className="space-y-[4px]">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {paymentStatCardsData.map((card) => (
            <StatCard
              key={card.id}
              flag={card.flag}
              mainTitle={card.mainTitle}
              title1={card.title1}
              subTitle1={card.subTitle1}
            />
          ))}
        </div>

        {/* Table */}
        <PaymentTable
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </div>

      {/* Confirmation Modal */}
      <BoleanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cancel Payment"
        description={`Do you want to cancel this ${selectedIds.length} payment?`}
        onConfirm={handleConfirmCancel}
      />
    </DashboardLayout>
  );
}
