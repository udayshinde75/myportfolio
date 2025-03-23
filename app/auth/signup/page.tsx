"use client"

import RegisterForm from "@/components/custom/auth/register-form";
import SimpleFooter from "@/components/custom/footer/SimpleFooter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {

  const firstPara = "Hey visitors! 🚀 Have you ever wanted a professional portfolio website just like this one? Now you can have your own! Contact me to get your exclusive passkey and create an account. With your passkey, you'll receive a unique portfolio link where you can customize all the content to match your personal brand. But that’s not all! You’ll also get access to a powerful dashboard where you can track who has contacted you, manage inquiries, and explore more features designed to help you grow your online presence. Whether you’re a developer, designer, freelancer, or job seeker, this portfolio will help you stand out. Don’t miss out—reach out today and take your online presence to the next level! 🚀"
  const secondPara = "Already got your passkey? 🎉 Log in now to add new accomplishments, showcase your latest projects, and keep your portfolio up to date. Your work deserves to be seen—keep building and sharing your success! 🚀"

  const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/checkAuth", {
                    credentials: "include", // Ensure cookies are sent
                });

                const data = await res.json();
                if (data.authenticated) {
                    router.replace("/dashboard"); // Redirect to dashboard
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Auth check failed", error);
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (loading) return <p>Loading...</p>;
  return (
    
    <section className="w-full h-[90vh] lg:mt-0 mt-10 flex-center gap-y-6 flex-col lg:flex-row">
      <SimpleFooter FirstPara={firstPara} SecondPara={secondPara}/>
      <RegisterForm />
    </section>
  );
}
