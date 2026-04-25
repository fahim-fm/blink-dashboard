"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, DashboardLayout } from "@/app/components";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import {
  fetchDashboardStats,
  fetchRecentActivity,
  clearError,
} from "@/app/redux/slices/dashboardSlice";
import { Edit } from "@/app/utils/image/icon.image";
import { ProfileInfoForm } from "@/app/components/pages/Profile/ProfileInfoForm";
import Security from "@/app/components/pages/Profile/Security";
import { Notification } from "@/app/components/pages/Profile/Notification";
import { cn } from "@/app/utils";

type TabType = "Profile" | "Security" | "Notification";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.dashboard);
  const [currentTab, setCurrentTab] = useState<TabType>("Profile");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchRecentActivity());
  }, [dispatch]);

  const handleClearError = () => dispatch(clearError());

  const getTabClasses = (tab: TabType) =>
    cn(
      "text-[16px] text-text-secondary font-normal",
      currentTab === tab ? "bg-border" : "bg-transparent"
    );

  const tabs: { name: TabType; label: string }[] = [
    { name: "Profile", label: "Profile" },
    { name: "Security", label: "Security" },
    { name: "Notification", label: "Notification" },
  ];

  return (
    <DashboardLayout title="Profile">
      <div className="space-y-[4px]">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div className="flex gap-3">
                <div className="text-red-400 shrink-0">⚠️</div>
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
              <Button 
                onClick={handleClearError} 
                variant="danger" 
                size="sm"
                className="self-start sm:self-auto"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Profile Content */}
        <div className="rounded-[32px] p-[10px] md:p-[20px] bg-form">
          {/* Header with Tabs and Edit Button */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[10px] sm:gap-0">
            {/* Tab Navigation */}
            <div className="rounded-[32px] border-1 p-1 border-border flex items-center justify-between overflow-x-auto scrollbar-hide w-full sm:w-auto">
              {tabs.map((tab) => (
                <Button
                  key={tab.name}
                  onClick={() => setCurrentTab(tab.name)}
                  variant="create"
                  size="profileBtnSize"
                  className={getTabClasses(tab.name)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Edit Button - Only visible on Profile tab */}
            <div
              className={`flex items-center gap-[4px] md:gap-[10px] min-w-fit shrink-0 ${
                currentTab === "Profile" ? "visible" : "invisible"
              }`}
            >
            <button    onClick={() => setIsEditing(!isEditing)}
    className="cursor-pointer flex gap-[10px] items-center">
                <h3 className="text-text-secondary font-normal text-[14px] md:text-[16px]">Edit</h3>
              <div>
                <Image
                  className="shrink-0"
                  src={Edit}
                  width={20}
                  height={20}
                  alt="edit-icon"
                />
              </div>
            </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-[24px]">
            {currentTab === "Profile" && <ProfileInfoForm />}
            {currentTab === "Security" && <Security />}
            {currentTab === "Notification" && <Notification />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}