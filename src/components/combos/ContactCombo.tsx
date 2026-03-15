/**
 * CONTACT COMBO — Contact Page Preview
 * Contact Form Split + Office Tabs + Reasons Grid + Office Grid
 */
import ContactFormSplit from "@/components/blocks/contact/ContactFormSplit";
import ContactOfficeTabs from "@/components/blocks/contact/ContactOfficeTabs";
import ContactOfficeGrid from "@/components/blocks/contact/ContactOfficeGrid";
import ContactReasonsGrid from "@/components/blocks/contact/ContactReasonsGrid";

const ContactCombo = () => (
  <div>
    <ContactFormSplit />
    <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12 py-16">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal text-amber-700/70">Why Contact Us</p>
        <h2 className="text-2xl sm:text-3xl font-extralight tracking-[0.04em] text-neutral-900">How Can We Help?</h2>
      </div>
      <div className="max-w-md mx-auto">
        <ContactReasonsGrid variant="light" />
      </div>
    </div>
    <ContactOfficeTabs />
    <ContactOfficeGrid />
  </div>
);

export default ContactCombo;
