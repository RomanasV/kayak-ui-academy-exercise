const config = {
  MIN_SEARCH_LETTERS: 3,
  MAX_MOVIES: 8,
  ESC_KEY: 27,
  API_LINK(searchStr) {
    return `https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query=${searchStr}&page=1&include_adult=false`;
  }
};

export default config;
