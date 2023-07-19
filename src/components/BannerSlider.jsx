import React, { useEffect, useState } from "react";
import requests from "../sampleData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import axios from "../assets/axiosConfig";

export default function BannerSlider() {
  const [banner, setBanner] = useState([]);
  const bannerapiCall = async () => {
    let url = requests.fetchNowPlayingMovies;
    let response = await axios(url);
    setBanner(response.data.results);
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
                    to={`/movie_details/${banners.id}`}
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
