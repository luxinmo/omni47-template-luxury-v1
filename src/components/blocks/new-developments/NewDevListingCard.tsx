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
  priceMin?: number;
  priceMax?: number;
  trending?: boolean;
  typologies?: { type: string; from: number }[];
  href?: string;
}

const NewDevListingCard = ({
  name = "Marea Residences",
  ...rest
}: NewDevListingCardProps) => (
  <ProjectCard variant="newdev" name={name} {...rest} />
);

export default NewDevListingCard;
