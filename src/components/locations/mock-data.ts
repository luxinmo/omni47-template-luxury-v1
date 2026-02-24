import { LocationNode } from "./types";

const sampleGeoJSON = `{"type":"Polygon","coordinates":[[[2.0,41.0],[2.5,41.0],[2.5,41.5],[2.0,41.5],[2.0,41.0]]]}`;

export const mockLocations: LocationNode[] = [
  // Countries
  { id: "c1", parentId: null, level: "country", name: "Spain", safeName: "spain", names: { en: "Spain", es: "España", fr: "Espagne", de: "Spanien" }, slugs: { en: "spain", es: "espana", fr: "espagne", de: "spanien" }, active: true, order: 1, geojson: null, childrenCount: 3 },
  { id: "c2", parentId: null, level: "country", name: "France", safeName: "france", names: { en: "France", es: "Francia", fr: "France", de: "Frankreich" }, slugs: { en: "france", es: "francia", fr: "france", de: "frankreich" }, active: true, order: 2, geojson: null, childrenCount: 2 },
  { id: "c3", parentId: null, level: "country", name: "Germany", safeName: "germany", names: { en: "Germany", es: "Alemania", fr: "Allemagne", de: "Deutschland" }, slugs: { en: "germany", es: "alemania", fr: "allemagne", de: "deutschland" }, active: false, order: 3, geojson: null, childrenCount: 1 },

  // Spain provinces
  { id: "p1", parentId: "c1", level: "province", name: "Barcelona", safeName: "barcelona", names: { en: "Barcelona", es: "Barcelona", fr: "Barcelone" }, slugs: { en: "barcelona", es: "barcelona", fr: "barcelone" }, active: true, order: 1, geojson: sampleGeoJSON, childrenCount: 3 },
  { id: "p2", parentId: "c1", level: "province", name: "Madrid", safeName: "madrid", names: { en: "Madrid", es: "Madrid" }, slugs: { en: "madrid", es: "madrid" }, active: true, order: 2, geojson: null, childrenCount: 2 },
  { id: "p3", parentId: "c1", level: "province", name: "Málaga", safeName: "malaga", names: { en: "Malaga", es: "Málaga", fr: "Malaga" }, slugs: { en: "malaga", es: "malaga", fr: "malaga" }, active: true, order: 3, geojson: sampleGeoJSON, childrenCount: 2 },

  // France provinces
  { id: "p4", parentId: "c2", level: "province", name: "Île-de-France", safeName: "ile-de-france", names: { en: "Île-de-France", es: "Isla de Francia", fr: "Île-de-France" }, slugs: { en: "ile-de-france", es: "isla-de-francia", fr: "ile-de-france" }, active: true, order: 1, geojson: null, childrenCount: 1 },
  { id: "p5", parentId: "c2", level: "province", name: "Provence", safeName: "provence", names: { en: "Provence", es: "Provenza", fr: "Provence" }, slugs: { en: "provence", es: "provenza", fr: "provence" }, active: true, order: 2, geojson: null, childrenCount: 1 },

  // Germany provinces
  { id: "p6", parentId: "c3", level: "province", name: "Bavaria", safeName: "bavaria", names: { en: "Bavaria", es: "Baviera", de: "Bayern" }, slugs: { en: "bavaria", es: "baviera", de: "bayern" }, active: false, order: 1, geojson: null, childrenCount: 1 },

  // Barcelona towns
  { id: "t1", parentId: "p1", level: "town", name: "Sitges", safeName: "sitges", names: { en: "Sitges", es: "Sitges" }, slugs: { en: "sitges", es: "sitges" }, active: true, order: 1, geojson: sampleGeoJSON, childrenCount: 2 },
  { id: "t2", parentId: "p1", level: "town", name: "Castelldefels", safeName: "castelldefels", names: { en: "Castelldefels", es: "Castelldefels" }, slugs: { en: "castelldefels", es: "castelldefels" }, active: true, order: 2, geojson: null, childrenCount: 1 },
  { id: "t3", parentId: "p1", level: "town", name: "Gavà", safeName: "gava", names: { en: "Gavà", es: "Gavá" }, slugs: { en: "gava", es: "gava" }, active: true, order: 3, geojson: null, childrenCount: 0 },

  // Madrid towns
  { id: "t4", parentId: "p2", level: "town", name: "Madrid Centro", safeName: "madrid-centro", names: { en: "Madrid Downtown", es: "Madrid Centro" }, slugs: { en: "madrid-downtown", es: "madrid-centro" }, active: true, order: 1, geojson: null, childrenCount: 1 },
  { id: "t5", parentId: "p2", level: "town", name: "Pozuelo", safeName: "pozuelo", names: { en: "Pozuelo", es: "Pozuelo de Alarcón" }, slugs: { en: "pozuelo", es: "pozuelo-de-alarcon" }, active: true, order: 2, geojson: null, childrenCount: 0 },

  // Málaga towns
  { id: "t6", parentId: "p3", level: "town", name: "Marbella", safeName: "marbella", names: { en: "Marbella", es: "Marbella" }, slugs: { en: "marbella", es: "marbella" }, active: true, order: 1, geojson: sampleGeoJSON, childrenCount: 2 },
  { id: "t7", parentId: "p3", level: "town", name: "Estepona", safeName: "estepona", names: { en: "Estepona", es: "Estepona" }, slugs: { en: "estepona", es: "estepona" }, active: true, order: 2, geojson: null, childrenCount: 1 },

  // Île-de-France towns
  { id: "t8", parentId: "p4", level: "town", name: "Paris", safeName: "paris", names: { en: "Paris", es: "París", fr: "Paris" }, slugs: { en: "paris", es: "paris", fr: "paris" }, active: true, order: 1, geojson: null, childrenCount: 0 },

  // Provence towns
  { id: "t9", parentId: "p5", level: "town", name: "Nice", safeName: "nice", names: { en: "Nice", es: "Niza", fr: "Nice" }, slugs: { en: "nice", es: "niza", fr: "nice" }, active: true, order: 1, geojson: null, childrenCount: 0 },

  // Bavaria towns
  { id: "t10", parentId: "p6", level: "town", name: "Munich", safeName: "munich", names: { en: "Munich", es: "Múnich", de: "München" }, slugs: { en: "munich", es: "munich", de: "muenchen" }, active: false, order: 1, geojson: null, childrenCount: 0 },

  // Sitges zones
  { id: "z1", parentId: "t1", level: "zone", name: "Sitges Centre", safeName: "sitges-centre", names: { en: "Sitges Centre", es: "Centro de Sitges" }, slugs: { en: "sitges-centre", es: "centro-de-sitges" }, active: true, order: 1, geojson: sampleGeoJSON, childrenCount: 0 },
  { id: "z2", parentId: "t1", level: "zone", name: "Garraf", safeName: "garraf", names: { en: "Garraf", es: "Garraf" }, slugs: { en: "garraf", es: "garraf" }, active: true, order: 2, geojson: null, childrenCount: 0 },

  // Castelldefels zones
  { id: "z3", parentId: "t2", level: "zone", name: "Playa", safeName: "playa", names: { en: "Beach", es: "Playa" }, slugs: { en: "beach", es: "playa" }, active: true, order: 1, geojson: null, childrenCount: 0 },

  // Madrid Centro zones
  { id: "z4", parentId: "t4", level: "zone", name: "Salamanca", safeName: "salamanca", names: { en: "Salamanca", es: "Salamanca" }, slugs: { en: "salamanca", es: "salamanca" }, active: true, order: 1, geojson: sampleGeoJSON, childrenCount: 0 },

  // Marbella zones
  { id: "z5", parentId: "t6", level: "zone", name: "Golden Mile", safeName: "golden-mile", names: { en: "Golden Mile", es: "Milla de Oro" }, slugs: { en: "golden-mile", es: "milla-de-oro" }, active: true, order: 1, geojson: sampleGeoJSON, childrenCount: 0 },
  { id: "z6", parentId: "t6", level: "zone", name: "Puerto Banús", safeName: "puerto-banus", names: { en: "Puerto Banús", es: "Puerto Banús" }, slugs: { en: "puerto-banus", es: "puerto-banus" }, active: true, order: 2, geojson: null, childrenCount: 0 },

  // Estepona zones
  { id: "z7", parentId: "t7", level: "zone", name: "Estepona Centro", safeName: "estepona-centro", names: { en: "Estepona Centre", es: "Estepona Centro" }, slugs: { en: "estepona-centre", es: "estepona-centro" }, active: true, order: 1, geojson: null, childrenCount: 0 },
];
