export const Keys = {
  details: {
    poster: 'poster_path',
    title: 'original_title',  
    titleTv: 'original_name', 
    rating: 'vote_average',
    media: 'media_type',
    id: 'id',
    genres: 'genre_ids',
    backDrop: 'backdrop_path',
    releaseDate: 'release_date',
    releaseDateTv: 'first_air_date',
    overview: 'overview',
    releaseYear: 'release_year',
    runtime: 'duration'},

  topics: {
    movies:{
    popular: `movie/popular?api_key=`,
    nowPlaying: `movie/now_playing?api_key=`,
    topRated: `movie/top_rated?api_key=`,
    discover: `discover/movie?api_key=`
    },
    tv:{
    popular: `tv/popular?api_key=`
    }

  },

  Url: `https://api.themoviedb.org/3/`,
  API_KEY: '9b9e45ca6c5942221d22ecc70fa062fc'
  
  };