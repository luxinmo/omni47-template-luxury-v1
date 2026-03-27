import { ArrowRight, Phone, Linkedin, Mail } from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { palette, fonts } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";

const TEAM_MEMBERS = [
  { name: "Arman Yeghiazaryan", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", desc: "Visionary leader with 15+ years in luxury real estate and technology innovation. Founded Luxinmo to merge data-driven intelligence with exceptional client service.", languages: "EN, ES, RU, AM" },
  { name: "Elena Martínez", role: "Managing Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", desc: "Oversees all operations across offices, ensuring the highest standards of client service and operational excellence.", languages: "ES, EN, FR" },
  { name: "David van der Berg", role: "Head of International Sales", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", desc: "Leads cross-border transactions connecting European buyers to Mediterranean luxury properties with precision and care.", languages: "NL, EN, ES, DE" },
  { name: "Sofia Petrova", role: "Head of Technology & AI", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", desc: "Drives our AI strategy, from predictive analytics to automated client matching and market intelligence systems.", languages: "EN, RU, ES" },
  { name: "Carlos Ruiz", role: "Head of Off-Market & Private Office", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80", desc: "Manages our exclusive portfolio and confidential client network, ensuring absolute discretion in every transaction.", languages: "ES, EN, FR" },
  { name: "Anna Johansson", role: "Senior Luxury Advisor — Ibiza", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", desc: "Specialises in ultra-prime Ibiza properties, from clifftop villas to exclusive beachfront estates.", languages: "SV, EN, ES, DE" },
  { name: "Marco Bernardi", role: "Senior Luxury Advisor — Costa Blanca", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", desc: "Deep expertise in the Altea–Jávea corridor with an extensive network of local developers and private sellers.", languages: "IT, ES, EN" },
  { name: "Natalia Kovalenko", role: "Client Relations Manager", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80", desc: "Ensures seamless communication and after-sales support for our international client base.", languages: "RU, EN, ES, UK" },
  { name: "Thomas Weber", role: "Marketing & Brand Director", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80", desc: "Leads cinematic content production and digital strategy, positioning every listing as a work of art.", languages: "DE, EN, ES" },
  { name: "Laura Sánchez", role: "Legal & Compliance", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80", desc: "Oversees all legal aspects of transactions, ensuring full compliance and protecting client interests at every stage.", languages: "ES, EN, FR" },
];

const STATS = [
  { value: "30+", label: "Team Members" },
  { value: "14", label: "Languages Spoken" },
  { value: "8", label: "Nationalities" },
  { value: "5", label: "Offices" },
];

const TeamPage = () => {
  return (
    <Layout navVariant="transparent" activePath="/team" showBackToTop={false} showLanguage={true}>
      <SEOHead
        title="Our Team — Luxinmo Luxury Real Estate"
        description="Meet the multilingual, multicultural team behind Luxinmo. Over 30 professionals across 5 offices, speaking 14 languages."
      />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[50vh] sm:h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Luxinmo team" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,18,16,0.75) 0%, rgba(20,18,16,0.3) 50%, rgba(20,18,16,0.5) 100%)" }} />
        <div className="relative z-10 text-center px-5 max-w-3xl">
          <FadeIn>
            <p className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-light mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
              Our People
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight leading-[1.12] mb-5 uppercase" style={{ color: "#fff", fontFamily: fonts.heading, letterSpacing: "0.06em" }}>
              The Team Behind<br />Luxinmo
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="w-14 h-[1px] mx-auto mb-5" style={{ background: palette.offMarketAccent }} />
            <p className="text-[14px] sm:text-[15px] font-light leading-[1.85] max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              A multilingual, multicultural team united by a shared passion for excellence in luxury real estate.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-10 sm:py-14" style={{ background: palette.white, borderBottom: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
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

      {/* ═══ LEADERSHIP ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Leadership</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>
                Meet Our Team
              </h2>
            </div>
          </FadeIn>

          {/* First 2 — larger cards for Founder & MD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 mb-16 sm:mb-20">
            {TEAM_MEMBERS.slice(0, 2).map((member, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group">
                  <div className="relative overflow-hidden mb-5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                        <Linkedin className="w-4 h-4" style={{ color: palette.text }} />
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                        <Mail className="w-4 h-4" style={{ color: palette.text }} />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-light tracking-wide mb-1" style={{ fontFamily: fonts.heading }}>{member.name}</h3>
                  <p className="text-[11px] tracking-[0.15em] uppercase font-normal mb-3" style={{ color: palette.accent }}>{member.role}</p>
                  <p className="text-[14px] leading-[1.8] font-light mb-3" style={{ color: palette.textMuted }}>{member.desc}</p>
                  <p className="text-[11px] tracking-[0.1em] uppercase font-light" style={{ color: palette.textLight }}>Languages: {member.languages}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Rest of team — smaller grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {TEAM_MEMBERS.slice(2).map((member, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="group">
                  <div className="relative overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                        <Linkedin className="w-3.5 h-3.5" style={{ color: palette.text }} />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                        <Mail className="w-3.5 h-3.5" style={{ color: palette.text }} />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-[15px] font-light tracking-wide mb-1" style={{ fontFamily: fonts.heading }}>{member.name}</h3>
                  <p className="text-[11px] tracking-[0.12em] uppercase font-normal mb-2" style={{ color: palette.accent }}>{member.role}</p>
                  <p className="text-[12px] leading-[1.7] font-light mb-2" style={{ color: palette.textMuted }}>{member.desc}</p>
                  <p className="text-[10px] tracking-[0.1em] uppercase font-light" style={{ color: palette.textLight }}>Languages: {member.languages}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
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
