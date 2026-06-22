

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import logo from '../../public/logo.png'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon } from "lucide-react"
import {
  Home,
  ClipboardList,
  Calendar,
  Star,
  Briefcase,
  House,
  BookOpen,
  Heart,
  CheckCircle2,
  Trash2,
  Settings,
} from "lucide-react";

const data = {
  user: {
    name: "Shayan",
    email: "shayan@example.com",
    avatar: "/avatars/shayan.jpg",
  },

  tasks: [
    {
      title: "All Tasks",
      url: "/tasks",
      icon: <ClipboardList />,
      badge: 24,
    },
    {
      title: "Today",
      url: "/today",
      icon: <Calendar />,
      badge: 8,
    },
   
  ],

  categories: [
    {
      title: "Work",
      url: "/category/work",
      icon: <Briefcase />,
      badge: 7,
    },
    {
      title: "Personal",
      url: "/category/personal",
      icon: <House />,
      badge: 6,
    },
    {
      title: "Study",
      url: "/category/study",
      icon: <BookOpen />,
      badge: 5,
    },
    {
      title: "Health",
      url: "/category/health",
      icon: <Heart />,
      badge: 3,
    },
  ],

  others: [
    {
      title: "Completed",
      url: "/completed",
      icon: <CheckCircle2 />,
      badge: 12,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings />,
    },
  ],
};


export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
      <div
    className="
      flex items-center group-data-[collapsible=icon]:gap-0 gap-2 group-data-[collapsible=icon]:px-0 px-2
      group-data-[collapsible=icon]:justify-center
    "
  >
   <div className="overflow-hidden rounded-sm bg-white group-data-[collapsible=icon]:w-full">
     <img
      src={'/logo.png'}
      alt="logo"
      className="size-8 shrink-0!"
    />
   </div>

    <h1
      className="
        overflow-hidden
        whitespace-nowrap
        font-bold
        text-xl
        transition-all
        duration-200
        max-w-[120px]
        opacity-100
        group-data-[collapsible=icon]:max-w-0
        group-data-[collapsible=icon]:opacity-0
      "
    >
      Todo<span className="text-primary">Flow</span>
    </h1>
  </div>
      </SidebarHeader>
   <SidebarContent>
  <NavMain
    items={[
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: <Home />,
        isActive: true,
      },
    ]}
  />

  <NavMain title="Tasks" items={data.tasks} />

  <NavMain title="Categories" items={data.categories} />

  <NavMain title="Others" items={data.others} />
</SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
