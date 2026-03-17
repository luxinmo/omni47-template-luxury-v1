/**
 * USER DASHBOARD PAGE
 * Personal area: alerts, favorites, search criteria, offers, notification preferences.
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BellRing, Heart, Search, FileText, Settings, ChevronRight,
  Trash2, Mail, MessageCircle, Eye, MapPin, Bed, Bath, Maximize,
  X, Home, TrendingDown, CheckCircle2, XCircle, Clock, Edit2, Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "@/config/template";
import Layout from "@/components/layout/Layout";

import heroImg from "@/assets/luxury-hero.jpg";
import prop1 from "@/assets/luxury-property-1.jpg";
import prop2 from "@/assets/luxury-property-2.jpg";
import prop3 from "@/assets/luxury-property-3.jpg";
import propVilla from "@/assets/prop-villa-ibiza.jpg";
import propPenthouse from "@/assets/prop-penthouse-marbella.jpg";
import propEstate from "@/assets/prop-estate-mallorca.jpg";

// ── Mock Data ──
const MOCK_ALERTS = [
  { id: "1", title: "Luxury Villa in Santa Eulalia", location: "Ibiza", price: "€4,650,000", image: propVilla, ref: "PE-IBZ-2847", notifyVia: "email" as const, active: true },
  { id: "2", title: "Penthouse in Golden Mile", location: "Marbella", price: "€2,950,000", image: propPenthouse, ref: "PE-MRB-1123", notifyVia: "whatsapp" as const, active: true },
  { id: "3", title: "Finca with Sea Views", location: "Mallorca", price: "€3,200,000", image: propEstate, ref: "PE-MLR-0891", notifyVia: "email" as const, active: false },
];

const MOCK_FAVORITES = [
  { id: "1", title: "Contemporary Villa with Infinity Pool", location: "Ibiza", price: "€4,650,000", image: prop1, ref: "PE-IBZ-2847", beds: 5, baths: 4, sqm: 420, available: true },
  { id: "2", title: "Beachfront Penthouse", location: "Marbella", price: "€2,950,000", image: prop2, ref: "PE-MRB-1123", beds: 3, baths: 3, sqm: 280, available: true },
  { id: "3", title: "Historic Estate", location: "Mallorca", price: "€5,800,000", image: prop3, ref: "PE-MLR-0891", beds: 8, baths: 6, sqm: 850, available: false },
];

const MOCK_SEARCHES = [
  { id: "1", name: "Villas en Ibiza", criteria: { type: "Villa", location: "Ibiza", priceMin: "€2M", priceMax: "€6M", beds: "4+", features: ["Pool", "Sea Views"] }, results: 12, newResults: 3 },
  { id: "2", name: "Áticos en Marbella", criteria: { type: "Penthouse", location: "Marbella", priceMin: "€1.5M", priceMax: "€4M", beds: "3+", features: ["Terrace"] }, results: 8, newResults: 1 },
];

const MOCK_OFFERS = [
  { id: "1", title: "Contemporary Villa with Infinity Pool", location: "Ibiza", image: prop1, ref: "PE-IBZ-2847", askingPrice: "€4,650,000", offerPrice: "€4,200,000", status: "pending" as const, date: "2026-03-15" },
  { id: "2", title: "Beachfront Penthouse", location: "Marbella", image: prop2, ref: "PE-MRB-1123", askingPrice: "€2,950,000", offerPrice: "€2,750,000", status: "accepted" as const, date: "2026-03-10" },
  { id: "3", title: "Historic Estate", location: "Mallorca", image: prop3, ref: "PE-MLR-0891", askingPrice: "€5,800,000", offerPrice: "€5,200,000", status: "rejected" as const, date: "2026-03-01" },
];

type Tab = "alerts" | "favorites" | "searches" | "offers" | "settings";

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "alerts", label: "Alertas de precio", icon: BellRing },
  { key: "favorites", label: "Favoritos", icon: Heart },
  { key: "searches", label: "Búsquedas guardadas", icon: Search },
  { key: "offers", label: "Mis ofertas", icon: FileText },
  { key: "settings", label: "Preferencias", icon: Settings },
];

const UserDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("alerts");
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [favorites] = useState(MOCK_FAVORITES);
  const [favFilter, setFavFilter] = useState<"all" | "available" | "sold">("all");
  const [notifyDefault, setNotifyDefault] = useState<"email" | "whatsapp">("email");

  const filteredFavorites = favorites.filter((f) => {
    if (favFilter === "available") return f.available;
    if (favFilter === "sold") return !f.available;
    return true;
  });

  const toggleAlertNotify = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, notifyVia: a.notifyVia === "email" ? "whatsapp" as const : "email" as const } : a
      )
    );
  };

  const toggleAlertActive = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  const statusConfig = {
    pending: { label: "Pendiente", icon: Clock, color: "text-amber-600 bg-amber-50 border-amber-200" },
    accepted: { label: "Aceptada", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    rejected: { label: "Rechazada", icon: XCircle, color: "text-red-500 bg-red-50 border-red-200" },
  };

  return (
    <Layout>
      {/* Hero mini */}
      <div className="bg-neutral-900 py-10 sm:py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] tracking-[0.15em] uppercase text-white/40 mb-2">Mi cuenta</p>
          <h1 className="text-[24px] sm:text-[32px] font-light text-white tracking-[0.04em] uppercase">
            Panel Personal
          </h1>
          <p className="text-[14px] text-white/50 font-light mt-2">
            Gestiona tus alertas, favoritos, búsquedas y ofertas en un solo lugar.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar tabs */}
          <aside className="lg:w-[240px] shrink-0">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2.5 text-[13px] tracking-[0.02em] font-light whitespace-nowrap transition-all rounded-sm",
                    activeTab === tab.key
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                  )}
                >
                  <tab.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {/* ── ALERTS ── */}
            {activeTab === "alerts" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[18px] font-medium text-neutral-900 tracking-[0.02em] uppercase">Alertas de Precio</h2>
                  <span className="text-[12px] text-neutral-400">{alerts.filter((a) => a.active).length} activas</span>
                </div>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={cn("flex gap-4 border rounded-sm p-4 transition-all", alert.active ? "border-neutral-200 bg-white" : "border-neutral-100 bg-neutral-50 opacity-60")}>
                      <img src={alert.image} alt={alert.title} className="w-20 h-16 object-cover rounded-sm shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-neutral-900 leading-tight line-clamp-1">{alert.title}</p>
                        <p className="text-[12px] text-neutral-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {alert.location} · <span className="font-mono text-[11px]">REF-{alert.ref}</span>
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[15px] font-medium text-neutral-900">{alert.price}</span>
                          <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => toggleAlertNotify(alert.id)}
                          className={cn("flex items-center gap-1.5 text-[11px] tracking-[0.06em] uppercase font-medium px-3 py-1.5 border rounded-sm transition-all",
                            alert.notifyVia === "whatsapp" ? "border-emerald-300 text-emerald-700 bg-emerald-50" : "border-neutral-200 text-neutral-600 bg-neutral-50"
                          )}
                        >
                          {alert.notifyVia === "whatsapp" ? <MessageCircle className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                          {alert.notifyVia === "whatsapp" ? "WhatsApp" : "Email"}
                        </button>
                        <button onClick={() => toggleAlertActive(alert.id)} className="text-[11px] text-neutral-400 hover:text-neutral-600 underline underline-offset-2 transition-colors">
                          {alert.active ? "Pausar" : "Activar"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── FAVORITES ── */}
            {activeTab === "favorites" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[18px] font-medium text-neutral-900 tracking-[0.02em] uppercase">Favoritos</h2>
                  <div className="flex gap-1">
                    {(["all", "available", "sold"] as const).map((f) => (
                      <button key={f} onClick={() => setFavFilter(f)}
                        className={cn("text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 font-medium transition-all rounded-sm",
                          favFilter === f ? "bg-neutral-900 text-white" : "text-neutral-400 hover:text-neutral-600"
                        )}>
                        {f === "all" ? "Todos" : f === "available" ? "Disponibles" : "Vendidos"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {filteredFavorites.map((fav) => (
                    <div key={fav.id} className="flex gap-4 border border-neutral-200 rounded-sm p-4 bg-white hover:border-neutral-300 transition-all group">
                      <div className="relative shrink-0">
                        <img src={fav.image} alt={fav.title} className="w-28 h-20 object-cover rounded-sm" />
                        {!fav.available && (
                          <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center rounded-sm">
                            <span className="text-[10px] tracking-[0.1em] uppercase text-white font-medium bg-red-500/80 px-2 py-0.5">Vendido</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-neutral-900 leading-tight line-clamp-1">{fav.title}</p>
                        <p className="text-[12px] text-neutral-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {fav.location} · <span className="font-mono text-[11px]">REF-{fav.ref}</span>
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[15px] font-medium text-neutral-900">{fav.price}</span>
                          <span className="text-[11px] text-neutral-400 flex items-center gap-1"><Bed className="w-3 h-3" /> {fav.beds}</span>
                          <span className="text-[11px] text-neutral-400 flex items-center gap-1"><Bath className="w-3 h-3" /> {fav.baths}</span>
                          <span className="text-[11px] text-neutral-400 flex items-center gap-1"><Maximize className="w-3 h-3" /> {fav.sqm} m²</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Link to={`/property6/${fav.id}`} className="text-[11px] tracking-[0.06em] uppercase text-neutral-600 hover:text-neutral-900 font-medium flex items-center gap-1 transition-colors">
                          Ver <ChevronRight className="w-3 h-3" />
                        </Link>
                        <button className="text-neutral-300 hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SAVED SEARCHES ── */}
            {activeTab === "searches" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[18px] font-medium text-neutral-900 tracking-[0.02em] uppercase">Búsquedas Guardadas</h2>
                  <button className="flex items-center gap-1.5 text-[12px] tracking-[0.06em] uppercase text-neutral-600 hover:text-neutral-900 font-medium transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Nueva búsqueda
                  </button>
                </div>
                <div className="space-y-4">
                  {MOCK_SEARCHES.map((search) => (
                    <div key={search.id} className="border border-neutral-200 rounded-sm p-5 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[15px] font-medium text-neutral-900">{search.name}</h3>
                        <div className="flex items-center gap-3">
                          {search.newResults > 0 && (
                            <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-sm">
                              {search.newResults} nuevos
                            </span>
                          )}
                          <button className="text-neutral-300 hover:text-neutral-500 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button className="text-neutral-300 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(search.criteria).map(([key, value]) => {
                          if (key === "features" && Array.isArray(value)) {
                            return value.map((f) => (
                              <span key={f} className="text-[11px] bg-neutral-100 text-neutral-600 px-2.5 py-1 font-light">{f}</span>
                            ));
                          }
                          return (
                            <span key={key} className="text-[11px] bg-neutral-100 text-neutral-600 px-2.5 py-1 font-light">
                              {String(value)}
                            </span>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
                        <span className="text-[12px] text-neutral-400">{search.results} resultados</span>
                        <Link to="/properties" className="text-[12px] tracking-[0.06em] uppercase text-neutral-600 hover:text-neutral-900 font-medium flex items-center gap-1 transition-colors">
                          Ver resultados <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── OFFERS ── */}
            {activeTab === "offers" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[18px] font-medium text-neutral-900 tracking-[0.02em] uppercase">Mis Ofertas</h2>
                  <span className="text-[12px] text-neutral-400">{MOCK_OFFERS.length} ofertas</span>
                </div>
                <div className="space-y-3">
                  {MOCK_OFFERS.map((offer) => {
                    const st = statusConfig[offer.status];
                    return (
                      <div key={offer.id} className="flex gap-4 border border-neutral-200 rounded-sm p-4 bg-white">
                        <img src={offer.image} alt={offer.title} className="w-24 h-18 object-cover rounded-sm shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-neutral-900 leading-tight line-clamp-1">{offer.title}</p>
                          <p className="text-[12px] text-neutral-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" /> {offer.location} · <span className="font-mono text-[11px]">REF-{offer.ref}</span>
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <div>
                              <p className="text-[10px] tracking-[0.06em] uppercase text-neutral-400 mb-0.5">Precio pedido</p>
                              <p className="text-[13px] text-neutral-500 font-light">{offer.askingPrice}</p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                            <div>
                              <p className="text-[10px] tracking-[0.06em] uppercase text-neutral-400 mb-0.5">Tu oferta</p>
                              <p className="text-[14px] font-medium text-neutral-900">{offer.offerPrice}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className={cn("flex items-center gap-1.5 text-[11px] tracking-[0.06em] uppercase font-medium px-3 py-1.5 border rounded-sm", st.color)}>
                            <st.icon className="w-3 h-3" /> {st.label}
                          </span>
                          <span className="text-[11px] text-neutral-300 font-light">{offer.date}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── SETTINGS ── */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-[18px] font-medium text-neutral-900 tracking-[0.02em] uppercase mb-6">Preferencias de Notificación</h2>
                <div className="border border-neutral-200 rounded-sm p-6 bg-white space-y-6">
                  <div>
                    <p className="text-[13px] font-medium text-neutral-900 mb-3">Canal de notificación preferido</p>
                    <div className="flex gap-3">
                      <button onClick={() => setNotifyDefault("email")}
                        className={cn("flex items-center gap-2 px-5 py-3 border rounded-sm text-[13px] font-medium transition-all",
                          notifyDefault === "email" ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        )}>
                        <Mail className="w-4 h-4" /> Email
                      </button>
                      <button onClick={() => setNotifyDefault("whatsapp")}
                        className={cn("flex items-center gap-2 px-5 py-3 border rounded-sm text-[13px] font-medium transition-all",
                          notifyDefault === "whatsapp" ? "border-emerald-600 bg-emerald-600 text-white" : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        )}>
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-6">
                    <p className="text-[13px] font-medium text-neutral-900 mb-3">Tipos de notificación</p>
                    <div className="space-y-3">
                      {[
                        { label: "Alertas de bajada de precio", desc: "Cuando un inmueble marcado baje de precio" },
                        { label: "Nuevos resultados de búsqueda", desc: "Cuando haya nuevos inmuebles que coincidan con tus criterios" },
                        { label: "Estado de ofertas", desc: "Cuando haya cambios en tus ofertas enviadas" },
                        { label: "Favoritos vendidos", desc: "Cuando un inmueble favorito se marque como vendido" },
                      ].map((item, i) => (
                        <label key={i} className="flex items-start gap-3 cursor-pointer group">
                          <input type="checkbox" defaultChecked className="mt-1 accent-neutral-900" />
                          <div>
                            <p className="text-[13px] text-neutral-800 font-medium group-hover:text-neutral-900 transition-colors">{item.label}</p>
                            <p className="text-[12px] text-neutral-400 font-light">{item.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-6">
                    <p className="text-[13px] font-medium text-neutral-900 mb-3">WhatsApp</p>
                    <div className="flex gap-3">
                      <input type="tel" placeholder="+34 600 000 000" className="flex-1 border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors" />
                      <button className="px-5 py-2.5 bg-neutral-900 text-white text-[12px] tracking-[0.08em] uppercase font-medium hover:bg-neutral-800 transition-all">
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboardPage;
