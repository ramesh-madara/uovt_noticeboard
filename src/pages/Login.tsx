import React from "react";
import eye from "../assets/eye.png";

const showpw = () => {
  let passwordField = document.getElementById("password");

  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
};

const Login = () => {
  return (
    <div className=" h-screen flex justify-center items-center bg-linear-to-tr from-blue-800 to-purple-900">
      <div className="flex flex-col md:w-2/4 w-full h-full lg:h-2/4 bg-white rounded-2xl p-5 justify-center">
        <h1 className="font-bold text-center text-4xl text-purple-900">
          Login
        </h1>
        <form method="post" className="flex flex-col">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="w-full h-8 bg-gray-300 mt-10 text-purple-900 text-lg px-2 rounded-lg focus:outline-purple-900"
          />
          <div className="flex ">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full h-8 relative bg-gray-300 mt-5 text-purple-900 text-lg px-2 rounded-lg focus:outline-purple-900"
            />
            <button type="button" name="shpw" onClick={showpw}>
              <img src={eye} className="w-5 absolute -ml-8 h-5" id="pwbtn" />
            </button>
          </div>

          <div className="flex mt-10 w-full justify-center">
            <button
              type="submit"
              name="login"
              className=" w-1/2 bg-purple-900 text-white hover:text-purple-900 hover:bg-white border-2 border-purple-900 h-10 rounded-lg mr-3 hover:delay-100 duration-200 font-bold"
            >
              Login
            </button>
            <button
              type="reset"
              className=" w-1/2 bg-purple-900  text-white hover:text-purple-900 hover:bg-white border-2 border-purple-900 h-10 rounded-lg ml-3 hover:delay-100 duration-200 font-bold"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
