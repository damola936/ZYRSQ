import React from "react"
import {
    User as UserIcon,
    MessageSquare,
    Bell,
    Users,
    Music,
    ListMusic,
    Settings,
    LogOut,
    LogIn,
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
    SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { User } from "@/lib/generated/prisma"
import { signOutAction } from "@/utils/actions"

type SideBarLinks = {
    name: string,
    link: string,
    icon: React.ElementType,
}

const sideBarLinks: SideBarLinks[] = [
    { name: "Profile", link: "#", icon: UserIcon },
    { name: "Messages", link: "#", icon: MessageSquare },
    { name: "Notifications", link: "#", icon: Bell },
    { name: "Community", link: "#", icon: Users },
    { name: "Studio", link: "/studio", icon: Music },
    { name: "Playlists", link: "#", icon: ListMusic },
]

export function AppSidebar({ user }: { user: User | null }) {
    const initial = user?.displayName
        ? user.displayName.charAt(0).toUpperCase()
        : user?.username?.charAt(0).toUpperCase() || "U";

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

                    <SidebarSeparator />

                    {user ? (
                        <>
                            {/* User info */}
                            <SidebarMenuItem>
                                <div className="flex items-center gap-3 px-2 py-2">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 overflow-hidden bg-linear-to-tr from-primary via-secondary to-accent text-white font-bold text-sm shadow-sm">
                                        {user.avatarUrl ? (
                                            <Image
                                                src={user.avatarUrl}
                                                alt={user.displayName || "User avatar"}
                                                width={32}
                                                height={32}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span>{initial}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-semibold truncate">{user.displayName}</span>
                                        <span className="text-[10px] text-muted-foreground truncate">@{user.username}</span>
                                    </div>
                                </div>
                            </SidebarMenuItem>

                            {/* Sign out */}
                            <SidebarMenuItem>
                                <form action={signOutAction}>
                                    <SidebarMenuButton
                                        asChild
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                        <button type="submit" className="w-full">
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </SidebarMenuButton>
                                </form>
                            </SidebarMenuItem>
                        </>
                    ) : (
                        /* Log in */
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="text-primary hover:text-primary hover:bg-primary/10"
                            >
                                <Link href="/login">
                                    <LogIn className="w-4 h-4" />
                                    <span>Log In</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}