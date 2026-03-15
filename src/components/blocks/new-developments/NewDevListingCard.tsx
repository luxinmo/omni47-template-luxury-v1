/**
 * NEW DEV LISTING CARD
 * Horizontal card for new development listings.
 * Wraps ProjectCard with new development defaults (Building2 icon, "New Development" badge).
 * Origin: NewDevelopmentsPage
 */

import ProjectCard from "@/components/blocks/projects/ProjectCard";

interface NewDevListingCardProps {
  image?: string;
  name?: string;
  location?: string;
  developer?: string;
  delivery?: string;
  status?: string;
  construction?: number;
  availableUnits?: number;
  totalUnits?: number;
  priceRange?: string;
  trending?: boolean;
  typologies?: { type: string; from: string }[];
  href?: string;
}

const NewDevListingCard = ({
  name = "Marea Residences",
  location = "Altea, Costa Blanca",
  developer = "Grupo Prasa",
  delivery = "Q2 2027",
  status = "Selling",
  construction = 55,
  availableUnits = 28,
  totalUnits = 64,
  priceRange = "€485,000 — €1,250,000",
  trending = true,
  typologies = [
    { type: "Apartment", from: "€485,000" },
    { type: "Penthouse", from: "€890,000" },
    { type: "Duplex", from: "€720,000" },
  ],
  href = "/new-developments/marea-residences-altea",
  ...rest
}: NewDevListingCardProps) => (
  <ProjectCard
    name={name}
    location={location}
    badge="New Development"
    developer={developer}
    delivery={delivery}
    status={status}
    construction={construction}
    availableUnits={availableUnits}
    totalUnits={totalUnits}
    priceRange={priceRange}
    trending={trending}
    typologies={typologies}
    href={href}
    {...rest}
  />
);

export default NewDevListingCard;
