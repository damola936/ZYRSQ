"use client"
import React from 'react';
import { FullPost } from "@/utils/types";
import Image from 'next/image';
import { Heart, MessageCircle, Share2, MoreHorizontal, Music } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { cn } from "@/lib/utils";

function PostComponent({ post, compact = false }: { post: FullPost, compact?: boolean }) {
    // Relative time formatter
    const getTimeAgo = (date: any) => {
        try {
            const d = new Date(date);
            if (isNaN(d.getTime())) return 'recently';
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

            if (diffInSeconds < 60) return 'just now';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
            return `${Math.floor(diffInSeconds / 86400)}d ago`;
        } catch (e) {
            return 'recently';
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className={cn(
                "group relative bg-card/40 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden",
                compact ? "p-3 w-full" : "p-6 w-full"
            )}
        >
            {/* Subtle Radiant Background */}
            <div className={cn(
                "absolute top-0 right-0 bg-primary/10 blur-[90px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors duration-700",
                compact ? "w-32 h-32" : "w-48 h-48"
            )} />
            <div className={cn(
                "absolute bottom-0 left-0 bg-secondary/10 blur-[90px] rounded-full pointer-events-none group-hover:bg-secondary/20 transition-colors duration-700",
                compact ? "w-32 h-32" : "w-48 h-48"
            )} />

            <div className="relative z-10">
                {/* Header */}
                <motion.div variants={itemVariants} className={cn("flex items-center justify-between", compact ? "mb-3" : "mb-6")}>
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="relative p-0.5 rounded-full bg-linear-to-tr from-primary via-secondary to-accent shadow-lg shadow-black/20"
                        >
                            <div className="rounded-full overflow-hidden border-2 border-background">
                                <Image
                                    src={post.author.avatarUrl || "/images/default-profile.png"}
                                    alt={post.author.username}
                                    width={compact ? 32 : 44}
                                    height={compact ? 32 : 44}
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                        <div className="min-w-0">
                            <h3 className={cn("font-bold tracking-tight text-foreground transition-colors group-hover:text-primary truncate", compact ? "text-xs" : "text-sm")}>
                                {post.author.username}
                            </h3>
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest flex items-center gap-1.5">
                                <span className={cn("rounded-full bg-accent", compact ? "w-0.5 h-0.5" : "w-1 h-1")} />
                                {getTimeAgo(post.createdAt)}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Content Section */}
                <motion.div variants={itemVariants} className={cn("space-y-2", compact ? "mb-4" : "mb-6")}>
                    <h2 className={cn("font-bold pr-4 group-hover:translate-x-1 transition-transform duration-500 truncate", compact ? "text-base" : "text-xl")}>
                        {post.title}
                    </h2>
                    {!compact && (
                        <p className="text-sm text-foreground/70 leading-relaxed font-medium">
                            {post.content}
                        </p>
                    )}
                </motion.div>

                {/* Release Card (Premium Style) */}
                {post.release && (
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, x: 2 }}
                        className={cn(
                            "group/release relative bg-linear-to-br from-white/10 to-transparent dark:from-white/5 dark:to-transparent rounded-2xl border border-white/20 dark:border-white/10 shadow-inner overflow-hidden backdrop-blur-sm",
                            compact ? "p-2.5 mb-4" : "p-4 mb-6"
                        )}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="relative group/cover shrink-0">
                                    <Image
                                        src={post.release.coverUrl || "/images/default-album.png"}
                                        alt={post.release.title}
                                        width={compact ? 40 : 64}
                                        height={compact ? 40 : 64}
                                        className="rounded-lg object-cover shadow-2xl transform group-hover/release:rotate-2 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity bg-black/40 rounded-lg">
                                        <Music className={cn("text-white animate-pulse", compact ? "w-4 h-4" : "w-6 h-6")} />
                                    </div>
                                </div>
                                <div className="flex flex-col min-w-0 pr-2">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest mb-0.5">Track</span>
                                    <h4 className={cn("font-bold truncate", compact ? "text-xs" : "text-base")}>{post.release.title}</h4>
                                </div>
                            </div>
                            {!compact && (
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="shrink-0 bg-foreground text-background text-[11px] font-black px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-xl shadow-black/20"
                                >
                                    LISTEN
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Footer / Interactions - simplified for compact */}
                <motion.div variants={itemVariants} className={cn("flex items-center justify-between pt-4 border-t border-white/10 dark:border-white/5", compact ? "pt-3" : "pt-5")}>
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileTap={{ scale: 1.3 }}
                            className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-all group/heart"
                        >
                            <Heart className={cn("transition-all", compact ? "w-4 h-4" : "w-5 h-5", post.likes.length > 2 ? 'fill-secondary text-secondary shadow-secondary/50' : '')} />
                            <span className="text-[10px] font-black tracking-tighter">{post.likes.length}</span>
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 1.3 }}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all group/comment"
                        >
                            <MessageCircle className={cn(compact ? "w-4 h-4" : "w-5 h-5")} />
                            <span className="text-[10px] font-black tracking-tighter">{post.comments.length}</span>
                        </motion.button>
                    </div>

                    {!compact && (
                        <motion.button
                            whileTap={{ scale: 1.3 }}
                            className="p-2.5 rounded-xl text-muted-foreground hover:text-accent hover:bg-accent/15 transition-all duration-300"
                        >
                            <Share2 className="w-5 h-5" />
                        </motion.button>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default PostComponent;
