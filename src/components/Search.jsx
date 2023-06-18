import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Paginate from "./Paginate";
import { useEffect } from "react";
import MovieCard from "./MovieCard";

export default function Search() {
  const [search, setSearch] = useState([]);
  const [searchPages, setSearchPages] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const searchapiCall = async (page) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTAwMjNjOGM3MDI2Nzg5YzEwYzA4NjU3NDJjMzIyOSIsInN1YiI6IjY0NzhlMDVjMTc0OTczMDBmYjM5OTk3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bJinzU-SEjU1AR7XTEJFtesjiwPUilljDGe6yowSlMc",
      },
    };
    let movieurl = `https://api.themoviedb.org/3/search/movie?api_key=e90023c8c7026789c10c0865742c3229&query=${searchValue}&include_adult=false&language=en-US&page=${page}`;
    let tvurl = `https://api.themoviedb.org/3/search/tv?api_key=e90023c8c7026789c10c0865742c3229&query=${searchValue}&include_adult=false&language=en-US&page=${page}`;
    let movieresponse = await fetch(movieurl, options);
    let tvresponse = await fetch(tvurl, options);
    let moviedata = await movieresponse.json();
    let tvdata = await tvresponse.json();
    console.log(
      Math.ceil((moviedata.total_results + tvdata.total_results) / 40)
    );
    console.log(movieurl);
    console.log(tvurl);
    let temp = moviedata.results.concat(tvdata.results);
    setSearch(temp);
    setSearchPages(
      Math.ceil((moviedata.total_results + tvdata.total_results) / 40)
    );
  };

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      searchapiCall(1);
    }
    setCurPage(1)
  };

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePrevSearch = () => {
    searchapiCall(curPage - 1);
    setCurPage(curPage - 1);
  };

  const handleNextSearch = () => {
    searchapiCall(curPage + 1);
    setCurPage(curPage + 1);
  };

  const changeSearchPage = (e) => {
    setCurPage(Number(e.target.value));
  };

  const handlePaginate = (e) => {
    if (e.keyCode === 13) {
      searchapiCall(Number(e.target.value));
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
    document.title = `Movie Junkie - Search`;
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Search">
      <div className="container-sm pt-5">
        <div className="row g-0 w-100">
          <div className="col-sm-9 text-center mt-2">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchValue}
              onKeyDown={handleEnterPress}
              placeholder="Search for a Movie or a Tv series"
              id="search-box"
              className="Search__input"
            />
          </div>
          <div className="col-sm-3 text-center mt-2">
            <button
              onClick={() => {
                searchapiCall(1);
              }}
              className="Search__btn"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <Paginate
        handlePrevClick={handlePrevSearch}
        handleNextClick={handleNextSearch}
        handlePageChange={changeSearchPage}
        handlePaginate={handlePaginate}
        currentPage={curPage}
        totalPages={searchPages}
      />
      <div className="container-sm mb-5">
        <div className="row g-0 w-100">
          {search.map((movie) => {
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
