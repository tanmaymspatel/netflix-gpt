import React, { useEffect } from "react";
import Header from "./Header";
import { API_OPTIONS } from "../utils/constant";

const Browse = () => {
  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );
      const json = await data.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
  return (
    <div>
      <Header></Header>
    </div>
  );
};

export default Browse;
