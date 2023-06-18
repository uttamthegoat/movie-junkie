import "./App.css";
import { Routes, Route } from "react-router-dom";
import requests from "./sampleData";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movies from "./components/Movies";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
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
      </Routes>
    </div>
  );
}

export default App;
