"use client";
import Profile from "@/components/custom/herosection/Profile";
import ProfileActions from "@/components/custom/herosection/ProfileActions";
import Navbar from "@/components/custom/navbar/Navbar";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: Promise<{ userID?: string }>; }) {
  const [userID, setUserID] = useState<string>("");

  console.log("UserID:", userID);

  const [user, setUser] = useState<{
    name: string;
    email: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // First get the userID from params
        const resolvedParams = await params;
        const id = resolvedParams?.userID || "";
        
        if (!id) return;
        
        // Then fetch user data
        const res = await fetch(`/api/auth/getUserByID?userID=${id}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }
  
    fetchData();
  }, [params]);

  if (!user) {
    return (
      <section className="w-full h-[100vh] flex-center flex-col">
        <p>Loading...</p>
      </section>
    );
  }
  
  return (
    <>
      <Navbar Name={user.name} id={user.id} />
      <section className="w-full h-full flex-center flex-col">
        <Profile Name={user.name} />
        <ProfileActions ReadMore={true} />
      </section>
    </>
  );
}
