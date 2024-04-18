import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import requests from "./sampleData";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";
import Search from "./pages/Search";

// const Home = lazy(() => import("./pages/Home"));
// const Movies = lazy(() => import("./pages/Movies"));
// const MovieDetails = lazy(() => import("./pages/MovieDetails"));
// const TvDetails = lazy(() => import("./pages/TvDetails"));
// const Search = lazy(() => import("./pages/Search"));
const Redirect = lazy(() => import("./pages/Redirect"));

function App() {
  return (
    <BrowserRouter basepath="/">
    <div className="App">
      <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
        <ScrollToTop />
        <Navbar title="Movie Junkie" />
        <Routes>
          <Route exact path="/" element={<Home title="Home" />} />
          <Route
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
            path="/tv_series"
            element={
              <Movies
                key="tv"
                title="TV Series"
                fetchContent={requests.fetchTvSeries}
              />
            }
          />
          <Route
            path="/movie_details/:source_id"
            element={<MovieDetails />}
          />
          <Route path="/tv_details/:source_id" element={<TvDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </Suspense>
    </div>
    </BrowserRouter>
  );
}

export default App;
