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
  priceMin?: number;
  priceMax?: number;
  trending?: boolean;
  typologies?: { type: string; from: number }[];
  href?: string;
}

const BrandedListingCard = ({
  name = "Four Seasons Private Residences",
  brand = "Four Seasons",
  ...rest
}: BrandedListingCardProps) => (
  <ProjectCard variant="branded" name={name} brand={brand} {...rest} />
);

export default BrandedListingCard;
