// Datos estructurados (schema.org) para SEO local: le dicen a Google que
// esto es un fotógrafo profesional con base en A Coruña que trabaja en
// Galicia y España, y quién es Kiko.

interface DatosNegocio {
  email: string;
  telefono?: string;
  direccion: {
    ciudad: string;
    region: string;
    pais: string;
    lat?: number;
    lng?: number;
  };
  redes: { nombre: string; url: string }[];
  imagen?: string;
}

export function negocioLocal(site: URL, datos: DatosNegocio) {
  const sameAs = datos.redes.map((r) => r.url).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': new URL('/#negocio', site).toString(),
    name: 'Kiko Lareo — Fotógrafo y Videógrafo',
    description:
      'Fotógrafo y videógrafo profesional en A Coruña, Galicia. Fotografía y vídeo de deportes, eventos y conciertos, moda editorial y gastronomía para restaurantes.',
    url: site.toString(),
    email: datos.email,
    ...(datos.telefono ? { telephone: datos.telefono } : {}),
    ...(datos.imagen ? { image: new URL(datos.imagen, site).toString() } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: datos.direccion.ciudad,
      addressRegion: datos.direccion.region,
      addressCountry: datos.direccion.pais,
    },
    ...(datos.direccion.lat && datos.direccion.lng
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: datos.direccion.lat,
            longitude: datos.direccion.lng,
          },
        }
      : {}),
    areaServed: [
      { '@type': 'City', name: datos.direccion.ciudad },
      { '@type': 'AdministrativeArea', name: datos.direccion.region },
      { '@type': 'Country', name: 'España' },
    ],
    knowsAbout: [
      'fotografía deportiva',
      'fotografía de eventos y conciertos',
      'fotografía de moda y lookbooks',
      'fotografía gastronómica',
      'vídeo y aftermovies',
    ],
    founder: persona(site),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function persona(site: URL) {
  return {
    '@type': 'Person',
    '@id': new URL('/#kiko', site).toString(),
    name: 'Kiko Lareo',
    jobTitle: 'Fotógrafo y videógrafo',
    url: site.toString(),
    address: { '@type': 'PostalAddress', addressLocality: 'A Coruña', addressRegion: 'Galicia', addressCountry: 'ES' },
  };
}

export function migas(site: URL, tramos: { nombre: string; ruta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: tramos.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.nombre,
      item: new URL(t.ruta, site).toString(),
    })),
  };
}
