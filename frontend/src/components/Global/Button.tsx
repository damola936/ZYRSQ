"use client"

import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";
import {useFormStatus} from "react-dom";
import {Loader2} from "lucide-react";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'name'> {
    name: React.ReactNode;
    size?: "sm" | "md" | "lg";
    classname?: string;
}

/**
 * A reusable Button component wrapping Shadcn UI Button.
 * Uses Framer Motion for hover/tap animations so they work on touch devices (iPad Pro etc.)
 */
const Button = ({ name, size = "md", classname, ...props }: ButtonProps) => {
    // Map old sizes to shadcn sizes
    const sizeMap: Record<string, "sm" | "default" | "lg"> = {
        sm: "sm",
        md: "default",
        lg: "lg",
    };
    const {pending} = useFormStatus()

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <ShadcnButton
                size={sizeMap[size]}
                className={cn(
                    "rounded-full transition-colors duration-300 cursor-pointer",
                    classname
                )}
                {...props}
            >
                {pending ? <><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait...</> : name}
            </ShadcnButton>
        </motion.div>
    );
};

export default Button;

