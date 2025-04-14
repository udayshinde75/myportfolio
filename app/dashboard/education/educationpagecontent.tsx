"use client"
import { EducationForm } from "@/components/custom/dashboard/education-form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Job() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true)
  const educationId = searchParams.get('id');
  console.log("education ID:", educationId)
  const[education, setEducation] = useState({
    _id:"",
    title: "",
    startDate: "",
    endDate: "",
    universityName: "",
    universityIcon: "",
    universityLink: "",
    location: "",
    description:"",
    skills:[],
    proof: "",
    score:"",
    scoreType: "",
  });

  useEffect(() => {
    if (!educationId) {
      setLoading(false)
      return
    };
  
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/dashboard/education/${educationId}`);
        if (res.status === 404) {
          setLoading(false)
          return
        }; 
  
        const data = await res.json();
        if (res.ok) {
            setEducation({
                _id:data._id,
                title: data.title,
                startDate: data.startDate,
                endDate: data.endDate,
                universityName: data.universityName,
                universityIcon: data.universityIcon,
                universityLink: data.universityLink,
                location: data.location||"",
                description:data.description,
                skills:data.skills,
                proof: data.proof,
                score:data.score,
                scoreType: data.scoreType,
            })
          console.log("Education:"+education)
        } else {
          setLoading(false)
          return
        }
      } catch (err) {
        console.log("jobs/new useEffect used to get Job:", err)
      } finally {
        setLoading(false)
      }
    };
  
    fetchJob();
  }, [educationId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <section className="container-width md:h-[90vh] h-full lg:mt-0 mt-10 flex-center gap-y-6 flex-col lg:flex-row">
        <EducationForm initialData={education}/>
      </section>
    </>
  );
}
