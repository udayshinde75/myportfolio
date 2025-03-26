"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const GeneratePasskey = () => {
    const [passkey, setPasskey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleGeneratePasskey = async () => {
        setLoading(true);
        setError(null);

        try {
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
            <Button onClick={handleGeneratePasskey} disabled={loading}>
                {loading ? "Generating..." : "Generate Passkey"}
            </Button>

            {passkey && (
                <p className="text-green-500">Your Passkey: <strong>{passkey}</strong></p>
            )}

            {error && (
                <p className="text-red-500">{error}</p>
            )}
        </div>
    );
};

export default GeneratePasskey;
