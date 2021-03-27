import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between">
      <h1 className="text-2xl">
        <Link to="/">Secret Notes</Link>
      </h1>
      <nav>
        <ul className="flex flex-row">
          <li className="mx-2">
            <Link
              to="/"
              className="p-3 rounded-md focus:outline-none text-blue-600 ring-2 ring-blue-600 hover:bg-blue-700 hover:text-white"
            >
              View Notes
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className="text-white px-5 py-3 bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 hover:bg-blue-700"
              to="/add"
            >
              Add Note
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
