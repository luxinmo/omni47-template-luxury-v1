/**
 * LUXINMO LANDING PAGE
 * Reusable luxury real estate landing template for city + property type combos.
 * Example: "Villas de Lujo en Venta en Javea"
 * Uses the existing design system: palette, fonts, Layout, FadeIn, SEOHead.
 */

import { useState } from "react";
import {
  ChevronRight, MapPin, Bed, Bath, Maximize, ArrowRight, ArrowUpRight,
  Lock, EyeOff, Sun, TrendingUp, Users, Building2, UtensilsCrossed, BarChart3,
  Plus, Minus, Phone, MessageCircle, Video, Eye, Star,
  CheckCircle2, Quote,
} from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { palette, fonts, brand, contact } from "@/config/template";
import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import detail1 from "@/assets/property-detail-1.jpg";

/* ─── Data ─── */
const PROPERTIES = [
  { id: 1, name: "Villa Portichol", zone: "Portichol", price: "€2,450,000", beds: 5, baths: 4, sqm: 420, image: prop1, ref: "LX-4501" },
  { id: 2, name: "Villa La Corona", zone: "La Corona", price: "€1,890,000", beds: 4, baths: 3, sqm: 350, image: prop2, ref: "LX-4502" },
  { id: 3, name: "Villa Montgó", zone: "Montgó", price: "€1,350,000", beds: 4, baths: 3, sqm: 285, image: prop3, ref: "LX-4503" },
  { id: 4, name: "Villa Tosalet", zone: "Tosalet", price: "€980,000", beds: 3, baths: 2, sqm: 220, image: detail1, ref: "LX-4504" },
  { id: 5, name: "Villa Cap Martí", zone: "Cap Martí", price: "€1,650,000", beds: 5, baths: 4, sqm: 380, image: heroImg, ref: "LX-4505" },
  { id: 6, name: "Villa Ambolo", zone: "Ambolo", price: "€3,200,000", beds: 6, baths: 5, sqm: 520, image: prop1, ref: "LX-4506" },
];

const ZONES = [
  { name: "Portichol", desc: "Bahía exclusiva, villas frente al mar con acceso directo a la playa", price: "€2M – €8M" },
  { name: "La Corona", desc: "Vistas panorámicas 360° al mar y montaña, parcelas amplias", price: "€1.2M – €4M" },
  { name: "Montgó", desc: "Parque natural, orientación sur, tranquilidad absoluta", price: "€800K – €2.5M" },
  { name: "Tosalet", desc: "Comunidad internacional, cerca de Cala Blanca y servicios", price: "€700K – €2M" },
  { name: "Cap Martí", desc: "Zona residencial consolidada, cerca del puerto deportivo", price: "€900K – €3M" },
  { name: "Ambolo", desc: "Acantilados espectaculares, calas vírgenes, máxima privacidad", price: "€1.5M – €5M" },
];

const REASONS = [
  { icon: Sun, title: "Clima excepcional", desc: "320 días de sol al año con un microclima único en la costa mediterránea" },
  { icon: TrendingUp, title: "Alta rentabilidad", desc: "Ingresos por alquiler vacacional entre 25.000€ y 40.000€/año" },
  { icon: Users, title: "Comunidad internacional", desc: "El 60% de los compradores son extranjeros, mercado consolidado" },
  { icon: Building2, title: "Infraestructura premium", desc: "Hospital, colegios internacionales, puerto deportivo, campo de golf" },
  { icon: UtensilsCrossed, title: "Gastronomía mediterránea", desc: "Restaurantes con estrella Michelin y mercados con producto local" },
  { icon: BarChart3, title: "Revalorización constante", desc: "Incremento medio del 8% anual en propiedades de lujo desde 2019" },
];

const FAQS = [
  { q: "¿Cuánto cuesta una villa de lujo en Javea?", a: "El precio medio de una villa de lujo en Javea oscila entre €800.000 y €5.000.000, dependiendo de la ubicación, superficie, vistas al mar y calidades. Las propiedades en primera línea de playa o con acceso directo al mar pueden superar los €8.000.000." },
  { q: "¿Cuáles son las mejores zonas para comprar?", a: "Las zonas más demandadas son Portichol (primera línea de mar), La Corona (vistas panorámicas), Montgó (naturaleza y tranquilidad), Tosalet (comunidad internacional) y Cap Martí (cerca del puerto). Cada zona tiene un carácter único que se adapta a diferentes estilos de vida." },
  { q: "¿Necesito NIE para comprar una propiedad en España?", a: "Sí, el NIE (Número de Identidad de Extranjero) es imprescindible para cualquier transacción inmobiliaria en España. Podemos ayudarle a obtenerlo a través de nuestro servicio de asistencia legal, normalmente en un plazo de 2-4 semanas." },
  { q: "¿Cuál es el proceso de compra para extranjeros?", a: "El proceso incluye: 1) Selección de propiedades con asesor personal, 2) Negociación y reserva con contrato de arras (10% del precio), 3) Due diligence legal, 4) Firma ante notario. Todo el proceso puede completarse en 6-8 semanas." },
  { q: "¿Es rentable alquilar una villa en Javea?", a: "Sí, Javea es uno de los destinos más rentables de la Costa Blanca. Una villa de 4 dormitorios bien ubicada puede generar entre €25.000 y €40.000 anuales en alquiler vacacional, con una ocupación media del 75% en temporada alta." },
  { q: "¿Qué impuestos se pagan al comprar?", a: "Para obra nueva: IVA (10%) + AJD (1,5%). Para segunda mano: ITP (10% en la Comunidad Valenciana). Además, hay gastos de notaría, registro y gestoría que suelen sumar un 2-3% adicional." },
  { q: "¿Cuánto tarda todo el proceso de compra?", a: "Desde la selección hasta la firma ante notario, el proceso completo suele durar entre 6 y 12 semanas. Si necesita financiación hipotecaria, el plazo puede extenderse a 8-16 semanas." },
  { q: "¿Puedo obtener hipoteca como extranjero?", a: "Sí, los bancos españoles ofrecen hipotecas a no residentes, generalmente hasta el 60-70% del valor de tasación. Los tipos de interés actuales oscilan entre el 3% y el 4,5%." },
];

const ARTICLES = [
  { title: "Las 5 mejores playas de Javea", excerpt: "Descubre las calas y playas más exclusivas que hacen de Javea un paraíso mediterráneo.", image: prop2 },
  { title: "Guía fiscal para comprar en España 2026", excerpt: "Todo lo que necesitas saber sobre impuestos, deducciones y obligaciones fiscales al comprar.", image: prop1 },
  { title: "Vivir en Javea: lo que necesitas saber", excerpt: "Estilo de vida, coste de vida, sanidad, colegios y todo para planificar tu mudanza.", image: prop3 },
];

const INTERNAL_LINKS = [
  "Villas de lujo en Moraira", "Apartamentos en Calpe", "Propiedades en Altea",
  "Chalets en Benissa", "Villas en Benidorm", "Costa Blanca propiedades",
  "Obra nueva en Javea", "Áticos en Javea",
];

const TESTIMONIALS = [
  { name: "James & Sarah Thompson", nationality: "London, UK", text: "Luxinmo nos ayudó a encontrar nuestra villa soñada en Portichol. El proceso fue impecable, transparente y mucho más sencillo de lo que esperábamos.", image: prop2 },
  { name: "Klaus & Ingrid Weber", nationality: "München, Germany", text: "Después de buscar durante meses, Luxinmo nos presentó una propiedad off-market que era exactamente lo que buscábamos. Profesionalidad absoluta.", image: prop3 },
];

const STATS = [
  { value: "45", label: "Propiedades" },
  { value: "€1.2M", label: "Precio Medio" },
  { value: "25+", label: "Off-Market" },
  { value: "320", label: "Días de Sol" },
];

/* ════════════════════════════ COMPONENT ════════════════════════════ */

const LuxinmoLandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [appointmentType, setAppointmentType] = useState("videocall");

  return (
    <Layout navVariant="transparent" activePath="/" showBackToTop>
      <SEOHead
        title="Villas de Lujo en Venta en Javea"
        description="Descubre las mejores villas de lujo en venta en Javea. 45 propiedades exclusivas desde €690,000. Asesoramiento personalizado con Luxinmo."
      />

      {/* ─── HERO ─── */}
      <section className="relative h-[55vh] sm:h-[70vh] lg:h-[85vh] min-h-[400px] flex items-end overflow-hidden">
        <img src={heroImg} alt="Villas de lujo en Javea" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.7) 0%, rgba(26,23,20,0.15) 40%, rgba(26,23,20,0.25) 100%)" }} />
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="flex items-center gap-1.5 mb-6">
              {["Home", "Costa Blanca", "Javea", "Villas de Lujo"].map((item, i, arr) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3 h-3" style={{ color: "rgba(255,255,255,0.3)" }} />}
                  <span className="text-[11px] tracking-[0.12em] uppercase font-light" style={{ color: i === arr.length - 1 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)" }}>
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-extralight leading-[1.1] mb-4 sm:mb-5 max-w-[700px]" style={{ fontFamily: fonts.heading, color: "#fff", letterSpacing: "0.06em" }}>
              Villas de Lujo en Venta en Javea
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[14px] sm:text-base font-light leading-[1.7] mb-7 max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
              Descubre las propiedades más exclusivas de la Costa Blanca. Asesoramiento personalizado y acceso a propiedades fuera de mercado.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "45 propiedades" },
                { label: "Desde €690,000" },
                { label: "Javea, Alicante" },
              ].map(b => (
                <span key={b.label} className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.1em] uppercase font-light" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}>
                  {b.label}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── STATS RIBBON ─── */}
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

      {/* ─── SEO INTRO TEXT ─── */}
      <section className="py-16 sm:py-24" style={{ background: palette.white }}>
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-[1px]" style={{ background: palette.accent }} />
              <p className="text-xs tracking-[0.3em] uppercase font-normal" style={{ color: palette.accent }}>Javea, Costa Blanca</p>
            </div>
            <p className="text-[15px] leading-[1.9] font-light mb-6" style={{ color: palette.textMuted }}>
              Javea (Xàbia) es uno de los destinos más codiciados de la Costa Blanca para la compra de villas de lujo.
              Situada entre el Cabo de San Antonio y el Cabo de la Nao, esta joya del Mediterráneo combina un entorno
              natural privilegiado con una infraestructura de primer nivel, atrayendo a compradores de toda Europa.
            </p>
            <p className="text-[15px] leading-[1.9] font-light mb-6" style={{ color: palette.textMuted }}>
              El mercado inmobiliario de lujo en Javea ha experimentado un crecimiento sostenido del 8% anual desde 2019,
              impulsado por la demanda internacional y la escasez de parcelas disponibles en las zonas más exclusivas.
              Las villas con vistas al mar, acceso privado a calas y acabados de alta gama son las más solicitadas.
            </p>
            <p className="text-[15px] leading-[1.9] font-light" style={{ color: palette.textLight }}>
              Con más de 320 días de sol al año, una gastronomía excepcional, puerto deportivo, campos de golf y una
              vibrante comunidad internacional, Javea ofrece el equilibrio perfecto entre exclusividad y calidad de vida
              mediterránea.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── MARKET DATA ─── */}
      <section className="py-14 sm:py-20" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal text-center" style={{ color: palette.accent }}>Datos de Mercado</p>
            <h2 className="text-2xl sm:text-3xl font-extralight text-center mb-12" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Mercado Inmobiliario en Javea</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Precio medio", value: "€1.2M" },
              { label: "Desde", value: "€690K" },
              { label: "Hasta", value: "€5.2M" },
              { label: "Superficie media", value: "285 m²" },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div className="text-center py-8 px-4" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                  <p className="text-2xl sm:text-3xl font-extralight" style={{ fontFamily: fonts.heading, color: palette.accent, letterSpacing: "0.04em" }}>{s.value}</p>
                  <p className="text-[10px] tracking-[0.18em] uppercase mt-3 font-normal" style={{ color: palette.textLight }}>{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-12 sm:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Portfolio</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Propiedades Destacadas</h2>
              </div>
              <a href="/properties" className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                Ver Todas <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
            {PROPERTIES.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={p.image} alt={`${p.name} — ${p.zone}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center" style={{ background: "rgba(26,23,20,0.3)" }}>
                      <span className="text-xs tracking-[0.2em] uppercase text-white border border-white/40 px-7 py-3 font-light">View</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.6) 0%, transparent 100%)" }}>
                      <span className="text-xs tracking-[0.15em] font-light" style={{ color: "rgba(255,255,255,0.6)" }}>Ref: {p.ref}</span>
                    </div>
                  </div>
                  <div className="pt-5 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" style={{ color: palette.textLight }} />
                      <p className="text-xs tracking-[0.12em] uppercase font-light" style={{ color: palette.textLight }}>{p.zone}, Javea</p>
                    </div>
                    <h3 className="text-lg font-light tracking-wide" style={{ fontFamily: fonts.heading }}>{p.name}</h3>
                    <p className="text-base font-normal" style={{ color: palette.accent }}>{p.price}</p>
                    <div className="flex items-center gap-5 pt-1 text-[13px] font-light" style={{ color: palette.textMuted }}>
                      <span className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {p.beds}</span>
                      <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {p.baths}</span>
                      <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" /> {p.sqm} m²</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="flex md:hidden gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {PROPERTIES.map(p => (
              <div key={p.id} className="flex-shrink-0" style={{ width: "78vw", maxWidth: 300 }}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: "linear-gradient(to top, rgba(26,23,20,0.6) 0%, transparent 100%)" }}>
                      <span className="text-[10px] tracking-[0.15em] font-light" style={{ color: "rgba(255,255,255,0.6)" }}>Ref: {p.ref}</span>
                    </div>
                  </div>
                  <div className="pt-4 space-y-1.5">
                    <p className="text-[11px] tracking-[0.1em] uppercase font-light" style={{ color: palette.textLight }}>{p.zone}</p>
                    <h3 className="text-base font-light" style={{ fontFamily: fonts.heading }}>{p.name}</h3>
                    <p className="text-[15px] font-normal" style={{ color: palette.accent }}>{p.price}</p>
                    <div className="flex items-center gap-4 pt-1 text-[12px] font-light" style={{ color: palette.textMuted }}>
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {p.beds}</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {p.baths}</span>
                      <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {p.sqm} m²</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-12 sm:mt-16">
              <a href="/properties" className="inline-flex items-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-8 py-4 transition-all duration-300 hover:opacity-90" style={{ background: palette.accent, color: "#fff" }}>
                Ver las 45 villas disponibles <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── OFF-MARKET ─── */}
      <section className="py-0" style={{ background: palette.offMarketBg }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <FadeIn className="relative overflow-hidden min-h-[320px] md:min-h-[520px]">
              <img src={prop3} alt="Propiedades exclusivas off-market en Javea" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(to right, transparent 30%, rgba(30,28,26,0.95) 100%)" }} />
              <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(30,28,26,0.9) 100%)" }} />
              <div className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1.5" style={{ background: "rgba(30,28,26,0.7)", backdropFilter: "blur(12px)" }}>
                <EyeOff className="w-3.5 h-3.5" style={{ color: palette.offMarketAccent }} />
                <span className="text-xs tracking-[0.15em] uppercase font-normal" style={{ color: palette.offMarketAccent }}>Off-Market</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-16 md:py-20">
              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-8 h-[1px]" style={{ background: palette.offMarketAccent }} />
                <p className="text-xs tracking-[0.3em] uppercase font-normal" style={{ color: palette.offMarketAccent }}>Exclusivo & Confidencial</p>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extralight leading-[1.1] mb-6" style={{ fontFamily: fonts.heading, color: "#fff", letterSpacing: "0.06em" }}>
                25 Propiedades<br />Fuera de Mercado
              </h2>
              <p className="text-[15px] leading-[1.9] font-light mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
                Tenemos propiedades que no aparecen en ningún portal inmobiliario. Solo accesibles para compradores cualificados que buscan verdadera exclusividad en Javea.
              </p>
              <a href="#contact" className="inline-flex items-center justify-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-8 py-4 transition-all duration-500 hover:opacity-90 self-start" style={{ background: palette.offMarketAccent, color: palette.offMarketBg }}>
                <Lock className="w-4 h-4" /> Solicitar Acceso
              </a>
              <p className="text-xs font-light mt-8" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span style={{ color: palette.offMarketAccent }} className="font-normal">25+</span> propiedades off-market disponibles
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── ZONES / BARRIOS ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Zonas</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Las Mejores Zonas para Comprar en Javea</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ZONES.map((z, i) => (
              <FadeIn key={z.name} delay={i * 0.06}>
                <div className="p-7 transition-all duration-300 hover:shadow-md" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 flex items-center justify-center" style={{ border: `1px solid ${palette.border}`, borderRadius: "50%" }}>
                      <MapPin className="w-4 h-4" style={{ color: palette.accent }} />
                    </div>
                    <h3 className="text-[17px] font-light tracking-wide" style={{ fontFamily: fonts.heading }}>{z.name}</h3>
                  </div>
                  <p className="text-[13px] leading-[1.7] font-light mb-5" style={{ color: palette.textMuted }}>{z.desc}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-[1px]" style={{ background: palette.accent }} />
                    <span className="text-[13px] font-normal" style={{ color: palette.accent }}>{z.price}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY INVEST ─── */}
      <section className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Inversión</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>¿Por qué Invertir en Javea?</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {REASONS.map((r, i) => (
              <FadeIn key={r.title} delay={i * 0.06}>
                <div className="p-6 sm:p-7" style={{
                  borderBottom: i < 3 ? `1px solid ${palette.border}` : (i < 6 ? "none" : undefined),
                  borderRight: i % 3 !== 2 ? `1px solid ${palette.border}` : "none",
                }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ border: `1px solid ${palette.border}` }}>
                    <r.icon className="w-4 h-4" style={{ color: palette.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-light mb-2 tracking-wide" style={{ fontFamily: fonts.heading }}>{r.title}</h3>
                  <p className="text-[13px] leading-[1.7] font-light" style={{ color: palette.textMuted }}>{r.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQS ─── */}
      <section className="py-16 sm:py-24" style={{ background: palette.bg }}>
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>FAQ</p>
              <h2 className="text-2xl sm:text-3xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Preguntas Frecuentes</h2>
            </div>
          </FadeIn>
          <div style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? `1px solid ${palette.border}` : "none" }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 sm:px-8 py-5 text-left transition-colors duration-200"
                    style={{ background: "transparent" }}
                  >
                    <span className="text-[14px] font-light tracking-wide pr-4" style={{ color: isOpen ? palette.accent : palette.text, fontFamily: fonts.heading }}>{faq.q}</span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ border: `1px solid ${palette.border}` }}>
                      {isOpen ? <Minus className="w-3.5 h-3.5" style={{ color: palette.accent }} /> : <Plus className="w-3.5 h-3.5" style={{ color: palette.textLight }} />}
                    </span>
                  </button>
                  <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0 }}>
                    <p className="px-6 sm:px-8 pb-6 text-[13px] leading-[1.8] font-light pr-12" style={{ color: palette.textMuted }}>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PERSONAL APPOINTMENT ─── */}
      <section id="contact" className="py-16 sm:py-24 md:py-32" style={{ background: palette.white }}>
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Contacto Personal</p>
              <h2 className="text-2xl sm:text-3xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Agenda una Cita Personalizada</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">
              {/* Advisor */}
              <div className="md:col-span-2 flex flex-col items-center text-center">
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-5" style={{ border: `2px solid ${palette.accent}` }}>
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" alt="Ana García" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[17px] font-light tracking-wide" style={{ fontFamily: fonts.heading }}>Ana García</h3>
                <p className="text-xs tracking-[0.1em] uppercase font-normal mt-1" style={{ color: palette.accent }}>Especialista en Javea</p>
                <p className="text-xs font-light mt-1 mb-6" style={{ color: palette.textLight }}>15 años de experiencia</p>

                <div className="flex flex-col gap-3 w-full">
                  <a href="https://wa.me/34966000000" className="flex items-center justify-center gap-2 text-xs tracking-[0.12em] uppercase font-light px-6 py-3.5 transition-all hover:opacity-90" style={{ background: "#25D366", color: "#fff" }}>
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                  <a href="tel:+34966000000" className="flex items-center justify-center gap-2 text-xs tracking-[0.12em] uppercase font-light px-6 py-3.5 transition-all hover:opacity-90" style={{ border: `1px solid ${palette.border}`, color: palette.text }}>
                    <Phone className="w-4 h-4" /> Llamar
                  </a>
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-3 p-6 sm:p-8" style={{ border: `1px solid ${palette.border}` }}>
                <p className="text-[13px] font-light mb-5" style={{ color: palette.textMuted }}>Elige cómo prefieres reunirte</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { val: "office", label: "Presencial", icon: Building2 },
                    { val: "videocall", label: "Videollamada", icon: Video },
                    { val: "visit", label: "Visita propiedades", icon: Eye },
                  ].map(t => (
                    <button key={t.val} onClick={() => setAppointmentType(t.val)} className="flex items-center gap-1.5 px-4 py-2.5 text-xs tracking-[0.08em] uppercase font-light transition-all duration-200" style={{
                      border: `1px solid ${appointmentType === t.val ? palette.accent : palette.border}`,
                      background: appointmentType === t.val ? `${palette.accent}10` : "transparent",
                      color: appointmentType === t.val ? palette.accent : palette.textLight,
                    }}>
                      <t.icon className="w-3.5 h-3.5" /> {t.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { ph: "Nombre completo", type: "text" },
                    { ph: "Email", type: "email" },
                    { ph: "Teléfono", type: "tel" },
                    { ph: "Fecha preferida", type: "date" },
                  ].map(f => (
                    <input key={f.ph} placeholder={f.ph} type={f.type} className="w-full px-4 py-3.5 text-sm font-light focus:outline-none transition-colors" style={{ border: `1px solid ${palette.border}`, background: palette.bg, color: palette.text, fontSize: 16 }} />
                  ))}
                </div>
                <textarea placeholder="Mensaje opcional — cuéntanos qué buscas..." rows={3} className="w-full px-4 py-3.5 text-sm font-light focus:outline-none transition-colors mb-5" style={{ border: `1px solid ${palette.border}`, background: palette.bg, color: palette.text, resize: "vertical", fontSize: 16 }} />
                <button className="w-full text-xs tracking-[0.18em] uppercase font-normal px-8 py-4 transition-all duration-300 hover:opacity-90" style={{ background: palette.accent, color: "#fff" }}>
                  Solicitar Cita
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SELL YOUR PROPERTY ─── */}
      <section className="py-14 sm:py-20 md:py-28" style={{ background: palette.bgAlt }}>
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Vender</p>
              <h2 className="text-2xl sm:text-3xl font-extralight mb-4" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>¿Tiene una propiedad en Javea?</h2>
              <p className="text-[15px] leading-[1.8] font-light max-w-lg mx-auto" style={{ color: palette.textMuted }}>
                Confíe en el equipo con mayor alcance internacional en la Costa Blanca para vender su propiedad al mejor precio.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto">
              {[
                "Valoración gratuita y sin compromiso",
                "Red de compradores en 30 países",
                "Marketing premium: fotos, video, dron",
                "Presencia en 9 idiomas",
              ].map(txt => (
                <div key={txt} className="flex items-start gap-2.5 text-[13px] font-light" style={{ color: palette.text }}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: palette.accent }} /> {txt}
                </div>
              ))}
            </div>
            <div className="text-center">
              <a href="/sell" className="inline-flex items-center gap-2.5 text-[13px] tracking-[0.18em] uppercase font-light px-8 py-4 transition-all duration-300 hover:opacity-90" style={{ background: palette.accent, color: "#fff" }}>
                Solicitar Valoración Gratuita <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── BLOG / JOURNAL ─── */}
      <section className="py-14 sm:py-20 md:py-28" style={{ background: palette.bg }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between mb-10 sm:mb-16">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Insights</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Guías y Artículos sobre Javea</h2>
              </div>
              <a href="/blog" className="hidden sm:flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase font-light transition-opacity hover:opacity-60" style={{ color: palette.accent }}>
                Ver Todos <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {ARTICLES.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.1}>
                <a href="/blog" className="group block">
                  <div className="overflow-hidden aspect-[16/10]">
                    <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-105" />
                  </div>
                  <div className="pt-5 space-y-2">
                    <h3 className="text-[16px] font-light leading-[1.4] group-hover:opacity-70 transition-opacity tracking-wide" style={{ fontFamily: fonts.heading }}>{a.title}</h3>
                    <p className="text-[13px] leading-[1.6] font-light" style={{ color: palette.textMuted }}>{a.excerpt}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTERNAL LINKS ─── */}
      <section className="py-10 sm:py-14" style={{ background: palette.white, borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <p className="text-xs tracking-[0.15em] uppercase font-light mb-5" style={{ color: palette.textLight }}>Descubre más propiedades en la Costa Blanca</p>
          <div className="flex flex-wrap gap-2">
            {INTERNAL_LINKS.map(l => (
              <a key={l} href="#" className="px-4 py-2 text-[12px] tracking-[0.08em] font-light transition-all duration-200 hover:opacity-70" style={{ border: `1px solid ${palette.border}`, color: palette.text }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAP PLACEHOLDER ─── */}
      <section className="py-16 sm:py-24" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-3 font-normal" style={{ color: palette.accent }}>Ubicación</p>
            <h2 className="text-2xl sm:text-3xl font-extralight mb-10" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>Mapa de Javea</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="aspect-[16/7] flex flex-col items-center justify-center gap-4" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
              <MapPin className="w-8 h-8" style={{ color: palette.accent }} />
              <p className="text-sm font-light" style={{ color: palette.textLight }}>Mapa interactivo de Javea</p>
              <div className="flex flex-wrap gap-2 justify-center px-4">
                {ZONES.map(z => (
                  <span key={z.name} className="px-3 py-1.5 text-[11px] tracking-[0.08em] font-light" style={{ border: `1px solid ${palette.border}`, color: palette.textMuted }}>
                    📍 {z.name}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        <img src={prop2} alt="Testimonios de clientes" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(26,23,20,0.55)" }} />
        <div className="relative z-10 text-center px-5 max-w-3xl">
          <FadeIn>
            <Quote className="w-8 h-8 mx-auto mb-6" style={{ color: "rgba(255,255,255,0.2)" }} strokeWidth={1} />
            <p className="text-lg sm:text-2xl md:text-3xl font-extralight leading-[1.5] italic" style={{ color: "#fff", fontFamily: fonts.heading, letterSpacing: "0.03em" }}>
              "{TESTIMONIALS[0].text}"
            </p>
            <div className="mt-6 flex flex-col items-center gap-1">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5" style={{ color: palette.offMarketAccent, fill: palette.offMarketAccent }} />)}
              </div>
              <span className="text-sm tracking-[0.15em] uppercase font-light" style={{ color: "rgba(255,255,255,0.7)" }}>{TESTIMONIALS[0].name}</span>
              <span className="text-xs tracking-[0.1em] font-light" style={{ color: "rgba(255,255,255,0.45)" }}>{TESTIMONIALS[0].nationality}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── NEWSLETTER / PRIVATE LIST ─── */}
      <section className="py-14 sm:py-20 md:py-28" style={{ background: palette.bgAlt }}>
        <div className="max-w-xl mx-auto px-5 sm:px-6 text-center">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-normal" style={{ color: palette.accent }}>Newsletter</p>
            <h2 className="text-2xl md:text-3xl font-extralight mb-3" style={{ fontFamily: fonts.heading, letterSpacing: "0.04em" }}>The Private List</h2>
            <p className="text-sm font-light mb-8 leading-relaxed" style={{ color: palette.textMuted }}>
              Recibe listados exclusivos off-market, informes de mercado e invitaciones a visitas privadas directamente en tu bandeja de entrada.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Tu email" className="flex-1 px-5 py-4 text-sm tracking-[0.05em] focus:outline-none transition-colors duration-300" style={{ border: `1px solid ${palette.border}`, background: palette.white, color: palette.text, fontSize: 16 }} />
              <button type="submit" className="text-xs tracking-[0.18em] uppercase font-normal px-8 py-4 transition-all duration-300 hover:opacity-90 whitespace-nowrap" style={{ background: palette.accent, color: "#fff" }}>
                Suscribirse
              </button>
            </form>
            <p className="text-xs mt-4 font-light" style={{ color: palette.textLight }}>Respetamos tu privacidad. Cancela en cualquier momento.</p>
          </FadeIn>
        </div>
      </section>

      {/* ─── MOBILE STICKY CTA ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex gap-2 p-3" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderTop: `1px solid ${palette.border}` }}>
        <a href="https://wa.me/34966000000" className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.1em] uppercase font-medium" style={{ background: "#25D366", color: "#fff" }}>
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <a href="tel:+34966000000" className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-[0.1em] uppercase font-medium" style={{ background: palette.accent, color: "#fff" }}>
          <Phone className="w-4 h-4" /> Llamar
        </a>
      </div>
      <div className="md:hidden h-16" />
    </Layout>
  );
};

export default LuxinmoLandingPage;
