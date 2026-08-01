import { GenreMap } from '../../../utils/constants/GenreMap';
import { ServiceMap } from '../../../utils/constants/ServiceMap';
import { CountriesMap } from '../../../utils/constants/CountriesMap';

function getGenreIds(genres = []) {
  return genres
    .map((genre) => {
      if (!Number.isNaN(Number(genre))) return genre;

      const match = Object.entries(GenreMap).find(
        ([, name]) => name.toLowerCase() === genre.toLowerCase()
      );

      return match ? match[0] : null;
    })
    .filter(Boolean);
}

function getCountries(countries = []) {
  return countries
    .map((country) => {
      if (country.length === 2) return country;

      const match = Object.entries(CountriesMap).find(
        ([code, name]) => name.toLowerCase() === country.toLowerCase()
      );

      return match ? code : null;
    })
    .filter(Boolean);
}

function getServiceId(service) {
  if (!service) return null;

  if (!Number.isNaN(Number(service))) {
    return service;
  }

  return ServiceMap[service] ?? null;
}

export function translateFilters(filters) {
  return {
    ...filters,
    genre: getGenreIds(filters.genre),
    country: getCountries(filters.country),
    service: getServiceId(filters.service),
  };
}
