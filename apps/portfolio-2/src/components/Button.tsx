// components/CustomButton.tsx

import React from 'react';
import { Button } from "@/components/ui/button";

const CustomButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
  return (
    <Button className={`flex items-center text-white px-3 py-2 transition-colors rounded-md bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] font-medium hover:opacity-80 ${className}`} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
