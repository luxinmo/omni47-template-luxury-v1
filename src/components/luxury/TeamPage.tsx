import { ArrowRight, Phone, Linkedin, Mail, MapPin } from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { palette, fonts } from "@/config/template";

const TEAM_MEMBERS = [
  { name: "Arman Yeghiazaryan", role: "Founder & CEO", office: "Altea — HQ", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", desc: "Visionary leader with 15+ years in luxury real estate and technology innovation. Founded Luxinmo to merge data-driven intelligence with exceptional client service.", languages: "EN, ES, RU, AM" },
  { name: "Elena Martínez", role: "Managing Director", office: "Altea — HQ", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", desc: "Oversees all operations across offices, ensuring the highest standards of client service and operational excellence.", languages: "ES, EN, FR" },
  { name: "David van der Berg", role: "Head of International Sales", office: "Netherlands", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", desc: "Leads cross-border transactions connecting European buyers to Mediterranean luxury properties with precision and care.", languages: "NL, EN, ES, DE" },
  { name: "Sofia Petrova", role: "Head of Technology & AI", office: "Altea — HQ", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", desc: "Drives our AI strategy, from predictive analytics to automated client matching and market intelligence systems.", languages: "EN, RU, ES" },
  { name: "Carlos Ruiz", role: "Head of Off-Market & Private Office", office: "Ibiza", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80", desc: "Manages our exclusive portfolio and confidential client network, ensuring absolute discretion in every transaction.", languages: "ES, EN, FR" },
  { name: "Anna Johansson", role: "Senior Luxury Advisor", office: "Ibiza", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", desc: "Specialises in ultra-prime Ibiza properties, from clifftop villas to exclusive beachfront estates.", languages: "SV, EN, ES, DE" },
  { name: "Marco Bernardi", role: "Senior Luxury Advisor", office: "Jávea", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", desc: "Deep expertise in the Altea–Jávea corridor with an extensive network of local developers and private sellers.", languages: "IT, ES, EN" },
  { name: "Natalia Kovalenko", role: "Client Relations Manager", office: "Warsaw", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80", desc: "Ensures seamless communication and after-sales support for our international client base.", languages: "RU, EN, ES, UK" },
  { name: "Thomas Weber", role: "Marketing & Brand Director", office: "Altea — HQ", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", desc: "Leads cinematic content production and digital strategy, positioning every listing as a work of art.", languages: "DE, EN, ES" },
  { name: "Laura Sánchez", role: "Legal & Compliance", office: "Altea — HQ", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80", desc: "Oversees all legal aspects of transactions, ensuring full compliance and protecting client interests at every stage.", languages: "ES, EN, FR" },
];

const STATS = [
  { value: "30+", label: "Team Members" },
  { value: "14", label: "Languages Spoken" },
  { value: "8", label: "Nationalities" },
  { value: "5", label: "Offices" },
];

const TeamPage = () => {
  return (
    <Layout navVariant="solid" activePath="/team" showBackToTop={false} showLanguage={true}>
      <SEOHead
        title="Our Team — Luxinmo Luxury Real Estate"
        description="Meet the multilingual, multicultural team behind Luxinmo. Over 30 professionals across 5 offices, speaking 14 languages."
      />

      {/* ═══ HEADER ═══ */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Our People</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight leading-[1.12] mb-5" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
              The Team Behind Luxinmo
            </h1>
            <div className="w-12 h-[1px] mb-6" style={{ background: palette.accent }} />
            <p className="text-[15px] leading-[1.9] font-light max-w-2xl" style={{ color: palette.textMuted }}>
              A multilingual, multicultural team united by a shared passion for excellence in luxury real estate. Over 30 professionals across 5 offices, speaking 14 languages.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ STATS RIBBON ═══ */}
      <section className="py-8 sm:py-10" style={{ background: palette.bg, borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
              {STATS.map((s, i) => (
                <div key={i} className="text-center" style={{ borderRight: i < 3 ? `1px solid ${palette.border}` : "none" }}>
                  <p className="text-3xl sm:text-4xl font-extralight" style={{ fontFamily: fonts.heading, color: palette.accent, letterSpacing: "0.04em" }}>{s.value}</p>
                  <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase mt-2 font-normal" style={{ color: palette.textLight }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TEAM GRID ═══ */}
      <section className="py-12 sm:py-16 md:py-20" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">

          {/* Leadership — first 2 larger */}
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-8 font-normal" style={{ color: palette.accent }}>Leadership</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-14 sm:mb-18">
            {TEAM_MEMBERS.slice(0, 2).map((member, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group">
                  <div className="relative overflow-hidden mb-5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
                      <span className="text-[10px] tracking-[0.12em] uppercase text-white/80 font-light flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" strokeWidth={1.5} />{member.office}
                      </span>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors">
                          <Linkedin className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors">
                          <Mail className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-light tracking-wide mb-1" style={{ fontFamily: fonts.heading }}>{member.name}</h3>
                  <p className="text-[11px] tracking-[0.15em] uppercase font-normal mb-2" style={{ color: palette.accent }}>{member.role}</p>
                  <p className="text-[13px] leading-[1.8] font-light mb-2" style={{ color: palette.textMuted }}>{member.desc}</p>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-light flex items-center gap-1.5" style={{ color: palette.textLight }}>
                    <MapPin className="w-2.5 h-2.5" strokeWidth={1.5} />{member.office} · Languages: {member.languages}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Rest of team */}
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-8 font-normal" style={{ color: palette.accent }}>Our Advisors & Specialists</p>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
            {TEAM_MEMBERS.slice(2).map((member, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="group">
                  <div className="relative overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
                      <span className="text-[10px] tracking-[0.1em] uppercase text-white/80 font-light flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" strokeWidth={1.5} />{member.office}
                      </span>
                      <div className="flex gap-1.5">
                        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors">
                          <Linkedin className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors">
                          <Mail className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-[14px] font-light tracking-wide mb-1" style={{ fontFamily: fonts.heading }}>{member.name}</h3>
                  <p className="text-[10px] tracking-[0.12em] uppercase font-normal mb-1" style={{ color: palette.accent }}>{member.role}</p>
                  <p className="text-[12px] leading-[1.7] font-light mb-2" style={{ color: palette.textMuted }}>{member.desc}</p>
                  <p className="text-[9px] tracking-[0.1em] uppercase font-light flex items-center gap-1" style={{ color: palette.textLight }}>
                    <MapPin className="w-2.5 h-2.5" strokeWidth={1.5} />{member.office} · {member.languages}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-12 sm:py-16 md:py-20" style={{ background: palette.bg }}>
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-12 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Join Us</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight mb-6" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
              Want to Be Part of<br />the Luxinmo Team?
            </h2>
            <p className="text-[15px] font-light leading-[1.8] mb-10 max-w-lg mx-auto" style={{ color: palette.textMuted }}>
              We're always looking for exceptional talent. If you share our passion for luxury real estate and innovation, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium px-10 py-4 text-white transition-all duration-300 hover:opacity-90"
                style={{ background: palette.accent }}
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/about3"
                className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] uppercase px-10 py-4 transition-all duration-300 hover:bg-white"
                style={{ border: `1px solid ${palette.border}`, color: palette.text }}
              >
                <Phone className="w-4 h-4" /> About Luxinmo
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
};

export default TeamPage;
