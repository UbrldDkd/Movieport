export const Keys = {
  API1: {
    details: {
      // Shared / neutral fields
      id: 'id',
      mediaType: 'media_type',
      poster: 'poster_path',
      backdrop: 'backdrop_path',
      overview: 'overview',
      popularity: 'popularity',
      voteAverage: 'vote_average',
      voteCount: 'vote_count',
      genreIds: 'genre_ids',
      genres: 'genres',
      releaseYear: 'release_year',
      runtime: 'runtime',
      imdbId: 'imdb_id',
      productionCountries: 'production_countries',
      originalLanguage: 'original_language',
      tagline: 'tagline',
      productionCompanies: 'production_companies',

      // Movie-specific fields
      movieTitle: 'title',
      movieOriginalTitle: 'original_title',
      movieReleaseDate: 'release_date',
      Status: 'status',
      Budget: 'budget',
      Revenue: 'revenue',
      SpokenLanguages: 'spoken_languages',
      movieCollection: 'belongs_to_collection',

      // TV-specific fields
      tvTitle: 'name',
      tvOriginalName: 'original_name',
      tvReleaseDate: 'first_air_date',
      LastAirDate: 'last_air_date',
      tvNextEpisodeToAir: 'next_episode_to_air',
      tvNetworks: 'networks',
      episodeRuntime: 'episode_run_time',
      seasons: 'seasons',
      seasonCount: 'number_of_seasons',
      episodeCount: 'number_of_episodes',

      // Season fields
      seasonsFields: {
        seasonNumber: 'season_number',
        name: 'name',
        airDate: 'air_date',
        episodeCount: 'episode_count',
        posterPath: 'poster_path',
      },

      // Episode fields
      episodeFields: {
        episodeNumber: 'episode_number',
        title: 'name',
        overview: 'overview',
        stillPath: 'still_path',
        airDate: 'air_date',
        runtime: 'runtime',
        voteAverage: 'vote_average',
        voteCount: 'vote_count',
      },
    },

    topics: {
      movies: {
        popular: `movie/popular?api_key=`,
        nowPlaying: `movie/now_playing?api_key=`,
        topRated: `movie/top_rated?api_key=`,
        upcoming: `movie/upcoming?api_key=`,
        discover: `discover/movie?api_key=`,
      },
      tv: {
        popular: `tv/popular?api_key=`,
        topRated: `tv/top_rated?api_key=`,
        discover: `discover/tv?api_key=`,
      },
    },

    Url: `https://api.themoviedb.org/3/`,
    API_KEY: import.meta.env.VITE_TMDB_API_KEY,
  },

  API2: {
    details: {
      title: 'Title',
      rated: 'Rated',
      runtime: 'Runtime',
      director: 'Director',
      writer: 'Writer',
      overview: 'Plot',
      country: 'Country',
      mediaType: 'Type',
      genre: 'Genre',
      release: 'Year',
      ratings: 'Ratings',
      cast: 'Actors',
      poster: 'Poster',
    },
    Url: `https://www.omdbapi.com/?i=`,
    API_KEY: import.meta.env.VITE_OMDB_API_KEY,
  },
};
