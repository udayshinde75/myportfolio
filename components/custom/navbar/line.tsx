"use client";
import { motion } from "framer-motion";

function Line() {
  return (
    <motion.div
      className="h-[2px] my-6 container-width bg-[length:15px_2px] bg-repeat-x"
      style={{
        backgroundImage: "repeating-linear-gradient(to right, gray 0 2px, transparent 10px 20px)",
        backgroundPosition: "0px 0px",
      }}
      animate={{
        backgroundPosition: ["5px 0px", "20px 0px"],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}


function VerticalLine() {
  return (
    <motion.div
      className="w-[2px] md:h-[100px] h-[50px] my-6 ms-16 bg-[length:2px_20px] bg-repeat-y"
      style={{
        backgroundImage: "repeating-linear-gradient(to bottom, gray 0 2px, transparent 10px 20px)",
        backgroundPosition: "0px 0px",
      }}
      animate={{
        backgroundPosition: ["0px 0px", "0px -20px"],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}


export { Line, VerticalLine };