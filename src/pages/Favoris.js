import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
import Card from "../components/Card";

const Favoris = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    const fetchData = async () => {
      const newData = [];
      for (let i = 0; i < moviesId.length; i++) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR`
          );
          newData.push(response.data);
        } catch (error) {
          console.error("Error fetching movie:", error);
        }
      }
      setData(newData);
    };

    fetchData();
  }, []);

  const deleteCard = (movieId) => {
    setData(data.filter((movie) => movie.id !== movieId));
  };

  return (
    <div>
      <Navigation />
      <div className="result">
        {data.length > 0 ? (
          data.map((movie) => (
            <Card movie={movie} key={movie.id} onDelete={deleteCard} />
          ))
        ) : (
          <h2>Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default Favoris;
