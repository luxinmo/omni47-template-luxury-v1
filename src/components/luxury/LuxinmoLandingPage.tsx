/**
 * LUXINMO LANDING PAGE
 * Reusable luxury real estate landing template for city + property type combos.
 * Example: "Villas de Lujo en Venta en Javea"
 * 16 sections — Stripe/Apple inspired — Indigo primary
 */

import { useState } from "react";
import {
  ChevronRight, MapPin, Home, Bed, Bath, Maximize, Lock,
  Sun, TrendingUp, Users, Building2, UtensilsCrossed, BarChart3,
  Plus, Minus, Phone, MessageCircle, Video, Calendar,
  Star, Globe, Camera, Plane, CheckCircle2, ArrowRight,
  Mail, Instagram, Facebook, Linkedin, Twitter, Shield,
  Award, Heart, Eye
} from "lucide-react";
import { Helmet } from "react-helmet-async";

/* ─── Design Tokens ─── */
const C = {
  indigo: "#4F46E5",
  indigoLight: "#EEF2FF",
  indigoDark: "#3730A3",
  dark: "#0F172A",
  darkSoft: "#1E293B",
  text: "#334155",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  border: "#E2E8F0",
  bg: "#F8FAFC",
  white: "#FFFFFF",
};

/* ─── Mock Properties ─── */
const PROPERTIES = [
  { id: 1, name: "Villa Portichol", zone: "Portichol", price: "€2,450,000", beds: 5, baths: 4, sqm: 420, img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop" },
  { id: 2, name: "Villa La Corona", zone: "La Corona", price: "€1,890,000", beds: 4, baths: 3, sqm: 350, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop" },
  { id: 3, name: "Villa Montgó", zone: "Montgó", price: "€1,350,000", beds: 4, baths: 3, sqm: 285, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop" },
  { id: 4, name: "Villa Tosalet", zone: "Tosalet", price: "€980,000", beds: 3, baths: 2, sqm: 220, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop" },
  { id: 5, name: "Villa Cap Martí", zone: "Cap Martí", price: "€1,650,000", beds: 5, baths: 4, sqm: 380, img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop" },
  { id: 6, name: "Villa Ambolo", zone: "Ambolo", price: "€3,200,000", beds: 6, baths: 5, sqm: 520, img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop" },
];

/* ─── Zones ─── */
const ZONES = [
  { name: "Portichol", desc: "Bahía exclusiva, villas frente al mar con acceso directo a la playa", price: "€2M – €8M" },
  { name: "La Corona", desc: "Vistas panorámicas 360° al mar y montaña, parcelas amplias", price: "€1.2M – €4M" },
  { name: "Montgó", desc: "Parque natural, orientación sur, tranquilidad absoluta", price: "€800K – €2.5M" },
  { name: "Tosalet", desc: "Comunidad internacional, cerca de Cala Blanca y servicios", price: "€700K – €2M" },
  { name: "Cap Martí", desc: "Zona residencial consolidada, cerca del puerto deportivo", price: "€900K – €3M" },
  { name: "Ambolo", desc: "Acantilados espectaculares, calas vírgenes, máxima privacidad", price: "€1.5M – €5M" },
];

/* ─── Investment reasons ─── */
const REASONS = [
  { icon: Sun, title: "Clima excepcional", desc: "320 días de sol al año con un microclima único en la costa mediterránea" },
  { icon: TrendingUp, title: "Alta rentabilidad", desc: "Ingresos por alquiler vacacional entre 25.000€ y 40.000€/año" },
  { icon: Users, title: "Comunidad internacional", desc: "El 60% de los compradores son extranjeros, mercado consolidado" },
  { icon: Building2, title: "Infraestructura premium", desc: "Hospital, colegios internacionales, puerto deportivo, campo de golf" },
  { icon: UtensilsCrossed, title: "Gastronomía mediterránea", desc: "Restaurantes con estrella Michelin y mercados con producto local" },
  { icon: BarChart3, title: "Revalorización constante", desc: "Incremento medio del 8% anual en propiedades de lujo desde 2019" },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: "¿Cuánto cuesta una villa de lujo en Javea?", a: "El precio medio de una villa de lujo en Javea oscila entre €800.000 y €5.000.000, dependiendo de la ubicación, superficie, vistas al mar y calidades. Las propiedades en primera línea de playa o con acceso directo al mar pueden superar los €8.000.000." },
  { q: "¿Cuáles son las mejores zonas para comprar?", a: "Las zonas más demandadas son Portichol (primera línea de mar), La Corona (vistas panorámicas), Montgó (naturaleza y tranquilidad), Tosalet (comunidad internacional) y Cap Martí (cerca del puerto). Cada zona tiene un carácter único que se adapta a diferentes estilos de vida." },
  { q: "¿Necesito NIE para comprar una propiedad en España?", a: "Sí, el NIE (Número de Identidad de Extranjero) es imprescindible para cualquier transacción inmobiliaria en España. Podemos ayudarle a obtenerlo a través de nuestro servicio de asistencia legal, normalmente en un plazo de 2-4 semanas." },
  { q: "¿Cuál es el proceso de compra para extranjeros?", a: "El proceso incluye: 1) Selección de propiedades con asesor personal, 2) Negociación y reserva con contrato de arras (10% del precio), 3) Due diligence legal, 4) Firma ante notario. Todo el proceso puede completarse en 6-8 semanas. Nuestro equipo le acompaña en cada paso." },
  { q: "¿Es rentable alquilar una villa en Javea?", a: "Sí, Javea es uno de los destinos más rentables de la Costa Blanca. Una villa de 4 dormitorios bien ubicada puede generar entre €25.000 y €40.000 anuales en alquiler vacacional, con una ocupación media del 75% en temporada alta (mayo-octubre)." },
  { q: "¿Qué impuestos se pagan al comprar?", a: "Para obra nueva: IVA (10%) + AJD (1,5%). Para segunda mano: ITP (10% en la Comunidad Valenciana). Además, hay gastos de notaría, registro y gestoría que suelen sumar un 2-3% adicional. Le proporcionamos un desglose detallado antes de la compra." },
  { q: "¿Cuánto tarda todo el proceso de compra?", a: "Desde la selección hasta la firma ante notario, el proceso completo suele durar entre 6 y 12 semanas. Si necesita financiación hipotecaria, el plazo puede extenderse a 8-16 semanas. Gestionamos todo el proceso para que sea lo más ágil posible." },
  { q: "¿Puedo obtener hipoteca como extranjero?", a: "Sí, los bancos españoles ofrecen hipotecas a no residentes, generalmente hasta el 60-70% del valor de tasación. Los tipos de interés actuales oscilan entre el 3% y el 4,5%. Colaboramos con brokers hipotecarios especializados que consiguen las mejores condiciones." },
];

/* ─── Blog articles ─── */
const ARTICLES = [
  { title: "Las 5 mejores playas de Javea", excerpt: "Descubre las calas y playas más exclusivas que hacen de Javea un paraíso mediterráneo.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop" },
  { title: "Guía fiscal para comprar en España 2026", excerpt: "Todo lo que necesitas saber sobre impuestos, deducciones y obligaciones fiscales al comprar.", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&h=300&fit=crop" },
  { title: "Vivir en Javea: lo que necesitas saber", excerpt: "Estilo de vida, coste de vida, sanidad, colegios y todo para planificar tu mudanza.", img: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=500&h=300&fit=crop" },
];

/* ─── Internal links ─── */
const LINKS = [
  "Villas de lujo en Moraira", "Apartamentos en Calpe", "Propiedades en Altea",
  "Chalets en Benissa", "Villas en Benidorm", "Costa Blanca propiedades",
  "Obra nueva en Javea", "Áticos en Javea",
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  { name: "James & Sarah Thompson", nationality: "Reino Unido", text: "Luxinmo nos ayudó a encontrar nuestra villa soñada en Portichol. El proceso fue impecable, transparente y mucho más sencillo de lo que esperábamos. Ana fue excepcional en cada paso.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Klaus & Ingrid Weber", nationality: "Alemania", text: "Después de buscar durante meses en otros portales, Luxinmo nos presentó una propiedad off-market que era exactamente lo que buscábamos. Profesionalidad absoluta y atención personalizada.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
];

/* ────────────────────────── COMPONENT ────────────────────────── */

const LuxinmoLandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [appointmentType, setAppointmentType] = useState("videocall");

  return (
    <>
      <Helmet>
        <title>Villas de Lujo en Venta en Javea | Luxinmo</title>
        <meta name="description" content="Descubre las mejores villas de lujo en venta en Javea. 45 propiedades exclusivas desde €690,000. Asesoramiento personalizado con Luxinmo." />
      </Helmet>

      <div style={{ fontFamily: "'Inter', sans-serif", color: C.text, background: C.white }}>

        {/* ─── 0. Navbar ─── */}
        <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/" style={{ fontSize: 22, fontWeight: 700, color: C.dark, textDecoration: "none", letterSpacing: "-0.5px" }}>
              <span style={{ color: C.indigo }}>Lux</span>inmo
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden md:flex">
              {["Comprar", "Vender", "Obra nueva", "Blog", "Contacto"].map(l => (
                <a key={l} href="#" style={{ fontSize: 14, color: C.textLight, textDecoration: "none", fontWeight: 500 }}>{l}</a>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a href="tel:+34966000000" className="hidden md:flex" style={{ fontSize: 13, color: C.textLight, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                <Phone className="w-4 h-4" /> +34 966 000 000
              </a>
              <a href="#contact" style={{ background: C.indigo, color: "#fff", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                Contactar
              </a>
            </div>
          </div>
        </nav>

        {/* ─── 1. Breadcrumb ─── */}
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.textMuted }}>
              {["Home", "Costa Blanca", "Javea", "Villas de Lujo"].map((item, i, arr) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {i > 0 && <ChevronRight className="w-3 h-3" />}
                  <span style={{ color: i === arr.length - 1 ? C.dark : undefined, fontWeight: i === arr.length - 1 ? 500 : 400 }}>
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─── 2. Hero with H1 ─── */}
        <section style={{ position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&h=600&fit=crop)",
            backgroundSize: "cover", backgroundPosition: "center",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(79,70,229,0.6) 100%)" }} />
          </div>
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "80px 24px 72px" }}>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 16, letterSpacing: "-1px", maxWidth: 700 }}>
              Villas de Lujo en Venta<br />en Javea
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", maxWidth: 560, lineHeight: 1.6, marginBottom: 28 }}>
              Descubre las propiedades más exclusivas de la Costa Blanca. Asesoramiento personalizado y acceso a propiedades fuera de mercado.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { label: "45 propiedades", icon: Home },
                { label: "Desde €690,000", icon: TrendingUp },
                { label: "Javea, Alicante", icon: MapPin },
              ].map(({ label, icon: Icon }) => (
                <span key={label} style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 500, color: "#fff"
                }}>
                  <Icon className="w-4 h-4" /> {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3. SEO Intro Text ─── */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px 0" }}>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: C.text, marginBottom: 20 }}>
            Javea (Xàbia) es uno de los destinos más codiciados de la Costa Blanca para la compra de villas de lujo.
            Situada entre el Cabo de San Antonio y el Cabo de la Nao, esta joya del Mediterráneo combina un entorno
            natural privilegiado con una infraestructura de primer nivel, atrayendo a compradores de toda Europa.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: C.text, marginBottom: 20 }}>
            El mercado inmobiliario de lujo en Javea ha experimentado un crecimiento sostenido del 8% anual desde 2019,
            impulsado por la demanda internacional y la escasez de parcelas disponibles en las zonas más exclusivas.
            Las villas con vistas al mar, acceso privado a calas y acabados de alta gama son las más solicitadas.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: C.textLight }}>
            Con más de 320 días de sol al año, una gastronomía excepcional, puerto deportivo, campos de golf y una
            vibrante comunidad internacional, Javea ofrece el equilibrio perfecto entre exclusividad y calidad de vida
            mediterránea.
          </p>
        </section>

        {/* ─── 4. Market Data ─── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Precio medio", value: "€1.2M" },
              { label: "Desde", value: "€690K" },
              { label: "Hasta", value: "€5.2M" },
              { label: "Superficie media", value: "285 m²" },
            ].map(s => (
              <div key={s.label} style={{
                background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12,
                padding: "28px 24px", textAlign: "center",
              }}>
                <div style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: C.dark, letterSpacing: "-1px" }}>{s.value}</div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 6, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 5. Featured Properties ─── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 64px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.dark, marginBottom: 8, letterSpacing: "-0.5px" }}>Propiedades destacadas</h2>
          <p style={{ fontSize: 15, color: C.textLight, marginBottom: 32 }}>Selección de nuestras mejores villas disponibles en Javea</p>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {PROPERTIES.map(p => <PropertyCard key={p.id} {...p} />)}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="flex md:hidden gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {PROPERTIES.map(p => (
              <div key={p.id} className="flex-shrink-0" style={{ width: "80vw", maxWidth: 320 }}>
                <PropertyCard {...p} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="/properties" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: C.indigo, color: "#fff", padding: "14px 32px",
              borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none",
              transition: "background 0.2s",
            }}>
              Ver las 45 villas disponibles <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ─── 6. Off-Market ─── */}
        <section style={{
          background: `linear-gradient(135deg, ${C.dark} 0%, ${C.darkSoft} 50%, ${C.indigoDark} 100%)`,
          padding: "72px 24px",
        }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "rgba(79,70,229,0.2)", border: "1px solid rgba(79,70,229,0.3)",
              display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 24,
            }}>
              <Lock className="w-6 h-6" style={{ color: "#A5B4FC" }} />
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: "-0.5px" }}>
              25 propiedades exclusivas fuera de mercado
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>
              Tenemos propiedades que no aparecen en ningún portal inmobiliario. Solo accesibles para compradores cualificados que buscan verdadera exclusividad.
            </p>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: C.dark, padding: "14px 32px",
              borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none",
            }}>
              <Lock className="w-4 h-4" /> Solicitar acceso exclusivo
            </a>
          </div>
        </section>

        {/* ─── 7. Zones ─── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.dark, marginBottom: 8, letterSpacing: "-0.5px" }}>
            Las Mejores Zonas para Comprar en Javea
          </h2>
          <p style={{ fontSize: 15, color: C.textLight, marginBottom: 40 }}>Cada barrio tiene un carácter único que se adapta a diferentes estilos de vida</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ZONES.map(z => (
              <div key={z.name} style={{
                border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px 24px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }} className="hover:shadow-lg hover:border-indigo-200">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <MapPin className="w-5 h-5" style={{ color: C.indigo }} />
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: C.dark }}>{z.name}</h3>
                </div>
                <p style={{ fontSize: 14, color: C.textLight, lineHeight: 1.65, marginBottom: 16 }}>{z.desc}</p>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.indigo }}>{z.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 8. Why Invest ─── */}
        <section style={{ background: C.bg, padding: "72px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: C.dark, marginBottom: 8, letterSpacing: "-0.5px", textAlign: "center" }}>
              ¿Por qué Invertir en Javea?
            </h2>
            <p style={{ fontSize: 15, color: C.textLight, marginBottom: 48, textAlign: "center" }}>Razones que hacen de Javea una inversión inteligente</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {REASONS.map(r => (
                <div key={r.title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "32px 24px" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: C.indigoLight, display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16,
                  }}>
                    <r.icon className="w-5 h-5" style={{ color: C.indigo }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{r.title}</h3>
                  <p style={{ fontSize: 14, color: C.textLight, lineHeight: 1.65 }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 9. FAQs ─── */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "72px 24px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.dark, marginBottom: 8, letterSpacing: "-0.5px", textAlign: "center" }}>
            Preguntas Frecuentes
          </h2>
          <p style={{ fontSize: 15, color: C.textLight, marginBottom: 40, textAlign: "center" }}>Todo lo que necesitas saber sobre comprar en Javea</p>
          <div>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 500, color: isOpen ? C.indigo : C.dark, transition: "color 0.2s", paddingRight: 16 }}>{faq.q}</span>
                    <span style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: isOpen ? C.indigoLight : C.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.2s",
                    }}>
                      {isOpen ? <Minus className="w-4 h-4" style={{ color: C.indigo }} /> : <Plus className="w-4 h-4" style={{ color: C.textMuted }} />}
                    </span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 300 : 0, overflow: "hidden",
                    transition: "max-height 0.3s ease, opacity 0.3s ease",
                    opacity: isOpen ? 1 : 0,
                  }}>
                    <p style={{ fontSize: 14, color: C.textLight, lineHeight: 1.75, paddingBottom: 20, paddingRight: 40 }}>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 10. Personal Appointment ─── */}
        <section id="contact" style={{ background: C.bg, padding: "72px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              {/* Left — Advisor */}
              <div className="md:col-span-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: 16 }}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                  alt="Ana García" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", border: `3px solid ${C.indigo}`, marginBottom: 16 }}
                />
                <h3 style={{ fontSize: 18, fontWeight: 600, color: C.dark }}>Ana García</h3>
                <p style={{ fontSize: 13, color: C.indigo, fontWeight: 500, marginBottom: 4 }}>Especialista en Javea</p>
                <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 24 }}>15 años de experiencia</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                  <a href="https://wa.me/34966000000" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: "#25D366", color: "#fff", padding: "12px 20px", borderRadius: 10,
                    fontSize: 14, fontWeight: 600, textDecoration: "none",
                  }}>
                    <MessageCircle className="w-4 h-4" /> WhatsApp directo
                  </a>
                  <a href="tel:+34966000000" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    border: `1px solid ${C.border}`, background: C.white, color: C.dark,
                    padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none",
                  }}>
                    <Phone className="w-4 h-4" /> Llamar ahora
                  </a>
                </div>
              </div>

              {/* Right — Form */}
              <div className="md:col-span-3" style={{ background: C.white, borderRadius: 16, padding: "32px", border: `1px solid ${C.border}` }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Agenda una cita personalizada</h2>
                <p style={{ fontSize: 14, color: C.textLight, marginBottom: 24 }}>Elige cómo prefieres reunirte con nosotros</p>

                {/* Appointment type */}
                <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
                  {[
                    { val: "office", label: "Presencial", icon: Building2 },
                    { val: "videocall", label: "Videollamada", icon: Video },
                    { val: "visit", label: "Visita propiedades", icon: Eye },
                  ].map(t => (
                    <button key={t.val} onClick={() => setAppointmentType(t.val)} style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                      border: `1.5px solid ${appointmentType === t.val ? C.indigo : C.border}`,
                      background: appointmentType === t.val ? C.indigoLight : "transparent",
                      color: appointmentType === t.val ? C.indigo : C.textLight,
                      cursor: "pointer", transition: "all 0.2s",
                    }}>
                      <t.icon className="w-4 h-4" /> {t.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: 16 }}>
                  <input placeholder="Nombre completo" style={inputStyle} />
                  <input placeholder="Email" type="email" style={inputStyle} />
                  <input placeholder="Teléfono" type="tel" style={inputStyle} />
                  <input placeholder="Fecha preferida" type="date" style={inputStyle} />
                </div>
                <textarea placeholder="Mensaje opcional — cuéntanos qué buscas..." rows={3} style={{ ...inputStyle, resize: "vertical", marginBottom: 20 }} />

                <button style={{
                  width: "100%", background: C.indigo, color: "#fff",
                  padding: "14px", borderRadius: 10, fontSize: 15, fontWeight: 600,
                  border: "none", cursor: "pointer",
                }}>
                  Solicitar cita
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 11. Sell CTA ─── */}
        <section style={{ padding: "72px 24px" }}>
          <div style={{
            maxWidth: 1000, margin: "0 auto", background: C.indigoLight,
            border: `1px solid rgba(79,70,229,0.15)`, borderRadius: 20, padding: "56px 40px",
          }} className="text-center md:text-left">
            <div className="md:flex md:items-center md:justify-between md:gap-12">
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 26, fontWeight: 700, color: C.dark, marginBottom: 12, letterSpacing: "-0.5px" }}>
                  ¿Tiene una propiedad en Javea?
                </h2>
                <p style={{ fontSize: 15, color: C.textLight, lineHeight: 1.7, marginBottom: 24 }}>
                  Confíe en el equipo con mayor alcance internacional en la Costa Blanca para vender su propiedad al mejor precio.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ marginBottom: 28 }}>
                  {[
                    "Valoración gratuita y sin compromiso",
                    "Red de compradores en 30 países",
                    "Marketing premium: fotos, video, dron",
                    "Presencia en 9 idiomas",
                  ].map(txt => (
                    <div key={txt} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: C.text }}>
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: C.indigo }} /> {txt}
                    </div>
                  ))}
                </div>
                <a href="/sell" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: C.indigo, color: "#fff", padding: "14px 28px",
                  borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none",
                }}>
                  Solicitar valoración gratuita <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 12. Blog ─── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 72px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.dark, marginBottom: 8, letterSpacing: "-0.5px" }}>
            Guías y Artículos sobre Javea
          </h2>
          <p style={{ fontSize: 15, color: C.textLight, marginBottom: 36 }}>Información útil para tu búsqueda</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {ARTICLES.map(a => (
              <a key={a.title} href="#" style={{ textDecoration: "none", color: "inherit" }} className="group">
                <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, transition: "box-shadow 0.2s" }} className="hover:shadow-lg">
                  <img src={a.img} alt={a.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  <div style={{ padding: "20px" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: C.dark, marginBottom: 8, lineHeight: 1.4 }}>{a.title}</h3>
                    <p style={{ fontSize: 13, color: C.textLight, lineHeight: 1.6 }}>{a.excerpt}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ─── 13. Internal Links ─── */}
        <section style={{ background: C.bg, padding: "48px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontSize: 14, color: C.textLight, marginBottom: 16 }}>Descubre más propiedades en la Costa Blanca:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {LINKS.map(l => (
                <a key={l} href="#" style={{
                  padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 500,
                  border: `1px solid ${C.border}`, background: C.white, color: C.text,
                  textDecoration: "none", transition: "all 0.2s",
                }} className="hover:border-indigo-300 hover:text-indigo-600">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 14. Map Placeholder ─── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.dark, marginBottom: 32, letterSpacing: "-0.5px" }}>
            Mapa de Javea
          </h2>
          <div style={{
            height: 400, borderRadius: 16, overflow: "hidden",
            background: `linear-gradient(135deg, ${C.bg} 0%, ${C.indigoLight} 100%)`,
            border: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12,
          }}>
            <MapPin className="w-10 h-10" style={{ color: C.indigo }} />
            <p style={{ fontSize: 15, color: C.textLight }}>Mapa interactivo de Javea</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 8 }}>
              {ZONES.map(z => (
                <span key={z.name} style={{
                  padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 500,
                  background: C.white, border: `1px solid ${C.border}`, color: C.text,
                }}>
                  📍 {z.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 15. Testimonials ─── */}
        <section style={{ background: C.bg, padding: "72px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: C.dark, marginBottom: 40, letterSpacing: "-0.5px", textAlign: "center" }}>
              Lo que dicen nuestros clientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map(t => (
                <div key={t.name} style={{
                  background: C.white, border: `1px solid ${C.border}`, borderRadius: 16,
                  padding: "32px",
                }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" style={{ color: "#FBBF24", fill: "#FBBF24" }} />)}
                  </div>
                  <p style={{ fontSize: 14, color: C.text, lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={t.img} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>{t.nationality}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 16. Trust Footer ─── */}
        <footer style={{ background: C.dark, padding: "56px 24px 32px", color: "rgba(255,255,255,0.6)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10" style={{ marginBottom: 40 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
                  <span style={{ color: "#818CF8" }}>Lux</span>inmo
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
                  Inmobiliaria de lujo en la Costa Blanca. Especialistas en villas, apartamentos y propiedades exclusivas.
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["🇪🇸", "🇬🇧", "🇩🇪", "🇫🇷", "🇳🇱", "🇸🇪", "🇳🇴", "🇷🇺", "🇧🇪"].map(f => (
                    <span key={f} style={{ fontSize: 16 }}>{f}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Contacto</h4>
                <div style={{ fontSize: 13, lineHeight: 2 }}>
                  <p>📞 +34 966 000 000</p>
                  <p>✉️ info@luxinmo.com</p>
                  <p>📍 Calle Mayor 15, Altea</p>
                  <p>Alicante, España</p>
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Links</h4>
                <div style={{ fontSize: 13, lineHeight: 2 }}>
                  {["Comprar", "Vender", "Obra nueva", "Blog", "Contacto", "Política de privacidad"].map(l => (
                    <p key={l}><a href="#" style={{ color: "inherit", textDecoration: "none" }}>{l}</a></p>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Síguenos</h4>
                <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                  {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                    <a key={i} href="#" style={{
                      width: 36, height: 36, borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(255,255,255,0.5)", textDecoration: "none",
                    }}>
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Asociaciones</h4>
                <div style={{ display: "flex", gap: 12 }}>
                  {["API", "AIPP"].map(a => (
                    <span key={a} style={{
                      padding: "6px 14px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                      border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)",
                    }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, textAlign: "center", fontSize: 12 }}>
              © {new Date().getFullYear()} Luxinmo. Todos los derechos reservados.
            </div>
          </div>
        </footer>

        {/* ─── Mobile Sticky CTA ─── */}
        <div className="md:hidden" style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
          borderTop: `1px solid ${C.border}`, padding: "10px 16px",
          display: "flex", gap: 8,
        }}>
          <a href="https://wa.me/34966000000" style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            background: "#25D366", color: "#fff", padding: "12px", borderRadius: 10,
            fontSize: 14, fontWeight: 600, textDecoration: "none",
          }}>
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a href="tel:+34966000000" style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            background: C.indigo, color: "#fff", padding: "12px", borderRadius: 10,
            fontSize: 14, fontWeight: 600, textDecoration: "none",
          }}>
            <Phone className="w-4 h-4" /> Llamar
          </a>
        </div>

        {/* bottom spacing on mobile for sticky bar */}
        <div className="md:hidden" style={{ height: 64 }} />
      </div>
    </>
  );
};

/* ─── Property Card ─── */
const PropertyCard = ({ name, zone, price, beds, baths, sqm, img }: typeof PROPERTIES[0]) => (
  <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}`, transition: "box-shadow 0.2s" }} className="hover:shadow-lg">
    <div style={{ position: "relative" }}>
      <img src={img} alt={name} style={{ width: "100%", height: 200, objectFit: "cover" }} loading="lazy" />
      <span style={{
        position: "absolute", top: 12, left: 12,
        background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)",
        padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: C.dark,
      }}>
        {zone}
      </span>
    </div>
    <div style={{ padding: "18px 20px" }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{name}</h3>
      <div style={{ display: "flex", gap: 14, fontSize: 13, color: C.textMuted, marginBottom: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Bed className="w-3.5 h-3.5" /> {beds}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Bath className="w-3.5 h-3.5" /> {baths}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Maximize className="w-3.5 h-3.5" /> {sqm} m²</span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.indigo }}>{price}</div>
    </div>
  </div>
);

/* ─── Shared input style ─── */
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 14px", borderRadius: 10,
  border: `1px solid ${C.border}`, fontSize: 14, color: C.dark,
  background: C.bg, outline: "none",
};

export default LuxinmoLandingPage;
