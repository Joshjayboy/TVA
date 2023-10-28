import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import FlexMovieItems from "./../FlexMovieItems";
import { Link } from "react-router-dom";
import { GiPodiumWinner } from "react-icons/gi";
import Rating from "./../Stars";
import FlexMovieItems2 from "../FlexMovieItems2";

function MovieInfo({ movie, setModalOpen, DownloadMovieVideo, progress }) {
  return (
    <div className="w-full xl:h-screen relative text-white">
      <img
        src={movie?.image ? movie?.image : "/images/logo.png"}
        alt={movie?.name}
        className="w-full hidden xl:inline-block h-full object-cover"
      />
      <div className="xl:bg-white bg-white flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8">
          <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
            <img
              src={movie?.image ? movie?.image : "/images/logo.png"}
              alt={movie?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-3 flex flex-col gap-10">
              {/* Title */}
              <h1 className="text-black xl:text-4xl capitalize font-sans text-2xl font-bold">
                {movie?.name}
              </h1>
              {/* flex items */}
              <div className="flex items-center gap-4 font-medium text-dryGray">
                <div className="flex-colo bg-success text-black text-xs px-2 py-1">
                  Verified
                </div>
                <FlexMovieItems2 movie={movie && movie} />
              </div>
              {/* description */}

              <p className="text-dry text-sm leading-7 ">{movie?.desc}</p>
              <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-text border border-gray-800 rounded-lg">
                {/* share */}
                <div className="col-span-1 flex-colo border-r border-border">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20"
                  >
                    <FaShareAlt className="text-dry bg-white" />
                  </button>
                </div>
                {/* Language */}

                <div className="text-dry col-span-2 flex-colo font-medium text-sm">
                  <p>
                    Location :
                    <span className="ml-2 truncate">{movie?.language}</span>
                  </p>
                </div>
                {/* watch button */}
                <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                  <Link
                    to={`/watch/${movie?._id}`}
                    className="bg-dry py-4 hover:bg-dry transitons border-2 border-primary rounded-full flex-rows gap-4 w-full sm:py-3"
                  >
                    <MdVerified className="w-3 h-3" /> Watch
                  </Link>
                </div>
              </div>
              {/* ratings */}
              <div className="flex mb-6 text-lg gap-2 text-star">
                <Rating value={movie?.rate} />
              </div>
            </div>
            {/* <div className="col-span-2 md:mt-0 mt-0 flex justify-end"> */}
            <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
              {/* <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                  <Link
                    to={`/watch/${movie?._id}`}
                    className="bg-dry py-4 hover:bg-dry transitons border-2 border-primary rounded-full flex-rows gap-4 w-full sm:py-3"
                  >
                    <MdVerified className="w-3 h-3" /> Get Veted
                  </Link>
                </div> */}

              <button
                disabled={progress}
                onClick={() => DownloadMovieVideo(movie?.video, movie?.name)}
                className="md:w-1/4 w-full relative flex-colo bg-success hover:bg-transparent border-2 border-dry transitions md:h-64 h-10 rounded font-medium"
              >
                <Link
                  to={`/apply`}
                  className="flex-rows gap-6 text-md uppercase tracking-widest absolute md:rotate-0"
                >
                  <div>
                    Apply 

                  </div>
                </Link>
                {/* <Link to={`/apply`}>
                  <div className="flex-rows gap-6 text-md uppercase tracking-widest absolute md:rotate-90">
                    Apply <GiPodiumWinner className="w-6 h-6" />
                  </div>
                </Link> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
