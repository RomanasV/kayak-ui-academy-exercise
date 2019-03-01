import React, { Component } from 'react';
import styles from '../autocomplete.css';

export default class DefaultSearchBar extends Component {
  render() {
    const { searchText, onSearchChange } = this.props;
    return (
      <React.Fragment>
        <div className={styles.searchBar}>
          <input
            value={searchText}
            onChange={event => onSearchChange(event)}
            placeholder="Enter movie name"
          />
        </div>

        <div className={styles.searchIcon} />
      </React.Fragment>
    );
  }
}
