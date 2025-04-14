"use client"
import { JobForm } from "@/components/custom/dashboard/job-form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Job() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true)
  const jobId = searchParams.get('id');
  console.log("Job ID:", jobId)
  const[job, setJob] = useState({
    _id:"",
    title: "",
    startDate: "",
    endDate: "",
    companyName: "",
    companyLink: "",
    location: "",
    description: "",
    skills: [],
  })

  useEffect(() => {
    if (!jobId) {
      setLoading(false)
      return
    };
  
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/dashboard/jobs/${jobId}`);
        if (res.status === 404) {
          setLoading(false)
          return
        }; // Job not found = new job
  
        const data = await res.json();
        if (res.ok) {
           setJob({
            _id:data._id,
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate,
            companyName: data.companyName,
            companyLink: data.companyLink,
            location: data.location||"",
            description:data.description,
            skills:data.skills,
           })
           console.log("job:"+job);
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
  }, [jobId]);

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
        <JobForm initialData={job}/>
      </section>
    </>
  );
}
