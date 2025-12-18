import React from "react";
import { motion } from "framer-motion";

export default function HeartButton({ active = false, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className="p-1 rounded-full"
      aria-label={active ? "Unfavorite" : "Favorite"}
    >
      <motion.span
        initial={{ scale: 0.9 }}
        animate={{ scale: active ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 350 }}
        className={`text-2xl ${active ? "text-yellow-400" : "text-white"}`}
      >
        {active ? "★" : "☆"}
      </motion.span>
    </motion.button>
  );
}
