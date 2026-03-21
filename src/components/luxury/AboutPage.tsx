import { Layout } from "@/components/layout";
import { palette, fonts, brand } from "@/config/template";
import SEOHead from "@/components/shared/SEOHead";
import FadeIn from "@/components/shared/FadeIn";
import { Link } from "react-router-dom";
import {
  MapPin, Users, Building2, Globe, Award, Shield,
  ChevronRight, ArrowRight, Sparkles, Target, Eye
} from "lucide-react";

import heroImg from "@/assets/about-hero-coastal.jpg";
import officeImg from "@/assets/about-office.jpg";
import teamImg from "@/assets/about-team.jpg";
import destIbiza from "@/assets/dest-ibiza.jpg";
import destCostaBlanca from "@/assets/dest-costa-blanca.jpg";
import destMarbella from "@/assets/dest-marbella.jpg";

/* ─── Data ─── */
const TIMELINE = [
  { year: "2009", title: "Los Orígenes", desc: "Los hermanos Suren y Arman Yeghiazaryan fundan la primera empresa constructora dedicada exclusivamente a la construcción de viviendas de lujo: Galaxia XXI, hoy Grupo Galaxia Development SL." },
  { year: "2014", title: "Nace Luxinmo", desc: "Fruto de la experiencia acumulada y la demanda creciente de los clientes, Arman Yeghiazaryan funda Luxinmo Real Estate como parte del Grupo Galaxia, posicionándose rápidamente en el mercado inmobiliario de lujo." },
  { year: "2017", title: "Innovación Tecnológica", desc: "Se invierte en el diseño y desarrollo de Luxinmo Big Data \"Real Estate Market Control\", un software propio para monitorizar el mercado inmobiliario con precisión, seguido del CRM Luxinmo para gestión de cartera y clientes." },
  { year: "2019", title: "Exclusive Services", desc: "Se crea Luxinmo Exclusive Services, un servicio dedicado a satisfacer las necesidades de los clientes más exigentes que buscan absoluta confidencialidad en sus operaciones inmobiliarias." },
  { year: "2020", title: "Expansión a Ibiza", desc: "Con la idea de expandirse a otras ubicaciones privilegiadas, la empresa abre su segunda oficina en Sant Rafel De Sa Creu, Ibiza." },
  { year: "2021–22", title: "Crecimiento Internacional", desc: "Se abre la primera oficina internacional en Varsovia, Polonia, y nuevas oficinas en Jávea y Calpe, consolidando la presencia en la Costa Blanca." },
];

const OFFICES = [
  { city: "Altea", region: "Costa Blanca", flag: "🇪🇸" },
  { city: "Jávea", region: "Costa Blanca", flag: "🇪🇸" },
  { city: "Calpe", region: "Costa Blanca", flag: "🇪🇸" },
  { city: "Ibiza", region: "Islas Baleares", flag: "🇪🇸" },
  { city: "Varsovia", region: "Polonia", flag: "🇵🇱" },
];

const STATS = [
  { value: "+25", label: "Años de experiencia" },
  { value: "5", label: "Oficinas" },
  { value: "14+", label: "Idiomas" },
  { value: "500+", label: "Propiedades exclusivas" },
];

const VALUES = [
  { icon: Shield, title: "Confidencialidad", desc: "Entendemos que la privacidad es fundamental en las transacciones inmobiliarias de lujo." },
  { icon: Award, title: "Excelencia", desc: "Nos regimos por los más altos estándares de servicio y profesionalismo en cada operación." },
  { icon: Eye, title: "Transparencia", desc: "La honestidad y la integridad guían cada interacción con nuestros clientes." },
  { icon: Sparkles, title: "Innovación", desc: "Invertimos constantemente en tecnología y análisis de datos para ofrecer un servicio superior." },
  { icon: Target, title: "Compromiso", desc: "Cada paso de mejora es un avance hacia el beneficio mutuo y el cumplimiento de los acuerdos." },
  { icon: Globe, title: "Alcance Global", desc: "Equipo multilingüe con presencia internacional para servir a clientes de todo el mundo." },
];

const AREAS = [
  { name: "Costa Blanca", img: destCostaBlanca, locations: "Altea Hills, Villa Gadea, Don Cayo, Mascarat, Ambolo, La Granadella, Portitxol, Cumbre del Sol" },
  { name: "Ibiza", img: destIbiza, locations: "Sant Rafel, Cala Vadella, Santa Eulalia, San José, Es Cubells" },
  { name: "Costa del Sol", img: destMarbella, locations: "Marbella, Puerto Banús, Estepona, Benahavís, Nueva Andalucía" },
];

const AboutPage = () => {
  return (
    <Layout activePath="/about" background={palette.white} showLanguage>
      <SEOHead
        title="About Us — Luxinmo Real Estate"
        description="Más de 25 años de experiencia en la compraventa de propiedades residenciales de lujo en la Costa Blanca, Ibiza y más."
      />

      {/* ═══ HERO ═══ */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <img src={heroImg} alt="Costa Blanca coastline" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)" }} />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="text-[11px] tracking-[0.35em] uppercase mb-4 text-white/70">Sobre Nosotros</p>
            <h1
              className="text-[36px] sm:text-[52px] md:text-[64px] font-extralight leading-[1.05] tracking-tight text-white max-w-3xl"
              style={{ fontFamily: fonts.heading }}
            >
              Un Legado de
              <br />
              <span className="font-light" style={{ color: palette.offMarketAccent }}>Excelencia</span>
            </h1>
            <p className="text-[15px] sm:text-[17px] font-light leading-[1.8] mt-6 max-w-xl text-white/80">
              Más de 25 años de experiencia posicionan a Luxinmo Real Estate como referente del sector inmobiliario de lujo en el Mediterráneo.
            </p>
          </FadeIn>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="w-[1px] h-8 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ═══ STATS RIBBON ═══ */}
      <section style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-6 py-10 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <p className="text-[32px] sm:text-[40px] font-extralight" style={{ color: palette.accent, fontFamily: fonts.heading }}>{s.value}</p>
              <p className="text-[12px] tracking-[0.15em] uppercase mt-1 font-light" style={{ color: palette.textMuted }}>{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ INTRO SPLIT ═══ */}
      <section className="py-20 sm:py-28" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: palette.accent }}>Nuestra Historia</p>
            <h2 className="text-[28px] sm:text-[36px] font-extralight leading-[1.15] mb-6" style={{ color: palette.text, fontFamily: fonts.heading }}>
              De la construcción a la excelencia inmobiliaria
            </h2>
            <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
            <p className="text-[15px] leading-[1.9] font-light mb-5" style={{ color: palette.textMuted }}>
              A pesar de ser una empresa relativamente joven, Luxinmo Real Estate está respaldada por un equipo con más de 25 años de experiencia en la compraventa de propiedades residenciales de lujo a lo largo de la Costa Blanca.
            </p>
            <p className="text-[15px] leading-[1.9] font-light mb-5" style={{ color: palette.textMuted }}>
              En menos de una década desde su nacimiento en Altea, nuestra marca se ha consolidado entre clientes, promotores e inversores como una de las líderes del sector, gracias a la amplitud de su catálogo y la exigencia de sus criterios de selección.
            </p>
            <p className="text-[15px] leading-[1.9] font-light" style={{ color: palette.textMuted }}>
              Utilizando la amplia experiencia adquirida durante años de trabajo en el sector, así como el extenso conocimiento de los materiales de la más alta calidad en construcción, Luxinmo logró posicionarse rápidamente en el contexto del mercado inmobiliario de lujo.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative">
              <img src={officeImg} alt="Oficinas Luxinmo" className="w-full aspect-[4/3] object-cover rounded-sm" />
              <div
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 px-6 py-5 rounded-sm"
                style={{ background: palette.accent }}
              >
                <p className="text-[28px] font-extralight text-white" style={{ fontFamily: fonts.heading }}>2009</p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-white/80 mt-1">Año de fundación</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="py-20 sm:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[1000px] mx-auto px-6 sm:px-10">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4 text-center" style={{ color: palette.accent }}>Línea Temporal</p>
            <h2 className="text-[28px] sm:text-[36px] font-extralight leading-[1.15] mb-16 text-center" style={{ color: palette.text, fontFamily: fonts.heading }}>
              Nuestra Evolución
            </h2>
          </FadeIn>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[20px] sm:left-1/2 top-0 bottom-0 w-[1px]" style={{ background: palette.border }} />
            {TIMELINE.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`relative flex items-start gap-6 sm:gap-0 mb-12 last:mb-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`flex-1 pl-12 sm:pl-0 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left"}`}>
                    <p className="text-[13px] tracking-[0.15em] uppercase font-medium mb-1" style={{ color: palette.accent }}>{item.year}</p>
                    <h3 className="text-[18px] font-light mb-2" style={{ color: palette.text, fontFamily: fonts.heading }}>{item.title}</h3>
                    <p className="text-[14px] leading-[1.8] font-light" style={{ color: palette.textMuted }}>{item.desc}</p>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-[14px] sm:left-1/2 sm:-translate-x-1/2 top-1 w-[13px] h-[13px] rounded-full border-2" style={{ borderColor: palette.accent, background: palette.bg }} />
                  {/* Spacer on desktop */}
                  <div className="hidden sm:block flex-1" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM SECTION ═══ */}
      <section className="py-20 sm:py-28" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <FadeIn delay={0.1}>
              <div className="relative">
                <img src={teamImg} alt="Equipo Luxinmo" className="w-full aspect-[3/2] object-cover rounded-sm" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: palette.accent }}>Nuestro Equipo</p>
              <h2 className="text-[28px] sm:text-[36px] font-extralight leading-[1.15] mb-6" style={{ color: palette.text, fontFamily: fonts.heading }}>
                Un equipo multilingüe y multicultural
              </h2>
              <div className="w-12 h-[1px] mb-8" style={{ background: palette.accent }} />
              <p className="text-[15px] leading-[1.9] font-light mb-5" style={{ color: palette.textMuted }}>
                Con el objetivo de facilitar una comunicación efectiva y una atención personalizada, contamos con agentes que hablan el idioma nativo de propietarios y compradores, cubriendo una amplia gama de idiomas.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Español", "English", "Русский", "Nederlands", "Polski", "Deutsch", "Français", "Català", "Norsk", "Svenska", "Română", "Português", "Srpski", "Հայերեն"].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 text-[11px] tracking-[0.05em] rounded-full"
                    style={{ background: palette.bg, color: palette.textMuted, border: `1px solid ${palette.border}` }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <p className="text-[15px] leading-[1.9] font-light" style={{ color: palette.textMuted }}>
                En Luxinmo entendemos la importancia de ofrecer el mejor servicio posible, desde una simple consulta telefónica hasta la asistencia en la preparación de documentos y gestión de hipotecas, garantizando una experiencia completa y satisfactoria hasta la entrega de llaves.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="py-20 sm:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4 text-center" style={{ color: palette.accent }}>Nuestros Valores</p>
            <h2 className="text-[28px] sm:text-[36px] font-extralight leading-[1.15] mb-4 text-center" style={{ color: palette.text, fontFamily: fonts.heading }}>
              Principios que nos definen
            </h2>
            <p className="text-[14px] leading-[1.7] font-light text-center max-w-lg mx-auto mb-14" style={{ color: palette.textMuted }}>
              Nuestra filosofía se basa en el crecimiento a través de la prestación del mejor servicio como medio para ofrecer el mejor producto.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeIn key={i} delay={i * 0.06}>
                  <div
                    className="p-8 sm:p-10 group"
                    style={{
                      borderRight: (i % 3 !== 2) ? `1px solid ${palette.border}` : "none",
                      borderBottom: i < 3 ? `1px solid ${palette.border}` : "none",
                    }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ border: `1px solid ${palette.border}` }}>
                      <Icon className="w-5 h-5" style={{ color: palette.accent }} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[16px] font-light mb-2 tracking-wide" style={{ color: palette.text, fontFamily: fonts.heading }}>{v.title}</h3>
                    <p className="text-[13px] leading-[1.8] font-light" style={{ color: palette.textMuted }}>{v.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ AREAS ═══ */}
      <section className="py-20 sm:py-28" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4 text-center" style={{ color: palette.accent }}>Nuestras Áreas</p>
            <h2 className="text-[28px] sm:text-[36px] font-extralight leading-[1.15] mb-4 text-center" style={{ color: palette.text, fontFamily: fonts.heading }}>
              Presencia en las mejores ubicaciones
            </h2>
            <p className="text-[14px] leading-[1.7] font-light text-center max-w-lg mx-auto mb-14" style={{ color: palette.textMuted }}>
              La ubicación privilegiada de nuestras oficinas nos permite un máximo control de las zonas más prestigiosas.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AREAS.map((area, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-sm cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={area.img}
                      alt={area.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <h3 className="text-[22px] font-light text-white mb-2" style={{ fontFamily: fonts.heading }}>{area.name}</h3>
                    <p className="text-[12px] leading-[1.6] text-white/70 font-light">{area.locations}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OFFICES ═══ */}
      <section className="py-16 sm:py-20" style={{ background: palette.bg }}>
        <div className="max-w-[1000px] mx-auto px-6 sm:px-10">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color: palette.accent }}>Nuestras Oficinas</p>
                <h2 className="text-[24px] sm:text-[30px] font-extralight" style={{ color: palette.text, fontFamily: fonts.heading }}>5 oficinas, 3 países</h2>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-70"
                style={{ color: palette.accent }}
              >
                Contáctanos <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {OFFICES.map((o, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div
                  className="p-5 rounded-sm text-center transition-all hover:-translate-y-0.5"
                  style={{ background: palette.white, border: `1px solid ${palette.border}` }}
                >
                  <span className="text-[24px] mb-2 block">{o.flag}</span>
                  <p className="text-[15px] font-light" style={{ color: palette.text }}>{o.city}</p>
                  <p className="text-[11px] tracking-[0.1em] uppercase mt-1" style={{ color: palette.textLight }}>{o.region}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY QUOTE ═══ */}
      <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: palette.offMarketBg }}>
        <div className="absolute inset-0 opacity-5">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto px-6 sm:px-10 text-center">
          <FadeIn>
            <div className="w-12 h-[1px] mx-auto mb-8" style={{ background: palette.offMarketAccent }} />
            <blockquote
              className="text-[20px] sm:text-[26px] font-extralight leading-[1.6] mb-8"
              style={{ color: "#FFFFFF", fontFamily: fonts.heading }}
            >
              "Nuestra filosofía se basa en el crecimiento a través de la prestación del mejor servicio como medio para ofrecer el mejor producto."
            </blockquote>
            <p className="text-[12px] tracking-[0.2em] uppercase" style={{ color: palette.offMarketAccent }}>
              — Luxinmo Real Estate
            </p>
            <div className="w-12 h-[1px] mx-auto mt-8" style={{ background: palette.offMarketAccent }} />
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 sm:py-28" style={{ background: palette.white }}>
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: palette.accent }}>¿Listo para empezar?</p>
            <h2 className="text-[28px] sm:text-[36px] font-extralight leading-[1.15] mb-5" style={{ color: palette.text, fontFamily: fonts.heading }}>
              Hablemos sobre su próxima propiedad
            </h2>
            <p className="text-[14px] leading-[1.8] font-light mb-8 max-w-md mx-auto" style={{ color: palette.textMuted }}>
              Nuestro equipo multilingüe está disponible para asistirle con cualquier consulta sobre propiedades de lujo en el Mediterráneo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[12px] tracking-[0.12em] uppercase transition-opacity hover:opacity-90"
                style={{ background: palette.accent, color: palette.white }}
              >
                Contactar
              </Link>
              <Link
                to="/properties"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[12px] tracking-[0.12em] uppercase transition-colors hover:opacity-80"
                style={{ border: `1px solid ${palette.border}`, color: palette.text }}
              >
                Ver Propiedades <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
};

export default AboutPage;
