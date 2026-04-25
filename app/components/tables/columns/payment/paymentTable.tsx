"use client";
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { ReusableTable } from "../../ReusableTable";
import { Card, InputField } from "@/app/components/ui";
import { paymentTableColumns } from "./paymentColumns";
import { paymentTableData } from "@/app/data/payment/paymentTableData";

interface PaymentTableProps {
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PaymentTable: React.FC<PaymentTableProps> = ({
  selectedIds,
  setSelectedIds,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return paymentTableData;

    return paymentTableData.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <Card
      title="Payment Lists"
      headerRight={
        <InputField
          placeholder="Search users..."
          leftIcon={<Search size={20} />}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      }
    >
      <ReusableTable
        columns={paymentTableColumns}
        data={filteredData}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={10}
      />
    </Card>
  );
};
