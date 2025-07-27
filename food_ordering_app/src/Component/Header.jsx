
import { logo } from "../utils/Link";
const Header = () => {
  return (
    //tailwind css
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <div className="flex items-center">
        <img
          className="w-25 object-contain"
          src= {logo}
          alt="logo"
        />
      </div>
      <nav className="flex px-6">
        <ul className="flex space-x-6 text-lg font-medium text-gray-700">
          <li className="hover:text-red-500 cursor-pointer">Home</li>
          <li className="hover:text-red-500 cursor-pointer">About Us</li>
          <li className="hover:text-red-500 cursor-pointer">Contact Us</li>
          <li className="hover:text-red-500 cursor-pointer">Cart</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header 