import { User } from "@/lib/generated/prisma"
import { Bell, Settings } from "lucide-react"
import UserLoggedInSection from "../Homepage/UserLoggedInSection"
import Link from "next/link"
import Button from "../Global/Button"
import { SidebarTrigger } from "@/components/ui/sidebar"

function ExploreHeader({ user }: { user: User | null }) {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
                {user && <SidebarTrigger className="cursor-pointer" />}
                <h1 className="text-2xl font-bold tracking-tight">Explore</h1>
            </div>
            <div className="flex items-center gap-4">
                {
                    user ? (
                        <>
                            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white cursor-pointer relative">
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-primary rounded-full"></span>
                            </button>
                            <UserLoggedInSection user={user} />
                            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white cursor-pointer">
                                <Settings className="h-6 w-6" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href={"/login"}>
                                <Button name="Login" size="sm" classname="bg-transparent border border-accent hover:bg-accent hover:shadow-accent/30 hover:text-accent-foreground text-accent" />
                            </Link>
                            <Link href={"/signup"}>
                                <Button name="Sign Up" size="sm" classname="bg-primary text-primary-foreground shadow-lg shadow-primary/20" />
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}
export default ExploreHeader