import React from "react";
import Left_component from "../components/Left_component";

const Home = () => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-col items-center pt-2 pr-2 pl-2">
        <img
          src="https://portal.uovt.ac.lk/front-assets/images/logo/UoVT-icon.png"
          alt="UoVT Logo"
          className=" text-center w-16 h-16"
        />
        <h1 className=" font-bold text-4xl text-gray-400 w-full text-center">
          UoVT Notice Bord
        </h1>
      </div>
      <div className="flex md:flex-row flex-col pt-5 gap-2">
        <div className="w-full bg-gray-300 flex lg:flex-col p-2">
          <Left_component />
        </div>
        <div className="w-full bg-gray-300 flex lg:flex-col p-2">
          <div className="w-full bg-gray-500 flex lg:flex-col mb-2 p-1">Bye 1</div>
          <div className="w-full bg-gray-500 flex lg:flex-col p-1">Bye 2</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
