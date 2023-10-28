import React from "react";

function Head2({ title }) {
  return (
    <div className="w-full bg-deepGray lg:h-64 h-40 relative overflow-hidden rounded-md">
      <img
        src="https://preptors.com/wp-content/uploads/2022/01/About-us-1.jpg"
        alt="aboutus"
        className="w-full h-full object-cover"
      />
      <div className="absolute lg:top-24 top-16 w-full flex-colo">
        <h1 className="text-2xl lg:text-h1 text-primary text-center font-bold">
          {title && title}
        </h1>
      </div>
    </div>
  );
}

export default Head2;
