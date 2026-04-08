"use client";
import React, { useState } from 'react';
import { motion } from "motion/react";
import Input from "@/components/Global/Input";
import Button from "@/components/Global/Button";
import { Mail, Lock} from "lucide-react";
import Link from "next/link";
import { loginUserAction } from "@/utils/actions";
import FormContainer from "@/components/Global/FormContainer";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="w-full max-w-7xl mx-auto px-6 mt-8">
            <div className="flex flex-col justify-evenly items-center">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
                        Log In to <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent italic">ZYR♪Q</span>
                    </h2>
                    <div className="w-20 h-1 mt-2 bg-primary rounded-full"></div>
                </div>
                <div className="absolute top-3 left-1/2 w-80 h-80 bg-[#8b5cf6] rounded-full opacity-20 blur-[100px]" />

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full max-w-xl mx-auto flex flex-col gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group"
                >
                    <FormContainer action={loginUserAction}>
                    {/* Ambient Background Glows inside Card */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-accent/20 transition-colors duration-700" />

                    <div className="relative z-10 flex flex-col space-y-2 text-center mb-4">
                        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Welcome Back!</h3>
                        <p className="text-muted-foreground text-sm md:text-base font-medium">Log in to your account to continue.</p>
                    </div>

                    <div className="relative z-10 flex flex-col gap-5">
                        <Input
                            icon={<Mail className="size-5" />}
                            type="email"
                            placeholder="Enter your email address"
                            className="h-14 font-medium"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={<Lock className="size-5" />}
                            type="password"
                            placeholder="Enter your password"
                            className="h-14 font-medium"
                            value={password}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="relative z-10 pt-4">
                        <Button
                            name="Log In"
                            size="lg"
                            classname="w-full h-14 bg-linear-to-br from-primary to-accent text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all border-none text-lg"
                        />
                    </div>
                    
                    <div className="relative z-10 mt-6 text-center text-sm md:text-base text-muted-foreground font-medium">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-primary hover:text-accent font-bold transition-colors">
                            Sign up
                        </Link>
                    </div>
                    </FormContainer>
                </motion.div>
            </div>
        </div>
    );
}

export default LoginPage;