"use client";


import { motion } from "framer-motion";
import Service from "./service";
import { ServiceProps } from "./service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ServiceLayout() {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/service")
        .then((res) => res.json())
        .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
        } else {
            toast.error("Unexpected response format");
            console.error("Service API response was not an array:", data);
        }
        })
        .catch(() => toast.error("Failed to fetch Services"))
        .finally(()=>{
          setLoading(false)
        })
    }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-600">Loading Services...</p>
      </div>
    );
  }  
  return (
    <motion.div
      className="flex-col pb-5 container-width"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {services.length === 0 
      ? (
        <div className="flex items-center justify-center">
          <p className="text-gray-600">Loading Services...</p>
        </div>
      ) : services.map((service,index) => (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Service 
             key={service.title}
              title={service.title}
              Experience={service.Experience}
              InfoForRecruiters={service.InfoForRecruiters}
              InfoForClients={service.InfoForClients}
            
            />
            </motion.div>
        ))}
      
    </motion.div>
  );
}
