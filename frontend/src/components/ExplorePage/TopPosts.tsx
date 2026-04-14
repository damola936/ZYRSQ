"use client"
import React from 'react';
import { FullPost } from "@/utils/types";
import PostComponent from "@/components/ExplorePage/PostComponent";
import { motion } from 'framer-motion';

function TopPosts({ posts }: { posts: FullPost[] }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="space-y-4">

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4 overflow-y-auto max-h-[520px] pb-4 p-2 no-scrollbar scroll-smooth snap-y bg-card/40 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-2xl shadow-2xl hover:shadow-primary/20"
            >
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30">
                        Trending Posts
                    </h3>
                </div>
                {posts.map((post) => (
                    <motion.div
                        key={post.id}
                        className="snap-start w-full cursor-pointer"
                    >
                        <PostComponent post={post} compact={true} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default TopPosts;
