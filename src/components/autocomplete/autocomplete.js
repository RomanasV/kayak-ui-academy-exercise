import React, { Component } from 'react';
import styles from './autocomplete.css';
import SearchBar from './SearchBar/SearchBar';
import Movies from './Movies/Movies';
import MovieIcon from './icons/MovieIcon';
import config from './config';

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
    const updatedSearchText = event.target.value;
    const searchStrLength = updatedSearchText.length;
    this.setState({ searchText: updatedSearchText, pickedMovie: false });
    searchStrLength >= config.MIN_SEARCH_LETTERS
      ? this.updateResults(updatedSearchText)
      : this.resetMovies();
  };

  resetMovies = () => {
    this.setState({ movies: [] });
  };

  resetSearchButton = () => {
    this.setState({ searchButton: false });
  };

  updateResults = updatedSearchText => {
    this.setState({ loading: true });

    fetch(config.API_LINK(updatedSearchText))
      .then(response => response.json())
      .then(data => {
        const moviesList = data.results.splice(0, config.MAX_MOVIES);
        this.setState({
          loading: false,
          movies: moviesList
        });
      });
  };

  listMovies = () => {
    const moviesList = this.state.movies.results.splice(0, config.MAX_MOVIES);
    return moviesList;
  };

  handleClickedMovie = movie => {
    const movieTitle = movie.title;
    this.setState(prevState => ({
      pickedMovie: { ...prevState.pickedMovie, movie },
      searchText: movieTitle,
      searchButton: false
    }));
  };

  handleEscPressed = event => {
    event.keyCode === config.ESC_KEY &&
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
