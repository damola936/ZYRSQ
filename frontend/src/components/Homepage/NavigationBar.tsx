"use client"
import { useState } from "react";
import Button from "../Global/Button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { User } from "@/lib/generated/prisma";
import UserLoggedInSection from "./UserLoggedInSection";

function NavigationBar({ user }: { user: User | null }) {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Explore", href: "/explore" },
        { name: "Community", href: "#" },
        { name: "About", href: "#" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                    <Link href={"/"} className="text-2xl font-black tracking-tighter text-primary cursor-pointer">
                        ZYR♪Q
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/70 hover:text-primary transition-colors cursor-pointer"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {user ? <UserLoggedInSection user={user} /> : (
                    <div className="flex items-center gap-3">
                        <Link href={"/login"}>
                            <Button name="Login" size="sm" classname="bg-transparent border border-accent hover:bg-accent hover:shadow-accent/30 hover:text-accent-foreground text-accent" />
                        </Link>
                        <Link href={"/signup"}>
                            <Button name="Sign Up" size="sm" classname="bg-primary text-primary-foreground shadow-lg shadow-primary/20" />
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden overflow-hidden bg-background border-b border-white/5"
                    >
                        <div className="flex flex-col gap-4 p-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-semibold text-white/80 hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
export default NavigationBar
