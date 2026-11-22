/**
 * Contact page: email, social links and résumé, loaded from your profile.
 */
import { Metadata } from "next";
import ContactSection from "@/components/custom/site/ContactSection";
import SiteFooter from "@/components/custom/site/SiteFooter";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Uday Shinde by email or through GitHub, LinkedIn, X and Instagram.",
  openGraph: {
    title: "Contact | Uday Shinde",
    description: "Get in touch with Uday Shinde by email or through GitHub, LinkedIn, X and Instagram.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="pt-16">
      <ContactSection standalone />
      <SiteFooter />
    </main>
  );
}
