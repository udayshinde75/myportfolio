"use client";

import { useRouter } from "next/navigation";
interface LoginButtonProps {
  children: React.ReactNode;
  mode? : "modal" | "redirect";
  asChild?: boolean;
}


export const LoginButton = ({
    children, 
    mode = "redirect", 
}: LoginButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        //console.log("Login button clicked");
        router.push("/auth/login")
    }
    if (mode === "modal") {
        return (
            <span>
                TODO : Implement modal
            </span>
        )
    }
    
    return (
        <span className="cursor-pointer" onClick={onClick}>
            {children}
        </span>
    )
}