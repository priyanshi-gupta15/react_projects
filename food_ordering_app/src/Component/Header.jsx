import React, { useState} from "react";
import { logo } from "../utils/Link";
import { Link } from "react-router-dom";
import UserContext from "../utils/userContext";
import {useSelector} from "react-redux"

const Header = () => {
  const [Islogin, setIsLogin] = useState("Login");
  const { user } = React.useContext(UserContext);

//subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);
  
  
  return (
    <header className="flex items-center justify-between px-8 shadow-md bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <img className="w-18 object-contain" src={logo} alt="logo" />
      </div>

      {/* Navigation & Login aligned to right */}
      <div className="flex items-center space-x-10">
        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-8 text-lg font-medium text-gray-700">
            <li className="hover:text-red-500">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-red-500">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:text-red-500">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="">
              <Link to="/cart">🛒 <sup className="bg-red-500 px-1.5 py-0.5 rounded-full text-white">{cartItems.length}</sup></Link>
            </li>
          </ul>
        </nav>

        {/* Login & User */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl">👤</span>
            <span className="text-gray-700 font-medium">
              {Islogin === "Login" ? "Guest" : user}
              {/* not user object user like that {user} */}
            </span>
          </div>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-4 py-1"
            onClick={() => setIsLogin(Islogin === "Login" ? "Logout" : "Login")}
          >
            {Islogin}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
