"use client"
import Input from "../Global/Input"
import Button from "../Global/Button"
import { motion } from "motion/react"
import { Mail, Sparkles } from "lucide-react"

function PromotionalInbox() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto px-4"
        >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/3 backdrop-blur-xl p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
                {/* Glowing Background Orbs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/30 transition-colors duration-700" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-accent/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/30 transition-colors duration-700" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs md:text-sm font-semibold uppercase tracking-wider shadow-inner"
                    >
                        <Sparkles className="size-4 animate-pulse" />
                        <span>Stay Ahead of the Beat</span>
                    </motion.div>

                    {/* Text Content */}
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
                            Join the <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent italic">ZYR♪Q Circle</span>
                        </h2>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
                            The future of collaborative music is here. Get exclusive updates and early access features before anyone else.
                        </p>
                    </div>

                    {/* Input Group */}
                    <div className="flex flex-col sm:flex-row items-stretch w-full max-w-lg gap-3 pt-4">
                        <Input
                            icon={<Mail className="size-5" />}
                            wrapperClassName="flex-1"
                            placeholder="Enter your email address"
                            className="h-14"
                        />
                        <Button
                            name="Connect Now"
                            size="lg"
                            classname="h-14 px-10 bg-linear-to-br from-primary to-accent text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all border-none shrink-0"
                        />
                    </div>

                    {/* Trust Indicator */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/60 italic font-medium">
                        <div className="size-1.5 rounded-full bg-green-500/50 animate-pulse" />
                        <p>No spam. No noise. Just pure inspiration.</p>
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-4 left-4 size-8 border-t-2 border-l-2 border-white/5 rounded-tl-xl" />
                <div className="absolute bottom-4 right-4 size-8 border-b-2 border-r-2 border-white/5 rounded-br-xl" />
            </div>
        </motion.div>
    )
}
export default PromotionalInbox
