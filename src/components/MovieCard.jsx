/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "../styles/MovieCard.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

export default function MovieCard(props) {
  const [touch, setTouch] = useState(false);
  const handleTouchStart = () => {
    if (
      (document.querySelector(`.${styles.col}`).className = `${styles.col}`)
    ) {
      setTouch(true);
    } else {
      setTouch(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className={styles.MovieCard}>
      <div
        className={`${styles.col} ${touch ? styles.hover : ""}`}
        onTouchStart={handleTouchStart}
      >
        <div className={styles.container}>
          <div
            className={styles.front}
            style={{
              backgroundColor: `black`,
            }}
          >
            <div className={styles.inner}>
              <LazyLoadImage
                effect="blur"
                src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
                alt="posterimages"
                className={styles.posterImages}
              />
            </div>
          </div>
          <div className={styles.back}>
            <div className={styles.inner}>
              <p className="mt-4 mx-2">
                {props.movie.title ? props.movie.title : props.movie.name}
              </p>
              <Link
                to={props.movie.title?`/movie_details/${props.movie.id}`:`/tv_details/${props.movie.id}`}
                className="btn btn-outline-light"
              >
                More Info
              </Link>
              <small className="mt-3 d-block text-white-50">
                {props.movie.release_date
                  ? `Release: ${props.movie.release_date}`
                  : `Aired: ${props.movie.first_air_date}`}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
