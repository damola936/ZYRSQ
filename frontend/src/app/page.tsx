import { CommunityShowcase } from "@/components/Homepage/CommunityShowcase";
import HeroSection from "@/components/Homepage/HeroSection";
import NavigationBar from "@/components/Homepage/NavigationBar";
import VideoDetailsSection from "@/components/Homepage/VideoDetailsSection";
import { ReviewsData } from "@/components/Homepage/HomePageData";
import ReviewsCard from "@/components/Homepage/ReviewsCard";
import FutureFeaturesTimeline from "@/components/Homepage/FutureFeaturesTimeline";
import PromotionalInbox from "@/components/Homepage/PromotionalInbox";
import { getUserProfile } from "@/utils/actions";

export default async function Home() {
    const user = await getUserProfile();
    return (
        <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary/30">
            <div className="relative overflow-hidden">
                {/* Background gradient overlay */}
                {/* <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-background to-background pointer-events-none" /> */}
                {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--color-primary)_0%,transparent_70%)] opacity-20 pointer-events-none" /> */}
                <div className="absolute top-3 left-1/2 w-80 h-80 bg-[#8b5cf6] rounded-full opacity-20 blur-[100px]" />
                <div className="relative z-10">
                    <div className="mx-auto max-w-5xl md:max-w-7xl">
                        <NavigationBar user={user} />
                    </div>
                    <HeroSection />
                    <div className="mt-16">
                        <VideoDetailsSection />
                    </div>
                    <div className="mt-16 md:mt-24">
                        <CommunityShowcase />
                    </div>
                    <div className="mt-24 md:mt-32 w-full max-w-7xl mx-auto px-6">
                        <div className="flex flex-col items-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 text-center">
                                What Our Users Say
                            </h2>
                            <div className="w-20 h-1 bg-primary rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                            {ReviewsData.map((item, index) => (
                                <ReviewsCard key={index} {...item} />
                            ))}
                        </div>
                    </div>
                    <div className="mt-24 md:mt-32 w-full max-w-7xl mx-auto px-6">
                        <div className="flex flex-col items-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 text-center">
                                Future Features
                            </h2>
                            <div className="w-20 h-1 bg-primary rounded-full"></div>
                        </div>
                        <FutureFeaturesTimeline />
                    </div>
                    <div className="mt-24 md:mt-32 w-full max-w-7xl mx-auto px-6 mb-16">
                        <PromotionalInbox />
                    </div>

                </div>
            </div>
            <footer className="w-full border-t border-t-primary/20 py-10 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <div className="text-2xl font-black tracking-tighter text-primary">ZYR♪Q</div>
                <p className="text-center text-muted-foreground text-sm">Empowering the next generation of digital collaborators.</p>
                <p className="text-center text-muted-foreground text-[10px] mt-4 opacity-50">©️ZYR♪Q 2026</p>
            </footer>
        </div>
    );
}
