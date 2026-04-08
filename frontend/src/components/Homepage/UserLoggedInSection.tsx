"use client"
import { User } from "@/lib/generated/prisma"
import { LogOut } from "lucide-react"
import { signOutAction } from "@/utils/actions"
import Image from "next/image"
import Button from "../Global/Button";

function UserLoggedInSection({ user }: { user: User }) {
    const initial = user.displayName ? user.displayName.charAt(0).toUpperCase() : user.username?.charAt(0).toUpperCase() || "U";

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 overflow-hidden bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-sm">
                {user.avatarUrl ? (
                    <Image
                        src={user.avatarUrl}
                        alt={user.displayName || "User avatar"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span>{initial}</span>
                )}
            </div>

            <Button
                name={
                    <>
                        <LogOut className="w-4 h-4" />
                        Logout
                    </>
                }
                type="button"
                onClick={() => signOutAction()}
                classname="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-white cursor-pointer"
            />
        </div>
    )
}
export default UserLoggedInSection