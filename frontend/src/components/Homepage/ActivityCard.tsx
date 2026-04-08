import { Play } from "lucide-react";

interface Activity {
    id: string;
    user: string;
    role: string;
    track: string;
    message: string;
    avatar: string;
}

const activities: Activity[] = [
    {
        id: "1",
        user: "Aisling",
        role: "Musician",
        track: "Lunar Echoes",
        message: "Shared new track:",
        avatar: "A"
    },
    {
        id: "2",
        user: "Aisling",
        role: "Musician",
        track: "Lunar Echoes",
        message: "Shared new track:",
        avatar: "A"
    },
    {
        id: "3",
        user: "Benny P",
        role: "Producer",
        track: "Chorus",
        message: "Awesome production! Maybe tighten the bass in the",
        avatar: "B"
    },
    {
        id: "4",
        user: "Mia",
        role: "Listener",
        track: "",
        message: "Loving this vibe!",
        avatar: "M"
    }
];

export function ActivityCard() {
    return (
        <div className="bg-card/40 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-border/40 hover:border-primary/30 hover:shadow-xl transition-all duration-500 w-full max-w-[280px] space-y-3 flex flex-col">
            {activities.map((activity, index) => (
                <div
                    key={activity.id}
                    className={`p-3 rounded-xl ${index === 3 ? "border-2 border-primary" : "border border-border/30"
                        } bg-background/60 shadow-sm`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-sm">
                            {activity.avatar}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{activity.user}</p>
                            <p className="text-xs text-muted-foreground">({activity.role})</p>
                        </div>
                    </div>
                    <p className="text-xs text-foreground/80 mt-1 leading-relaxed">
                        {activity.message}
                        {activity.track && (
                            <span className="text-foreground font-semibold"> "{activity.track}"</span>
                        )}
                    </p>
                </div>
            ))}
        </div>
    );
}
