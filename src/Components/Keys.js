export const Keys = {

  //used as main general API
  API1: {

    //details for API1
    details: {
    poster: 'poster_path',
    title: 'title',  
    titleTv: 'name', 
    rating: 'vote_average',
    media: 'media_type',
    id: 'id',
    genres: 'genre_ids',
    backDrop: 'backdrop_path',
    releaseDate: 'release_date',
    releaseDateTv: 'first_air_date',
    overview: 'overview',
    releaseYear: 'release_year',
    runtime: 'runtime',
    imdb_id: 'imdb_id',
    },
  
  //topics for API1
  topics: {

    movies: {
    popular: `movie/popular?api_key=`,
    nowPlaying: `movie/now_playing?api_key=`,
    topRated: `movie/top_rated?api_key=`,
    discover: `discover/movie?api_key=`
    },

    tv: {
    popular: `tv/popular?api_key=`

    }

  },
  
  //URL and API key
  Url: `https://api.themoviedb.org/3/`,
  API_KEY: 'REDACTED_API_KEY',

    },
  
    //used for single movie pages
  API2: {
    
    details: {
    title: 'Title',  
    titleTv: 'name', 
    rated: 'Rated',
    runtime: 'Runtime',
    director: 'Director',
    writer: 'Writer',
    plot: 'Plot',
    country: 'Country',
    awards: 'Awards',
    episode: 'Episode',
    season: 'Season',
    media: 'Type',
    imdbRating: 'imdbRating',
    metacriticRating: 'Metascore',
    genre: 'Genre',
    release: 'Year',
    ratings: 'Ratings'
    },
    
    //URL and API key
    Url:`https://www.omdbapi.com/?i=`,
    API_KEY:'REDACTED_API_KEY',
  }

  

  
  };