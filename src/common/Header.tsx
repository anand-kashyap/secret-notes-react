import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between">
      <h1 className="text-2xl">
        <Link to="/">Secret Notes Creator</Link>
      </h1>
      <nav>
        <ul className="flex flex-row">
          <li className="mx-2">
            <Link to="/">View Notes</Link>
          </li>
          <li className="mx-2">
            <Link
              className="text-white px-5 py-3 bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-200 hover:bg-blue-700"
              to="/create"
            >
              Create Note
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
