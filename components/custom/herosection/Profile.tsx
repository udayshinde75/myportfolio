"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProfileProps {
    user:{
      name:string,
      profilePicture:string,
      bio:string,
    }
}



export default function Profile({
  user
}: ProfileProps) {

  
    console.log("Name:"+user.name)
  return (
    <section className="pt-16 pb-5 flex flex-col items-center text-center">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl"
      >
        <Image
          src={user.profilePicture}
          alt="Hero Image"
          fill
          className="object-cover"
        />
      </motion.div>
      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-6 max-w-full overflow-x-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight whitespace-nowrap">
          <span className="text-transparent bg-clip-text bg-gradient-to-r  from-gray-700 dark:from-gray-200 via-gray-500 dark:via-gray-200 to-gray-600 dark:to-gray-200 pt-16">
            Hello, I&apos;m{" "}
          </span>
          <br />
          <TypeAnimation
            sequence={[
              user.name,
              1500,
              "Web Developer",
              1500,
              "Android Developer",
              1500,
              "Software Engineer",
              1500,
              "Data Analyst",
              1500,
              "ML Engineer",
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-primary inline-block"
          />
        </h1>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">About Me</h2>
          <p className="text-muted-foreground mt-2 px-6 md:text-lg text-sm max-w-2xl mx-auto">{user.bio}</p>
        </div>
      </motion.div>
    </section>
  );
}
