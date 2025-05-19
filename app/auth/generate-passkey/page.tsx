"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const GeneratePasskey = () => {
    // State management for passkey, error, and loading states
    const [passkey, setPasskey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Handles the passkey generation process
     * Makes an API call to generate a new passkey
     * Updates state based on the response
     */
    const handleGeneratePasskey = async () => {
        setLoading(true);
        setError(null);

        try {
            // Make API request to generate passkey
            const response = await fetch("/api/auth/generate-passkey", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (response.ok) {
                setPasskey(data.passkey); // Save the passkey
            } else {
                setError(data.error || "Failed to generate passkey");
            }
        } catch (err) {
            console.log(err);
            setError("Something went wrong. Try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 h-[100vh] mt-20 flex flex-col items-center ">
            {/* Passkey generation button with loading state */}
            <Button onClick={handleGeneratePasskey} disabled={loading}>
                {loading ? "Generating..." : "Generate Passkey"}
            </Button>

            {/* Display generated passkey on success */}
            {passkey && (
                <p className="text-green-500">Your Passkey: <strong>{passkey}</strong></p>
            )}

            {/* Display error message if generation fails */}
            {error && (
                <p className="text-red-500">{error}</p>
            )}
        </div>
    );
};

export default GeneratePasskey;
