import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"

import { Plus } from "lucide-react"

export function NavProjects({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="uppercase text-xs font-semibold text-muted-foreground">
        Categories
      </SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton className="h-11 rounded-xl">
              {item.icon}
              <span>{item.title}</span>

              <SidebarMenuBadge>
                {item.count}
              </SidebarMenuBadge>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
          <SidebarMenuButton className="text-primary h-11 rounded-xl">
            <Plus />
            <span>Add Category</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}