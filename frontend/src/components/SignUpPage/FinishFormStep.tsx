import React, { useState } from "react"
import Button from "../Global/Button"
import { motion } from "motion/react"
import Input from "@/components/Global/Input";
import { Hammer } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { createUserAction } from "@/utils/actions";
import { redirect } from "next/navigation"
import { Loader2 } from "lucide-react";

interface FinishFormStepProps {
    changeCurrentStep: (step: number) => void;
    userData: any;
    updateUserData: (data: any) => void;
}

import { faker } from "@faker-js/faker"

function FinishFormStep({ changeCurrentStep, userData, updateUserData }: FinishFormStepProps) {
    const [skillsString, setSkillsString] = useState(userData.skills?.join(", ") || "");

    const [isPending, startTransition] = useTransition();

    const fillSkills = () => {
        const dummySkills = Array.from({ length: 4 }, () => faker.music.genre()).join(", ");
        setSkillsString(dummySkills);
        updateUserData({ skills: dummySkills.split(",").map(s => s.trim()) });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSkillsString(e.target.value);
    };

    const handleSubmit = (data: any) => {
        startTransition(async () => {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value as string | Blob)
            })
            const result = await createUserAction(null, formData)
            if (result.message) {
                if (result.error) {
                    toast.error(result.message)
                } else {
                    toast.success(result.message)
                    redirect("/login")
                }
            }
        })
    }

    const handleFinish = () => {
        const skillsArray = skillsString.split(",").map((s: string) => s.trim()).filter((s: string) => s !== "");
        const finalData = { ...userData, skills: skillsArray };
        updateUserData({ skills: skillsArray });
        // Manually submitting the form Data
        handleSubmit(finalData)
        console.log("Final User Data:", finalData);
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
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Add Some Skills you have</h3>
                    <button
                        onClick={fillSkills}
                        type="button"
                        className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 text-primary transition-colors border border-primary/20 hover:scale-110 active:scale-95 group/btn"
                        title="Quick Fill Skills"
                    >
                        <Hammer className="size-5 group-hover/btn:animate-pulse" />
                    </button>
                </div>
                <p className="text-muted-foreground text-sm md:text-base font-medium">Separate with comma (,) E.g mixing, mastering, vocals, guitar</p>
            </div>

            <div className="relative z-10 flex flex-col gap-5">
                <Input
                    icon={<Hammer className="size-5" />}
                    type="text"
                    value={skillsString}
                    onChange={handleChange}
                    placeholder="Enter your skills, Separated by comma (,)"
                    className="h-14 font-medium"
                />
            </div>

            <div className="relative z-10 flex flex-col gap-3 pt-4 mt-auto">
                <Button
                    name={isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Finish"}
                    size="lg"
                    classname="w-full h-14 bg-[#121212] animate-border-gradient-slow text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all text-lg"
                    onClick={handleFinish}
                />

                <Button
                    name="Back"
                    size="lg"
                    classname="w-full h-14 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-lg"
                    onClick={() => changeCurrentStep(4)}
                />
            </div>

        </motion.div>
    )
}
export default FinishFormStep