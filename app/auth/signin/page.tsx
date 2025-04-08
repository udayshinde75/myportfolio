'use client'

import LoginForm from "@/components/custom/auth/login-form";
import SimpleFooter from "@/components/custom/footer/SimpleFooter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
//import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  //Check if any user is logged in
  useEffect(() => {
    const checkIsUserLoggedIn = async () => {
      try {
        const response = await fetch("/api/auth/profileinfo");
        if (response.ok) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      } finally { 
        setLoading(false);
      }
    };
    checkIsUserLoggedIn();
  },[router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const secondPara =
    "🎉 Log in now and take charge of your portfolio! Keep your profile updated by adding your latest accomplishments, showcasing new projects, and highlighting your growing skill set. Whether you've completed a major milestone, launched an exciting project, earned a certification, or gained valuable experience, your journey deserves to be seen. Stay ahead by keeping your portfolio fresh, engaging, and ready for potential clients, employers, or collaborators. Don’t let your hard work go unnoticed—keep building, sharing, and inspiring others with your success! 🚀";
  return (
    <>
      <section className="w-full md:h-[90vh] h-full lg:mt-0 mt-10 flex-center gap-y-6 flex-col lg:flex-row">
        <SimpleFooter FirstPara="" SecondPara={secondPara} />
        <LoginForm />
      </section>
    </>
  );
}
