import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"

export function NavMain({ title, items }) {
  return (
<SidebarGroup>
  {title && (
    <SidebarGroupLabel className="uppercase text-xs font-semibold text-muted-foreground">
      {title}
    </SidebarGroupLabel>
  )}

  <SidebarMenu>
    {items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          isActive={item.isActive}
          tooltip={item.title}
        >
          {item.icon}
          <span>{item.title}</span>

          {item.badge && (
            <SidebarMenuBadge>
              {item.badge}
            </SidebarMenuBadge>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
</SidebarGroup>
  )
}