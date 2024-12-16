import React from 'react';
import { FaSearch } from 'react-icons/fa';

function Header({ setQuery }) {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 shadow-md">
      <h1 className="text-2xl font-bold text-blue-500">JMovies</h1>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full md:w-64 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaSearch className="text-gray-400" />
      </div>
    </header>
  );
}

export default Header;
