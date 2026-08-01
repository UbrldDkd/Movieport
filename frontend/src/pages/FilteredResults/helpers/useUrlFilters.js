import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function decadeToRange(decade) {
  const start = Number(decade.replace(/s$/i, ''));

  if (Number.isNaN(start)) return null;

  return {
    gte: `${start}-01-01`,
    lte: `${start + 9}-12-31`,
  };
}

export function useUrlFilters() {
  const { pathname } = useLocation();

  return useMemo(() => {
    const filters = {
      genre: [],
      year: [],
      country: [],
      decade: null,
      service: null,
      page: 1,
      size: 'compact',
    };

    const handlers = {
      genre: (value) => {
        filters.genre.push(
          ...decodeURIComponent(value).split(/[+,]/).filter(Boolean)
        );
      },

      year: (value) => {
        filters.year.push(...value.split(/[+,]/).map(Number));
      },

      country: (value) => {
        filters.country.push(
          ...decodeURIComponent(value).split(/[+,]/).filter(Boolean)
        );
      },

      service: (value) => {
        filters.service = decodeURIComponent(value);
      },

      decade: (value) => {
        filters.decade = decadeToRange(value);
      },

      page: (value) => {
        const page = Number(value);
        filters.page = Number.isNaN(page) ? 1 : page;
      },

      size: (value) => {
        filters.size = value === 'large' ? 'large' : 'compact';
      },
    };

    const segments = pathname.split('/').filter(Boolean).slice(1);

    for (let i = 0; i < segments.length; i += 2) {
      const key = segments[i];
      const value = segments[i + 1];

      if (!value) continue;

      handlers[key]?.(value);
    }

    return filters;
  }, [pathname]);
}
