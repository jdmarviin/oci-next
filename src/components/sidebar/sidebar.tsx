/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Import,
  LayoutDashboard,
  Map,
  PieChart
} from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavConfigurations } from "./nav-config"
import { NavDashboard } from "./nav-dashboard"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Importar",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "all",
          url: "/import",
        },
      ],
    },
    {
      title: "Importados",
      url: "/import",
      icon: Import,
      isActive: true,
      items: [
        {
          title: "Todos",
          url: "/import",
        },
        {
          title: "Sucesso",
          url: "import/?imported=true",
        },
        {
          title: "Exportados",
          url: "import/?exported=true",
        },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "AI Configurations",
      url: "#",
      icon: Frame,
    },
    {
      name: "Lojas",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Integrations",
      url: "#",
      icon: Map,
    },
  ],
  dashboard: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = props;

  const logedUser = {
    name: user?.username,
    email: user?.email,
    avatar: "/avatars/shadcn.jpg",
  }

    const userShops = user?.shops.map((shop: any) => {
      return {
        name: shop.name,
        logo: GalleryVerticalEnd,
        domain: "Enterprise",
      }
    });
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher shops={userShops} />
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard items={data.dashboard} />
        <NavMain items={data.navMain} />
        <NavConfigurations projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={logedUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
