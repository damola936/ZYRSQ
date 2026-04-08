import ExploreContent from "@/components/ExplorePage/ExploreContent";
import { isUserLoggedIn } from "@/utils/actions";

export default async function ExplorePage() {
  const user = await isUserLoggedIn();

  if (!user) {
    return (
      <ExploreContent user={null} />
    )
  }

  return (
    <ExploreContent user={user} />
  );
}
