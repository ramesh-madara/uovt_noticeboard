import React from "react";
import Left_component from "../components/Left_component";
import Right_component1 from "../components/Right_component1";
import Right_component2 from "../components/Right_component2";

const Home = () => {
  return (
    <div className="flex flex-col w-full md:h-screen">
      <div className="flex flex-col p-2 pb-5 h-11/12">
        <div className="flex flex-col items-center pt-2 pr-2 pl-2 h-1/6">
          <img
            src="https://portal.uovt.ac.lk/front-assets/images/logo/UoVT-icon.png"
            alt="UoVT Logo"
            className=" text-center w-16 h-16"
          />
          <h1 className=" font-bold text-3xl text-gray-500 w-full mb-2 text-center">
            UoVT Notice Bord
          </h1>
        </div>
        <div className="flex md:flex-row flex-col pt-5 gap-2 mt-3 h-5/6">
          <div className="w-1/2 bg-gray-300 flex flex-col p-2 rounded-xl">
            <h1 className="text-2xl pb-2 font-bold text-white">Notices</h1>
            <Left_component />
          </div>
          <div className="w-1/2 bg-gray-300 flex flex-col p-2 rounded-xl h-full">
            <div className="w-full bg-gray-400 flex flex-col  mb-2 p-1 rounded-xl h-1/2">
              <h1 className="text-xl pb-2 font-bold text-white">
                Important Notices
              </h1>
              <Right_component1 />
            </div>
            <div className="w-full bg-gray-400 flex flex-col p-1 rounded-xl h-1/2">
              <h1 className="text-xl pb-2 font-bold text-white">Birthdays</h1>
              <Right_component2 />
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex items-end mt-auto h-auto">
        <span className="w-full h-12 flex bg-black text-white justify-center">
          <p className="self-center">©2025. U❤VT. All Rights Reserved.</p>
        </span>
      </div>
    </div>
  );
};

export default Home;
