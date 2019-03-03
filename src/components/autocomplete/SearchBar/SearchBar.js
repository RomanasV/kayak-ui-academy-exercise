import React, { Component } from 'react';
import styles from '../autocomplete.css';
import MovieIcon from '../icons/MovieIcon';

export default class ActiveSearchBar extends Component {
  render() {
    const { searchText, onSearchChange, pickedMovie, onEscPressed, searchButton } = this.props;
    return (
      <React.Fragment>
        <div
          className={
            searchButton
              ? styles.searchBarActive
              : !searchText || pickedMovie
              ? styles.searchBar
              : styles.searchBarActive
          }
        >
          <div className={styles.movieIcon}>
            <MovieIcon />
          </div>
          <input
            value={searchText}
            onChange={event => onSearchChange(event)}
            onKeyUp={event => onEscPressed(event)}
            placeholder="Enter movie name"
          />

          <span className={styles.extraText}>Enter a movie name</span>
        </div>
      </React.Fragment>
    );
  }
}
