import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";

import { RecentActivity } from "@/components/recent-activity";
import ProfileOrganizations from "@/components/orgs";

import { getUser } from "@/app/dataFetch";
import data from "@/app/personalData.json";

// Define types for the user data
interface User {
  name?: string;
  avatar_url?: string;
  bio?: string;
}

// Define types for the props of UserIcon and UserText
interface AsyncComponentProps {
  promise: Promise<User>;
}

export default function Home() {
  return (
    <Suspense fallback={<p className="text-lg text-zinc-500">Loading...</p>}>
      <LandingComponent />
    </Suspense>
  );
}

const UserIcon: React.FC<AsyncComponentProps> = async ({ promise }) => {
  const user = await promise;

  return (
    <Image 
      alt='👨‍💻' 
      width={100} 
      height={100} 
      src={user.avatar_url || data.avatarUrl} 
      className="float-right rounded-3xl mx-4" 
    />
  );
};

const UserText: React.FC<AsyncComponentProps> = async ({ promise }) => {
  const user = await promise;

  if (!user) {
    return null;
  }

  return (
    <p>
      Hello there, You can call me {user.name || data.displayName}{'. '}{user.bio}
    </p>
  );
};

const LandingComponent: React.FC = async () => {
  const username = process.env.GITHUB_USERNAME || data.githubUsername;
  const promise = getUser(username);

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden min-h-screen">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fadeOut animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <h1 className="flex items-center z-10 text-4xl font-bold hover:scale-110 text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          {username}
        </span>
        <UserIcon promise={promise} />
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fadeOut animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-lg text-zinc-500">
          <Suspense fallback={<p>Loading...</p>}>
            <UserText promise={promise} />
            <ProfileOrganizations username={username} />
            <RecentActivity username={username} />
          </Suspense>
        </h2>
      </div>
    </div>
  );
};