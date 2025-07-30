import React, { useState} from "react";
import { logo } from "../utils/Link";
import { Link } from "react-router-dom";
const Header = () => {

  const [Islogin , setIsLogin] = useState("Login");
  return (
    //tailwind css
    <header className="flex items-center justify-between px-6  shadow-md bg-white">
      <div className="flex items-center">
        <img
          className="w-25 object-contain"
          src= {logo}
          alt="logo"
        />
      </div>
      <nav className="flex px-6">
        <ul className="flex space-x-6 text-lg font-medium text-gray-700">
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="hover:text-red-500 cursor-pointer">
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
        <button className="bg-red-500 text-white text-bold rounded-lg px-2 mx-4" onClick={() => {
          Islogin === "Login" ? setIsLogin("Logout") : setIsLogin("Login");
        }}>{ Islogin}</button>
      </nav>
    </header>
  );
};

export default Header 