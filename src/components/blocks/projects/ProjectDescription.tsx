/**
 * PROJECT DESCRIPTION
 * Multi-paragraph "About the Project" section.
 * Different from DetailDescription (which is expandable single text).
 * Origin: BrandedResidenceDetailPage, NewDevelopmentDetailPage
 */

interface ProjectDescriptionProps {
  sectionLabel?: string;
  title?: string;
  paragraphs?: string[];
}

const defaultParagraphs = [
  "Four Seasons Private Residences Marbella represents the pinnacle of branded luxury living on the Costa del Sol. Set on a privileged oceanfront plot between Marbella and Estepona, this exclusive development offers 32 meticulously designed residences.",
  "Each home has been designed in collaboration with internationally acclaimed architects, featuring floor-to-ceiling windows that frame panoramic Mediterranean views, premium natural stone finishes, bespoke Italian kitchens and state-of-the-art home automation systems.",
  "Residents enjoy full access to Four Seasons hotel services: 24-hour concierge, in-residence dining, housekeeping, valet parking, private chef arrangements and priority reservations at the hotel's restaurants and spa.",
];

const ProjectDescription = ({
  sectionLabel = "About the Project",
  title = "Four Seasons Private Residences",
  paragraphs = defaultParagraphs,
}: ProjectDescriptionProps) => (
  <section>
    <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal text-amber-700/70">{sectionLabel}</p>
    <h2 className="text-2xl sm:text-3xl font-extralight mb-8 tracking-[0.04em] text-neutral-900">{title}</h2>
    <div className="space-y-5 text-[15px] leading-[1.9] font-light text-neutral-500">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  </section>
);

export default ProjectDescription;
