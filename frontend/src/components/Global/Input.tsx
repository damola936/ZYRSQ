import * as React from "react"
import { Input as ShadcnInput } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    wrapperClassName?: string;
}

/**
 * A reusable Input component wrapping Shadcn UI Input.
 * Adds support for an optional icon and glassmorphism defaults.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, wrapperClassName, type, ...props }, ref) => {
        const baseClasses = "bg-white/5 border-white/10 focus-visible:ring-primary/20 focus-visible:border-primary/50 text-white rounded-2xl transition-all duration-300 placeholder:text-muted-foreground/50";

        if (!icon) {
            return (
                <ShadcnInput 
                    type={type} 
                    className={cn(baseClasses, className)} 
                    ref={ref} 
                    {...props} 
                />
            )
        }

        return (
            <div className={cn("relative flex w-full group/input", wrapperClassName)}>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground transition-all duration-300 group-focus-within/input:text-primary group-focus-within/input:scale-110 pointer-events-none">
                    {icon}
                </div>
                <ShadcnInput
                    type={type}
                    className={cn(baseClasses, "pl-12", className)}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Input.displayName = "Input"

export default Input
