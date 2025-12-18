import React from "react";
import { motion } from "framer-motion";

export default function MotionFadeIn({ children, className = "" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }} className={className}>
      {children}
    </motion.div>
  );
}
