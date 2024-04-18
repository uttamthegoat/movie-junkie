import React, { useEffect } from "react";
import requests from "../sampleData";
import BannerSlider from "../components/BannerSlider";
import Row from "../components/Row";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    document.title = "Movie Junkie";
  }, []);
  return (
    <div className="Home">
      <BannerSlider />
      <div data-aos="fade-up">
        <Row rowTitle="Top Rated" content={requests.fetchTopRatedMovies} />
      </div>
      <div data-aos="fade-up">
        <Row rowTitle="Popular Movies" content={requests.fetchPopularMovies} />
      </div>
      <div data-aos="fade-up">
        <Row
          rowTitle="Upcoming Movies"
          content={requests.fetchUpcomingMovies}
        />
      </div>
      <div data-aos="fade-up">
        <Row
          rowTitle="Trending Movies"
          content={requests.fetchTrendingMovies}
        />
      </div>
      <div data-aos="fade-up">
        <Row
          rowTitle="Top Rated TV Series"
          content={requests.fetchTopRatedTV}
        />
      </div>
      <div data-aos="fade-up">
        <Row rowTitle="Popular TV Series" content={requests.fetchPopularTV} />
      </div>
      <div data-aos="fade-up">
        <Row
          rowTitle="TV Series Airing Soon"
          content={requests.fetchOnTheAirTV}
        />
      </div>

      <div data-aos="fade-up">
        <Row rowTitle="Trending TV Series" content={requests.fetchTrendingTV} />
      </div>
    </div>
  );
}
