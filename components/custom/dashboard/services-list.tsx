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

export default function ServiceList() {
    const [service, setService] = useState<IService[]>([]);
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
    })

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
            <div className="flex justify-between items-center gap-x-5">
                <h2 className="text-xl font-seminold">Services</h2>
                <Button onClick={() => router.push("/dashboard/service")}>
                    <Plus className="w-4 h-4 mr-2" /> Add Services
                </Button>
            </div>
            {service.length === 0
                ? toast.dismiss("You have not added servcies yet!")
                : service.map((data) => (
                    <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={data._id.toString()}
                    >
                        <Card
                            className="shadow-xl md:border border-none mt-10  border-gray-500 rounded-3xl px-3   backdrop-blur-xl bg-opacity-80 "
                        >
                            <CardContent className="p-6">
                            <h2 className="text-3xl font-semibold mb-4">{data.title}</h2>

                                <Accordion type="single" collapsible defaultValue="recruiter" className="w-full">
                                {/* Recruiter Section */}
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

                                {/* Client Section */}
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
                                <AccordionItem value="client">
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