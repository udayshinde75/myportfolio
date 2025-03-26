'use client'

import LoginForm from "@/components/custom/auth/login-form";
import SimpleFooter from "@/components/custom/footer/SimpleFooter";
//import { useEffect, useState } from "react";

export default function Home() {
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   id: "",
  // });

// Set the default userID from the environment variable if userID is empty
  //const userID = process.env.NEXT_PUBLIC_OWNER || "";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("/api/auth/getUserByID"); // No userID
  //       if (!res.ok) throw new Error("User not found");
  //       const data = await res.json();
  //       setUser(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const secondPara =
    "🎉 Log in now and take charge of your portfolio! Keep your profile updated by adding your latest accomplishments, showcasing new projects, and highlighting your growing skill set. Whether you've completed a major milestone, launched an exciting project, earned a certification, or gained valuable experience, your journey deserves to be seen. Stay ahead by keeping your portfolio fresh, engaging, and ready for potential clients, employers, or collaborators. Don’t let your hard work go unnoticed—keep building, sharing, and inspiring others with your success! 🚀";
  return (
    <>
      <section className="w-full h-[90vh] lg:mt-0 mt-10 flex-center gap-y-6 flex-col lg:flex-row">
        <SimpleFooter FirstPara="" SecondPara={secondPara} />
        <LoginForm />
      </section>
    </>
  );
}
