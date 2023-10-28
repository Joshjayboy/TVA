import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Banner from "./../Components/Home/Banner";
import PopularMovies from "./../Components/Home/PopularMovies";
import Promos from "../Components/Home/Promos";
import TopRated from "./../Components/Home/TopRated";
import { useDispatch, useSelector } from "react-redux";
import FavouritesMovies from "./Dashboard/FavouritesMovies";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMovieAction,
} from "../Redux/Actions/MoviesActions";
import { toast } from "react-hot-toast";
import { Movies } from "./../Data/MovieData";
import Movie from "../Components/Movie";

function HomeScreen() {
  const dispatch = useDispatch();

  // useSelector
  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);

  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovie);

  const { isLoading, isError } = useSelector((state) => state.getAllMovies);

  // const { isLoading, isError, FavouritesMovies } = useSelector(
  //   (state) => state.getAllMovies
  // );

  // useEffect
  useEffect(() => {
    // get random movies
    dispatch(getRandomMoviesAction());
    // get all movies
    dispatch(getAllMoviesAction({}));
    // get top rated movies
    dispatch(getTopRatedMovieAction());
    // errors
    if (isError || randomError || topError) {
      toast.error("Something went wrong");
    }
  }, [dispatch, isError, randomError, topError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={Movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        <TopRated movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
