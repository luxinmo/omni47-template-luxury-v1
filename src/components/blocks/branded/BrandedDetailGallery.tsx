/**
 * BRANDED DETAIL GALLERY
 * Mosaic gallery with ROI badge overlay for branded residence detail pages.
 * Wraps ProjectGalleryMosaic with branded defaults.
 * Origin: BrandedResidenceDetailPage
 */

import ProjectGalleryMosaic from "@/components/blocks/projects/ProjectGalleryMosaic";

interface BrandedDetailGalleryProps {
  images?: string[];
  projectName?: string;
  estimatedROI?: string;
  onImageClick?: (index: number) => void;
}

const BrandedDetailGallery = ({
  projectName = "Four Seasons Private Residences",
  estimatedROI = "6 – 8%",
  ...rest
}: BrandedDetailGalleryProps) => (
  <ProjectGalleryMosaic
    projectName={projectName}
    estimatedROI={estimatedROI}
    {...rest}
  />
);

export default BrandedDetailGallery;
