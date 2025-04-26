// src/components/MotionButton.tsx
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface MotionButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const MotionButton: FC<MotionButtonProps> = ({ children, className, onClick, type = "button" }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;
