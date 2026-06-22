import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Command, MenuIcon, Search } from "lucide-react"
import { CiSearch } from "react-icons/ci"
import { MdKeyboardCommandKey } from "react-icons/md"
import { RiMenuFill } from "react-icons/ri"
import { PremiumToggle } from "./ui/bouncy-toggle"
import { Outlet } from "react-router"


export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex min-h-16 justify-between shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-border py-3">
          <div className="px-4 flex items-center w-1/2 gap-x-5">
            <SidebarTrigger className="ml-3" icon={<RiMenuFill />} iconClass={'text-2xl!'}  />
            <div className="w-full relative">
            <input type="text" placeholder="Search tasks" className="py-2.5 pl-8 w-full border border-accent-foreground/30 rounded-md font-mono text-sm" />
            <i className="absolute top-1/2 left-2 -translate-y-1/2">
              <CiSearch className=" text-lg"/>
            </i>
            <i className="absolute top-1/2 right-5 -translate-y-1/2 flex items-center text-muted-foreground text-sm">
              <MdKeyboardCommandKey className=" text-base"/>K
            </i>
            </div>
          </div>
          <div className="px-4 flex items-center">
       <div className="">
            <PremiumToggle defaultChecked={false}  />
          </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 py-10">
         <Outlet/>
        </div>
        
      </SidebarInset>
    </SidebarProvider>
  )
}