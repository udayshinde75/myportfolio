"use client";
import { motion } from "framer-motion";

function Line() {
  return (
    <motion.div
      className="h-[2px] bg-gray-400 rounded-full my-6  container-width"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ originX: 0 }}
    />
  );
};


function VerticalLine() {
  return (
    <motion.div
      className="w-[2px] h-[100px] bg-gray-400 rounded-full ms-16 my-6"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ originY: 0 }}
    />
  );
}

export { Line, VerticalLine };