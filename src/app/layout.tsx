// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// import "@rainbow-me/rainbowkit/styles.css";
// import { headers } from 'next/headers'
// import { cookieToInitialState } from 'wagmi'
// import  config  from './ configuration';
// import { ContextProvider } from './context'

// import '@/app/globals.css';


// export const metadata: Metadata = {
//   title: 'The Simple Newspaper',
//   description: 'Decentralized newspaper for quality and timeless news. Be part of the futurnalism, be part of our DAO'
// }

// type LayoutProps = {
//   children: React.ReactNode;
// };
// const inter = Inter({ subsets: ["latin"] });

// const RootLayout: React.FC<LayoutProps> = ({children}) => {
//   const initialState = cookieToInitialState(config, headers().get('cookie'))
//   return (
//     <html lang="en">
//       <body>
//         <ContextProvider initialState={initialState}>

//               <html lang="en">

//                 <body className={inter.className}>{children}</body>

//               </html>
//         </ContextProvider>
//       </body>
//     </html>
//   )
// }

// export default RootLayout;




import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import config from "./ configuration";
import { ContextProvider } from "./context";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "The Simple Newspaper",
  description:
    "Decentralized newspaper for quality and timeless news. Be part of the futurnalism, be part of our DAO",
};

type LayoutProps = {
  children: React.ReactNode;
};
const inter = Inter({ subsets: ["latin"] });

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider initialState={initialState}>
          {/* Your application components go here */}
          {children}
        </ContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
