/**
 * DETAIL SEO LINKS
 * Internal linking section for SEO — pill-style links.
 * Origin: PropertyDetail V6
 */

interface SeoLink {
  label: string;
  href?: string;
}

interface DetailSeoLinksProps {
  title?: string;
  links?: SeoLink[];
}

const defaultLinks: SeoLink[] = [
  { label: "Luxury Villas in Ibiza", href: "#" },
  { label: "Apartments in Ibiza", href: "#" },
  { label: "New Developments Ibiza", href: "#" },
  { label: "Properties in Santa Eulalia", href: "#" },
  { label: "Beachfront Properties Ibiza", href: "#" },
  { label: "Properties with Sea Views", href: "#" },
  { label: "Villas for Sale Ibiza", href: "#" },
  { label: "Investment Properties Ibiza", href: "#" },
];

const DetailSeoLinks = ({
  title = "Explore Properties in Ibiza",
  links = defaultLinks,
}: DetailSeoLinksProps) => (
  <section className="border-t border-neutral-200 bg-neutral-50">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
      <h2 className="text-lg font-light text-neutral-900 tracking-tight mb-5">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href || "#"}
            className="text-[13px] text-neutral-500 font-light border border-neutral-200 bg-white rounded-full px-5 py-2.5 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default DetailSeoLinks;
