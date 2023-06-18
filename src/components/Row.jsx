import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Row(props) {
  const [posterData, setPosterData] = useState([]);
  const rowapiCall = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTAwMjNjOGM3MDI2Nzg5YzEwYzA4NjU3NDJjMzIyOSIsInN1YiI6IjY0NzhlMDVjMTc0OTczMDBmYjM5OTk3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bJinzU-SEjU1AR7XTEJFtesjiwPUilljDGe6yowSlMc",
      },
    };
    let url = `https://api.themoviedb.org/3${props.content}`;
    let response = await fetch(url, options);
    let data = await response.json();
    setPosterData(data.results);
  };
  useEffect(() => {
    rowapiCall();
    AOS.init({ duration: 100 });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="HomeRow container-sm">
      <h1 className="text-light mt-5">{props.rowTitle}</h1>
      <div className="Row__forPosters">
        {posterData.map((poster) => {
          return (
            <div
              key={poster.id}
              className="Row__Posters text-wrap"
              title={poster.title ? poster.title : poster.name}
              data-hover={poster.title ? poster.title : poster.name}
              data-aos="fade-up"
            >
              <LazyLoadImage
                effect="blur"
                src={`https://image.tmdb.org/t/p/original${poster.poster_path}`}
                alt="posterpath"
                className="imagePoster"
              />
              <div className="Row__hover">
                <Link
                  to={poster.title ? "/movie_details" : "/tv_details"}
                  state={{ source_id: poster.id }}
                  className="Row__Link"
                >
                  {poster.title ? poster.title : poster.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    // </div>
  );
}
