import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";



const Home = () => {
            const { movies, setMovies, setFilteredMove, searchTerm, filteredMovie } = useAuth()


            useEffect(() => {
                        const fetchMovies = async () => {
                                    const { data } = await axios.get(`${API_BASE}/api/movies`, { withCredentials: true })
                                    setMovies(data.movies)
                                    setFilteredMove(data.movies)
                        }
                        fetchMovies()
            }, []);

            useEffect(() => {
                        if (!searchTerm) {
                                    setMovies(filteredMovie)
                        }
            }, [searchTerm])


            return (
                        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
                                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
                                                Now Showing <span className="text-yellow-400">🎥</span>
                                    </h1>

                                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {movies.map(movie => (
                                                            <div
                                                                        key={movie._id}
                                                                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                                            >
                                                                        {/* Image Placeholder */}
                                                                        <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                                                                                    <img className="w-full h-full" src={movie.image} alt="" />
                                                                        </div>

                                                                        <div className="p-6">
                                                                                    <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                                                                                                {movie.title}
                                                                                    </h2>
                                                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 ">
                                                                                                {movie.description}
                                                                                    </p>
                                                                                    <p className="text-xs mb-4 bg-black/20 w-fit px-2 py-1 rounded-2xl text-black font-semibold ">
                                                                                                Duration: {movie.duration} min
                                                                                    </p>
                                                                                    <Link
                                                                                                to={`/movie/${movie._id}`}
                                                                                                className="inline-block w-full text-center px-4 py-2 bg-yellow-400 text-gray-900 font-medium rounded-lg transition-all duration-300 hover:bg-yellow-300 hover:shadow-md"
                                                                                    >
                                                                                                View Details
                                                                                    </Link>
                                                                        </div>
                                                            </div>
                                                ))}
                                    </div>
                        </div>
            );
};

export default Home;