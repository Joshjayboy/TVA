import React, { useState } from "react";
import Titles from "./../Titles";
import {
  BsBookmarkStarFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "../Stars";
import Loader from "../Notifications/Loader";
import { Empty } from "../Notifications/Empty";
import { useSelector, useDispatch } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../../Context/Functionalities";

const SwiperTop = ({ prevEl, nextEl, movies }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = (movie) => {
    return;
    IfMovieLiked(movie);
  };

  return (
    <Swiper
      navigation={{ nextEl, prevEl }}
      slidesPerView={4}
      autoplay={true}
      speed={1000}
      loop={true}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        0: {
          slidesPreView: 1,
          spaceBetween: 10,
        },

        768: {
          slidesPreView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPreView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPreView: 4,
          spaceBetween: 40,
        },
      }}
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 h-rate hovered border border-border bg-text rounded-lg overflow-hidden">
            <img
              src={movie?.titleImage ? movie.titleImage : "/images/user.png"}
              alt={movie?.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
              <button
                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || isLoading}
                className={`w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full
                ${isLiked(movie) ? "bg-subMain" : "bg-white bg-opacity-30"}
                 text-white`}
              >
                <FaHeart className="text-success" />
              </button>
              <Link
                className="text-white font-semibold text-xl trancuted line-clamp-2"
                to={`/movie/${movie?._id}`}
              >
                {movie?.name}
              </Link>
              <div className="flex gap-2 text-star">
                <Rating value={movie?.rate} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

function TopRated({ movies, isLoading }) {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevtEl] = useState(null);
  const className =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-primary text-white";
  return (
    <div className="my-16">
      <Titles title="Top Rated Internships" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies} />
        ) : (
          <Empty message="It seem's like we dont have any movie" />
        )}

        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={className} ref={(node) => setPrevtEl(node)}>
            <BsCaretLeftFill />
          </button>

          <button className={className} ref={(node) => setNextEl(node)}>
            <BsCaretRightFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
