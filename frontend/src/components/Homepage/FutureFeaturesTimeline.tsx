'use client'

import { motion } from 'framer-motion'
import {
    SiApple,        // Apple Inc Logo
    SiSpotify,      // Spotify Logo
    SiYoutubemusic  // YouTube Music Logo (Distinct circular play button)
} from 'react-icons/si';
import React from "react";


interface TimelineItemProps {
    title: React.ReactNode;
    cardTitle: string;
    cardDetailedText: string;
    index: number;
}

const TimelineItem = ({ title, cardTitle, cardDetailedText, index }: TimelineItemProps) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`flex w-full mb-8 items-center justify-between ${isEven ? 'flex-row-reverse' : 'flex-row'}`}
        >
            <div className="hidden md:block w-5/12" />

            <div className={`z-20 flex shrink-0 items-center justify-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full ${isEven ? 'ml-6' : 'mr-6'} md:mx-auto`}>
                {index + 1}
            </div>

            <div className="order-1 bg-card/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl w-full md:w-5/12 px-6 py-4">
                {title}
                <h4 className="mb-2 font-semibold text-lg text-cyan-400">{cardTitle}</h4>
                <p className="text-sm leading-snug tracking-wide text-gray-300 text-opacity-100">
                    {cardDetailedText}
                </p>
            </div>
        </motion.div>
    );
};

function FutureFeaturesTimeline() {
    const timelineData = [
        {
            title: <SiApple className="w-8 h-8 mb-2" />,
            cardTitle: "Apple Music Integration",
            cardDetailedText: "Variety of features incoming...",
        },
        {
            title: <SiSpotify className="w-8 h-8 mb-2 text-[#1DB954]" />,
            cardTitle: "Spotify Integration",
            cardDetailedText: "Variety of features incoming...",
        },
        {
            title: <SiYoutubemusic className="w-8 h-8 mb-2 text-[#FF0000]" />,
            cardTitle: "YouTube Music Integration",
            cardDetailedText: "Variety of features incoming...",
        },
    ]

    return (
        <div className="container mx-auto w-full h-full py-10">
            <div className="relative wrap overflow-hidden p-10 h-full">
                <div className="absolute top-1/4 left-1/2 w-60 h-55 bg-[#8b5cf6] rounded-full opacity-20 blur-[100px]" />
                <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>
                {timelineData.map((item, index) => (
                    <TimelineItem
                        key={index}
                        index={index}
                        title={item.title}
                        cardTitle={item.cardTitle}
                        cardDetailedText={item.cardDetailedText}
                    />
                ))}
            </div>
        </div>
    )
}

export default FutureFeaturesTimeline;
