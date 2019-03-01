import React, { Component } from 'react';
import styles from '../autocomplete.css';

export default class MoviesList extends Component {
  render() {
    const { movie, movieClicked } = this.props;
    return (
      <React.Fragment>
        <div className={styles.movieItem}>
          <div onClick={() => movieClicked(movie)}>
            <h3>{movie.title}</h3>
            <h5>
              {movie.vote_average} Rating, {movie.release_date.slice(0, 4)}
            </h5>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
