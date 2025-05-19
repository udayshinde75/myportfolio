'use client'

import LoginForm from "@/components/custom/auth/login-form";
import SimpleFooter from "@/components/custom/footer/SimpleFooter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * SignInPage Component
 * 
 * Renders the sign-in page of the portfolio website, featuring:
 * - User authentication check
 * - Login form
 * - Motivational footer message
 * - Automatic redirection to dashboard if already logged in
 * 
 * @returns {JSX.Element} The sign-in page layout
 */
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  /**
   * Effect hook to check if user is already logged in
   * Redirects to dashboard if authenticated
   */
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

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  // Motivational message for the footer
  const secondPara =
    "🎉 Log in now and take charge of your portfolio! Keep your profile updated by adding your latest accomplishments, showcasing new projects, and highlighting your growing skill set. Whether you've completed a major milestone, launched an exciting project, earned a certification, or gained valuable experience, your journey deserves to be seen. Stay ahead by keeping your portfolio fresh, engaging, and ready for potential clients, employers, or collaborators. Don't let your hard work go unnoticed—keep building, sharing, and inspiring others with your success! 🚀";

  return (
    <>
      <section className="w-full md:h-[90vh] h-full lg:mt-0 mt-10 flex-center gap-y-6 flex-col lg:flex-row">
        {/* Footer with motivational message */}
        <SimpleFooter FirstPara="" SecondPara={secondPara} />
        {/* Login form component */}
        <LoginForm />
      </section>
    </>
  );
}
