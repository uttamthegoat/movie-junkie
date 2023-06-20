import "./App.css";
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import requests from "./sampleData";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Movies from "./components/Movies";
// import MovieDetails from "./components/MovieDetails";
// import TvDetails from "./components/TvDetails";
// import Search from "./components/Search";

const Home = lazy(() => import("./components/Home"));
const Movies = lazy(() => import("./components/Movies"));
const MovieDetails = lazy(() => import("./components/MovieDetails"));
const TvDetails = lazy(() => import("./components/TvDetails"));
const Search = lazy(() => import("./components/Search"));
const Redirect = lazy(() => import("./components/Redirect"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
        <ScrollToTop />
        <Navbar title="Movie Junkie" />
        <Routes>
          <Route exact path="/" element={<Home title="Home" />} />
          <Route
            exact
            path="/movies"
            element={
              <Movies
                key="movie"
                title="Movies"
                fetchContent={requests.fetchMovies}
              />
            }
          />
          <Route
            exact
            path="/tv_series"
            element={
              <Movies
                key="tv"
                title="TV Series"
                fetchContent={requests.fetchTvSeries}
              />
            }
          />
          <Route exact path="/movie_details" element={<MovieDetails />} />
          <Route exact path="/tv_details" element={<TvDetails />} />
          <Route exact path="/search" element={<Search />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
