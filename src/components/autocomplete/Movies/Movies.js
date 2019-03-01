import React, { Component } from 'react';
import styles from '../autocomplete.css';
import MoviesList from '../MoviesList/MoviesList';

export default class Movies extends Component {
  render() {
    const { movies, movieClicked, pickedMovie, loading } = this.props;
    return (
      <React.Fragment>
        <div className={styles.moviesList}>
          {loading && (
            <div className={styles.movieItem}>
              <h3>Loading...</h3>
            </div>
          )}
          {!pickedMovie &&
            movies.map(movie => (
              <MoviesList
                key={movie.id}
                movie={movie}
                movieClicked={movieClicked}
                loading={loading}
              />
            ))}
        </div>
      </React.Fragment>
    );
  }
}
