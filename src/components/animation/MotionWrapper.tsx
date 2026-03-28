import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { type Variants } from "motion/react";

type Props = {
  children: ReactNode;
  variants: Variants;
  className?: string;
};

const MotionWrapper = ({ children, variants, className }: Props) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
