import { Send } from "lucide-react";

interface FinderFormCenteredProps {
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  locationLabel?: string;
  locationOptions?: string[];
  budgetLabel?: string;
  budgetOptions?: string[];
  typeLabel?: string;
  typeOptions?: string[];
  bedroomsLabel?: string;
  bedroomOptions?: string[];
  buttonText?: string;
  accentColor?: string;
  onSubmit?: () => void;
}

export default function FinderFormCentered({
  sectionLabel = "Concierge",
  title = "Déjanos Encontrar Tu Propiedad Ideal",
  subtitle = "Cuéntanos qué buscas y nuestro equipo seleccionará los mejores hogares de lujo para ti.",
  locationLabel = "Ubicación",
  locationOptions = ["Costa Blanca", "Ibiza", "Marbella", "Mallorca", "Otro"],
  budgetLabel = "Presupuesto",
  budgetOptions = ["€500.000 – €1.000.000", "€1.000.000 – €3.000.000", "€3.000.000 – €5.000.000", "€5.000.000 – €10.000.000", "€10.000.000+"],
  typeLabel = "Tipo de Propiedad",
  typeOptions = ["Villa de Lujo", "Ático", "Casa Frente a la Playa", "Obra Nueva", "Finca"],
  bedroomsLabel = "Dormitorios",
  bedroomOptions = ["Cualquiera", "2+", "3+", "4+", "5+", "6+"],
  buttonText = "Encontrar Mi Propiedad",
  accentColor = "#c9a96e",
  onSubmit,
}: FinderFormCenteredProps) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: accentColor }}>{sectionLabel}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ letterSpacing: "0.04em" }}>{title}</h2>
          {subtitle && <p className="text-[14px] font-light mt-3 max-w-xl mx-auto text-neutral-400">{subtitle}</p>}
        </div>
        <form className="max-w-3xl mx-auto" onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { label: locationLabel, options: locationOptions },
              { label: budgetLabel, options: budgetOptions },
              { label: typeLabel, options: typeOptions },
              { label: bedroomsLabel, options: bedroomOptions },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-[11px] tracking-[0.15em] uppercase font-medium block mb-2 text-neutral-400">{field.label}</label>
                <select className="w-full px-4 py-3 text-[14px] font-light appearance-none cursor-pointer focus:outline-none border border-neutral-200 bg-white text-neutral-900">
                  {field.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button type="submit" className="w-full text-[12px] tracking-[0.18em] uppercase font-normal px-8 py-4 transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 text-white" style={{ background: accentColor }}>
            <Send className="w-4 h-4" /> {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
