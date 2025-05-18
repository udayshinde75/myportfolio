import Profile from "@/components/custom/herosection/Profile";
import { Line } from "@/components/custom/navbar/line";
import ProjectLayout from "@/components/custom/projects/project-layout";

export default function Home() {

  return (
    <section className="w-full h-full flex-center flex-col">
    <Profile showProfilePicture={true} textAlignment="text-balance" showButtons/>
    <Line />
   <ProjectLayout />
    </section>
  )
}
