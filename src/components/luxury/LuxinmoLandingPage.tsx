/**
 * LUXINMO LANDING PAGE
 * Content-first: NO hero image. H1 + properties visible without scroll.
 * Reusable template for city + property type combos.
 * Example: "Villas de Lujo en Venta en Javea"
 * Uses existing design system: palette, fonts, Layout, FadeIn, SEOHead.
 */

import { useState } from "react";
import {
  ChevronRight, MapPin, Bed, Bath, Maximize, ArrowRight,
  Lock, Sun, TrendingUp, Users, Building2, UtensilsCrossed, BarChart3,
  Plus, Minus, Phone, MessageCircle, Video, Eye, Star,
  CheckCircle2, Quote, Globe, Camera, Plane, Mail,
  Instagram, Linkedin, Facebook, Twitter,
} from "lucide-react";
import { Layout } from "@/components/layout";
import FadeIn from "@/components/shared/FadeIn";
import SEOHead from "@/components/shared/SEOHead";
import { palette, fonts } from "@/config/template";
import ListingPropertyCard from "@/components/blocks/listing/ListingPropertyCard";

/* ─── Data ─── */
const PROPERTIES = [
  { id: 1, name: "Villa Portichol", zone: "Portichol", price: "€2,450,000", beds: 5, baths: 4, sqm: 420, ref: "LX-4501" },
  { id: 2, name: "Villa La Corona", zone: "La Corona", price: "€1,890,000", beds: 4, baths: 3, sqm: 350, ref: "LX-4502" },
  { id: 3, name: "Villa Montgó", zone: "Montgó", price: "€1,350,000", beds: 4, baths: 3, sqm: 285, ref: "LX-4503" },
  { id: 4, name: "Villa Tosalet", zone: "Tosalet", price: "€980,000", beds: 3, baths: 2, sqm: 220, ref: "LX-4504" },
  { id: 5, name: "Villa Cap Martí", zone: "Cap Martí", price: "€1,650,000", beds: 5, baths: 4, sqm: 380, ref: "LX-4505" },
  { id: 6, name: "Villa Ambolo", zone: "Ambolo", price: "€3,200,000", beds: 6, baths: 5, sqm: 520, ref: "LX-4506" },
];

const ZONES = [
  { name: "Portichol", desc: "Bahía exclusiva, villas frente al mar, máxima privacidad", price: "€1.5M – €5M" },
  { name: "La Corona", desc: "Vistas panorámicas 360°, parcelas grandes", price: "€900K – €3M" },
  { name: "Montgó", desc: "Parque natural, orientación sur, jardines amplios", price: "€700K – €2M" },
  { name: "Tosalet", desc: "Comunidad internacional, cerca de Cala Blanca", price: "€600K – €1.5M" },
  { name: "Cap Martí", desc: "Zona residencial consolidada, cerca del puerto", price: "€500K – €1.2M" },
  { name: "Ambolo", desc: "Acantilados espectaculares, calas vírgenes", price: "€800K – €2.5M" },
];

const REASONS = [
  { icon: Sun, title: "Clima excepcional", desc: "320 días de sol al año con un microclima único en la costa mediterránea" },
  { icon: TrendingUp, title: "Alta rentabilidad", desc: "Ingresos por alquiler vacacional entre 25.000€ y 40.000€/año" },
  { icon: Users, title: "Comunidad internacional", desc: "El 60% de los compradores son extranjeros, mercado consolidado" },
  { icon: Building2, title: "Infraestructuras", desc: "Hospital, colegios internacionales, puerto deportivo, marina" },
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
  { title: "Las 5 mejores playas de Javea", excerpt: "Descubre las calas y playas más exclusivas que hacen de Javea un paraíso mediterráneo." },
  { title: "Guía fiscal para comprar en España 2026", excerpt: "Todo lo que necesitas saber sobre impuestos, deducciones y obligaciones fiscales al comprar." },
  { title: "Vivir en Javea: lo que necesitas saber", excerpt: "Estilo de vida, coste de vida, sanidad, colegios y todo para planificar tu mudanza." },
];

const INTERNAL_LINKS = [
  "Villas de lujo en Moraira", "Apartamentos en Calpe", "Propiedades en Altea",
  "Chalets en Benissa", "Villas en Benidorm", "Costa Blanca propiedades",
  "Obra nueva en Javea", "Áticos en Javea",
];

const TESTIMONIALS = [
  { name: "James & Sarah Thompson", nationality: "Reino Unido", flag: "🇬🇧", text: "Luxinmo nos ayudó a encontrar nuestra villa soñada en Portichol. El proceso fue impecable, transparente y mucho más sencillo de lo que esperábamos." },
  { name: "Hans & Petra Weber", nationality: "Alemania", flag: "🇩🇪", text: "Después de buscar durante meses, Luxinmo nos presentó una propiedad off-market que era exactamente lo que buscábamos. Profesionalidad absoluta." },
];

const MARKET_STATS = [
  { value: "€1.2M", label: "Precio Medio" },
  { value: "€690K", label: "Desde" },
  { value: "€5.2M", label: "Hasta" },
  { value: "285 m²", label: "Superficie Media" },
];

/* ════════════════════════════ COMPONENT ════════════════════════════ */

const LuxinmoLandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [appointmentType, setAppointmentType] = useState("videocall");

  const accentColor = palette.accent;

  return (
    <Layout navVariant="solid" activePath="/" showBackToTop showFooter={false}>
      <SEOHead
        title="Villas de Lujo en Venta en Javea | Luxinmo"
        description="Descubre las mejores villas de lujo en venta en Javea. 45 propiedades exclusivas desde €690,000. Asesoramiento personalizado con Luxinmo."
      />

      {/* ─── §2 BREADCRUMB ─── */}
      <section className="pt-4 pb-2" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="flex items-center gap-1.5">
            {["Home", "Costa Blanca", "Javea", "Villas de Lujo"].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3" style={{ color: palette.textLight }} />}
                <a
                  href="#"
                  className="text-[11px] tracking-[0.1em] uppercase font-light transition-colors hover:opacity-80"
                  style={{ color: i === arr.length - 1 ? palette.text : palette.textMuted }}
                >
                  {item}
                </a>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── §3 H1 + INTRO ─── */}
      <section className="pt-6 pb-8 sm:pt-8 sm:pb-10" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <h1
              className="text-[28px] sm:text-[36px] md:text-[44px] font-light leading-[1.15] mb-3"
              style={{ fontFamily: fonts.heading, color: palette.text, letterSpacing: "0.02em" }}
            >
              Villas de Lujo en Venta en Javea
            </h1>
            <p className="text-[14px] sm:text-[15px] font-light mb-5" style={{ color: palette.textMuted }}>
              Las propiedades más exclusivas de la Costa Blanca, con asesoramiento personalizado.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="flex flex-wrap gap-2.5 mb-7">
              {[
                { label: "45 propiedades", icon: Eye },
                { label: "Desde €690,000", icon: TrendingUp },
                { label: "Javea, Costa Blanca", icon: MapPin },
              ].map(b => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] tracking-[0.08em] uppercase font-medium rounded-sm"
                  style={{ background: palette.bgAlt, color: palette.textMuted, border: `1px solid ${palette.border}` }}
                >
                  <b.icon className="w-3 h-3" style={{ color: accentColor }} />
                  {b.label}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="max-w-[800px] space-y-4">
              <p className="text-[14px] leading-[1.85] font-light" style={{ color: palette.textMuted }}>
                Javea es uno de los destinos más codiciados de la costa mediterránea española. Situada entre el Cap de Sant Antoni y el Cap de la Nao, esta localidad alicantina combina un microclima privilegiado —declarado por la OMS como uno de los más saludables del mundo— con un entorno natural de extraordinaria belleza. Su mercado inmobiliario de lujo atrae a compradores internacionales que buscan una combinación única de calidad de vida, privacidad y rentabilidad.
              </p>
              <p className="text-[14px] leading-[1.85] font-light" style={{ color: palette.textMuted }}>
                Actualmente disponemos de 45 villas de lujo en venta en Javea, con precios desde €690.000 hasta más de €5.000.000. Desde propiedades contemporáneas con vistas al Mediterráneo hasta fincas clásicas con amplios jardines en las laderas del Montgó, nuestra cartera cubre las zonas más exclusivas: Portichol, La Corona, Tosalet, Cap Martí y Ambolo.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §4 PROPIEDADES DESTACADAS ─── */}
      <section className="pb-12 sm:pb-16" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROPERTIES.map(p => (
                <a key={p.id} href="#" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-3" style={{ background: palette.bgAlt }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-10 h-10" style={{ color: palette.border }} />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    <span className="absolute top-3 left-3 text-[10px] tracking-[0.1em] uppercase font-medium px-2.5 py-1 rounded-sm" style={{ background: "rgba(255,255,255,0.92)", color: palette.text }}>
                      {p.ref}
                    </span>
                  </div>
                  <p className="text-[13px] tracking-[0.08em] uppercase font-medium mb-0.5" style={{ color: accentColor }}>
                    {p.price}
                  </p>
                  <p className="text-[15px] font-medium mb-1" style={{ color: palette.text, fontFamily: fonts.heading }}>
                    {p.name}
                  </p>
                  <div className="flex items-center gap-1 mb-1.5">
                    <MapPin className="w-3 h-3" style={{ color: palette.textLight }} />
                    <span className="text-[12px] font-light" style={{ color: palette.textLight }}>{p.zone}, Javea</span>
                  </div>
                  <div className="flex items-center gap-4 text-[12px] font-light" style={{ color: palette.textMuted }}>
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {p.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {p.baths}</span>
                    <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {p.sqm} m²</span>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 text-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-[13px] tracking-[0.1em] uppercase font-medium transition-all hover:opacity-90"
                style={{ background: accentColor, color: palette.white }}
              >
                Ver las 45 villas disponibles <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-[12px] font-light mt-3" style={{ color: palette.textLight }}>
                Actualizado hoy · Fotos HD · Contacto directo
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §5 DATOS DE MERCADO ─── */}
      <section className="py-12 sm:py-16" style={{ background: palette.white, borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-2" style={{ color: accentColor }}>Datos del Mercado</p>
            <h2 className="text-[24px] sm:text-[30px] font-light mb-8" style={{ fontFamily: fonts.heading, color: palette.text }}>
              Mercado Inmobiliario en Javea
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {MARKET_STATS.map(s => (
                <div key={s.label} className="p-6 rounded-sm text-center" style={{ background: palette.bg, border: `1px solid ${palette.border}` }}>
                  <p className="text-[26px] sm:text-[32px] font-light mb-1" style={{ color: palette.text, fontFamily: fonts.heading }}>{s.value}</p>
                  <p className="text-[11px] tracking-[0.1em] uppercase font-medium" style={{ color: palette.textLight }}>{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §6 OFF-MARKET ─── */}
      <section className="py-14 sm:py-20" style={{ background: palette.offMarketBg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12 text-center">
          <FadeIn>
            <Lock className="w-8 h-8 mx-auto mb-5" style={{ color: palette.offMarketAccent }} />
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-3" style={{ color: palette.offMarketAccent }}>Acceso Exclusivo</p>
            <h2 className="text-[24px] sm:text-[32px] font-light mb-5 max-w-lg mx-auto" style={{ fontFamily: fonts.heading, color: "#fff" }}>
              25 Propiedades Exclusivas Fuera de Mercado
            </h2>
            <p className="text-[14px] leading-[1.8] font-light max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Disponemos de propiedades que no aparecen en ningún portal inmobiliario. Acceso reservado exclusivamente para compradores cualificados.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[12px] tracking-[0.12em] uppercase font-medium transition-all hover:opacity-90"
              style={{ background: palette.offMarketAccent, color: palette.offMarketBg }}
            >
              Solicitar acceso exclusivo <ArrowRight className="w-4 h-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ─── §7 ZONAS / BARRIOS ─── */}
      <section className="py-12 sm:py-16" style={{ background: palette.bg }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-2" style={{ color: accentColor }}>Guía de Zonas</p>
            <h2 className="text-[24px] sm:text-[30px] font-light mb-8" style={{ fontFamily: fonts.heading, color: palette.text }}>
              Las Mejores Zonas para Comprar en Javea
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ZONES.map(z => (
                <div key={z.name} className="p-6 rounded-sm transition-all hover:shadow-md" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4" style={{ color: accentColor }} />
                    <h3 className="text-[16px] font-medium" style={{ color: palette.text, fontFamily: fonts.heading }}>{z.name}</h3>
                  </div>
                  <p className="text-[13px] leading-[1.7] font-light mb-4" style={{ color: palette.textMuted }}>{z.desc}</p>
                  <p className="text-[12px] tracking-[0.08em] uppercase font-medium" style={{ color: accentColor }}>{z.price}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §8 POR QUÉ INVERTIR ─── */}
      <section className="py-12 sm:py-16" style={{ background: palette.white, borderTop: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-2" style={{ color: accentColor }}>Inversión</p>
            <h2 className="text-[24px] sm:text-[30px] font-light mb-8" style={{ fontFamily: fonts.heading, color: palette.text }}>
              ¿Por qué Invertir en Javea?
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {REASONS.map(r => (
                <div key={r.title} className="flex gap-4 p-5 rounded-sm" style={{ background: palette.bg, border: `1px solid ${palette.border}` }}>
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${accentColor}12` }}>
                    <r.icon className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium mb-1" style={{ color: palette.text }}>{r.title}</h3>
                    <p className="text-[13px] leading-[1.7] font-light" style={{ color: palette.textMuted }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §9 FAQs ─── */}
      <section className="py-12 sm:py-16" style={{ background: palette.bg, borderTop: `1px solid ${palette.border}` }}>
        <div className="max-w-[800px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-2" style={{ color: accentColor }}>FAQs</p>
            <h2 className="text-[24px] sm:text-[30px] font-light mb-8" style={{ fontFamily: fonts.heading, color: palette.text }}>
              Preguntas Frecuentes sobre Comprar en Javea
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div>
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} style={{ borderBottom: `1px solid ${palette.border}` }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-4 py-5 text-left transition-colors"
                    >
                      <span className="text-[14px] font-normal leading-[1.5]" style={{ color: isOpen ? palette.text : palette.textMuted }}>
                        {faq.q}
                      </span>
                      <span className="shrink-0 mt-0.5" style={{ color: accentColor }}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? "400px" : "0", opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="text-[13px] font-light leading-[1.85] pb-5 pr-8" style={{ color: palette.textMuted }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §10 CITA PERSONALIZADA ─── */}
      <section className="py-14 sm:py-20" style={{ background: palette.white, borderTop: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-2 text-center" style={{ color: accentColor }}>Atención Personalizada</p>
            <h2 className="text-[24px] sm:text-[30px] font-light mb-10 text-center" style={{ fontFamily: fonts.heading, color: palette.text }}>
              Agenda una Cita Personalizada
            </h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Left — Advisor */}
              <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center" style={{ background: palette.bgAlt, border: `2px solid ${palette.border}` }}>
                  <Users className="w-10 h-10" style={{ color: palette.textLight }} />
                </div>
                <h3 className="text-[18px] font-medium mb-0.5" style={{ color: palette.text, fontFamily: fonts.heading }}>Ana García</h3>
                <p className="text-[13px] font-light mb-6" style={{ color: palette.textMuted }}>Especialista en Javea · 12 años de experiencia</p>

                <div className="w-full space-y-2">
                  {[
                    { key: "office", label: "Presencial en oficina", icon: Building2 },
                    { key: "videocall", label: "Videollamada", icon: Video },
                    { key: "visit", label: "Visita a propiedades", icon: Eye },
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setAppointmentType(opt.key)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-left text-[13px] font-light transition-all"
                      style={{
                        background: appointmentType === opt.key ? `${accentColor}10` : palette.bg,
                        border: `1px solid ${appointmentType === opt.key ? accentColor : palette.border}`,
                        color: appointmentType === opt.key ? accentColor : palette.textMuted,
                      }}
                    >
                      <opt.icon className="w-4 h-4" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right — Form */}
              <div className="lg:col-span-3">
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      className="w-full px-4 py-3 text-[14px] font-light rounded-sm outline-none transition-all focus:ring-1"
                      style={{ background: palette.bg, border: `1px solid ${palette.border}`, color: palette.text, fontSize: "16px" }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 text-[14px] font-light rounded-sm outline-none transition-all focus:ring-1"
                      style={{ background: palette.bg, border: `1px solid ${palette.border}`, color: palette.text, fontSize: "16px" }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Teléfono con prefijo"
                      className="w-full px-4 py-3 text-[14px] font-light rounded-sm outline-none transition-all focus:ring-1"
                      style={{ background: palette.bg, border: `1px solid ${palette.border}`, color: palette.text, fontSize: "16px" }}
                    />
                    <input
                      type="date"
                      placeholder="Fecha preferida"
                      className="w-full px-4 py-3 text-[14px] font-light rounded-sm outline-none transition-all focus:ring-1"
                      style={{ background: palette.bg, border: `1px solid ${palette.border}`, color: palette.text, fontSize: "16px" }}
                    />
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Mensaje (opcional)"
                    className="w-full px-4 py-3 text-[14px] font-light rounded-sm outline-none transition-all focus:ring-1 resize-none"
                    style={{ background: palette.bg, border: `1px solid ${palette.border}`, color: palette.text, fontSize: "16px" }}
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 text-[13px] tracking-[0.1em] uppercase font-medium transition-all hover:opacity-90"
                    style={{ background: accentColor, color: palette.white }}
                  >
                    Solicitar Cita
                  </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  <a
                    href="https://wa.me/34966000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 text-[13px] font-medium tracking-[0.05em] rounded-sm transition-all hover:opacity-90"
                    style={{ background: "#25D366", color: "#fff" }}
                  >
                    <MessageCircle className="w-4 h-4" /> Escribir por WhatsApp
                  </a>
                  <a
                    href="tel:+34966000000"
                    className="flex items-center justify-center gap-2 py-3 text-[13px] font-medium tracking-[0.05em] rounded-sm transition-all hover:opacity-90"
                    style={{ background: palette.text, color: palette.white }}
                  >
                    <Phone className="w-4 h-4" /> Llamar ahora +34 966 XXX XXX
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §11 VENDER PROPIEDAD ─── */}
      <section className="py-12 sm:py-16" style={{ background: palette.bgAlt }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-[700px] mx-auto text-center">
              <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-2" style={{ color: accentColor }}>Propietarios</p>
              <h2 className="text-[24px] sm:text-[30px] font-light mb-3" style={{ fontFamily: fonts.heading, color: palette.text }}>
                ¿Tiene una propiedad en Javea?
              </h2>
              <p className="text-[14px] leading-[1.8] font-light mb-8" style={{ color: palette.textMuted }}>
                Nuestro equipo le ofrece una valoración gratuita y un plan de venta personalizado.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: CheckCircle2, text: "Valoración gratuita" },
                { icon: Globe, text: "Red de compradores en 30 países" },
                { icon: Camera, text: "Marketing premium: fotos, video, dron" },
                { icon: Globe, text: "Presencia en 9 idiomas" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-sm" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                  <item.icon className="w-5 h-5 shrink-0" style={{ color: accentColor }} />
                  <span className="text-[13px] font-light" style={{ color: palette.text }}>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-[13px] tracking-[0.1em] uppercase font-medium transition-all hover:opacity-90"
                style={{ background: accentColor, color: palette.white }}
              >
                Solicitar valoración gratuita <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §12 BLOG ─── */}
      <section className="py-12 sm:py-16" style={{ background: palette.white, borderTop: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-2" style={{ color: accentColor }}>Blog</p>
            <h2 className="text-[24px] sm:text-[30px] font-light mb-8" style={{ fontFamily: fonts.heading, color: palette.text }}>
              Guías y Artículos sobre Javea
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {ARTICLES.map((a, i) => (
                <a key={i} href="#" className="group block">
                  <div className="aspect-[16/10] rounded-sm mb-3 flex items-center justify-center" style={{ background: palette.bgAlt }}>
                    <Camera className="w-8 h-8" style={{ color: palette.border }} />
                  </div>
                  <h3 className="text-[15px] font-medium mb-1 group-hover:opacity-80 transition-opacity" style={{ color: palette.text, fontFamily: fonts.heading }}>
                    {a.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] font-light mb-2" style={{ color: palette.textMuted }}>{a.excerpt}</p>
                  <span className="text-[12px] font-medium" style={{ color: accentColor }}>Leer más →</span>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §13 INTERNAL LINKS ─── */}
      <section className="py-10 sm:py-12" style={{ background: palette.bg, borderTop: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-[14px] font-light mb-4" style={{ color: palette.textMuted }}>
              Descubre más propiedades en la Costa Blanca:
            </p>
            <div className="flex flex-wrap gap-2">
              {INTERNAL_LINKS.map(link => (
                <a
                  key={link}
                  href="#"
                  className="px-4 py-2 text-[12px] font-light rounded-full transition-all hover:shadow-sm"
                  style={{ background: palette.white, border: `1px solid ${palette.border}`, color: palette.textMuted }}
                >
                  {link}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §14 MAPA ─── */}
      <section className="py-12 sm:py-16" style={{ background: palette.white, borderTop: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-2" style={{ color: accentColor }}>Ubicación</p>
            <h2 className="text-[24px] sm:text-[30px] font-light mb-6" style={{ fontFamily: fonts.heading, color: palette.text }}>
              Mapa de Javea
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="aspect-[16/7] rounded-sm flex items-center justify-center relative overflow-hidden" style={{ background: palette.bgAlt, border: `1px solid ${palette.border}` }}>
              <div className="text-center">
                <MapPin className="w-10 h-10 mx-auto mb-3" style={{ color: palette.textLight }} />
                <p className="text-[13px] font-light" style={{ color: palette.textMuted }}>Mapa interactivo de Javea</p>
                <p className="text-[11px] font-light mt-1" style={{ color: palette.textLight }}>Portichol · La Corona · Montgó · Tosalet · Cap Martí · Ambolo</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §15 TESTIMONIOS ─── */}
      <section className="py-12 sm:py-16" style={{ background: palette.bg, borderTop: `1px solid ${palette.border}` }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <FadeIn>
            <p className="text-[11px] tracking-[0.15em] uppercase font-medium mb-2 text-center" style={{ color: accentColor }}>Testimonios</p>
            <h2 className="text-[24px] sm:text-[30px] font-light mb-10 text-center" style={{ fontFamily: fonts.heading, color: palette.text }}>
              Lo que Dicen Nuestros Clientes
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="p-7 rounded-sm" style={{ background: palette.white, border: `1px solid ${palette.border}` }}>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" style={{ color: accentColor }} />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 mb-3" style={{ color: palette.border }} />
                  <p className="text-[14px] leading-[1.8] font-light mb-5" style={{ color: palette.textMuted }}>
                    {t.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: palette.bgAlt, border: `1px solid ${palette.border}` }}>
                      <Users className="w-4 h-4" style={{ color: palette.textLight }} />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium" style={{ color: palette.text }}>{t.name}</p>
                      <p className="text-[12px] font-light" style={{ color: palette.textLight }}>{t.flag} {t.nationality}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── §16 FOOTER ─── */}
      <footer className="py-12 sm:py-16" style={{ background: palette.footer, color: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <p className="text-[18px] tracking-[0.2em] uppercase font-light mb-1" style={{ color: "#fff", fontFamily: fonts.heading }}>LUXINMO</p>
              <p className="text-[11px] tracking-[0.15em] uppercase font-light mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Real Estate</p>
              <p className="text-[12px] leading-[1.8] font-light">
                C/ La Mar, 100<br />
                03590 Altea, Alicante<br />
                España
              </p>
            </div>
            {/* Contact */}
            <div>
              <p className="text-[11px] tracking-[0.12em] uppercase font-medium mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>Contacto</p>
              <div className="space-y-2 text-[12px] font-light">
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +34 966 000 000</p>
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@luxinmo.com</p>
                <p className="flex items-center gap-2"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</p>
              </div>
            </div>
            {/* Social */}
            <div>
              <p className="text-[11px] tracking-[0.12em] uppercase font-medium mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>Síguenos</p>
              <div className="flex gap-3">
                {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-80" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: "rgba(255,255,255,0.6)" }} />
                  </a>
                ))}
              </div>
              <div className="mt-5">
                <p className="text-[10px] tracking-[0.1em] uppercase font-light mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Asociaciones</p>
                <p className="text-[11px] font-light">API · AIPP</p>
              </div>
            </div>
            {/* Languages */}
            <div>
              <p className="text-[11px] tracking-[0.12em] uppercase font-medium mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>Idiomas</p>
              <div className="flex flex-wrap gap-2">
                {["🇪🇸", "🇬🇧", "🇩🇪", "🇫🇷", "🇳🇱", "🇷🇺", "🇸🇪", "🇳🇴", "🇩🇰"].map((flag, i) => (
                  <span key={i} className="text-[16px] cursor-pointer hover:scale-110 transition-transform">{flag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-[11px] font-light text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} Luxinmo Real Estate. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ─── MOBILE STICKY CTA ─── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex gap-2 p-3"
        style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderTop: `1px solid ${palette.border}` }}
      >
        <a
          href="https://wa.me/34966000000"
          className="flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-medium rounded-sm"
          style={{ background: "#25D366", color: "#fff" }}
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <a
          href="tel:+34966000000"
          className="flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-medium rounded-sm"
          style={{ background: accentColor, color: palette.white }}
        >
          <Phone className="w-4 h-4" /> Llamar
        </a>
      </div>
    </Layout>
  );
};

export default LuxinmoLandingPage;
