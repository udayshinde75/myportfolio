"use client";

import RegisterForm from "@/components/custom/auth/register-form";
import SimpleFooter from "@/components/custom/footer/SimpleFooter";
import Navbar from "@/components/custom/navbar/Navbar";
import { useEffect } from "react";

export default function Home() {
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   id: "",
  // });

  // Set the default userID from the environment variable if userID is empty
  //const userID = process.env.NEXT_PUBLIC_OWNER || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth/getUserByID");
        if (!res.ok) throw new Error("User not found");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Informative message about portfolio features
  const firstPara =
    "Hey visitors! 🚀 Have you ever wanted a professional portfolio website just like this one? Now you can have your own! Contact me to get your exclusive passkey and create an account. With your passkey, you'll receive a unique portfolio link where you can customize all the content to match your personal brand. But that's not all! You'll also get access to a powerful dashboard where you can track who has contacted you, manage inquiries, and explore more features designed to help you grow your online presence. Whether you're a developer, designer, freelancer, or job seeker, this portfolio will help you stand out. Don't miss out—reach out today and take your online presence to the next level! 🚀";

  // Message for users who already have a passkey
  const secondPara =
    "Already got your passkey? 🎉 Log in now to add new accomplishments, showcase your latest projects, and keep your portfolio up to date. Your work deserves to be seen—keep building and sharing your success! 🚀";

  return (
    <>
      {/* Navigation bar */}
      <Navbar/>
      <section className="w-full md:h-[90vh] h-full lg:mt-0 mt-10 flex-center gap-y-6 flex-col lg:flex-row">
        {/* Footer with informative messages */}
        <SimpleFooter FirstPara={firstPara} SecondPara={secondPara} />
        {/* Registration form component */}
        <RegisterForm />
      </section>
    </>
  );
}
