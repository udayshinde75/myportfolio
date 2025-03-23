import Profile from "@/components/custom/herosection/Profile";
import ProfileActions from "@/components/custom/herosection/ProfileActions";
export default function AboutPage() {
  return (
    <section className="container mx-auto px-6 py-16 text-center">
      <Profile Name="uday"/>
      <ProfileActions ReadMore={false}/>
    </section>
  );
}
