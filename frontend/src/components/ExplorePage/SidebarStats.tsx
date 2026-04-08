import { Disc, Users, Zap } from "lucide-react"

const SidebarStats = () => {
  return (
    <div className="bg-card/30 backdrop-blur-md rounded-3xl p-5 border border-border/50 shadow-xl">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">Live Statistics</h3>
      <div className="space-y-4">
        {[
          { label: "Total Collaborators", value: "24.8k", icon: Users, color: "text-primary" },
          { label: "Active Project Sessions", value: "1,240", icon: Zap, color: "text-accent" },
          { label: "Hottest Genre", value: "Synthwave", icon: Disc, color: "text-white" }
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-1.5 rounded-xl transition-all">
            <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${stat.color} group-hover:scale-105 transition-transform`}>
              <stat.icon className="size-4" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <p className="text-lg font-black tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Server Load</span>
          <span className="text-[9px] font-bold text-accent uppercase">Optimal</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="w-[65%] h-full bg-linear-to-r from-primary to-accent rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default SidebarStats
