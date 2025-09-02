import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=c8815cb";

function App() {
  const [search, setSearch] = useState("Batman");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    }
  };

  const toggleFavorite = (movie) => {
    const alreadyFav = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (alreadyFav) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  useEffect(() => {
    searchMovies(search);
  }, []);

  return (
    <div className="app">
      <h1>🎬 Movie Search App</h1>
      <div className="search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for movies..."
        />
        <button onClick={() => searchMovies(search)}>Search</button>
      </div>

      <div className="container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
            />
          ))
        ) : (
          <h2>No movies found</h2>
        )}
      </div>

      <div className="favorites">
        <h2>⭐ Favorites</h2>
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              toggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ))
        ) : (
          <p>No favorite movies yet</p>
        )}
      </div>
    </div>
  );
}

export default App;
