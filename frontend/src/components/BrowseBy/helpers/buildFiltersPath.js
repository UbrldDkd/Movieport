function encodePart(part) {
  return encodeURIComponent(part);
}

function decadeStringFromRange(decade) {
  if (!decade || !decade.gte) return null;
  const start = Number(decade.gte.split('-')[0]);
  if (Number.isNaN(start)) return null;
  return `${start}s`;
}

export function routeFor(mediaType) {
  if (!mediaType) return mediaType;
  const m = String(mediaType).toLowerCase();
  if (m === 'movie' || m === 'movies' || m === 'film' || m === 'films')
    return 'films';
  if (m === 'tv' || m === 'tvshows' || m === 'tv-show') return 'tv';
  return mediaType;
}

export function buildFiltersPath({
  mediaType,
  filters = {},
  field,
  value,
  removeField = false,
  removeValue = false,
}) {
  // Clone filters
  const f = {
    genre: Array.isArray(filters.genre) ? [...filters.genre] : [],
    year: Array.isArray(filters.year) ? [...filters.year] : [],
    country: Array.isArray(filters.country) ? [...filters.country] : [],
    decade: filters.decade ?? null,
    service: filters.service ?? null,
    size: filters.size ?? 'compact',
    page: filters.page ?? 1,
  };

  // Apply the change
  if (removeField) {
    if (field === 'service') f.service = null;
    else if (field === 'decade') f.decade = null;
    else f[field] = [];
  } else {
    if (field === 'service') {
      if (removeValue) f.service = null;
      else f.service = value;
    } else if (field === 'decade') {
      if (removeValue) f.decade = null;
      else {
        f.decade = value;
        // clear year-based filters when setting decade
        f.year = [];
      }
    } else if (field === 'year') {
      // only a single year may be selected at a time
      const n = Number(value);
      if (!Number.isNaN(n)) {
        if (removeValue) {
          f.year = f.year.filter((y) => y !== n);
        } else {
          f.decade = null;
          f.year = [n];
        }
      }
    } else {
      // arrays: genre, country
      const s = String(value);
      if (removeValue) {
        f[field] = f[field].filter(
          (v) => String(v).toLowerCase() !== s.toLowerCase()
        );
      } else {
        if (!f[field].includes(s)) f[field].push(s);
      }
    }
  }

  // Build path segments in consistent order
  const parts = [];
  const routeMedia = routeFor(mediaType);
  parts.push('', routeMedia);

  if (f.genre.length) {
    parts.push('genre', f.genre.map(encodePart).join('+'));
  }

  if (f.year.length && !f.decade) {
    parts.push('year', f.year.join('+'));
  }

  if (f.decade) {
    const dec =
      typeof f.decade === 'string' ? f.decade : decadeStringFromRange(f.decade);
    if (dec) parts.push('decade', encodePart(dec));
  }

  if (f.country.length) {
    parts.push('country', f.country.map(encodePart).join('+'));
  }

  if (f.service) {
    parts.push('service', encodePart(f.service));
  }

  if (f.size === 'large') parts.push('size', 'large');
  if (f.page && f.page > 1) parts.push('page', String(f.page));

  return parts.join('/');
}

export function isSelected({ filters = {}, field, value }) {
  if (!filters) return false;
  if (field === 'service') return filters.service === value;
  if (field === 'decade') {
    const dec = decadeStringFromRange(filters.decade);
    return dec === value;
  }
  if (field === 'year') return filters.year?.includes(Number(value));
  return (filters[field] || []).some(
    (v) => String(v).toLowerCase() === String(value).toLowerCase()
  );
}

export function encodeSegmentValue(value) {
  if (Array.isArray(value)) return value.map(encodePart).join('+');
  return encodePart(String(value));
}
