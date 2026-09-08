import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Appigon — idea to growth for mobile and web apps.",
};

export default function ContactPage() {
  return <ContactForm />;
}
