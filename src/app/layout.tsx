import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ClerkProvider, SignIn } from '@clerk/nextjs'

import "@rainbow-me/rainbowkit/styles.css";
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import  config  from './ configuration';
import { ContextProvider } from './context'

import '@/app/globals.css';


export const metadata: Metadata = {
  title: 'The Simple Newspaper',
  description: 'Decentralized newspaper for quality and timeless news. Be part of the futurnalism, be part of our DAO'
}

type LayoutProps = {
  children: React.ReactNode;
};
const inter = Inter({ subsets: ["latin"] });

const RootLayout: React.FC<LayoutProps> = ({children}) => {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
        <ContextProvider initialState={initialState}>
            {/* <ClerkProvider> */}

              <html lang="en">

                <body className={inter.className}>{children}</body>

              </html>
              {/* </ClerkProvider> */}
        </ContextProvider>
      </body>
    </html>
  )
}

export default RootLayout;




// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//       <ClerkProvider>

//         <html lang="en">

//           <body className={inter.className}>{children}</body>

//         </html>
//       </ClerkProvider>
//   );
// }
// //