import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MovieCard from "../components/MovieCard";
import Paginate from "../components/Paginate";
import axios from "../assets/axiosConfig";

export default function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const movieapicall = async (page) => {

    let url = `${props.fetchContent}&page=${page}`;
    let response = await axios(url);
    let data = response.data;
    setMovies(data.results);
    console.log(Math.ceil(data.total_results / 20));
    setTotalPages(Math.ceil(data.total_results / 20));
  };
  const handlePrevClick = () => {
    movieapicall(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };
  const handleNextClick = () => {
    movieapicall(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };
  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };
  const handlePaginate = (e) => {
    if (e.keyCode === 13) {
      movieapicall(Number(e.target.value));
    }
  };
  useEffect(() => {
    movieapicall(currentPage);
    AOS.init({ duration: 1000 });
    document.title = `Movie Junkie - ${props.title}`;
    // eslint-disable-next-line
  }, []);
  return (
    <div className="Movies">
      <Paginate
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
        handlePageChange={handlePageChange}
        handlePaginate={handlePaginate}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <div className="container-sm mb-5">
        <div className="row g-0 w-100">
          {movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="col-lg-3 col-md-6 col-sm-12 p-2"
                data-aos="fade-up"
              >
                <MovieCard movie={movie} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
