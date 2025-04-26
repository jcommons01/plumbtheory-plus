// src/components/MotionCard.tsx
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface MotionCardProps {
  children: ReactNode;
  className?: string;
}

const MotionCard: FC<MotionCardProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;
