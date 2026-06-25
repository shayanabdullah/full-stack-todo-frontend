import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useOrganizationList, UserButton, useReverification, UserProfile } from "@clerk/clerk-react"

  import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router";
export function NavUser({
  
}) {
  const { isMobile } = useSidebar()

const { user } = useUser();
const { emailAddresses} = user;
const {emailAddress} = emailAddresses[0];

  const name= user?.username || "User";

  return (
 
  <div className="w-full">
    <div className="flex items-center gap-x-3 ">
      <UserButton/>
      <Link to="/settings">
     <div className="flex flex-col ">
      <h2 className="capitalize font-bold">{name}</h2>
      <p className="text-xs font-medium text-muted-foreground">{emailAddress}</p>
     </div>
      </Link>
    </div>
  </div>
  );
}
