"use client";
import Profile from "@/components/custom/herosection/Profile";
import ProfileActions from "@/components/custom/herosection/ProfileActions";
import { Line } from "@/components/custom/navbar/line";
import ProjectLayout from "@/components/custom/projects/project-layout";
import { useEffect, useState } from "react";

export default function Home() {

  return (
    <section className="w-full h-full flex-center flex-col">
    <Profile showProfilePicture={true} textAlignment="text-center " showButtons/>
    <Line />
   <ProjectLayout />
    </section>
  )
}
