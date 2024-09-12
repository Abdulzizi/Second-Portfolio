import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

import "./about.css";

import data from "@/app/personalData.json";
import Link from "next/link";
import { Navigation } from "@/components/nav";

const displayName = data.displayName;

export default function AboutMe() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4">
        <Navigation />
        <div className="animate-neon-glow mt-6 sm:mt-8 w-full max-w-sm sm:max-w-lg mx-4 sm:mx-8">
          <Card className="bg-[#191919] shadow-xl border-none">
            <CardContent className="p-4 sm:p-6">
              <ProfileSection />
              <Description />
              <SocialLinks />
            </CardContent>
          </Card>
        </div>
      </div>
    );
}

// Profile Section Component
const ProfileSection = () => {
  return (
    <div className="text-center">
      <div className="relative w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full"></div>
        <Image
          src="https://github.com/Abdulzizi.png"
          alt="Profile"
          className="absolute inset-2 rounded-full object-cover border-4 border-white animate-spin"
          width={192}
          height={192}
        />
      </div>
      <h1 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2 text-white">
        {displayName}
      </h1>
      <p className="text-base sm:text-xl mb-2 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Full Stack Developer
      </p>
    </div>
  );
};

// Description Component
const Description = () => {
  return (
    <p className="text-gray-300 mb-4 sm:mb-6 text-center text-sm sm:text-lg">
      I&apos;m a <span className="font-bold">Full Stack Developer</span> with a knack for building awesome web apps. When I&apos;m not coding, you&apos;ll find me lifting at the gym, gaming, reading, or pretending I know anything about nature (just there for the fresh air, honestly). Powered by coffee and fueled by a constant desire to learn and create—whether it&apos;s in tech or making content. Every day&apos;s a chance to level up, in code and in life!
    </p>
  );
};

// Social Links Component
const SocialLinks = () => {
  const socialIcons = [
    { icon: Github, label: "GitHub", url: "https://github.com/Abdulzizi" },
    { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/abduljawadazizi07" },
    { icon: Youtube, label: "YouTube", url: "https://www.youtube.com/@Abdul_Toqum." },
  ];

  return (
    <div className="flex justify-center space-x-3 sm:space-x-4">
      {socialIcons.map(({ icon: Icon, label, url }) => (
        <Link key={label} href={url} passHref>
          <Button
            variant="outline"
            size="icon"
            className="bg-white hover:bg-gradient-to-r from-blue-400 to-purple-600 hover:text-white transition-colors"
            aria-label={label}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </Link>
      ))}
    </div>
  );
};
