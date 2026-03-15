/**
 * DETAIL RELATED GRID
 * Grid of similar / related properties.
 * Origin: PropertyDetail V6
 */

interface RelatedProperty {
  image: string;
  name: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqm: number;
  tag?: string;
  href?: string;
}

interface DetailRelatedGridProps {
  title?: string;
  properties?: RelatedProperty[];
}

const defaultProperties: RelatedProperty[] = [
  { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", name: "Beachfront Villa Es Cubells", location: "Es Cubells, Ibiza", price: "€6,200,000", beds: 6, baths: 5, sqm: 580, tag: "FOR SALE", href: "#" },
  { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", name: "Modern Penthouse Marina Botafoch", location: "Marina Botafoch, Ibiza", price: "€3,100,000", beds: 3, baths: 3, sqm: 210, tag: "FOR SALE", href: "#" },
  { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", name: "Traditional Finca San Carlos", location: "San Carlos, Ibiza", price: "€5,800,000", beds: 7, baths: 6, sqm: 750, tag: "FOR SALE", href: "#" },
];

const DetailRelatedGrid = ({
  title = "Similar Properties You May Like",
  properties = defaultProperties,
}: DetailRelatedGridProps) => (
  <section className="border-t border-neutral-200">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
      <h2 className="text-xl font-light text-neutral-900 tracking-tight mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {properties.map((s, i) => (
          <a key={i} href={s.href || "#"} className="group bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="relative overflow-hidden aspect-[4/3]">
              <img src={s.image} alt={s.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {s.tag && <span className="absolute top-3 left-3 text-[11px] tracking-[0.15em] uppercase bg-white/90 backdrop-blur-sm text-neutral-900 px-2.5 py-1 font-medium">{s.tag}</span>}
            </div>
            <div className="p-6">
              <p className="text-[12px] tracking-[0.14em] uppercase text-neutral-400 mb-1">{s.location}</p>
              <h3 className="text-[15px] font-medium text-neutral-900 mb-3 group-hover:text-neutral-600 transition-colors">{s.name}</h3>
              <div className="flex items-center gap-5 mb-4 text-[13px] text-neutral-500 font-light">
                <span>{s.beds} beds</span>
                <span>{s.baths} baths</span>
                <span>{s.sqm} m²</span>
              </div>
              <p className="text-xl font-extralight text-neutral-900 tracking-tight">{s.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default DetailRelatedGrid;
