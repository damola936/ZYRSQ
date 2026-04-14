"use client";

import React from "react";
import { PenLine, Plus } from "lucide-react";
import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreatePostModal from "./CreatePostModal";
import { PartialUser } from "@/utils/types";

export default function CreatePostFAB({ user }: { user: PartialUser }) {
    return (
        <div className="fixed bottom-8 right-8 z-60 md:bottom-12 md:right-12">
            <Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <motion.button
                                initial={{ scale: 0.5, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.1,
                                    y: -5,
                                    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
                                }}
                                whileTap={{ scale: 0.9 }}
                                className="group relative flex h-14 w-14 items-center cursor-pointer justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-5px_rgba(139,92,246,0.3)] transition-all duration-300 md:h-16 md:w-16"
                                aria-label="Create Post"
                            >
                                {/* Dynamic background glow */}
                                <div className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative">
                                    <PenLine className="h-6 w-6 md:h-7 md:w-7 transition-all duration-300 group-hover:rotate-6 group-hover:-translate-y-0.5" />
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground border-2 border-primary shadow-lg"
                                    >
                                        <Plus className="h-3 w-3" />
                                    </motion.div>
                                </div>
                            </motion.button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-foreground text-background font-medium py-2 px-3">
                        <p>Create Post</p>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                    <CreatePostModal user={user} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
