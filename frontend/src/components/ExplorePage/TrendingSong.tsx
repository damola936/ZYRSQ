"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { TrendingUp, Play, Plus, Clock, Disc } from "lucide-react"
import Button from "../Global/Button"

function TrendingSong() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative bg-card/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
        >
            {/* Background Decorative Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-colors duration-700" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px] group-hover:bg-accent/20 transition-colors duration-700" />

            <div className="relative z-10 grid grid-cols-12 gap-6 items-center">
                <div className="col-span-12 lg:col-span-4 xl:col-span-3">
                    {/* Trending Song Image with interaction */}
                    <div className="relative group/image overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                            src="/images/music background.png"
                            alt="Neon Synthesis Album Art"
                            width={400}
                            height={400}
                            className="object-cover w-full aspect-square transition-transform duration-700 group-hover/image:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-primary p-3 rounded-full text-white shadow-lg cursor-pointer"
                            >
                                <Play fill="currentColor" className="size-6" />
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5 xl:col-span-6 flex flex-col gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em]"
                    >
                        <TrendingUp className="size-4" />
                        <span>Trending Track</span>
                    </motion.div>

                    <div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/50 mb-1">
                            Neon Synthesis
                        </h1>
                        <div className="flex items-center gap-3 text-muted-foreground font-medium">
                            <span className="hover:text-primary transition-colors cursor-pointer">CYBERPUNK SESSIONS</span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                            <div className="flex items-center gap-1.5">
                                <Disc className="size-4" />
                                <span>Synthwave / Retrowave</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl line-clamp-2 md:line-clamp-none">
                        Experience the raw energy of the digital underground. A masterclass in layered synthesis and driving rhythms that defined a generation of bedroom producers.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                        <Button
                            name="Play"
                            size="sm"
                            classname="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 flex items-center gap-2 group/btn cursor-pointer"
                        >
                            <Play fill="currentColor" className="size-3" />
                        </Button>
                        <Button
                            name="Collect"
                            size="sm"
                            classname="bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center gap-2 cursor-pointer"
                        >
                            <Plus className="size-3" />
                        </Button>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60 ml-1">
                            <Clock className="size-3" />
                            <span>4:24</span>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-3 xl:col-span-3 bg-white/5 rounded-3xl p-6 border border-white/10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/50 mb-4">
                        Related Artists
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg group/artist"
                            >
                                <Image
                                    src={`/images/independent-singer.png`}
                                    alt="Artist"
                                    fill
                                    className="object-cover grayscale group-hover/artist:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover/artist:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default TrendingSong