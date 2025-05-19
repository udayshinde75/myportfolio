/**
 * Line Components
 * 
 * A collection of animated line components for visual separation
 * Features:
 * - Animated horizontal and vertical lines
 * - Infinite animation using Framer Motion
 * - Responsive sizing
 * - Customizable styling
 * - Repeating gradient patterns
 * 
 * @returns {Object} Object containing Line and VerticalLine components
 */

"use client";
import { motion } from "framer-motion";

/**
 * Horizontal Line Component
 * 
 * Creates an animated horizontal line with a repeating pattern
 * Features:
 * - Animated background position
 * - Repeating gradient pattern
 * - Responsive width
 * - Infinite animation
 * 
 * @returns {JSX.Element} The horizontal line layout
 */
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

/**
 * Vertical Line Component
 * 
 * Creates an animated vertical line with a repeating pattern
 * Features:
 * - Animated background position
 * - Repeating gradient pattern
 * - Responsive height
 * - Infinite animation
 * - Mobile-first design
 * 
 * @returns {JSX.Element} The vertical line layout
 */
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