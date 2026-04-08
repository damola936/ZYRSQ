import { motion } from "motion/react";
import { Check } from "lucide-react";

interface StepItem {
    id: number;
    title: string;
}

const STEPS: StepItem[] = [
    { id: 1, title: "Account" },
    { id: 2, title: "Profession" },
    { id: 3, title: "Interests" },
    { id: 4, title: "Premium Plan" },
    { id: 5, title: "Finish" }
];

function StepsTimeline({ step }: { step: number }) {
    return (
        <div className="w-full max-w-sm md:max-w-xl mx-auto px-6 mb-16 mt-4">
            <div className="flex items-center justify-between relative">
                {/* Background Connecting Line */}
                <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[90%] h-0.75 bg-muted rounded-full z-0" />

                {/* Active Connecting Line */}
                <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[90%] h-0.75 z-0">
                    <motion.div
                        className="h-full bg-linear-to-r from-primary to-accent rounded-full drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${Math.max(0, ((step - 1) / (STEPS.length - 1)) * 100)}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>

                {/* Steps */}
                {STEPS.map((s) => {
                    const isCompleted = step > s.id;
                    const isActive = step === s.id;

                    return (
                        <div key={s.id} className="relative z-10 flex flex-col items-center">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.2 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-[3px] backdrop-blur-md transition-colors duration-400
                                    ${isActive
                                        ? 'bg-[#121212] border-accent text-accent shadow-[0_0_20px_rgba(6,182,212,0.7)]'
                                        : isCompleted
                                            ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.6)]'
                                            : 'bg-[#121212]/80 border-muted text-muted-foreground'
                                    }
                                `}
                            >
                                {isCompleted ? (
                                    <Check className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={3} />
                                ) : (
                                    <span className="text-sm md:text-base font-bold">{s.id}</span>
                                )}
                            </motion.div>

                            {/* Step Title */}
                            <motion.div
                                animate={{
                                    opacity: isActive || isCompleted ? 1 : 0.4,
                                    y: isActive ? 0 : 2,
                                }}
                                className={`absolute -bottom-9 w-max text-xs md:text-sm font-bold tracking-wide transition-colors duration-400
                                    ${isActive
                                        ? 'text-accent drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                                        : isCompleted
                                            ? 'text-primary drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]'
                                            : 'text-muted-foreground'
                                    }
                                `}
                            >
                                {s.title}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StepsTimeline;