import Button from "../Global/Button"
import { motion } from "motion/react"
import { useState } from "react"
import { Check } from "lucide-react"

const MUSIC_GENRES = [
    "Acoustic", "Afrobeat", "Ambient", "Blues", "Classical",
    "Country", "Disco", "Drum & Bass", "Dubstep", "Electronic",
    "Folk", "Funk", "Gospel", "Hip Hop", "House",
    "Indie", "Jazz", "K-Pop", "Latin", "Metal",
    "Pop", "Punk", "R&B", "Reggae", "Rock",
    "Soul", "Techno", "Trance"
];

interface InterestsFormStepProps {
    changeCurrentStep: (step: number) => void;
    userData: any;
    updateUserData: (data: any) => void;
}

import { faker } from "@faker-js/faker"

function InterestsFormStep({ changeCurrentStep, userData, updateUserData }: InterestsFormStepProps) {
    const [selectedGenres, setSelectedGenres] = useState<string[]>(userData.genres || [])

    const fillInterests = () => {
        const randomGenres = faker.helpers.arrayElements(MUSIC_GENRES, { min: 3, max: 5 });
        setSelectedGenres(randomGenres);
        updateUserData({ genres: randomGenres });
    }

    const toggleGenre = (genre: string) => {
        setSelectedGenres(prev => {
            if (prev.includes(genre)) {
                return prev.filter(g => g !== genre);
            }
            if (prev.length < 5) {
                return [...prev, genre];
            }
            return prev;
        });
    }

    const handleContinue = () => {
        updateUserData({ genres: selectedGenres });
        changeCurrentStep(4);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl mx-auto flex flex-col gap-8 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group"
        >
            {/* Ambient Background Glows inside Card */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-accent/20 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col space-y-2 text-center mb-2">
                <div className="flex items-center justify-center gap-4">
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Your Interests</h3>
                    <button
                        onClick={fillInterests}
                        type="button"
                        className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 text-primary transition-colors border border-primary/20 hover:scale-110 active:scale-95 group/btn"
                        title="Quick Pick Interests"
                    >
                        <Check className="size-5 group-hover/btn:animate-spin" />
                    </button>
                </div>
                <p className="text-muted-foreground text-sm md:text-base font-medium">Select up to 5 music genres you enjoy most ({selectedGenres.length}/5).</p>
            </div>

            <div className="relative z-10 flex flex-wrap justify-center gap-3">
                {MUSIC_GENRES.map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    const isDisabled = selectedGenres.length >= 5 && !isSelected;

                    return (
                        <div
                            key={genre}
                            onClick={() => {
                                if (!isDisabled) toggleGenre(genre);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 border
                                ${isSelected
                                    ? 'border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] -translate-y-0.5 cursor-pointer'
                                    : isDisabled
                                        ? 'border-white/5 bg-white/5 text-white/30 cursor-not-allowed'
                                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-accent/40 hover:text-white cursor-pointer'
                                }
                            `}
                        >
                            {isSelected && <Check className="size-4 text-primary" />}
                            {genre}
                        </div>
                    );
                })}
            </div>

            <div className="relative z-10 flex flex-col gap-3 pt-4 mt-auto">
                <Button
                    name="Continue"
                    size="lg"
                    disabled={selectedGenres.length === 0}
                    classname={`w-full h-14 font-bold rounded-2xl shadow-xl transition-all border-none text-lg
                        ${selectedGenres.length > 0
                            ? 'bg-linear-to-br from-primary to-accent text-white shadow-primary/20 hover:shadow-primary/40'
                            : 'bg-white/10 text-muted-foreground shadow-none cursor-not-allowed'
                        }`}
                    onClick={handleContinue}
                />
                
                <Button
                    name="Back"
                    size="lg"
                    classname="w-full h-14 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-lg"
                    onClick={() => changeCurrentStep(2)}
                />
            </div>
        </motion.div>
    );
}

export default InterestsFormStep;