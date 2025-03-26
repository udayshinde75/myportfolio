"use client";

import RegisterForm from "@/components/custom/auth/register-form";
import SimpleFooter from "@/components/custom/footer/SimpleFooter";
import Navbar from "@/components/custom/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  id: string;
}

export default function SignUpPage({ params }: { params: Promise<{ userID?: string }> }) {
  const router = useRouter();
  const [userID, setUserID] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract userID from params
  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        setUserID(resolvedParams?.userID || "");
      } catch (err) {
        console.error("Failed to resolve params:", err);
        setError("Failed to load page parameters");
        setLoading(false);
      }
    };

    fetchParams();
  }, [params]);

  // Check authentication and fetch user data
  useEffect(() => {
    if (!userID) return;

    const checkAuthAndFetchUser = async () => {
      try {
        setLoading(true);
        
        // Check authentication
        const authResponse = await fetch("/api/auth/checkAuth", {
          credentials: "include",
        });

        if (!authResponse.ok) {
          throw new Error("Authentication check failed");
        }

        const authData = await authResponse.json();

        // If already authenticated with matching userID, redirect to dashboard
        if (authData.authenticated && authData.user?.userId === userID) {
          router.replace(`/dashboard/${userID}`);
          return;
        }

        // Fetch user data
        const userResponse = await fetch(`/api/auth/getUserByID?userID=${userID}`);
        
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        setUser(userData);
      } catch (err) {
        console.error("Error in signup page:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchUser();
  }, [userID, router]);

  // Content strings
  const content = {
    firstPara: "Hey visitors! 🚀 Have you ever wanted a professional portfolio website just like this one? Now you can have your own! Contact me to get your exclusive passkey and create an account. With your passkey, you'll receive a unique portfolio link where you can customize all the content to match your personal brand. But that's not all! You'll also get access to a powerful dashboard where you can track who has contacted you, manage inquiries, and explore more features designed to help you grow your online presence. Whether you're a developer, designer, freelancer, or job seeker, this portfolio will help you stand out. Don't miss out—reach out today and take your online presence to the next level! 🚀",
    secondPara: "Already got your passkey? 🎉 Log in now to add new accomplishments, showcase your latest projects, and keep your portfolio up to date. Your work deserves to be seen—keep building and sharing your success! 🚀"
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading your signup page...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <div className="text-red-500 text-center p-4 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar Name={user?.name || ""} id={user?.id || ""} />
      <section className="w-full md:h-[90vh] h-full lg:mt-0 mt-10 flex flex-col lg:flex-row items-center justify-center gap-y-6">
        <SimpleFooter FirstPara={content.firstPara} SecondPara={content.secondPara} />
        <RegisterForm />
      </section>
    </>
  );
}