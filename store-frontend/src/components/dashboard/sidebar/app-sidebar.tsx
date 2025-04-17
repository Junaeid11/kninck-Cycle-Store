"use client";

import * as React from "react";
import {
  LayoutDashboard,
  User,
  Package,
  MapPin,
  Utensils,
  PlusCircle,
  CheckCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./../../ui/";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

import { jwtDecode } from "jwt-decode";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = React.useState<any | null>(null);
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") || document.cookie.split('; ').find(row => row.startsWith('accessToken='));

    if (accessToken) {
      const decoded: any = jwtDecode(accessToken);
      const userData: any = {
        _id: decoded.userId,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        isActive: decoded.isActive,

      };

      setUser(userData);
    }
  }, []);

  const data = {
    navMain: user?.role === "user"
      ? [
       
        {
          title: "Profile",
          url: `/dashboard/profile/${user.role}`,
          icon: User,
          items: [{ title: "Update My Profile", url: `/dashboard/update-my-profile/${user.role}` }]
        },
        { title: "My Orders", url: "/dashboard/customer/my-orders", icon: Package },
        { title: "Track Orders", url: "/dashboard/customer/track-order", icon: MapPin },
      ]
      : [
        { title: "Dashboard", url: "/dashboard/provider", icon: LayoutDashboard, isActive: true },
        { title: "Meal Menu", url: "/dashboard/provider/meal-menu", icon: Utensils, isActive: true },
        { title: "Post Meal", url: "/dashboard/provider/post-meal", icon: PlusCircle, isActive: true },
        {
          title: "Profile",
          url: "/dashboard/provider/profile",
          icon: User,
          isActive: true,
          items: [{ title: "Update Profile", url: "/dashboard/provider/profile/update-profile" }]
        },
        { title: "View Order", url: "/dashboard/provider/view-order", icon: Package },
        { title: "Order Response", url: "/dashboard/provider/response", icon: CheckCircle },
      ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
             
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
