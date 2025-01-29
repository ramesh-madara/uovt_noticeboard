import React from "react";

const Admin = () => {
  return (
    <div className=" h-screen flex justify-center items-center bg-linear-to-tr from-blue-800 to-purple-900">
      <div className="flex flex-col md:w-3/4 w-full h-full lg:h-3/4 bg-white rounded-2xl p-5 justify-center">
        <h1 className="font-bold text-center text-4xl text-purple-900">
          Add Notices
        </h1>
        <form action="" method="post" className="flex flex-col">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Notice Title"
            className="w-full h-8 bg-gray-300 mt-10 text-purple-900 text-lg px-2 rounded-lg focus:outline-purple-900"
          />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Notice Description"
            className="w-full h-8 bg-gray-300 mt-5 text-purple-900 text-lg px-2 rounded-lg focus:outline-purple-900"
          />
          <div className="flex mt-5">
            <div className="flex flex-col w-1/2 pr-1">
              <label htmlFor="" className="font-bold text-purple-900">
                Starting Date
              </label>
              <input
                type="date"
                name="starting_date"
                id="starting_date"
                className="w-full h-8 bg-gray-300 px-2 text-purple-900 text-lg rounded-lg mt-2"
              />
            </div>
            <div className="flex flex-col w-1/2 pl-1">
              <label htmlFor="" className="font-bold text-purple-900">
                Ending Date
              </label>
              <input
                type="date"
                name="ending_date"
                id="ending_date"
                className="w-full h-8 bg-gray-300 text-purple-900 px-2 text-lg rounded-lg mt-2"
              />
            </div>
          </div>
          <div className=" mt-5 flex flex-col">
            <label htmlFor="" className="font-bold text-purple-900">
              Notice Status
            </label>
            <select
              name="description"
              id="description"
              className="w-full h-8 bg-gray-300 text-purple-900 mt-2 text-lg px-2 rounded-lg"
            >
              <option value="active">Active</option>
              <option value="not_active">Not Active</option>
            </select>
          </div>
          <div className="flex mt-10 w-full justify-center">
            <button
              type="submit"
              name="add"
              className=" w-1/2 bg-purple-900 text-white hover:text-purple-900 hover:bg-white border-2 border-purple-900 h-10 rounded-lg mr-3 hover:delay-100 duration-200 font-bold"
            >
              Add
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

export default Admin;
