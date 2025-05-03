import Career from "@/components/custom/about/Career";
import Education from "@/components/custom/about/Education";
import Profile from "@/components/custom/herosection/Profile";
import { Line } from "@/components/custom/navbar/line";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function AboutPage() {
  

  return (
    <section className="w-full h-full flex-center flex-col">
      <Profile
        textAlignment="text-justify"
        showProfilePicture={false}
      />
      <Line />
      <Career />
      <Line />
      <Education />
      <div className="flex flex-col gap-4 justify-center">
        <Button asChild variant={"secondary"} className=" text-sm">
          <Link href="/services">
            Services<ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
