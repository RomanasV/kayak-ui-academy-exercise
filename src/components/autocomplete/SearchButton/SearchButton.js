import React, { Component } from 'react';
import styles from '../autocomplete.css';
import SearchIcon from '../icons/SearchIcon';

export default class SearchButton extends Component {
  render() {
    const { searchButtonClicked } = this.props;
    return (
      <React.Fragment>
        <div className={styles.searchIcon} onClick={searchButtonClicked}>
          <SearchIcon />
        </div>
      </React.Fragment>
    );
  }
}
