import React from "react"
import {
    User,
    MessageSquare,
    Bell,
    Users,
    Music,
    ListMusic,
    Settings,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import Link from "next/link"

type SideBarLinks = {
    name: string,
    link: string,
    icon: React.ElementType,
}

const sideBarLinks: SideBarLinks[] = [
    { name: "Profile", link: "#", icon: User },
    { name: "Messages", link: "#", icon: MessageSquare },
    { name: "Notifications", link: "#", icon: Bell },
    { name: "Community", link: "#", icon: Users },
    { name: "Studio", link: "#", icon: Music },
    { name: "Playlists", link: "#", icon: ListMusic },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="p-2">
                    <Link href={"/"}>
                        <h2 className="text-xl font-bold tracking-tight">ZYR♪Q</h2>
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sideBarLinks.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.link}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#">
                                <Settings />
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}