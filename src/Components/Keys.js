


export const Keys = {
  // used as main general API
  API1: {
    details: {
      poster: 'poster_path',
      title: 'title',
      titleTv: 'name',
      rating: 'vote_average',
      media: 'media_type',
      id: 'id',
      genre: 'genre_ids',
      genreNames: 'genres',
      backDrop: 'backdrop_path',
      releaseDate: 'release_date',
      releaseDateTv: 'first_air_date',
      overview: 'overview',
      releaseYear: 'release_year',
      runtime: 'runtime',
      imdb_id: 'imdb_id',
      country: 'production_countries',
      ogLanguage: 'original_language',
      tagline: 'tagline',
      productionComp: 'production_companies',
      popularity: 'popularity',
      seasons: 'seasons',
      seasonAmount: 'number_of_seasons',
      episodeAmount: 'number_of_episodes',
      episodeRuntime: 'episode_run_time',
    },

    topics: {
      movies: {
        popular: `movie/popular?api_key=`,
        nowPlaying: `movie/now_playing?api_key=`,
        topRated: `movie/top_rated?api_key=`,
        upcoming: `discover/movie?api_key=`,
        discover: `discover/movie?api_key=`,
      },
      tv: {
        popular: `tv/popular?api_key=`,
      },
    },

    Url: `https://api.themoviedb.org/3/`,
    API_KEY: "9b9e45ca6c5942221d22ecc70fa062fc",
  },

  // used for single movie pages
  API2: {
    details: {
      title: 'Title',
      rated: 'Rated',
      runtime: 'Runtime',
      director: 'Director',
      writer: 'Writer',
      overview: 'Plot',
      country: 'Country',
      media: 'Type',
      genre: 'Genre',
      release: 'Year',
      ratings: 'Ratings',
      cast: 'Actors',
      poster: 'Poster',
    },

    Url: `https://www.omdbapi.com/?i=`,
       API_KEY: "f15afe71",

  },
};
