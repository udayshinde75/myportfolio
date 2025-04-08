"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UpdateProfileForm } from "@/components/custom/dashboard/form-profile";
import SimpleFooter from "@/components/custom/footer/SimpleFooter";

interface User {
  _id: string;
  name: string;
  email: string;
  projects?: Array<{
    _id: string;
    name: string;
  }>;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/profileinfo");

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          router.push("/auth/signin");
          return;
        }

        setUser(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        router.push("/auth/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/auth/signin");
      router.refresh(); // Ensure client cache is cleared
    } catch (err) {
      alert(err instanceof Error ? err.message : "Logout failed! Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error || "User data not available"}</p>
      </div>
    );
  }

  const UpdateProfileText = "Update your profile";
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 mt-10 space-y-8">
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
      <p className="text-muted-foreground text-sm sm:text-base">
        Email: {user.email}
      </p>
    </div>
    <div className="w-full pt-6 border-t border-gray-400 text-center">
      <Button
        variant="outline"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>

    <div className="w-full">
      <UpdateProfileForm />
    </div>

    
  </div>
  );
}
