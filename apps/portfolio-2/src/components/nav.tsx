"use client";

import { ArrowLeftIcon } from "@primer/octicons-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null); // Ensure ref is typed correctly
  const [isIntersecting, setIsIntersecting] = useState<boolean>(true); // Use boolean type for state

  useEffect(() => {
    if (!ref.current) return;

    // Create an intersection observer to detect when header is intersecting
    const observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect(); 
    };
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500 border-zinc-800"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          {/* Navigation Links */}
          <nav className="flex justify-between gap-8 text-base">
            <Link
              href="/about"
              className="duration-200 text-zinc-400 hover:text-zinc-100"
            >
              About
            </Link>
            <Link
              href="/project"
              className="duration-200 text-zinc-400 hover:text-zinc-100"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="duration-200 text-zinc-400 hover:text-zinc-100"
            >
              Contact
            </Link>
          </nav>

          {/* Back Button */}
          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100"
            aria-label="Go Back"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};
