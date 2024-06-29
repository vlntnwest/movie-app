import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiStarFullOutline } from "react-icons/ti";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";

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
      month: "numeric",
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
    <div className="card-wrapper">
      <li className="card">
        <div className="img-container">
          <img
            src={
              movie.poster_path
                ? "https://image.tmdb.org/t/p/original/" + movie.poster_path
                : "/movie-app/img/poster.jpg"
            }
            alt={"Affiche " + movie.title}
          />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <h2>{movie.title}</h2>
            <div className="infos">
              <TiStarFullOutline />
              <h5>{movie.vote_average.toFixed(2)}/10</h5>
              <h5>|</h5>
              <h5>{formattedDate}</h5>
            </div>
            <ul className="tag">
              {movie.genre_ids
                ? movie.genre_ids.map((id) => (
                    <li key={id}>{getGenreNameById(id)}</li>
                  ))
                : movie.genres.map((genre) => (
                    <li key={genre.name}>{genre.name}</li>
                  ))}
            </ul>
            <p>{movie.overview}</p>
            {isFavorite ? (
              <div
                className="btn"
                onClick={() => {
                  deleteStorage();
                }}
              >
                <FaBookmark />
              </div>
            ) : (
              <div className="btn" onClick={() => addStorage()}>
                <FaRegBookmark />
              </div>
            )}
          </div>{" "}
        </div>
      </li>
    </div>
  );
};

export default Card;
