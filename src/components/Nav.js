import React, {  } from 'react';

function Nav({ setCategory, genres }) {
  return (
    <div className="bg-gray-800 text-white py-4 px-6">
      <select
        className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Nav;


