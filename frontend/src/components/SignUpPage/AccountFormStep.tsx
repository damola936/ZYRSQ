import React, { useState } from "react"
import Input from "../Global/Input"
import Button from "../Global/Button"
import { motion } from "motion/react"
import { Mail, Lock, User, UserCircle, AlertCircle } from "lucide-react"
import { accountSchema, AccountFormData } from "@/lib/validations"
import { z } from "zod"

import { faker } from "@faker-js/faker"

interface AccountFormStepProps {
    changeCurrentStep: (step: number) => void;
    userData: any;
    updateUserData: (data: any) => void;
}

function AccountFormStep({ changeCurrentStep, userData, updateUserData }: AccountFormStepProps) {
    const [errors, setErrors] = useState<Partial<Record<keyof AccountFormData, string>>>({});
    const [formData, setFormData] = useState<AccountFormData>({
        email: userData.email || "",
        password: userData.password || "",
        username: userData.username || "",
        displayName: userData.displayName || "",
    });

    const fillFields = () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const dummyData = {
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            password: "Password123!",
            username: faker.internet.username({ firstName, lastName }).toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20),
            displayName: `${firstName} ${lastName}`,
        };
        setFormData(dummyData);
        updateUserData(dummyData);
        setErrors({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when the user starts typing
        if (errors[name as keyof AccountFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleContinue = () => {
        try {
            accountSchema.parse(formData);
            updateUserData(formData);
            changeCurrentStep(2);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof AccountFormData, string>> = {};
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        newErrors[issue.path[0] as keyof AccountFormData] = issue.message;
                    }
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-xl mx-auto flex flex-col gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group"
        >
            {/* Ambient Background Glows inside Card */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-accent/20 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col space-y-2 text-center mb-4">
                <div className="flex items-center justify-center gap-4">
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Account Details</h3>
                    <button
                        onClick={fillFields}
                        type="button"
                        className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 text-primary transition-colors border border-primary/20 hover:scale-110 active:scale-95 group/btn"
                        title="Quick Fill with Dummy Data"
                    >
                        <UserCircle className="size-5 group-hover/btn:animate-pulse" />
                    </button>
                </div>
                <p className="text-muted-foreground text-sm md:text-base font-medium">Let&#39;s get started with the basics of your profile.</p>
            </div>

            <div className="relative z-10 flex flex-col gap-5">
                <div className="space-y-1">
                    <Input
                        icon={<Mail className="size-5" />}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className={cn("h-14 font-medium", errors.email && "border-red-500/50 bg-red-500/5")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs flex items-center gap-1 pl-2 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="size-3" /> {errors.email}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <Input
                        icon={<Lock className="size-5" />}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={cn("h-14 font-medium", errors.password && "border-red-500/50 bg-red-500/5")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs flex items-center gap-1 pl-2 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="size-3" /> {errors.password}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <Input
                        icon={<User className="size-5" />}
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className={cn("h-14 font-medium", errors.username && "border-red-500/50 bg-red-500/5")}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-xs flex items-center gap-1 pl-2 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="size-3" /> {errors.username}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <Input
                        icon={<UserCircle className="size-5" />}
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        placeholder="Enter your display name"
                        className={cn("h-14 font-medium", errors.displayName && "border-red-500/50 bg-red-500/5")}
                    />
                    {errors.displayName && (
                        <p className="text-red-500 text-xs flex items-center gap-1 pl-2 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="size-3" /> {errors.displayName}
                        </p>
                    )}
                </div>
            </div>

            <div className="relative z-10 pt-4">
                <Button
                    name="Continue"
                    size="lg"
                    classname="w-full h-14 bg-linear-to-br from-primary to-accent text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all border-none text-lg"
                    onClick={handleContinue}
                />
            </div>
        </motion.div>
    )
}

// Add cn helper if not imported
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}

export default AccountFormStep