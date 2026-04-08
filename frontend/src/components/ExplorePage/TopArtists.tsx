"use client"

import { User } from "@/lib/generated/prisma";
import { motion, Variants } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User2, ExternalLink } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

function TopArtists({ artists }: { artists: User[] }) {
    if (!artists || artists.length === 0) return null;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
            {artists.map((artist, index) => (
                <motion.div
                    key={artist.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative"
                >
                    {/* Card background/glass effect */}
                    <div className="absolute inset-0 bg-card/40 backdrop-blur-xl rounded-3xl border border-white/5 group-hover:border-primary/40 group-hover:bg-card/60 transition-all duration-500 shadow-xl group-hover:shadow-primary/5" />

                    <div className="relative z-10 p-5 flex flex-col items-center gap-4">
                        {/* Avatar Container */}
                        <div className="relative">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative rounded-full p-1 bg-linear-to-tr from-primary/20 to-accent/20 group-hover:from-primary/40 group-hover:to-accent/40 transition-colors duration-500"
                            >
                                <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-background/50 shadow-2xl">
                                    <AvatarImage
                                        src={artist.avatarUrl || ""}
                                        alt={artist.displayName || "Artist"}
                                        className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110"
                                    />
                                    <AvatarFallback className="bg-muted">
                                        <User2 className="h-10 w-10 text-muted-foreground" />
                                    </AvatarFallback>
                                </Avatar>
                            </motion.div>

                            {/* Floating badge for ranking or status */}
                            <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-white/20">
                                {index + 1}
                            </div>
                        </div>

                        {/* Artist Info */}
                        <div className="text-center space-y-1">
                            <h3 className="font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
                                {artist.displayName || "Unknown Artist"}
                            </h3>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.15em]">
                                @{artist.username || artist.displayName?.toLowerCase().replace(/\s/g, '') || "artist"}
                            </p>
                        </div>

                        {/* View Profile Button (Soft appearance) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ scale: 1.05 }}
                            className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-[11px] font-bold text-white transition-all">
                                <span>VIEW PROFILE</span>
                                <ExternalLink className="h-3 w-3" />
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}

export default TopArtists;
