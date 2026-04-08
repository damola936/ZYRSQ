"use client"

import { motion } from "motion/react";
import { FeedCard } from "./FeedCard";
import { ActivityCard } from "./ActivityCard";
import { AudioPlayerCard } from "./AudioPlayerCard";
import { ProducersCard } from "./ProducersCard";
import { Music2, Heart, MessageCircle } from "lucide-react";

export function CommunityShowcase() {
    const icons = [
        <Music2 key="music" />, <Heart key="heart" />, <MessageCircle key="msg" />
    ];
    return (
        <div className="relative max-w-7xl mx-auto px-4">
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#8b5cf6] rounded-full opacity-20 blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#ec4899] rounded-full opacity-20 blur-[100px]" />

            {/* Main interaction display */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
                {/* Activity Card with floating circle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative flex justify-center"
                >
                    <ActivityCard />
                    {/* Floating decorative circle - teal */}
                    <motion.div
                        className="absolute -top-2 -left-2 w-3 h-3"
                        style={{ color: '#06b6d4', fontSize: '3rem' }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                    >
                        ♪
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex justify-center xl:mt-12"
                >
                    <FeedCard />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex justify-center items-center flex-col gap-6"
                >
                    <AudioPlayerCard />
                    {/* Additional avatars */}
                    <div className="flex items-center justify-center gap-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-br from-[#8b5cf6] to-[#ec4899] border-2 border-[#121212]"
                                style={{
                                    transform: `translateX(${(i - 2) * -8}px)`,
                                    zIndex: 3 - i,
                                }}
                            >
                                {icons[i - 1]}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Producers Card with floating circle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative flex justify-center xl:mt-8"
                >
                    <ProducersCard />
                    {/* Floating decorative circle - pink */}
                    <motion.div
                        className="absolute -bottom-1 -right-1 w-2 h-2"
                        style={{ color: '#ec4899', fontSize: '3rem' }}
                        animate={{
                            y: [0, 20, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                        }}
                    >
                        ♪
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

