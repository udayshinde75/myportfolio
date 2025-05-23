"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UpdateProfileForm } from "@/components/custom/dashboard/form-profile";
import { Line } from "@/components/custom/navbar/line";
import JobList from "@/components/custom/dashboard/job-list";
import EducationList from "@/components/custom/dashboard/education-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceList from "@/components/custom/dashboard/services-list";
import ProjectList from "@/components/custom/dashboard/project-list";

/**
 * User interface defining the structure of user data
 * Includes basic user information and optional projects array
 */
interface User {
  _id: string;
  name: string;
  email: string;
  projects?: Array<{
    _id: string;
    name: string;
  }>;
}

/**
 * Dashboard Page Component
 * 
 * Main dashboard page that provides a centralized interface for managing:
 * - User profile information
 * - Career history
 * - Educational background
 * - Services offered
 * - Project portfolio
 * 
 * Features:
 * - Authentication check and user data loading
 * - Tabbed interface for different sections
 * - Logout functionality
 * - Responsive design
 * 
 * @returns {JSX.Element} The dashboard layout
 */
export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Effect hook to fetch user data
   * Handles authentication and user information retrieval
   * Redirects to sign-in page if unauthorized
   */
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

  /**
   * Handles user logout
   * Makes API call to sign out endpoint
   * Redirects to sign-in page on success
   */
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

  // Show loading state while fetching user data
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  // Show error state if user data is unavailable
  if (error || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error || "User data not available"}</p>
      </div>
    );
  }

  //const UpdateProfileText = "Update your profile";
  return (
    <div className="container-width flex-center flex-col px-4 py-8 mt-10 space-y-8">
      {/* User welcome section */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Email: {user.email}
        </p>
      </div>
      <Line/>
      
      {/* Logout button */}
      <Button variant="outline" onClick={handleLogout} className="mx-auto">
        Logout
      </Button>
      
      {/* Tabbed interface for different sections */}
      <Tabs defaultValue="Account" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="Account" className="w-full">Account</TabsTrigger>
          <TabsTrigger value="Career" className="w-full">Career</TabsTrigger>
          <TabsTrigger value="Education" className="w-full">Education</TabsTrigger>
          <TabsTrigger value="Services" className="w-full">Services</TabsTrigger>
          <TabsTrigger value="Projects" className="w-full">Projects</TabsTrigger>
        </TabsList>
        
        {/* Account management section */}
        <TabsContent value="Account">
          <UpdateProfileForm />
        </TabsContent>
        
        {/* Career history section */}
        <TabsContent value="Career">
          <JobList />
        </TabsContent>
        
        {/* Education history section */}
        <TabsContent value="Education">
          <EducationList />
        </TabsContent>
        
        {/* Services management section */}
        <TabsContent value="Services">
          <ServiceList />
        </TabsContent>
        
        {/* Projects management section */}
        <TabsContent value="Projects">
          <ProjectList />
        </TabsContent>
      </Tabs>

      <Line/>
    </div>
  );
}
