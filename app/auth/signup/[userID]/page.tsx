"use client";

import RegisterForm from "@/components/custom/auth/register-form";
import SimpleFooter from "@/components/custom/footer/SimpleFooter";
import Navbar from "@/components/custom/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: Promise<{ userID: string }>; }) {
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setUserID(resolvedParams?.userID || "");
    }
    fetchParams();
    console.log("Sign Up userID:" + userID);
  }, [params]);
  
  const [user, setUser] = useState({
    name: "",
    email:"",
    id:"",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Set the default userID from the environment variable if userID is empty
  useEffect(() => {
    
    console.log("Sign Up Page : UserID:", userID);
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/checkAuth", {
          credentials: "include", // Ensure cookies are sent
        });

        const loginData = await res.json();
        console.log("Returned Token Data :" + loginData);
        if (loginData.authenticated && loginData.user.userId === userID) {
          console.log(loginData.userID + " === " + userID);
          router.replace(`/dashboard/${userID}`); // Redirect to dashboard
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setLoading(false);
      }
    };

    checkAuth();

    const fetchData = async () => {
      if (!userID) return;
      const res = await fetch(`/api/auth/getUserByID?userID=${userID}`);
      const userData = await res.json();
      setUser(userData);
      console.log("sign Up User Data :" + userData)
    };

    fetchData();
  }, [userID]);

  if (loading) {
    return (
      <div className="w-full h-[90vh] lg:mt-0 mt-10 flex-center gap-y-6 flex-col lg:flex-row">
        Loading...
      </div>
    );
  }

  const firstPara =
    "Hey visitors! 🚀 Have you ever wanted a professional portfolio website just like this one? Now you can have your own! Contact me to get your exclusive passkey and create an account. With your passkey, you'll receive a unique portfolio link where you can customize all the content to match your personal brand. But that’s not all! You’ll also get access to a powerful dashboard where you can track who has contacted you, manage inquiries, and explore more features designed to help you grow your online presence. Whether you’re a developer, designer, freelancer, or job seeker, this portfolio will help you stand out. Don’t miss out—reach out today and take your online presence to the next level! 🚀";
  const secondPara =
    "Already got your passkey? 🎉 Log in now to add new accomplishments, showcase your latest projects, and keep your portfolio up to date. Your work deserves to be seen—keep building and sharing your success! 🚀";

  return (
    <>
    <Navbar Name={user.name} id={user.id}/>
    <section className="w-full md:h-[90vh] h-full lg:mt-0 mt-10 flex-center gap-y-6 flex-col lg:flex-row">
      <SimpleFooter FirstPara={firstPara} SecondPara={secondPara} />
      <RegisterForm />
    </section>
    </>
  );
}
