import FormContainer from "../Global/FormContainer"
import { createPostAction } from "@/utils/actions"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import { CaseUpperIcon, BookOpenIcon, Music2Icon, PlusCircleIcon } from "lucide-react";
import Input from "@/components/Global/Input";
import TextArea from "@/components/Global/TextArea"
import { PartialUser } from "@/utils/types";
import { cn } from "@/lib/utils";
import Button from "../Global/Button";

function CreatePostModal({ user }: { user: PartialUser }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [releaseId, setReleaseId] = useState("")

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl mx-auto flex flex-col gap-6 bg-slate-950/40 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
            <FormContainer action={createPostAction} className="w-full">
                {/* Dynamic Ambient Backgrounds */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/30 transition-all duration-1000" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/20 transition-all duration-1000" />

                <div className="relative z-10 flex flex-col space-y-2 text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                        <PlusCircleIcon className="size-6 text-primary" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-br from-white to-white/60">
                        Create Post
                    </h3>
                    <p className="text-muted-foreground/80 text-sm md:text-base font-medium max-w-[280px] mx-auto leading-relaxed">
                        Share your latest musical journey with your community.
                    </p>
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary/80 ml-4">Title</label>
                        <Input
                            icon={<CaseUpperIcon className="size-5" />}
                            type="text"
                            placeholder="Give your post a title..."
                            className="h-14 font-semibold text-lg bg-white/3"
                            value={title}
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary/80 ml-4">Thoughts</label>
                        <TextArea
                            icon={<BookOpenIcon className="size-5" />}
                            placeholder="What's on your mind? Share your process, inspiration, or just a shoutout..."
                            className="min-h-[140px] font-medium bg-white/3 py-4"
                            value={content}
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2 ml-4">
                            <Music2Icon className="size-4 text-primary" />
                            <label className="text-xs font-bold uppercase tracking-widest text-primary/80">Attach a release</label>
                        </div>

                        <div className="flex flex-wrap gap-3 p-1 max-h-[180px] overflow-y-auto no-scrollbar scroll-smooth">
                            {(user.releases ?? []).length > 0 ? (
                                <AnimatePresence mode="popLayout">
                                    {(user.releases ?? []).map((release) => {
                                        const isSelected = releaseId === release.id;
                                        return (
                                            <motion.label
                                                layout
                                                key={release.id}
                                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                                                whileTap={{ scale: 0.98 }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={cn(
                                                    "flex items-center gap-3 pl-2 pr-5 py-2 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden group/pill",
                                                    isSelected
                                                        ? "bg-primary border-primary text-black shadow-[0_10px_20px_rgba(var(--primary),0.2)]"
                                                        : "bg-white/3 border-white/10 text-white/50 hover:text-white hover:border-white/20"
                                                )}
                                            >
                                                <input
                                                    type="radio"
                                                    name="releaseId"
                                                    value={release.id}
                                                    className="hidden"
                                                    checked={isSelected}
                                                    onChange={(e) => setReleaseId(e.target.value)}
                                                />

                                                <div className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden shadow-lg group-hover/pill:rotate-3 transition-transform duration-300">
                                                    {release.coverUrl ? (
                                                        <img src={release.coverUrl} className="w-full h-full object-cover" alt={release.title} />
                                                    ) : (
                                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                                            <Music2Icon className="size-4 text-white/20" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-col min-w-0">
                                                    <span className={cn(
                                                        "text-sm font-bold truncate leading-tight transition-colors",
                                                        isSelected ? "text-black" : "text-white"
                                                    )}>
                                                        {release.title}
                                                    </span>
                                                    <span className={cn(
                                                        "text-[10px] uppercase tracking-tighter font-black opacity-60",
                                                        isSelected ? "text-black/70" : "text-primary"
                                                    )}>
                                                        {release.genre}
                                                    </span>
                                                </div>

                                                {isSelected && (
                                                    <motion.div
                                                        layoutId="outline"
                                                        className="absolute inset-0 border-2 border-white/30 rounded-2xl pointer-events-none"
                                                    />
                                                )}
                                            </motion.label>
                                        );
                                    })}
                                </AnimatePresence>
                            ) : (
                                <div className="w-full py-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/1">
                                    <p className="text-xs text-muted-foreground font-medium italic">No releases found. Upload a track to attach it.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            name="Publish Post"
                            classname="w-full h-14 text-lg font-black bg-white text-black hover:bg-primary hover:text-white border-none shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all duration-500"
                        />
                    </div>
                </div>
            </FormContainer>
        </motion.div>
    )
}

export default CreatePostModal
