import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ExplorePage/SideBar"
import { isUserLoggedIn } from "@/utils/actions"
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await isUserLoggedIn();
    return user ? (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full flex-1 mx-auto max-w-7xl md:max-w-full p-4 bg-background text-foreground selection:bg-primary/30">
                {children}
            </main>
        </SidebarProvider>
    ) : (
        <main className="w-full flex-1 mx-auto max-w-5xl md:max-w-7xl p-4 bg-background text-foreground selection:bg-primary/30">
            {children}
        </main>
    );
}
