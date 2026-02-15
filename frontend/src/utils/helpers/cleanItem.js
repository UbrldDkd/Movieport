import { Keys } from '../constants/Keys';

// Recieves either a tmdb or a backend object and formats it to a single item
export function cleanItem(item) {
  if (!item) return null;

  const { details } = Keys.API1;

  const mediaType = item[details.movieTitle] ? 'film' : 'tv';

  const cleanedItem = {
    tmdb_id: Number(item?.tmdb_id || item?.[details.id]),
    title: item?.[details.movieTitle] || item?.[details.tvTitle] || '',
    release_date:
      item?.[details.movieReleaseDate] || item?.[details.tvReleaseDate] || '',
    poster_path: item?.[details.poster] || '',
    media_type: item?.media_type || mediaType,
  };

  return cleanedItem;
}
