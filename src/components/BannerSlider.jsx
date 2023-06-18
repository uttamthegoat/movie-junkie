import React, { useEffect, useState } from "react";
import requests from "../sampleData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

export default function BannerSlider() {
  const [banner, setBanner] = useState([]);
  const bannerapiCall = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTAwMjNjOGM3MDI2Nzg5YzEwYzA4NjU3NDJjMzIyOSIsInN1YiI6IjY0NzhlMDVjMTc0OTczMDBmYjM5OTk3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bJinzU-SEjU1AR7XTEJFtesjiwPUilljDGe6yowSlMc",
      },
    };
    let url = `https://api.themoviedb.org/3${requests.fetchNowPlayingMovies}`;
    let response = await fetch(url, options);
    let data = await response.json();
    setBanner(data.results);
  };
  useEffect(() => {
    bannerapiCall();
  }, []);
  return (
    <div className="BannerSlider container-sm">
      <div id="carouselExample" className="carousel slide">
        <h1 className="text-center text-light">Now Playing in Theatres</h1>
        <div className="carousel-inner BannerSlider__Inner">
          {banner.map((banners, index) => {
            return (
              <div
                key={banners.id}
                className={`carousel-item ${
                  index === 0 ? "active" : ""
                } BannerSlider__carouselItem`}
              >
                <LazyLoadImage
                  effect="blur"
                  src={`https://image.tmdb.org/t/p/original${banners.backdrop_path}`}
                  className={`carousel__images`}
                  alt="CarouselImage1"
                />
                <div className="BannerSlider__bannerdetails">
                  <Link
                    to="/movie_details"
                    state={{ source_id: banners.id }}
                    className="fs-2 Banner__Link"
                  >
                    {banners.title}
                  </Link>
                  <p>{banners.overview}...</p>
                  <div className="BannerSlider__fade"></div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
