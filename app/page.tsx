"use client";
import Profile from "@/components/custom/herosection/Profile";
import ProfileActions from "@/components/custom/herosection/ProfileActions";
import Navbar from "@/components/custom/navbar/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<{ name: string, id: string }>({ name: "", id: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth/getUserByID"); // No userID
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (user.name) {
    return (
        <>
            <Navbar Name={user.name} id={user.id}/>
            <section className="w-full h-full flex-center flex-col">
            <Profile Name={user.name} />
            <ProfileActions ReadMore={true} />
            </section>
        </>
      );
  } else {
    return (
        <section className="w-full h-[100vh] flex-center flex-col">
          <p>Loading...</p>
        </section>
      );
  }
}
