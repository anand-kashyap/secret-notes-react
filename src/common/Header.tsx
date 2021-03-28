import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '../icons/add.svgr.svg';

const Header = () => {
  return (
    <header className="flex justify-between">
      <h1 className="text-2xl">
        <Link to="/">Secret Notes</Link>
      </h1>
      <nav>
        <ul className="flex flex-row items-center">
          <li className="mx-2">
            <Link
              to="/"
              className="p-3 rounded-md focus:outline-none text-blue-600 ring-2 ring-blue-600 hover:bg-blue-100"
            >
              View Notes
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className="text-white p-3 bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 hover:bg-blue-700 flex items-center"
              to="/add"
            >
              <AddIcon
                width="20"
                height="20"
                className="fill-current text-white"
              />
              <span className="ml-1">Add Note</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
