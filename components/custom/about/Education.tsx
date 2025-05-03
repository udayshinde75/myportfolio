"use client"

import { motion } from "framer-motion";
import { VerticalLine } from "../navbar/line";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe } from "lucide-react";
import SkillTags from "./SkillTags";
import Image from "next/image";

interface EducationType {
    _id: string;
    title: string;
    startDate: string;
    endDate: string;
    universityName: string;
    universityIcon: string;
    universityLink?: string;
    location:string;
    description: string;
    skills: string[];
    proof?:string;
    score:string;
    scoreType:string;
}

export default function Education() {
    const [education, setEducation] = useState<EducationType[]>([]);
    useEffect(()=>{
        fetch("api/about/education")
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data)) {
                setEducation(data)
                console.log("Education Data:",data);
            } else {
                toast.error("Unexpected response format")
                console.error("Education API response was not an array:", data);
            }
        }).catch(() => toast.error("Failed to fetch education"))
    }, [])
    
    return (
        <motion.div
            className="flex-col pb-5 container-width"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h2 className="text-3xl font-semibold text-justify">Education</h2>
            {education.length === 0
        ? toast.dismiss("You have not added any work experience yet")
        : education.map((edu) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              key={edu._id}
            >
                <div  className="mt-2">
                    <div className="flex items-center justify-start gap-x-2">
                        <div className="w-32 h-28 relative rounded-full overflow-hidden">
                            <Image
                                src={edu.universityIcon}
                                alt="University Icon"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-left">{edu.title} <br/> {edu.location}</h2>
                                <h2 className="text-xs font-semibold text-right">{edu.startDate} - {edu.endDate}</h2>
                            </div>
                            <Button variant={"link"}  className="p-0">
                            <Link  href={edu.universityLink || ""} className="p-0 flex flex-center gap-x-2">{edu.universityName} <Globe /></Link>
                            </Button>
                        </div>
                    </div>
                
                    <p className="text-muted-foreground mt-2 md:text-lg text-sm  text-justify">{edu.description}</p>
                    <h2 className="text-sm font-semibold text-left">{edu.scoreType} - {edu.score}</h2>
                    <div>
                        <SkillTags skills={edu.skills} />
                    </div>
                    <VerticalLine />
                </div>
                
            </motion.div>
        ))}
            
        </motion.div>
    ); 
}