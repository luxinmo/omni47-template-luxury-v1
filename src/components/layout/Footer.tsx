import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { brand, palette, contact, social, footerColumns } from "@/config/template";

const Footer = () => (
  <footer style={{ background: palette.footer }}>
    <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <span className="text-xl tracking-[0.4em] font-light block mb-1" style={{ color: "#fff" }}>
            {brand.name}
          </span>
          <span className="text-[9px] tracking-[0.4em] uppercase font-light block mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
            {brand.subtitle}
          </span>
          <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
            {brand.tagline}
          </p>
        </div>

        {/* Link columns */}
        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              {col.title}
            </p>
            {col.items.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block text-[12px] font-light py-1 transition-opacity hover:opacity-70"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-14 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="text-[14px] tracking-[0.35em] font-light" style={{ color: "rgba(255,255,255,0.6)" }}>
          {brand.fullName}
        </span>

        <div className="flex gap-3">
          {[
            { Icon: Instagram, href: social.instagram },
            { Icon: Linkedin, href: social.linkedin },
            { Icon: Facebook, href: social.facebook },
            { Icon: Twitter, href: social.twitter },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:border-white/30 hover:text-white/60"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.35)" }}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <p className="text-[10px] tracking-wider font-light" style={{ color: "rgba(255,255,255,0.2)" }}>
          © {new Date().getFullYear()} {brand.fullName}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
