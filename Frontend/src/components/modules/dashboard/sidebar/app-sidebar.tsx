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
  PackageSearch,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import Logo from "./../../../../assets/Screenshot 2025-03-01 014710_prev_ui.png";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/types";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = React.useState<IUser | null>(null);
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
    navMain: user?.role === "customer"
      ? [
        { title: "Dashboard", url: "/dashboard/customer", icon: LayoutDashboard, isActive: true },
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
        { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard, isActive: true },
        { title: " Products", url: "/dashboard/admin/products", icon:   PackageSearch , isActive: true },
        { title: "Post Product", url: "/dashboard/admin/post-product", icon: PlusCircle, isActive: true },
        {
          title: "Profile",
          url: "/dashboard/admin/profile",
          icon: User,
          isActive: true,
          items: [{ title: "Update Profile", url: "/dashboard/admin/profile/update-profile" }]
        },
        { title: "View Order", url: "/dashboard/admin/view-order", icon: Package },
        { title: "Order Response", url: "/dashboard/admin/response", icon: CheckCircle },
      ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
        
                 <h1 className="text-center justify-center font-bold text-2xl">Krinck Store</h1>

              </Link>
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
