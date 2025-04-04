"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/custom/navbar/Navbar";

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
        method: "POST" 
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

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mt-32 mx-auto">
        <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
        <p className="text-muted-foreground">Email: {user.email}</p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
          {user.projects?.length ? (
            <ul className="space-y-2">
              {user.projects.map((project) => (
                <li 
                  key={project._id} 
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  {project.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500">No projects yet</p>
              <Button variant="outline" className="mt-2">
                Create New Project
              </Button>
            </div>
          )}
        </div>

        <div className="mt-10 border-t pt-6">
          <Button 
            variant="destructive"
            onClick={handleLogout}
            className="w-full sm:w-auto"
          >
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}