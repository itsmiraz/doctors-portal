import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/UserContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
const Navbar = () => {
  const { user, LogOut, handleThemeSwitch } = useContext(AuthContext);

  const handleSignoUT = () => {
    LogOut()
      .then((result) => {})
      .catch((error) => console.log(error));
  };

  const [open, setOpen] = useState(false);

  return (
    <header className="container py-2 px-4 shadow-lg  text-gray-800 bg-slate-100  z-50 items-center flex justify-between h-16 mx-auto">
      <Link
        rel="noopener noreferrer"
        to="/"
        aria-label="Back to homepage"
        className="flex w-full text-xl font-semibold items-center p-2"
      >
        Doctors Portal
      </Link>
      <ul
        className={`md:flex left-3 z-10 rounded-lg bg-slate-100   w-full  text-end justify-end items-center font-semibold md:static duration-300 ease-linear absolute ${
          open ? "top-14" : "top-[-450px]"
        }`}
      >
        <li className="flex">
          <Link className="px-4" to="/">
            Home
          </Link>
        </li>
        <li className="flex">
          <Link className="px-4" to="/">
            About
          </Link>
        </li>
        <li className="flex">
          <li>
            <Link className="px-4" to="/appoinment">
              Appoinment
            </Link>
          </li>
        </li>

        {user?.uid ? (
          <div className="flex items-center">
            <li className="flex">
              <Link className="px-4" to="/dashboard">
                DashBoard
              </Link>
            </li>
            <li className="rounded-full flex">
              <img
                className="rounded-full my-2  mx-5 w-12 h-12 "
                src={
                  user?.photoURL
                    ? user.photoURL
                    : "https://i.pinimg.com/736x/fa/60/51/fa6051d72b821cb48a8cc71d3481dfef--social-networks-avatar.jpg"
                }
                alt=""
              />
            </li>
            <li className="flex">
              <button
                onClick={handleSignoUT}
                className="btn btn-sm items-center py-2 border-black text-black mx-3 font-semibold rounded btn-outline"
              >
                Log Out
              </button>
            </li>
          </div>
        ) : (
          <li className="flex">
            <Link className="px-4 pb-2" to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
      <div onClick={() => setOpen(!open)} className="h-6   w-6 md:hidden">
        {open ? <XMarkIcon /> : <Bars3Icon />}
      </div>
    </header>
  );
};

export default Navbar;
