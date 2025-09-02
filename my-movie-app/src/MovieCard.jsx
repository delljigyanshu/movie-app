import React from "react";

function MovieCard({ movie, toggleFavorite, isFavorite }) {
  return (
    <div className="movie">
      <div>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
          alt={movie.Title}
        />
      </div>
      <div>
        <h3>{movie.Title}</h3>
        <p>Year: {movie.Year}</p>
        <button onClick={() => toggleFavorite(movie)}>
          {isFavorite ? "❌ Remove" : "⭐ Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
