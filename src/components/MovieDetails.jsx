import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/MovieDetails.module.css";

export default function MovieDetails(props) {
  const [movie_details, setMovie_details] = useState({});
  const [src, setSrc] = useState("");
  const [genre, setGenre] = useState([]);
  const [movielang, setMovielang] = useState([]);

  let { state } = useLocation();
  const source_id = state.source_id;
  const moviedetailsApi = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTAwMjNjOGM3MDI2Nzg5YzEwYzA4NjU3NDJjMzIyOSIsInN1YiI6IjY0NzhlMDVjMTc0OTczMDBmYjM5OTk3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bJinzU-SEjU1AR7XTEJFtesjiwPUilljDGe6yowSlMc",
      },
    };
    let url = `https://api.themoviedb.org/3/movie/${source_id}?api_key=e90023c8c7026789c10c0865742c3229&append_to_response=videos&language=en-US`;
    const response = await fetch(url, options);
    const data = await response.json();
    setMovie_details(data);
    setSrc(
      data.videos.results.find((video) => video.site === "YouTube")
        ? `https://www.youtube.com/embed/${
            data.videos.results.find((video) => video.site === "YouTube").key
          }`
        : ""
    );
    setGenre(data.genres);
    setMovielang(data.spoken_languages);
    document.title = `Movie Junkie - ${data.original_title}`;
  };

  useEffect(() => {
    moviedetailsApi();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="MovieDetails text-light container-fluid">
      {src && (
        <div className={styles.movieTrailer}>
          <iframe
            className={styles.movie_videos}
            src={src}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className={styles.movieInfo + ` row g-0 w-100`}>
        <div className={styles.movieposter + ` col-sm-3`}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie_details.poster_path}`}
            alt="Movie Poster"
            className={styles.posterImage}
          />
        </div>
        <div className={styles.movieplot + ` col-sm-9`}>
          <h2>{movie_details.title}</h2>
          {movie_details.tagline && (
            <p>
              Tagline -
              <span className={styles.tagline}> "{movie_details.tagline}"</span>
            </p>
          )}
          <p>{movie_details.overview}</p>
          <div>
            Languages:{" "}
            {movielang.map((lang) => {
              return (
                <span key={lang.name} className="pe-3">
                  {lang.english_name}
                </span>
              );
            })}
          </div>
          <div className={styles.genre}>
            Genres:{" "}
            {genre.map((genre) => {
              return (
                <span key={genre.id} className={styles.genreName}>
                  {genre.name}
                </span>
              );
            })}
          </div>
          <div className={styles.minorInfo}>
            <span className="pe-4">
              Release date: {movie_details.release_date}
            </span>
          </div>
          <div className={styles.minorInfo}>
            <span className="pe-4">
              Duration: {movie_details.runtime} minutes
            </span>
          </div>
          <div className={styles.minorInfo}>
            <span className="pe-4">
              Vote: {Number(movie_details.vote_average).toFixed(1)}
            </span>
          </div>
          <div className={styles.minorInfo}>
            <span className="pe-4">Voters: {movie_details.vote_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
