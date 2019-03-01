import React, { Component } from 'react';
import styles from './autocomplete.css';
import SearchBar from './SearchBar/SearchBar';
import Movies from './Movies/Movies';
import MovieIcon from './icons/MovieIcon';

import SearchButton from './SearchButton/SearchButton';

export default class Autocomplete extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchText: ''
    };
  }

  handleSearch = event => {
    const minSearchLetters = 3;
    const updatedSearchText = event.target.value;
    const searchStrLength = updatedSearchText.length;

    this.setState({ searchText: updatedSearchText, pickedMovie: false });

    searchStrLength >= minSearchLetters ? this.updateResults() : this.resetMovies();
  };

  resetMovies = () => {
    this.setState({ movies: [] });
  };

  resetSearchButton = () => {
    this.setState({ searchButton: false });
  };

  updateResults = () => {
    this.setState({ loading: true });
    const maxMovies = 8;
    const searchTextStr = this.state.searchText;
    const linkToApi = `https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query=${searchTextStr}&page=1&include_adult=false`;

    fetch(linkToApi)
      .then(response => response.json())
      .then(data => {
        const moviesList = data.results.splice(0, maxMovies);
        this.setState({
          loading: false,
          movies: moviesList
        });
      });
  };

  listMovies = () => {
    const maxMovies = 8;
    const moviesList = this.state.movies.results.splice(0, maxMovies);
    return moviesList;
  };

  handleClickedMovie = movie => {
    const movieTitle = movie.title;
    this.setState(prevState => ({
      pickedMovie: { ...prevState.pickedMovie, movie },
      searchText: movieTitle
    }));
  };

  handleEscPressed = event => {
    const escKeyCode = 27;
    event.keyCode === escKeyCode &&
      this.setState({
        searchButton: false,
        searchText: ''
      });
  };

  handleSearchButton = () => {
    this.setState({ searchButton: true });
  };

  render() {
    const { searchText, pickedMovie, movies, loading, searchButton } = this.state;
    return (
      <React.Fragment>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div className={styles.searchBar}>
              {((searchText && !pickedMovie) || searchButton) && (
                <div className={styles.movieIcon}>
                  <MovieIcon />
                </div>
              )}

              <SearchBar
                searchText={searchText}
                onSearchChange={this.handleSearch}
                movies={movies}
                movieClicked={this.handleClickedMovie}
                pickedMovie={pickedMovie}
                onEscPressed={this.handleEscPressed}
                searchButton={searchButton}
              />
              {(!searchText || pickedMovie) && !searchButton && (
                <SearchButton searchButtonClicked={this.handleSearchButton} />
              )}
            </div>

            {searchText && (
              <Movies
                movies={movies}
                movieClicked={this.handleClickedMovie}
                pickedMovie={pickedMovie}
                loading={loading}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
