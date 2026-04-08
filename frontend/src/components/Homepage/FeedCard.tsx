import { Music2, Heart, MessageCircle } from "lucide-react";

interface FeedItem {
    id: string;
    user: string;
    userType: "Musician" | "Producer" | "Listener";
    action: string;
    track?: string;
    time: string;
    avatar: string | React.ReactNode;
}

const feedItems: FeedItem[] = [
    {
        id: "1",
        user: "Lex",
        userType: "Musician",
        action: "followed you",
        time: "Now",
        avatar: "L"
    },
    {
        id: "2",
        user: "Your track",
        userType: "Musician",
        action: '"City Lights" was added to a playlist',
        track: "City Lights",
        time: "2 hours ago",
        avatar: <Music2 className="w-5 h-5" />
    },
    {
        id: "3",
        user: "Diana",
        userType: "Musician",
        action: "followed you",
        time: "3 hours ago",
        avatar: "D"
    }
];

export function FeedCard() {
    return (
        <div className="bg-card/40 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-border/40 hover:border-primary/30 hover:shadow-xl transition-all duration-500 w-full max-w-[280px] flex flex-col">
            <h3 className="text-foreground font-semibold mb-5">Feed</h3>
            <div className="space-y-4">
                {feedItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center shrink-0 text-sm">
                            {item.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground/80 leading-relaxed">
                                <span className="text-foreground font-semibold">{item.user}</span>
                                {item.userType !== "Musician" && (
                                    <span className="text-muted-foreground text-xs"> ({item.userType})</span>
                                )}
                                {" "}{item.action}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1.5">{item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
