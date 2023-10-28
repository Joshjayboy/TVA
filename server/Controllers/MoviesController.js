import asyncHandler from "express-async-handler";
import Movie from "../Models/MoviesModel.js";
import { MoviesData } from "../Data/MovieData.js";

// public controllers
// @desc import movies
// @route post /api/movies/import
// @access Public

const importMovies = asyncHandler(async (req, res) => {
  // first we make sure our movies table is empty by delete all documents
  await Movie.deleteMany({});
  // then we insert all movies from MoviesData
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json(movies);
});

// @desc get all movies
// @route get /api/movies
// @access Public

const getMovies = asyncHandler(async (req, res) => {
  try {
    // filter movies by category, time, language, rate, year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    // load more movies functionality
    const page = Number(req.query.pageNumber) || 1; // if page number is not provided in query we set it to 1
    const limit = 12; // 12 movies per page
    const skip = (page - 1) * limit; // skip 2 movies per page

    // find movies by query, skip and limit
    const movies = await Movie.find(query)
      // .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // get total number of movies
    const count = await Movie.countDocuments(query);

    // send response with movies and total number of movies
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit), // total number of pages
      totalMovies: count, //  total number of movies
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc get movie by id
// @route get /api/movies/:id
// @access public

const getMovieById = asyncHandler(async (req, res) => {
  try {
    // find movie by id in database
    const movie = await Movie.findById(req.params.id);
    // if the movie is found send it to the client
    if (movie) {
      res.json(movie);
    }
    // if the movie is not found, send a 404 error
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc get top rated movies
// @route get /api/movies/rated/top
// @access public

const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    // find top rated movies
    const movies = await Movie.find({}).sort({ rate: -1 });
    // send top rated movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//@desc get random movies
// @route get /api/movies/random/all
// @access public
const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    // find random movies
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
    // send random movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// private controllers
// @desc post /api/movies/:id/reviews
// @access private

const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    // find movie by id in database
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // check if the user already reviewed this movie
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      // if the user already reviewed this movie send 400 error
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this movie");
      }
      // else create a new review
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };
      // push the new review to the reviews array
      movie.reviews.push(review);

      // increase  the number of reviews
      movie.numberOfReviews = movie.reviews.length;

      // calculate the new rate
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      // save the movie in database
      await movie.save();
      // send the new movie to the client
      res.status(201).json({
        message: "Review added",
      });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// admin controllers
// @desc update movie
// @route put /api/movies/:id
// @access private/admin

const updateMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;
    // find movie by id in database
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      // update movie data
      movie.name = name || movie.name;
      movie.desc = desc || movie.desc;
      movie.image = image || movie.image;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.category = category || movie.category;
      movie.time = time || movie.time;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;

      // save the movie in database
      const updatedMovie = await movie.save();

      // send the updated movie to the client
      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc delete movie
// @route delete /api/movies/:id
// @access private/admin

const deleteMovie = asyncHandler(async (req, res) => {
  try {
    // find movie by id in database
    const movie = await Movie.findById(req.params.id);
    // if the movie is found delete it
    if (movie) {
      await movie.remove();
      res.json({ message: "Movie removed" });
    }
    // if the movie is not found send 404 error
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    // delete all movies
    await Movie.deleteMany({});

    res.json({ message: "All movies removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc create movie
// @route post /api/movies
// @access private/admin

const createMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // create a new movie
    const movie = new Movie({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
      userId: req.user._id,
    });

    // save the movie in database
    if (movie) {
      const createdMovie = await movie.save();
      res.status(201).json(createdMovie);
    } else {
      res.status(400);
      throw new Error("Invalid movie data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  importMovies,
  getMovies,
  getMovieById,
  getTopRatedMovies,
  getRandomMovies,
  createMovieReview,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
  createMovie,
};
