"use client"
import { useState, useEffect } from "react";
import Button from "../Global/Button";
import Link from "next/link";

function HeroSection() {
    const heroTexts = [
        "Connect with Producers",
        "Share your music",
        "Discover new music",
        "Grow Your Music Career",
        "Find a Community",
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
        }, 3000); // Matches the 3s animation duration in globals.css
        return () => clearInterval(interval);
    }, [heroTexts.length]);
    return (
        <main className="flex flex-col items-center justify-center pt-20 pb-12 px-4">
            <div className="text-center space-y-8 max-w-4xl">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                    Pronounced <span className="text-primary italic">&#34;Zee&#34;-Y-R-S-Q</span>
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-3xl md:text-5xl font-semibold text-muted-foreground">
                    <span>A place to</span>
                    <div className="relative h-16 md:h-20 overflow-hidden min-w-87.5 md:min-w-137.5">
                        <span
                            key={index}
                            className="absolute inset-0 flex items-center justify-center md:justify-start text-primary font-bold animate-slide-down-in"
                        >
                            {heroTexts[index]}
                        </span>
                    </div>
                </div>

                <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/signup">
                        <Button
                            name="Join the Community"
                            size="lg"
                            classname="bg-linear-to-br from-[#8b5cf6] to-[#ec4899] text-secondary-foreground shadow-lg shadow-secondary/30 hover:shadow-secondary/40 px-10 text-xl"
                        />
                    </Link>
                    <Button
                        name="Explore Music"
                        size="lg"
                        classname="bg-transparent border-2 border-accent text-accent hover:bg-linear-to-br from-[#8b5cf6] to-[#06b6d4] shadow-lg shadow-accent/30 hover:shadow-accent/40 hover:text-accent-foreground px-10 text-xl"
                    />
                </div>
            </div>
        </main>
    )
}
export default HeroSection