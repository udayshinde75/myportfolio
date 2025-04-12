"use client"

import Career from "@/components/custom/about/Career";
import Education from "@/components/custom/about/Education";
import Profile from "@/components/custom/herosection/Profile";
import ProfileActions from "@/components/custom/herosection/ProfileActions";
import { Line } from "@/components/custom/navbar/line";
import { useEffect, useState } from "react";
export default function AboutPage() {
  const [user, setUser] = useState({
      name: "",
      email: "",
      profilePicture: "",
      resumeLink: "",
      bio: "",
    })
        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const res = await fetch("/api/home/profile");
                    const data = await res.json();
                    if (res.ok) {
                      setUser({
                        name: data.name || "",
                        email: data.email || "",
                        profilePicture: data.profilePicture || "",
                        resumeLink: data.resumeLink || "",
                        bio: data.bio || "",
                      })
                    } else {
                        console.log((data.error) || "Could not fetch user data!");
                    }
                } catch(err) {
                    console.log("Error in loading profile on home page : "+ err)
                }
            };
            fetchUser();
        }, []);
  if (user.name) {
      return (
        <section className="w-full h-full flex-center flex-col">
        <Profile user={user} textAlignment="text-justify" showProfilePicture={false}/>
        <Line />
        <Career />
        <Line />
        <Education />
        <ProfileActions ReadMore={false} user={user}/>
      </section>
        );
    } else {
      return (
          <section className="w-full min-h-screen flex-center flex-col">
            <p>Loading...</p>
          </section>
        );
    }
}
