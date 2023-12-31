import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { BiArrowBack } from "react-icons/bi";
import { FaHeart, FaPlay } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "./../Redux/Actions/MoviesActions";
import Loader from "../Components/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import {
  DownloadVideo,
  IfMovieLiked,
  LikeMovie,
} from "../Context/Functionalities";
import { SidebarContext } from "../Context/DrawerContext";
import FileSaver from "file-saver";
import ReactPlayer from "react-player";

function WatchPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);
  const { progress, setProgress } = useContext(SidebarContext);
  //SidebarContext;
  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  // use Selector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  const { isLoading: likeLoading } = useSelector(
    (state) => state.userLikeMovie
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = (movie) => IfMovieLiked(movie);

  // download movie video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  //  use Effect
  useEffect(() => {
    // movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="container mx-auto bg-text p-6 mb-12">
        {!isError && (
          <div className="flex-btn flex-wrap mb-6 gap-2 bg-white rounded border border-gray-800 p-6">
            <Link
              to={`/movie/${movie?._id}`}
              className="md:text-xl text-sm flex gap-3 items-center font-bold text-dry"
            >
              <BiArrowBack /> {movie?.name}
            </Link>
            <div className="flex-btn sm:w-auto w-full gap-5">
              <button
                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || likeLoading}
                className={`bg-text hover:text-subMain 
                ${isLiked(movie) ? "text-subMain" : "text-success"}
                transitions bg-opacity-30 rounded px-4 py-3 text-sm`}
              >
                <FaHeart />
              </button>

              <Link
                to={`/apply`}
                // onClick={`/movie/${movie?._id}`}
                // onClick={() => DownloadMovieVideo(movie?.video, movie?.name)}
                className="bg-dry flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm"
              >
                <GiPodiumWinner className="text-primary" /> Apply
              </Link>

              {/* <button
                disabled={progress > 0 && progress < 100}
                to={`/movie/${movie?._id}`}
                onClick={`/movie/${movie?._id}`}
                // onClick={() => DownloadMovieVideo(movie?.video, movie?.name)}
                className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm"
              >
                <FaCloudDownloadAlt /> Apply
              </button> */}
            </div>
          </div>
        )}

        {/* Watch Video */}
        <div className="w-full h-full rounded">
          <ReactPlayer
            url={movie?.video}
            playing={true}
            width="100%"
            height="100%"
          />
        </div>

        {/* {play ? (
          <div>this </div>
          // <video controls autoplay={play} className="w-full h-full rounded">
          //   <source src={movie?.video} type="video/mp4" title={movie?.name} />
          // </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            {isLoading ? (
              <div className={sameClass}>
                <Loader />
              </div>
            ) : isError ? (
              <div className={sameClass}>
                <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-main text-subMain text-4xl">
                  <RiMovie2Line />
                </div>
                <p className="text-border text-sm">{isError}</p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                  <button
                    onClick={() => setPlay(true)}
                    className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>
                <img
                  src={movie?.image ? movie.image : "images/user.png"}
                  alt={movie?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
          </div>
        )} */}
      </div>
    </Layout>
  );
}

export default WatchPage;
