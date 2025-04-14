"use client";

import RegisterForm from "@/components/custom/auth/register-form";
import SimpleFooter from "@/components/custom/footer/SimpleFooter";
import Navbar from "@/components/custom/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthResponse {
  authenticated: boolean;
  user?: {
    userId: string;
  };
  error?: string;
}

export default function SignUpPage({ params }: { params: Promise<{ userID?: string }> }) {
  const router = useRouter();
  const [userID, setUserID] = useState<string>("");

  // Extract userID from params
  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams?.userID || "";
        setUserID(id);
      } catch (err) {
        console.error("Failed to resolve params:", err);
      }
    };

    fetchParams();

    async function fetchData() {
      try {
        // First get the userID from params
        const resolvedParams = await params;
        const id = resolvedParams?.userID || "";
        
        if (!id) return;
        
        // Then fetch user data
        const res = await fetch(`/api/auth/getUserByID?userID=${id}`);
        if (!res.ok) throw new Error("User not found");
        //const data = await res.json()
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, [params]);

  // Check authentication and handle redirects (silently fail on errors)
  useEffect(() => {
    if (!userID) return;

    const checkAuthAndHandleUser = async () => {
      try {
        // Check authentication
        const authResponse = await fetch("/api/auth/checkAuth", {
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // if (!authResponse.ok) {
        //   console.error("Authentication service unavailable");
        //   return;
        // }

        const authData: AuthResponse = await authResponse.json();

        // If authenticated with matching userID, redirect to dashboard
        if (authData.authenticated && authData.user?.userId === userID) {
          router.replace(`/dashboard/${userID}`);
          return;
        }

        // Log but ignore other cases
        if (authData.error) {
          console.log("Auth check message:", authData.error);
        }
      } catch (err) {
        console.error("Authentication check error:", err);
      }
    };

    checkAuthAndHandleUser();
  }, [userID, router]);

  // Content strings
  const content = {
    firstPara: "Hey visitors! 🚀 Have you ever wanted a professional portfolio website just like this one? Now you can have your own! Contact me to get your exclusive passkey and create an account. With your passkey, you'll receive a unique portfolio link where you can customize all the content to match your personal brand. But that's not all! You'll also get access to a powerful dashboard where you can track who has contacted you, manage inquiries, and explore more features designed to help you grow your online presence. Whether you're a developer, designer, freelancer, or job seeker, this portfolio will help you stand out. Don't miss out—reach out today and take your online presence to the next level! 🚀",
    secondPara: "Already got your passkey? 🎉 Log in now to add new accomplishments, showcase your latest projects, and keep your portfolio up to date. Your work deserves to be seen—keep building and sharing your success! 🚀"
  };

  return (
    <>
      <Navbar />
      <section className="w-full md:h-[90vh] h-full lg:mt-0 mt-10 flex flex-col lg:flex-row items-center justify-center gap-y-6">
        <SimpleFooter FirstPara={content.firstPara} SecondPara={content.secondPara} />
        <RegisterForm />
      </section>
    </>
  );
}