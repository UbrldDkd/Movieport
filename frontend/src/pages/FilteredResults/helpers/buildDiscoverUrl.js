import { Keys } from '../../../utils/constants/Keys.js';
import { translateFilters } from './translateFilter.js';
import { CountriesMap } from '../../../utils/constants/CountriesMap.js';

const CountryNameToCode = Object.fromEntries(
  Object.entries(CountriesMap).map(([code, name]) => [name, code])
);

export function buildDiscoverUrl({ mediaType, filters }) {
  const translated = translateFilters(filters);

  const {
    genre = [],
    year = [],
    country = [],
    decade = null,
    service = null,
    page = 1,
  } = translated;

  const { API_KEY, Url } = Keys.API1;

  const genreQuery = genre.length ? `&with_genres=${genre.join(',')}` : '';

  const yearQuery =
    year.length && !decade ? `&primary_release_year=${year[0]}` : '';

  const dateRangeQuery = decade
    ? `&primary_release_date.gte=${decade.gte}&primary_release_date.lte=${decade.lte}`
    : '';

  const countryCodes = country
    .map((name) => CountryNameToCode[name] ?? name)
    .filter(Boolean);

  const countryQuery = countryCodes.length
    ? `&with_origin_country=${countryCodes.join('|')}`
    : '';

  const serviceQuery = service
    ? `&with_watch_providers=${service}&watch_region=US&with_watch_monetization_types=flatrate`
    : '';

  return `${Url}discover/${mediaType}?api_key=${API_KEY}&page=${page}${genreQuery}${yearQuery}${dateRangeQuery}${countryQuery}${serviceQuery}`;
}
