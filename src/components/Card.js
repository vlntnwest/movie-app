import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ movie, onDelete }) => {
  const [genreData, setGenreData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(() => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    return storedData.includes(movie.id.toString());
  });

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=ed82f4c18f2964e75117c2dc65e2161d"
      )
      .then((res) => setGenreData(res.data.genres))
      .catch((error) => console.error("Error fetching genre data:", error));
  }, []);

  const getGenreNameById = (id) => {
    const genre = genreData.find((genre) => genre.id === id);
    return genre ? genre.name : "Unknown";
  };

  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const formattedDate = dateFormater(movie.release_date);

  const addStorage = () => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (!storedData.includes(movie.id.toString())) {
      storedData.push(movie.id);
      window.localStorage.movies = storedData;
      setIsFavorite(true);
    }
  };

  const deleteStorage = () => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (storedData.includes(movie.id.toString())) {
      storedData = storedData.filter((id) => id !== movie.id.toString());
      window.localStorage.movies = storedData.join(",");
      setIsFavorite(false);
      if (onDelete) {
        onDelete(movie.id);
      }
    }
  };

  return (
    <li className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/original/" + movie.poster_path
            : "/movie-app/img/poster.jpg"
        }
        alt={"Affiche " + movie.title}
      />
      <h2>{movie.title}</h2>
      <h5>Sorti le : {formattedDate}</h5>
      <h4>{movie.vote_average}/10</h4>
      <ul className="tag">
        {movie.genre_ids
          ? movie.genre_ids.map((id) => (
              <li key={id}>{getGenreNameById(id)}</li>
            ))
          : movie.genres.map((genre) => <li key={genre.name}>{genre.name}</li>)}
      </ul>
      {movie.overview ? <h3>Synopsis</h3> : ""}
      <p>{movie.overview}</p>
      {isFavorite ? (
        <div
          className="btn"
          onClick={() => {
            deleteStorage();
          }}
        >
          Supprimer de la liste
        </div>
      ) : (
        <div className="btn" onClick={() => addStorage()}>
          Ajouter aux coups de coeur
        </div>
      )}
    </li>
  );
};

export default Card;
