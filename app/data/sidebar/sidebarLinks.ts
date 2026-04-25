// components/sidebar/sidebarLinks.ts

import { Dashboard, Inquiry, Payment, Report, Users,Theme, Notifications, Profile, Logout } from "@/app/utils/image/icon.image";

  
  export const sidebarLinks = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Dashboard,
    },
    {
      title: "User Management",
      href: "/user-management",
      icon: Users,
    },
    {
      title: "User Report",
      href: "/user-report",
      icon: Report,
    },
    {
      title: "Payment Management",
      href: "/payment-management",
      icon: Payment,
    },
    {
      title: "1:1 Inquiries",
      href: "/inquiries",
      icon: Inquiry,
    },
    {
      title: "Change Theme",
      href: "",
      icon: Theme,
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: Notifications,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: Profile,
    },
    {
      title: "Logout",
      href: "/login",
      icon: Logout,
    },
   
  ];
  