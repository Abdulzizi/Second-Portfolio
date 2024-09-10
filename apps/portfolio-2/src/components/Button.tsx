// components/CustomButton.tsx

import React from 'react';
import { Button } from "@/components/ui/button";

const CustomButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  return (
    <Button className={`bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-white font-medium rounded-lg px-6 py-3 hover:opacity-80 transition-opacity ${className}`} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;