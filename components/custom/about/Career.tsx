"usee react"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {Globe} from "lucide-react"
import SkillTags from "./SkillTags";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { VerticalLine } from "../navbar/line";

interface JobType {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    companyName: string;
    companyLink?: string;
    location:string;
    description: string;
    skills: string[];
  }

export default function Career() {
    const [jobs, setJobs] = useState<JobType[]>([]);
    useEffect(() => {
    fetch("/api/about/career")
        .then((res) => res.json())
        .then((data) => {
        if (Array.isArray(data)) {
            setJobs(data);
        } else {
            toast.error("Unexpected response format");
            console.error("Jobs API response was not an array:", data);
        }
        })
        .catch(() => toast.error("Failed to fetch jobs"))
    }, []);
    return (
        <motion.div
            className="flex-col pb-5 container-width"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h2 className="text-3xl font-semibold text-justify">Career</h2>
            {jobs.length === 0
        ? toast.dismiss("You have not added any work experience yet")
        : jobs.map((job) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              key={job._id}
            >
                <div  className="mt-2">
                <div className="flex justify-between items-center ">
                    <h2 className="text-xl font-semibold text-left">{job.title} <br/> {job.location}</h2>
                    <h2 className="text-xs font-semibold text-right">{job.startDate} - {job.endDate}</h2>
                </div>
                <Button variant={"link"}  className="p-0">
                <Link  href={job.companyLink || ""} className="p-0 flex flex-center gap-x-2">{job.companyName} <Globe /></Link>
                </Button>
                <p className="text-muted-foreground mt-2 md:text-lg text-sm  text-justify">{job.description}</p>
                <div className="">
                <SkillTags skills={job.skills} />
                </div>
                <VerticalLine />
                </div>
                
            </motion.div>
        ))}
            
        </motion.div>
    ); 
}