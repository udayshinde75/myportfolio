"use client"

import { ServiceForm } from "@/components/custom/dashboard/service-form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ServicePageContent() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true)
    const serviceId = searchParams.get('id');
    console.log("service ID:", serviceId)

    const[service, setService] = useState({
        _id: "",
        title: "",
        InfoForRecruiters: "",
        InfoForClients: "",
        Experience: "",
    });

    useEffect(() => {
        if (!serviceId) {
            setLoading(false)
            return
        };
        const fetchService = async () => {
            try {
              const res = await fetch(`/api/dashboard/service/${serviceId}`);
              if (res.status === 404) {
                setLoading(false)
                return
              }; 
        
              const data = await res.json();
              if (res.ok) {
                setService({
                    _id:data._id,
                    title: data.title,
                    InfoForRecruiters: data.InfoForRecruiters,
                    InfoForClients: data.InfoForClients,
                    Experience: data.Experience,
                })
                console.log("Education:"+service)
              } else {
                setLoading(false)
                return
              }
            } catch (err) {
              console.log("useEffect used to get service:", err)
            } finally {
              setLoading(false)
            }
        };
        
        fetchService();
    },[serviceId]);

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
            <ServiceForm initialData={service}/>
          </section>
        </>
      );
}