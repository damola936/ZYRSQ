import Button from "../Global/Button"
import { motion } from "motion/react"
import Image from "next/image"
import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

const PROFESSIONS = [
    { id: 'musician', label: 'Musician', image: '/images/musician technicolor.png' },
    { id: 'producer', label: 'Producer', image: '/images/producer technicolor.png' },
    { id: 'listener', label: 'Listener', image: '/images/listener technicolor.png' },
]

interface ProfessionFormStepProps {
    changeCurrentStep: (step: number) => void;
    userData: any;
    updateUserData: (data: any) => void;
}

import { faker } from "@faker-js/faker"

function ProfessionFormStep({ changeCurrentStep, userData, updateUserData }: ProfessionFormStepProps) {
    const [selectedProfession, setSelectedProfession] = useState<string | null>(userData.role || null)

    const fillProfession = () => {
        const randomProf = faker.helpers.arrayElement(PROFESSIONS).id;
        setSelectedProfession(randomProf);
        updateUserData({ role: randomProf.toUpperCase() });
    }

    const handleContinue = () => {
        if (selectedProfession) {
            updateUserData({ role: selectedProfession.toUpperCase() });
            changeCurrentStep(3);
        }
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
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Profession Details</h3>
                    <button
                        onClick={fillProfession}
                        type="button"
                        className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 text-primary transition-colors border border-primary/20 hover:scale-110 active:scale-95 group/btn"
                        title="Quick Pick Profession"
                    >
                        <CheckCircle2 className="size-5 group-hover/btn:animate-bounce" />
                    </button>
                </div>
                <p className="text-muted-foreground text-sm md:text-base font-medium">How do you interact with music?</p>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {PROFESSIONS.map((prof) => {
                    const isSelected = selectedProfession?.toLowerCase() === prof.id.toLowerCase();

                    return (
                        <div
                            key={prof.id}
                            onClick={() => setSelectedProfession(prof.id)}
                            className={`group/prof relative flex flex-col gap-4 items-center p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden
                                ${isSelected
                                    ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent/40 mt-0 hover:-translate-y-1'
                                }
                            `}
                        >
                            {/* Selection indicator */}
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute top-3 right-3 z-20 text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                                >
                                    <CheckCircle2 className="size-6 fill-white" />
                                </motion.div>
                            )}

                            <div className={`relative w-full aspect-square rounded-xl overflow-hidden border transition-colors duration-300
                                ${isSelected ? 'border-primary/50' : 'border-white/10 group-hover/prof:border-accent/30'}
                            `}>
                                <div className="absolute inset-0 bg-black/20 group-hover/prof:bg-transparent transition-colors duration-300 z-10" />
                                <Image
                                    src={prof.image}
                                    alt={prof.label}
                                    fill
                                    className={`object-cover transition-transform duration-700
                                        ${isSelected ? 'scale-110' : 'group-hover/prof:scale-110'}
                                    `}
                                />
                            </div>

                            <p className={`font-bold text-base md:text-lg transition-colors
                                ${isSelected ? 'text-primary' : 'text-white group-hover/prof:text-white'}
                            `}>
                                {prof.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="relative z-10 pt-4 mt-auto space-y-3">
                <Button
                    name="Continue"
                    size="lg"
                    disabled={!selectedProfession}
                    classname={`w-full h-14 font-bold rounded-2xl shadow-xl transition-all border-none text-lg
                        ${selectedProfession
                            ? 'bg-linear-to-br from-primary to-accent text-white shadow-primary/20 hover:shadow-primary/40'
                            : 'bg-white/10 text-muted-foreground shadow-none cursor-not-allowed'
                        }`}
                    onClick={handleContinue}
                />
                <Button
                    name="Back"
                    size="lg"
                    classname="w-full h-14 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-lg"
                    onClick={() => changeCurrentStep(1)}
                />
            </div>
        </motion.div>
    );
}

export default ProfessionFormStep;