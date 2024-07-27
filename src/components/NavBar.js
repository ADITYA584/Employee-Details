import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <React.Fragment>
      <div className="absolute py-4 top-0 w-full flex justify-between items-center px-3 sm:px-10 bg-primary text-primary">
        <div>
          <Link to="/">
            <span className=" text-lg sm:text-4xl font-bold ">Home</span>
          </Link>
        </div>
        <ul className="flex text-sm sm:text-xl gap-3 sm:gap-8 ">
          <Link to="/New">
            <li className=" py-1 sm:py-2 px-4 font-semibold hover:bg-slate-200 rounded-lg text-black bg-white">
              Add new{" "}
            </li>
          </Link>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
