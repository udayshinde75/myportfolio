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
        : education.map((edu,index) => (
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
              key={edu._id}
            >
                <div  className="mt-2">
                    <div className="flex items-center justify-center gap-x-2">
                        <div className="rounded-full overflow-hidden">
                            <Image
                                src={edu.universityIcon}
                                alt="University Icon"
                                height={100}
                                width={100}
                                className="object-cover"
                            />
                        </div>
                        <div className="w-full mx-auto">
                            <div className="flex justify-between items-center">
                                <h2 className="md:text-lg text-xs font-semibold text-left">{edu.title} <br/> {edu.location}</h2>
                                <h2 className="md:text-lg text-xs font-semibold text-right">{edu.startDate}-{edu.endDate}</h2>
                            </div>
                            
                        </div>
                    </div>
                    <Button variant={"link"}  className="p-0 mt-2">
                            <Link  href={edu.universityLink || ""} className="p-0 md:text-lg text-xs flex flex-center gap-x-2">{edu.universityName} <Globe /></Link>
                            </Button>
                    <p className="text-muted-foreground mt-2 md:text-lg text-xs  text-justify">{edu.description}</p>
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