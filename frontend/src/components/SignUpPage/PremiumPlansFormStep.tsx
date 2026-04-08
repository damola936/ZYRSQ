import Button from "../Global/Button"
import { motion } from "motion/react"
import { useState } from "react"
import { Check, Music, Star, Zap } from "lucide-react"

const PREMIUM_PLANS = [
    {
        id: 'free',
        name: 'Basic Listener',
        price: 'Free',
        description: 'Get started with essential features.',
        features: ['Ad-supported listening', 'Standard audio quality', 'Limited skips'],
        icon: Music,
        tier: 'base'
    },
    {
        id: 'creator',
        name: 'Creator Pro',
        price: '$9.99/mo',
        description: 'Perfect for upcoming artists and producers.',
        features: ['Ad-free listening', 'High-quality audio', 'Unlimited uploads', 'Advanced analytics'],
        icon: Star,
        tier: 'medium',
        isPopular: true
    },
    {
        id: 'studio',
        name: 'Studio Ultra',
        price: '$19.99/mo',
        description: 'The ultimate toolset for professionals.',
        features: ['Lossless audio quality', 'Priority distribution', 'Exclusive plugin access', 'Dedicated support'],
        icon: Zap,
        tier: 'pro'
    }
]

interface PremiumPlansFormStepProps {
    changeCurrentStep: (step: number) => void;
    userData: any;
    updateUserData: (data: any) => void;
}

import { faker } from "@faker-js/faker"

function PremiumPlansFormStep({ changeCurrentStep, userData, updateUserData }: PremiumPlansFormStepProps) {
    const [selectedPlan, setSelectedPlan] = useState<string>(userData.planId || 'creator') // Default to existing or middle tier

    const fillPlan = () => {
        const randomPlan = faker.helpers.arrayElement(PREMIUM_PLANS).id;
        setSelectedPlan(randomPlan);
        updateUserData({ planId: randomPlan });
    }

    const handleContinue = () => {
        updateUserData({ planId: selectedPlan });
        changeCurrentStep(5);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full mb-10 max-w-5xl mx-auto flex flex-col gap-8 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group"
        >
            {/* Ambient Background Glows inside Card */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/20 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col space-y-2 text-center mb-2">
                <div className="flex items-center justify-center gap-4">
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Choose Your Journey</h3>
                    <button
                        onClick={fillPlan}
                        type="button"
                        className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 text-primary transition-colors border border-primary/20 hover:scale-110 active:scale-95 group/btn"
                        title="Quick Pick Plan"
                    >
                        <Zap className="size-5 group-hover/btn:animate-bounce" />
                    </button>
                </div>
                <p className="text-muted-foreground text-sm md:text-base font-medium">Select a plan that best fits your musical ambitions.</p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {PREMIUM_PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    const Icon = plan.icon;

                    // Compute dynamic styling based on tier
                    let cardStyles = '';
                    let borderStyles = '';
                    let glowStyles = '';

                    if (plan.tier === 'base') {
                        cardStyles = isSelected ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10';
                        borderStyles = isSelected ? 'border-white/40' : 'border-white/10';
                        glowStyles = 'none';
                    } else if (plan.tier === 'medium') {
                        cardStyles = isSelected ? 'bg-primary/10' : 'bg-white/5 hover:bg-primary/5';
                        borderStyles = isSelected ? 'border-primary' : 'border-white/10 hover:border-primary/50';
                        glowStyles = isSelected ? '0 0 30px rgba(139,92,246,0.3)' : 'none';
                    } else if (plan.tier === 'pro') {
                        cardStyles = isSelected ? 'bg-accent/10' : 'bg-white/5 hover:bg-accent/5';
                        borderStyles = isSelected ? 'border-accent' : 'border-white/10 hover:border-accent/50';
                        glowStyles = isSelected ? '0 0 30px rgba(236,72,153,0.3)' : 'none';
                    }

                    return (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            style={{ boxShadow: glowStyles }}
                            className={`relative flex flex-col p-6 md:p-8 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden
                                ${cardStyles} ${borderStyles} ${isSelected ? 'scale-105 z-20 border-2' : 'scale-100 opacity-80 hover:opacity-100 z-10 hover:-translate-y-2 border-2'}
                            `}
                        >
                            {/* Decorative background gradient for higher tiers */}
                            {plan.tier === 'pro' && (
                                <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-transparent opacity-50 pointer-events-none" />
                            )}
                            {plan.tier === 'medium' && (
                                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent opacity-50 pointer-events-none" />
                            )}

                            {plan.isPopular && isSelected && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-primary to-accent" />
                            )}

                            {plan.isPopular && (
                                <span className="absolute top-4 right-4 bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/30">
                                    Most Popular
                                </span>
                            )}

                            <div className="relative z-10 mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border
                                    ${plan.tier === 'base' ? 'bg-white/10 border-white/20 text-white' :
                                        plan.tier === 'medium' ? 'bg-primary/20 border-primary/30 text-primary' :
                                            'bg-accent/20 border-accent/30 text-accent'}
                                `}>
                                    <Icon className="size-6" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-1">{plan.name}</h4>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-white">{plan.price}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                            </div>

                            <div className="relative z-10 grow space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className={`mt-0.5 rounded-full p-1 shrink-0
                                            ${plan.tier === 'base' ? 'bg-white/10 text-white' :
                                                plan.tier === 'medium' ? 'bg-primary/20 text-primary' :
                                                    'bg-accent/20 text-accent'}
                                        `}>
                                            <Check className="size-3" />
                                        </div>
                                        <span className="text-sm text-white/90 leading-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto relative z-10">
                                <div className={`w-full py-3 rounded-xl text-center font-bold text-sm transition-all border
                                    ${isSelected
                                        ? plan.tier === 'base'
                                            ? 'bg-white text-black border-transparent'
                                            : plan.tier === 'medium'
                                                ? 'bg-primary text-white border-transparent'
                                                : 'bg-accent text-white border-transparent'
                                        : 'bg-transparent text-white border-white/20 group-hover:bg-white/5'}
                                `}>
                                    {isSelected ? 'Selected' : 'Select Plan'}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="relative z-10 flex flex-col gap-3 pt-4 mt-auto">
                <Button
                    name="Continue"
                    size="lg"
                    disabled={!selectedPlan}
                    classname={`w-full h-14 font-bold rounded-2xl shadow-xl transition-all border-none text-lg
                        ${selectedPlan
                            ? 'bg-linear-to-br from-primary to-accent text-white shadow-primary/20 hover:shadow-primary/40'
                            : 'bg-white/10 text-muted-foreground shadow-none cursor-not-allowed'
                        }`}
                    onClick={handleContinue}
                />

                <Button
                    name="Back"
                    size="lg"
                    classname="w-full h-14 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-lg"
                    onClick={() => changeCurrentStep(3)}
                />
            </div>
        </motion.div>
    );
}

export default PremiumPlansFormStep;