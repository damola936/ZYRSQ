"use client"

import { Play } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";

// Deterministic pseudo-random number generator (seeded)
function seededRandom(seed: number): number {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
}

export function AudioPlayerCard() {
    // Pre-compute stable bar heights so server and client match
    const barData = useMemo(() => {
        return [...Array(40)].map((_, i) => {
            const baseHeight = seededRandom(i) * 80 + 20;
            const animHeight1 = seededRandom(i + 100) * 80 + 20;
            const animHeight2 = seededRandom(i + 200) * 80 + 40;
            const animHeight3 = seededRandom(i + 300) * 80 + 20;
            return { baseHeight, animHeight1, animHeight2, animHeight3 };
        });
    }, []);

    return (
        <div className="bg-card/40 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-border/40 hover:border-primary/30 hover:shadow-xl transition-all duration-500 w-full max-w-[320px] mx-auto">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center shrink-0">
                    <Play className="w-5 h-5 fill-white text-white" />
                </div>

                <div className="flex-1 flex items-center gap-1 h-12">
                    {barData.map((bar, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 rounded-full"
                            style={{
                                background: i < 15 ? '#ec4899' : '#ffffff20',
                                height: `${bar.baseHeight}%`,
                            }}
                            animate={{
                                height: i < 15
                                    ? [`${bar.animHeight1}%`, `${bar.animHeight2}%`, `${bar.animHeight3}%`]
                                    : `${bar.baseHeight}%`,
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.05,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
