"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IService } from "@/models/service";
import { motion } from "framer-motion";
import { Delete, Edit, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

/**
 * ServiceList Component
 * 
 * Displays a list of user's services with options to add, edit, and delete entries
 * Features:
 * - Fetches and displays services from the API
 * - Animated transitions for list items with staggered delay
 * - Service cards with accordion sections for different audiences
 * - Edit and delete functionality
 * - Loading state handling
 * 
 * @returns {JSX.Element} The service list component
 */
export default function ServiceList() {
    const [service, setService] = useState<IService[]>([]);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    /**
     * Fetches services from the API on component mount
     * Updates the service state with the fetched data
     * Handles loading state and error cases
     */
    useEffect(() => {
        fetch("/api/dashboard/service")
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data)) {
                setService(data);
            } else {
                toast.error("Unexpected response format!");
                console.log("Service API response was not an array!")
            }
        })
        .catch(() => toast.error("Exception in Service API"))
        .finally(() => setLoading(false));
    },[])

    /**
     * Handles service deletion
     * Sends DELETE request to the API and updates the local state
     * Shows success/error toast notifications
     * 
     * @param {string} id - The ID of the service to delete
     */
    const handleDelete = (id: string) => {
        startTransition(() => {
            fetch(`/api/dashboard/service/${id}`, {
                method: "DELETE",
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Service deleted");
                    setService((prev) => prev.filter((service) => service._id.toString() !== id));
                } else {
                    toast.error(data.error || "Failed to delete Service");
                }
            })
            .catch(() => toast.error("Failed to delete service!"))
        })
    }

    // Show loading state while fetching services
    if (loading) {
        return (
            <div className="space-y-4">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <motion.div 
        initial={{opacity: 0, y:50}}
        animate={{opacity: 1, y:0}}
        transition={{duration: 0.5}}
        className="space-y-6 m-5"
        >
            {/* Header with title and add service button */}
            <div className="flex justify-between items-center gap-x-5">
                <h2 className="text-xl font-seminold">Services</h2>
                <Button onClick={() => router.push("/dashboard/service")}>
                    <Plus className="w-4 h-4 mr-2" /> Add Services
                </Button>
            </div>

            {/* Service list or empty state message */}
            {service.length === 0
                ? toast.dismiss("You have not added servcies yet!")
                : service.map((data,index) => (
                    <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
                    key={data._id.toString()}
                    >
                        {/* Service card with content */}
                        <Card
                            className="shadow-xl md:border border-none mt-10  border-gray-500 rounded-3xl px-3   backdrop-blur-xl bg-opacity-80 "
                        >
                            <CardContent className="p-6">
                            {/* Service title */}
                            <h2 className="text-3xl font-semibold mb-4">{data.title}</h2>

                                {/* Accordion sections for different service information */}
                                <Accordion type="single" collapsible defaultValue="recruiter" className="w-full">
                                {/* Information for recruiters section */}
                                <AccordionItem value="recruiter">
                                    <AccordionTrigger className="no-underline md:text-lg text-sm hover:no-underline focus:no-underline">
                                    For Recruiters
                                    </AccordionTrigger>
                                    <AccordionContent>
                                    <div
                                        className="md:text-lg text-sm text-muted-foreground"
                                    >
                                        {data.InfoForRecruiters}
                                    </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Information for clients section */}
                                <AccordionItem value="client">
                                    <AccordionTrigger className="no-underline md:text-lg text-sm hover:no-underline focus:no-underline">
                                    For Clients
                                    </AccordionTrigger>
                                    <AccordionContent>
                                    <div
                                        className="md:text-lg text-sm text-muted-foreground"
                                    >
                                        {data.InfoForClients}
                                    </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Experience section */}
                                <AccordionItem value="Experience">
                                    <AccordionTrigger className="no-underline md:text-lg text-sm hover:no-underline focus:no-underline">
                                    Experience
                                    </AccordionTrigger>
                                    <AccordionContent>
                                    <div
                                        className="md:text-lg text-sm text-muted-foreground"
                                    >
                                        {data.Experience}
                                    </div>
                                    </AccordionContent>
                                </AccordionItem>
                                </Accordion>

                                {/* Edit and delete buttons */}
                                <div className="space-x-2 flex-center mt-2">
                                    <Button
                                    variant="outline"
                                    onClick={() => router.push(`/dashboard/service?id=${data._id.toString()}`)}
                                    >
                                    <Edit />
                                    </Button>
                                    <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(data._id.toString())}
                                    disabled={isPending}
                                    >
                                    <Delete />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
        </motion.div>
    )
}