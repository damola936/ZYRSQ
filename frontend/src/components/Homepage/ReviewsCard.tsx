"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Star } from "lucide-react"

function ReviewsCard({ name, review, image, profession }: { name: string, review: string, image: string, profession: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="flex h-full"
        >
            <div className="w-full flex flex-col bg-card/40 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-border/40 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group">
                <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary/80 text-primary/80" />
                    ))}
                </div>

                <p className="text-foreground/80 text-base leading-relaxed mb-8 grow italic">
                    "{review}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="w-12 h-12 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-500">
                        <AvatarImage src={image} className="object-cover" />
                        <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                            {name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <h4 className="font-bold text-foreground text-sm truncate">{name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{profession}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ReviewsCard