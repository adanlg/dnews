import { GetSelectedTopics } from "@/actions/Topics";
import { getUniqueTopics } from "@/actions/getStories";
import Navbar from "@/components/Navbar";
import StoryList from "@/components/StoryList";
import Image from "next/image";
import { ThemeProvider } from "next-themes";

// import '@rainbow-me/rainbowkit/styles.css';
// import {
//   RainbowKitProvider,
// } from '@rainbow-me/rainbowkit';
// import { WagmiProvider } from 'wagmi';
// import {
//   mainnet,
//   polygon,
//   optimism,
//   arbitrum,
//   base,
// } from 'wagmi/chains';
// import {
//   QueryClientProvider,
//   QueryClient,
// } from "@tanstack/react-query";
// import config from "./config";

// const queryClient = new QueryClient();

export default async function Home() {
  const allTopics = await getUniqueTopics()
  const UserTags = await GetSelectedTopics()
  return (
    <main className="mx-auto bg-stone-100">
    {/* <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider> */}
      <Navbar/>
      <div className="">
        
      {/* <ThemeProvider enableSystem ={true} attribute="class"> */}

        <StoryList allTopics={allTopics.response} UserTags={UserTags.Tags}/>

      {/* </ThemeProvider> */}

      </div>
      {/* </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider> */}
    </main>
  );
}
