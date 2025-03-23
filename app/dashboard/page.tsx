"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch user data
    useEffect(() => {
        fetch("/api/auth/profileinfo", { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    router.push("/auth/signin"); // Redirect if not authenticated
                } else {
                    setUser(data.user);
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load data.");
                setLoading(false);
            });
    }, [router]);

    // Logout function
    const handleLogout = () => {
        fetch("/api/auth/signin", { method: "POST" })
            .then(() => {
                router.push("/auth/signin"); // Redirect to login page
            })
            .catch(() => alert("Logout failed! Try again."));
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-3xl mt-32 mx-auto">
            <h1 className="text-2xl font-bold">Welcome, {user?.name} 👋</h1>
            <p className="">Email: {user?.email}</p>

            <div className="mt-4">
                <h2 className="text-xl font-semibold">Your Projects</h2>
                {user?.projects?.length > 0 ? (
                    <ul className="list-disc pl-6">
                        {user.projects.map((project: any) => (
                            <li key={project._id} className="mt-2">{project.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="">No projects yet.</p>
                )}
            </div>

            <Button className="mt-6 bg-red-500 hover:bg-red-600" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}
