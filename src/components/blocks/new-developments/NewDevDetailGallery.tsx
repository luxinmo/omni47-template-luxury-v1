/**
 * NEW DEV DETAIL GALLERY
 * Mosaic gallery with optional ROI badge for new development detail pages.
 * Wraps ProjectGalleryMosaic with new dev defaults.
 * Origin: NewDevelopmentDetailPage
 */

import ProjectGalleryMosaic from "@/components/blocks/projects/ProjectGalleryMosaic";

interface NewDevDetailGalleryProps {
  images?: string[];
  projectName?: string;
  estimatedROI?: string;
  onImageClick?: (index: number) => void;
}

const NewDevDetailGallery = ({
  projectName = "Marea Residences",
  estimatedROI = "5 – 7%",
  ...rest
}: NewDevDetailGalleryProps) => (
  <ProjectGalleryMosaic
    projectName={projectName}
    estimatedROI={estimatedROI}
    {...rest}
  />
);

export default NewDevDetailGallery;
