import { SidebarProvider } from "@/components/ui/sidebar"
import ExplorePageNavBar from "@/components/ExplorePage/ExplorePageNavBar"
import { AppSidebar } from "@/components/ExplorePage/SideBar"
import { getUserProfile } from "@/utils/actions"
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUserProfile();

    return (
        <div className="flex min-h-screen">
            <SidebarProvider>
                <AppSidebar user={user} />
                <div className="flex-1 flex flex-col">
                    <ExplorePageNavBar userRole={user?.role ?? null} />
                    <main className="w-full flex-1 mx-auto max-w-7xl md:max-w-full p-4 bg-background text-foreground selection:bg-primary/30">
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}
