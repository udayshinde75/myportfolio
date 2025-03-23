"use client";
import Profile from "@/components/custom/herosection/Profile";
import ProfileActions from "@/components/custom/herosection/ProfileActions";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { userID?: string } }) {
  const userID = params?.userID || ""; // If no userID, use default user
  console.log("UserID:", userID);

  const [user, setUser] = useState<{ name: string }>({ name: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/auth/getUserByID?userID=${userID}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userID]);

  return (
    <section className="w-full h-full flex-center flex-col">
      {user.name ? (
        <>
          <Profile Name={user.name} />
          <ProfileActions ReadMore={true} />
        </>
      ) : (
        <p>Loading user...</p>
      )}
    </section>
  );
}
