import { Button } from "../ui/button";

interface Producer {
    id: string;
    name: string;
    avatar: string;
}

const producers: Producer[] = [
    { id: "1", name: "Alex", avatar: "A" },
    { id: "2", name: "Jordan", avatar: "J" },
    { id: "3", name: "Sam", avatar: "S" },
];

const genres = ["Electric-Pop", "Lo-fi", "Indie Rock"];

export function ProducersCard() {
    return (
        <div className="bg-card/40 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-border/40 hover:border-primary/30 hover:shadow-xl transition-all duration-500 w-full max-w-[260px] flex flex-col">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-foreground font-semibold">Featured Producers</h3>
                <button className="text-muted-foreground hover:text-foreground transition-colors">×</button>
            </div>

            <div className="space-y-3 mb-5">
                {producers.map((producer) => (
                    <div key={producer.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-primary-foreground font-medium">
                                {producer.avatar}
                            </div>
                            <span className="text-sm font-medium text-foreground">{producer.name}</span>
                        </div>
                        <Button
                            size="sm"
                            className="px-4 py-1 text-xs"
                            style={{
                                background: '#ec4899',
                                color: 'white',
                                borderRadius: '8px',
                            }}
                        >
                            Contact
                        </Button>
                    </div>
                ))}
            </div>

            <div className="border-t border-border/40 pt-4">
                <h4 className="text-sm font-semibold text-foreground/90 mb-3">Top Genres</h4>
                <div className="space-y-2.5">
                    {genres.map((genre, index) => (
                        <div key={index} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                            {genre}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
