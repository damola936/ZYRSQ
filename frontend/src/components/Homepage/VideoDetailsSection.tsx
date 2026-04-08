"use client"

import { VideoDetailsSectionData } from "./HomePageData"
import { motion } from "framer-motion"

export default function VideoDetailsSection() {
    return (
        <section className="w-full py-24 pb-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32">
                {VideoDetailsSectionData.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        key={index}
                        className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                    >
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                                {item.text}
                            </h2>
                            <div className="w-20 h-1 bg-primary rounded-full"></div>
                        </div>
                        <div className="flex-1 w-full relative group rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                            <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>
                            <video
                                src={encodeURI(item.videoUrl)}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-auto aspect-video object-cover transform transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}