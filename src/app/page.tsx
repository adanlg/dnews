import { GetSelectedTopics } from "@/actions/Topics";
import { getUniqueTopics } from "@/actions/getStories";
import Navbar from "@/components/Navbar";
import StoryList from "@/components/StoryList";
import Image from "next/image";


export default async function Home() {
  const allTopics = await getUniqueTopics()
  const UserTags = await GetSelectedTopics()
  return (
    <main className="mx-auto ">
      <Navbar/>
      <div className="w-full mt-12">
        <StoryList allTopics={allTopics.response} UserTags={UserTags.Tags}/>
      </div>
    </main>
  );
}
