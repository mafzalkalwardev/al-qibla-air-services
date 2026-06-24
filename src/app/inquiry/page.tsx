import { createPageMetadata } from "@/lib/metadata";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Book / Inquiry",
  description: `Submit a booking or travel inquiry to ${SITE.name} via WhatsApp.`,
  path: "/inquiry/",
});

export default function InquiryPage() {
  return (
    <>
      <section className="bg-navy py-16 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold">Book / Inquiry</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/70">Fill in your travel requirements and submit directly via WhatsApp.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-wide max-w-2xl">
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
