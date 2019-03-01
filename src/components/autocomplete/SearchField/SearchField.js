import React, { Component } from 'react';
import styles from '../autocomplete.css';
// import MovieIcon from '../../icons/MovieIcon';
import DefaultSearchBar from './DefaultSearchBar/DefaultSearchBar';
import ActiveSearchBar from './ActiveSearchBar/ActiveSearchBar';

export default class SearchField extends Component {
  render() {
    const { searchText, onSearchChange, pickedMovie, movies } = this.props;
    return (
      <React.Fragment>
        <div className={styles.movieIcon} />

        {searchText && !pickedMovie ? (
          <ActiveSearchBar searchText={searchText} onSearchChange={onSearchChange} />
        ) : (
          <DefaultSearchBar searchText={searchText} onSearchChange={onSearchChange} />
        )}
      </React.Fragment>
    );
  }
}
