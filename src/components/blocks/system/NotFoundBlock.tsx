/**
 * NOT FOUND BLOCK
 * 404 error page content with CTA to return home.
 * Origin: NotFound page
 */

interface NotFoundBlockProps {
  title?: string;
  code?: string;
  message?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const NotFoundBlock = ({
  title = "Page Not Found",
  code = "404",
  message = "The page you're looking for doesn't exist or has been moved.",
  ctaLabel = "Return to Home",
  ctaHref = "/",
}: NotFoundBlockProps) => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="text-center px-6 max-w-md">
      <p className="text-[80px] md:text-[120px] font-extralight text-neutral-200 leading-none mb-4">{code}</p>
      <h1 className="text-xl md:text-2xl font-light text-neutral-900 mb-3">{title}</h1>
      <p className="text-[14px] font-light text-neutral-500 mb-8 leading-relaxed">{message}</p>
      <a
        href={ctaHref}
        className="inline-flex items-center justify-center text-[12px] tracking-[0.15em] uppercase font-medium px-8 py-3.5 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
      >
        {ctaLabel}
      </a>
    </div>
  </div>
);

export default NotFoundBlock;
