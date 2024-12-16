import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header"; // Your existing header component
import Nav from "./components/Nav"; // Your existing nav component
import Footer from "./components/Footer"; // Your existing footer component

const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  // Fetch movies wrapped in useCallback
  const fetchMovies = useCallback(async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies on initial load and when query or genre changes
  useEffect(() => {
    if (query) {
      fetchMovies(SEARCH_API + query);
    } else if (selectedGenre) {
      const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&sort_by=popularity.desc`;
      fetchMovies(genreUrl);
    } else {
      fetchMovies(API_URL);
    }
  }, [query, selectedGenre, fetchMovies]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header setQuery={setQuery} />
      <Nav setCategory={setSelectedGenre} genres={genres} />
      <main className="flex-grow p-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie bg-gray-800 rounded-lg overflow-hidden"
              >
                <img
                  src={movie.poster_path ? `${IMG_PATH}${movie.poster_path}` : "https://via.placeholder.com/1280"}
                  alt={movie.title}
                  className="w-full"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">Rating: {movie.vote_average}</p>
                  <p className="text-sm text-gray-400">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
