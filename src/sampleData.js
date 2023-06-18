const api_key = "e90023c8c7026789c10c0865742c3229";
const adult = false;
// const baseUrl = "https://image.tmdb.org/t/p/original";

const requests = {
  // movies`
  fetchMovies: `/discover/movie?api_key=${api_key}&include_adult=${adult}&language=en-US&sort_by=popularity.desc`,
  fetchNowPlayingMovies: `/movie/now_playing?api_key=${api_key}&include_adult=${adult}&language=en-US&page=1`,
  fetchPopularMovies: `/movie/popular?api_key=${api_key}&include_adult=${adult}&language=en-US&page=1`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${api_key}&include_adult=${adult}&language=en-US&page=1`,
  fetchUpcomingMovies: `/movie/upcoming?api_key=${api_key}&include_adult=${adult}&language=en-US&page=1`,
  fetchTrendingMovies: `/trending/movie/day?api_key=${api_key}&include_adult=${adult}&language=en-US`,
  // tv
  fetchTvSeries: `/discover/tv?api_key=${api_key}&include_adult=${adult}&language=en-US&sort_by=popularity.desc`,
  fetchAiringTodayTV: `/tv/airing_today?api_key=${api_key}&include_adult=${adult}&language=en-US&page=1`,
  fetchTrendingTV: `/trending/tv/day?api_key=${api_key}&include_adult=${adult}&language=en-US&page=1`,
  fetchPopularTV: `/tv/popular?api_key=${api_key}&include_adult=${adult}&language=en-US&page=1`,
  fetchOnTheAirTV: `/tv/on_the_air?api_key=${api_key}&include_adult=${adult}&language=en-US&page=1`,
  fetchTopRatedTV: `/tv/top_rated?api_key=${api_key}&include_adult=${adult}&language=en-US&page=1`,
};

export default requests;
