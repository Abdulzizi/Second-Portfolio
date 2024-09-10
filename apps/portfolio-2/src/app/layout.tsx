import { ReactNode } from 'react';

import "./globals.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import data from "@/app/personalData.json";
import ParticlesComponent from "@/components/particle";

const username = process.env.GITHUB_USERNAME || data.githubUsername;
const displayName = data.displayName || username;

interface RootLayoutProps {
  children: ReactNode;
}

/** @type {import('next').Metadata} */
export const metadata = {
  title: `${username}'s Portfolio`,
  description: `GitHub portfolio for ${displayName}`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "https://github.com/Abdulzizi.png",
      },
    ],
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout( {children}: RootLayoutProps ) {
  return (
    <html lang="en" className={`${inter.variable} ${calSans.variable}`}>
      <body className="bg-[#191919] bg-gradient-to-tl from-gray via-[#222831] to-[#393E46]">
        <ParticlesComponent />
        <main className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
