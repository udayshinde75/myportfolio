import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Edit, Delete } from "lucide-react";
import { Description } from "./description";
import { motion } from "framer-motion";
import SkillTags from "../about/SkillTags";

/**
 * Interface defining the structure of a job entry
 * Used for displaying and managing job experiences
 */
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

/**
 * JobList Component
 * 
 * Displays a list of user's job experiences with options to add, edit, and delete entries
 * Features:
 * - Fetches and displays jobs from the API
 * - Animated transitions for list items
 * - Job cards with company details, dates, and skills
 * - Edit and delete functionality
 * - Loading state handling
 * 
 * @returns {JSX.Element} The job list component
 */
export default function JobList() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * Fetches jobs from the API on component mount
   * Updates the jobs state with the fetched data
   * Handles loading state and error cases
   */
  useEffect(() => {
    fetch("/api/dashboard/jobs")
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
      .finally(() => setLoading(false));
  }, []);

  /**
   * Handles job deletion
   * Sends DELETE request to the API and updates the local state
   * Shows success/error toast notifications
   * 
   * @param {string} id - The ID of the job to delete
   */
  const handleDelete = (id: string) => {
    startTransition(() => {
      fetch(`/api/dashboard/jobs/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Job deleted");
            setJobs((prev) => prev.filter((job) => job._id !== id));
          } else {
            toast.error(data.error || "Failed to delete job");
          }
        })
        .catch(() => toast.error("Failed to delete data"))
        
    });
  };

  // Show loading state while fetching jobs
  if (loading) {
    return (
      <div className="space-y-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 m-5"
    >
      {/* Header with title and add job button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Career Data</h2>
        <Button onClick={() => router.push("/dashboard/jobs/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Job
        </Button>
      </div>

      {/* Job list or empty state message */}
      {jobs.length === 0
        ? toast.dismiss("You have not added any work experience yet")
        : jobs.map((job) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              key={job._id}
            >
              {/* Job card with content */}
              <Card
                className="shadow-xl md:border border-none mt-10  border-gray-500 rounded-3xl px-3   backdrop-blur-xl bg-opacity-80 "
              >
                <CardContent className="p-6">
                  {/* Job title and company details */}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      {/* Company name with optional link */}
                      <p className="text-sm text-muted-foreground">
                        {job.companyLink ? (
                          <a
                            href={job.companyLink}
                            target="_blank"
                            className="underline"
                          >
                            {job.companyName}
                          </a>
                        ) : (
                          job.companyName
                        )}
                      </p>
                      {/* Location and date range */}
                      <p className="text-sm text-muted-foreground">
                        {job.location}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {job.startDate} – {job.endDate}
                      </p>
                    </div>
                  </div>
                  {/* Job description and skills */}
                  <Description description={job.description} />
                  <SkillTags skills={job.skills} />
                  {/* Edit and delete buttons */}
                  <div className="space-x-2 flex-center mt-2">
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/dashboard/jobs/new?id=${job._id}`)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(job._id)}
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
  );
}
