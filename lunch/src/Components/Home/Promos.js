import React from "react";
import { GiPodiumWinner } from "react-icons/gi";

function Promos() {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-white">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed">
            We built the first Internship, Skill , Networking and Housing Scheme
            Product for students in Africa.
          </h1>
          <p className="text-black text-sm xl:text-base leading-6 xl:leading-8">
            This is how it works here at Launch, We connect student with
            internship placement and makes it easier for companies to hire
            highly telented individuals into their companies via the launch app
            if you want to learn more you can send us a mail
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex-colo bg-success text-white px-6 py-3 rounded font-bold">
              4K
            </div>

            <div className="flex-rows gap-4 bg-success text-white px-6 py-3 rounded font-bold">
              <GiPodiumWinner /> 2K
            </div>
          </div>
        </div>
        <div>
          <img
            src="/images/logo.png"
            alt="Mobile app"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Promos;
