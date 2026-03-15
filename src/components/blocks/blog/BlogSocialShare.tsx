/**
 * BLOG SOCIAL SHARE
 * Floating vertical sidebar with social media share icons.
 * Origin: BlogDetailPage
 */

import { Facebook, Twitter, Linkedin, Instagram, Share2 } from "lucide-react";

interface BlogSocialShareProps {
  links?: { icon: string; href: string }[];
}

const iconMap: Record<string, React.FC<{ className?: string; strokeWidth?: number }>> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  share: Share2,
};

const defaultLinks = [
  { icon: "facebook", href: "#" },
  { icon: "twitter", href: "#" },
  { icon: "linkedin", href: "#" },
  { icon: "instagram", href: "#" },
  { icon: "share", href: "#" },
];

const BlogSocialShare = ({ links = defaultLinks }: BlogSocialShareProps) => (
  <aside className="flex flex-col items-center gap-3 pt-4">
    {links.map((link, i) => {
      const Icon = iconMap[link.icon] || Share2;
      return (
        <a
          key={i}
          href={link.href}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 border border-neutral-200 text-neutral-500"
        >
          <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
        </a>
      );
    })}
  </aside>
);

export default BlogSocialShare;
