import { User } from "@/lib/generated/prisma"
import ExploreHeader from "./ExploreHeader"
import SidebarStats from "./SidebarStats"
import TrendingSong from "./TrendingSong"
import { fetchAllUsersByRole } from "@/utils/actions";
import TopArtists from "@/components/ExplorePage/TopArtists";
import Link from "next/link";
import Button from "../Global/Button";
import TopPosts from "@/components/ExplorePage/TopPosts";

async function ExploreContent({ user }: { user: User | null }) {
  const topMusicians = await fetchAllUsersByRole("MUSICIAN") // for now, later get top 5 by followers or plays
  const topProducers = await fetchAllUsersByRole("PRODUCER") // for now, later get top 5 by followers or plays
  return (
    <div className="flex flex-col gap-4 w-full">
      <ExploreHeader user={user} />
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="col-span-1 lg:col-span-8 space-y-8">
            <TrendingSong />
            {/* Additional content could go here */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight">Top Musicians</h1>
              <Link href={"/explore/musicians"}>
                <Button name="View All" size="sm" classname="bg-primary text-primary-foreground shadow-lg shadow-primary/20" />
              </Link>
            </div>
            <TopArtists artists={topMusicians.slice(0, 5)} />
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight">Top Producers</h1>
              <Link href={"/explore/producers"}>
                <Button name="View All" size="sm" classname="bg-primary text-primary-foreground shadow-lg shadow-primary/20" />
              </Link>
            </div>
            <TopArtists artists={topProducers.slice(0, 5)} />
          </div>

          <div className="col-span-1 lg:col-span-4 space-y-4">
            <SidebarStats />
            <TopPosts/>
            {/* Trademark/Info */}
            <div className="px-6 text-center">
              <p className="text-[10px] text-muted-foreground/40 font-medium tracking-widest uppercase">
                © ZYR♪Q Platform 2026 • Verified Network
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ExploreContent