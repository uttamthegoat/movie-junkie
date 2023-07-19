import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/TvDetails.module.css";
import axios from "../assets/axiosConfig";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function TvDetails() {
  const [tv_details, setTv_details] = useState({});
  const [tvsrc, setTvsrc] = useState("");
  const [tvgenre, setTvgenre] = useState([]);
  const [languages, setLanguages] = useState([]);

  let { source_id } = useParams();
  const tvdetailsApi = async () => {
    let url = `/tv/${source_id}?api_key=e90023c8c7026789c10c0865742c3229&append_to_response=videos&language=en-US`;
    const response = await axios(url);
    const data = response.data;
    setTv_details(data);
    setTvsrc(
      data.videos.results.find((video) => video.type === "Trailer")
        ? `https://www.youtube.com/embed/${
            data.videos.results.find((video) => video.type === "Trailer").key
          }`
        : ""
    );
    setTvgenre(data.genres);
    setLanguages(data.spoken_languages);
    document.title = `Movie Junkie - ${data.name}`;
  };

  useEffect(() => {
    tvdetailsApi();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="TvDetails text-light container-fluid">
      {tvsrc && (
        <div className={styles.tvTrailer}>
          <iframe
            className={styles.tv_videos}
            src={tvsrc}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className={styles.tvInfo + ` row g-0 w-100`}>
        <div className={styles.tvposter + ` col-sm-3`}>
          <LazyLoadImage
            effect="blur"
            src={`https://image.tmdb.org/t/p/original${tv_details.poster_path}`}
            alt="TV Series Poster"
            className={styles.posterImage}
          />
        </div>
        <div className={styles.tvplot + ` col-sm-9`}>
          <h2>{tv_details.name}</h2>
          {tv_details.tagline && (
            <p>
              Tagline -
              <span className={styles.tagline}> "{tv_details.tagline}"</span>
            </p>
          )}
          <p>{tv_details.overview}</p>
          <div className={styles.languages}>
            Languages:{" "}
            {languages.map((lang) => {
              return (
                <span key={lang.name} className="pe-3">
                  {lang.english_name}
                </span>
              );
            })}
          </div>
          <div className={styles.genre}>
            Genres:{" "}
            {tvgenre.map((genre) => {
              return (
                <span key={genre.id} className={styles.genreName}>
                  {genre.name}
                </span>
              );
            })}
          </div>
          <div className={styles.minorInfo}>
            <span className="pe-4">
              Release date: {tv_details.first_air_date}
            </span>
          </div>
          <div className={styles.minorInfo}>
            <span className="pe-4">Status: {tv_details.status}</span>
          </div>
          <div className={styles.minorInfo}>
            <span className="pe-4">
              Seasons: {tv_details.number_of_seasons}
            </span>
          </div>
          <div className={styles.minorInfo}>
            <span className="pe-4">
              Vote: {Number(tv_details.vote_average).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
