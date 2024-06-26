import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const Movies = () => {
  const [data, setData] = useState([]);
  const [movieData, setMovieData] = useState("code");
  const [sortGoodBad, setSortGoodBad] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${movieData}&language=fr-FR`
      )
      .then((res) => setData(res.data.results));
  }, [movieData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const movieName = formData.get("search");

    if (movieName !== "") {
      setMovieData(movieName.trim());
    }
  };

  const getSortedData = (data) => {
    if (sortGoodBad === "goodToBad") {
      return data.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortGoodBad === "badToGood") {
      return data.sort((a, b) => a.vote_average - b.vote_average);
    }
    return data;
  };

  return (
    <div className="movies">
      <div className="form-component">
        <div className="form-container">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="search"
              placeholder="Entrez le titre d'un film"
            />
            <input type="submit" value="Rechercher" />
          </form>
        </div>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Top<span>➜</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Flop<span>➜</span>
          </div>
        </div>
      </div>

      <ul className="result">
        {getSortedData(data).map((movie, index) => (
          <Card key={index} movie={movie} />
        ))}
      </ul>
    </div>
  );
};

export default Movies;
