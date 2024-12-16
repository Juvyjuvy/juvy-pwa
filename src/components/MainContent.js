function MainContent({ movies, loading, playTrailer }) {
  if (loading) {
    return <div className="text-center text-xl text-gray-300">Loading...</div>;
  }

  return (
    <div className="px-4 md:px-6">
      {/* Featured Movie Carousel */}
      <div className="relative h-[50vh] max-h-[500px] mb-12">
        {movies.slice(0, 1).map((movie) => (
          <div key={movie.id} className="relative h-full">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute bottom-0 left-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                {movie.title}
              </h2>
              <p className="mt-2 text-sm md:text-base text-gray-300">
                {movie.overview}
              </p>
              <button
                onClick={() => playTrailer(movie.id)} // Trigger playTrailer with the movie ID
                className="mt-4 px-4 py-2 bg-blue-600 text-sm md:text-base rounded hover:bg-blue-700 text-white"
              >
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Movie List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.slice(0, 20).map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition"
            onClick={() => playTrailer(movie.id)} // Trigger playTrailer when a movie card is clicked
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded"
            />
            <h3 className="mt-2 text-center text-xs md:text-sm font-semibold text-white">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainContent;
