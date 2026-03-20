import { useState } from "react";
import NewsletterPreferencesModal from "./NewsletterPreferencesModal";

interface NewsletterBorderedProps {
  sectionLabel?: string;
  title?: string;
  titleItalic?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  privacyText?: string;
  onSubmit?: (email: string) => void;
}

export default function NewsletterBordered({
  sectionLabel = "Newsletter",
  title = "Stay",
  titleItalic = "Informed",
  description = "Receive curated insights on global luxury real estate, market trends, and exclusive off-market opportunities directly to your inbox.",
  placeholder = "Your email address",
  buttonText = "Subscribe",
  privacyText = "By subscribing you agree to our Privacy Policy. Unsubscribe anytime.",
  onSubmit,
}: NewsletterBorderedProps) {
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setModalOpen(true);
  };

  return (
    <>
      <section className="border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 sm:py-32">
          <div className="max-w-[640px] mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-neutral-300" />
              <p className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-light">{sectionLabel}</p>
              <div className="w-8 h-[1px] bg-neutral-300" />
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-extralight text-neutral-900 mb-4 leading-[1.2]">
              {title} <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>{titleItalic}</span>
            </h2>
            <p className="text-[14px] font-light text-neutral-400 leading-relaxed mb-10">
              {description}
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-6 py-4 border border-neutral-200 text-[13px] font-light placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors bg-transparent"
                required
              />
              <button className="px-10 py-4 bg-neutral-900 text-white text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-neutral-800 transition-colors">
                {buttonText}
              </button>
            </form>
            <p className="text-[11px] text-neutral-300 font-light mt-4">{privacyText}</p>
          </div>
        </div>
      </section>

      <NewsletterPreferencesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        email={email}
        onConfirm={(data) => {
          onSubmit?.(data.email);
          setEmail("");
        }}
      />
    </>
  );
}
