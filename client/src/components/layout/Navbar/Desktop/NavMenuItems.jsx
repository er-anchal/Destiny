import React from 'react';
import { NavLink } from 'react-router-dom';

const NavMenuItems = ({ items }) => {
  return (
    <ul className="hidden lg:flex space-x-8 text-white font-medium">
      {items.map((item) => (
        <li key={item.name}>
          <NavLink
            to={item.path}
            className="relative text-white transition-colors duration-500 bg-none border-none cursor-pointer
             after:content-[''] after:absolute after:bottom-0 after:left-1/2
             after:w-0 after:h-0.5 after:bg-linear-to-r
             after:from-pink-500 after:to-purple-500
             after:transition-all after:duration-300 after:ease-out
             hover:after:w-full hover:after:left-0 pb-1.5"
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default NavMenuItems;