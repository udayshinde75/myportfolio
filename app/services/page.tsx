import Profile from "@/components/custom/herosection/Profile";
import { Line } from "@/components/custom/navbar/line";
import ServiceLayout from "@/components/custom/services/service-layout";

export default function Services() {

  return (
    <section className="w-full h-full flex-center flex-col ">
      <Profile textAlignment="text-justify" showProfilePicture={false} showBio={false} showService={true}/>
      <Line />
      <ServiceLayout />
      <Line />
    </section>
  );
}
