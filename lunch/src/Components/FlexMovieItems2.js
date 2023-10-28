import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

function FlexMovieItems2({ movie }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-dry"> {movie.category}</span>
      </div>

      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="text-primary w-3 h-3" />
        <span className="text-sm font-medium text-dry"> {movie.year}</span>
      </div>

      <div className="flex items-center gap-2">
        <BiTime className="text-primary w-3 h-3" />
        <span className="text-sm font-medium text-dry"> {movie.time} Hr ago</span>
      </div>
    </>
  );
}

export default FlexMovieItems2;
