"use client";

import { MouseEvent } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

// Define types for props
interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  // Springs for smooth animation of mouse coordinates
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  // Update mouse position on mouse move
  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Generate dynamic mask image using useMotionTemplate
  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;

  // Styles for mask image
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={onMouseMove}
      className="card-container cursor-pointer overflow-hidden relative duration-700 border rounded-xl hover:bg-purple-600/10 group md:gap-8 hover:border-purple-500/50 border-pink-500"
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
        {/* First animated layer */}
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-purple-400/10 transition duration-1000 group-hover:opacity-50"
          style={style}
        />
        {/* Second animated layer */}
        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
          style={style}
        />
      </div>

      {children}
    </div>
  );
};

export default Card;
