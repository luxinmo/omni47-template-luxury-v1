interface NewsletterCenteredProps {
  sectionLabel?: string;
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  privacyText?: string;
  accentColor?: string;
  onSubmit?: (email: string) => void;
}

export default function NewsletterCentered({
  sectionLabel = "Mantente Informado",
  title = "The Private List",
  description = "Recibe listados exclusivos off-market, análisis de mercado e invitaciones a visitas privadas — entregados discretamente a tu email.",
  placeholder = "Tu dirección de email",
  buttonText = "Suscribirse",
  privacyText = "Respetamos tu privacidad. Cancela en cualquier momento.",
  accentColor = "#c9a96e",
  onSubmit,
}: NewsletterCenteredProps) {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-neutral-100">
      <div className="max-w-xl mx-auto px-5 sm:px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
        <h2 className="text-2xl md:text-3xl font-extralight mb-3" style={{ letterSpacing: "0.04em" }}>{title}</h2>
        <p className="text-sm font-light mb-8 leading-relaxed text-neutral-400">
          {description}
        </p>
        <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => { e.preventDefault(); onSubmit?.(""); }}>
          <input type="email" placeholder={placeholder} className="flex-1 px-5 py-4 text-sm tracking-[0.05em] focus:outline-none transition-colors duration-300 border border-neutral-200 bg-white text-neutral-900" />
          <button type="submit" className="text-xs tracking-[0.18em] uppercase font-normal px-8 py-4 transition-all duration-300 hover:opacity-90 whitespace-nowrap text-white" style={{ background: accentColor }}>
            {buttonText}
          </button>
        </form>
        <p className="text-xs mt-4 font-light text-neutral-400">{privacyText}</p>
      </div>
    </section>
  );
}
