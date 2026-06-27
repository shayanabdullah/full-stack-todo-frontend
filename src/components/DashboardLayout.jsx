import { AppSidebar } from "@/components/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";


import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useState } from "react";
export default function DashboardLayout() {
  const [isOpenModal , setIsOpenModal] = useState(false)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
       {/* Navber */}
       <Navbar setIsOpen={setIsOpenModal} isOpen={isOpenModal}/>
        <div className="flex flex-1 flex-col gap-4 p-4 py-10">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
