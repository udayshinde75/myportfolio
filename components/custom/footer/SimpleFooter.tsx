import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FooterProps {
    FirstPara?: string;
    SecondPara?: string;
}


export default function SimpleFooter({
    FirstPara,
    SecondPara,
}: FooterProps) {
  return (
    <section className="flex  flex-col items-center text-center">
      {/* Hero Text */}
      <div className="mt-6 max-w-full overflow-x-auto">
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Hey There 👋</h2>
          <p className=" mt-2 px-6 md:text-lg text-sm max-w-2xl mx-auto">
          {FirstPara}
          </p>
          <p className=" mt-2 px-6 md:text-lg text-sm max-w-2xl mx-auto">
          {SecondPara}
          </p>
          <p className=" mt-2 px-6 md:text-lg text-sm max-w-2xl mx-auto">
          Need Help With Something....
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col mt-4 gap-4 justify-center">
          <Button asChild className="px-6 py-3 mx-auto">
            <Link href="/contact">Contact Me..</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
