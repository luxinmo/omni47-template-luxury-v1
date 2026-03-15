/**
 * BRANDED LISTING CARD
 * Horizontal card for branded residence listings.
 * Wraps ProjectCard with branded-specific defaults (Crown icon, "Branded" badge).
 * Origin: BrandedResidencesPage
 */

import ProjectCard from "@/components/blocks/projects/ProjectCard";

interface BrandedListingCardProps {
  image?: string;
  name?: string;
  location?: string;
  brand?: string;
  developer?: string;
  delivery?: string;
  status?: string;
  construction?: number;
  availableUnits?: number;
  totalUnits?: number;
  priceRange?: string;
  trending?: boolean;
  typologies?: { type: string; from: number }[];
  href?: string;
}

const BrandedListingCard = ({
  image,
  name = "Four Seasons Private Residences",
  location = "Marbella, Costa del Sol",
  brand = "Four Seasons",
  developer = "Four Seasons Hotels",
  delivery = "Q2 2027",
  status = "Selling",
  construction = 45,
  availableUnits = 8,
  totalUnits = 32,
  priceRange = "€3,500,000 — €8,200,000",
  trending = true,
  typologies = [
    { type: "Penthouse", from: 5200000 },
    { type: "Villa", from: 6800000 },
    { type: "Apartment", from: 3500000 },
  ],
  href = "/branded-residences/four-seasons-marbella",
}: BrandedListingCardProps) => (
  <ProjectCard
    image={image}
    name={name}
    location={location}
    badge="Branded"
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
  />
);

export default BrandedListingCard;
