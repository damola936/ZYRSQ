"use client"
import { useState } from "react";
import { Menu, X, Compass, FileText, Users, Handshake, Mic2, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/lib/generated/prisma";

type NavLink = {
    label: string;
    href: string;
    icon: React.ReactNode;
}

function ExplorePageNavBar({ userRole }: { userRole?: UserRole | null }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const baseLinks: NavLink[] = [
        { label: "Explore", href: "/explore", icon: <Compass className="w-4 h-4" /> },
        { label: "Posts", href: "/explore/posts", icon: <FileText className="w-4 h-4" /> },
    ];

    // Following is only available for logged-in users
    if (userRole) {
        baseLinks.push({ label: "Following", href: "/explore/following", icon: <Users className="w-4 h-4" /> });
    }

    // Role-specific links
    if (userRole === "MUSICIAN" || userRole === "PRODUCER") {
        baseLinks.push({ label: "Collaborations", href: "/explore/collaborations", icon: <Handshake className="w-4 h-4" /> });
    }

    if (userRole === "MUSICIAN") {
        baseLinks.push({ label: "The Stage", href: "/explore/the-stage", icon: <Mic2 className="w-4 h-4" /> });
    }

    if (userRole === "PRODUCER") {
        baseLinks.push({ label: "The Console", href: "/explore/the-console", icon: <SlidersHorizontal className="w-4 h-4" /> });
    }

    const isActive = (href: string) => {
        if (href === "/explore") return pathname === "/explore";
        return pathname.startsWith(href);
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Mobile toggle */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-foreground"
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-1">
                    {baseLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative group"
                            >
                                <motion.div
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${active
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                        }`}
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <span className={`transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                                        {link.icon}
                                    </span>
                                    {link.label}
                                </motion.div>

                                {/* Active indicator */}
                                {active && (
                                    <motion.div
                                        layoutId="active-nav-indicator"
                                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-primary rounded-full"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Spacer for balance */}
                <div className="w-16" />
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-white/5"
                    >
                        <div className="flex flex-col gap-1 p-4">
                            {baseLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <motion.div
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${active
                                                    ? "text-primary bg-primary/10"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                                }`}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <span className={active ? "text-primary" : "text-muted-foreground"}>
                                                {link.icon}
                                            </span>
                                            {link.label}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
export default ExplorePageNavBar