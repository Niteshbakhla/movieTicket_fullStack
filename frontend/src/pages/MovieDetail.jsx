import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MovieDetail = () => {
            const { id } = useParams();
            // const { movie, setMovies } = useAuth()
            const [movie, setMovies] = useState([])

            const navigate = useNavigate();

            const fetchMovies = async () => {
                        const { data } = await axios.get(`${import.meta.env.VITE_APP_URL}/api/movies/${id}`, { withCredentials: true })
                        setMovies(data.movie)
            }

            useEffect(() => {
                        fetchMovies()
            }, [id]);


            if (!movie) return (
                        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                    <div className="text-gray-600 text-lg">Loading...</div>
                        </div>
            );

            return (
                        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
                                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                                                {/* Image Placeholder */}
                                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                                            <span className="text-gray-400 text-sm">Movie Poster Coming Soon</span>
                                                </div>

                                                <div className="p-6">
                                                            <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                                                                        {movie.title}
                                                            </h1>
                                                            <p className="text-gray-600 text-base mb-4 leading-relaxed">
                                                                        {movie.description}
                                                            </p>
                                                            <div className="flex flex-wrap gap-4 mb-6">
                                                                        <p className="text-sm text-gray-500">
                                                                                    <span className="font-medium text-gray-700">Duration:</span> {movie.duration} mins
                                                                        </p>
                                                                        <p className="text-sm text-gray-500">
                                                                                    <span className="font-medium text-gray-700">Genre:</span> {movie?.genre?.join(", ")}
                                                                        </p>
                                                            </div>

                                                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Showtimes</h2>
                                                            <div className="space-y-4">
                                                                        {movie?.showtimes?.map((show, index) => (
                                                                                    <div
                                                                                                key={index}
                                                                                                className="border border-gray-200 p-4 rounded-lg bg-gray-50 transition-all duration-300 hover:shadow-md hover:bg-white"
                                                                                    >
                                                                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                                                                            <div>
                                                                                                                        <p className="text-gray-700">
                                                                                                                                    <span className="font-semibold">Time:</span>{" "}
                                                                                                                                    {new Date(show.time).toLocaleString()}
                                                                                                                        </p>
                                                                                                                        <p className="text-gray-700">
                                                                                                                                    <span className="font-semibold">Available Seats:</span> {show.availableSeats}
                                                                                                                        </p>
                                                                                                            </div>
                                                                                                            <button
                                                                                                                        className="px-5 py-2 bg-green-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-green-600 hover:shadow-md w-full sm:w-auto"
                                                                                                                        onClick={() => handleBook(show._id)}
                                                                                                            >
                                                                                                                        Book Now
                                                                                                            </button>
                                                                                                </div>
                                                                                    </div>
                                                                        ))}
                                                            </div>
                                                </div>
                                    </div>
                        </div>
            );

            function handleBook(showtimeId) {
                        localStorage.setItem("booking", JSON.stringify({
                                    movieId: movie._id,
                                    showtimeId
                        }));
                        navigate(`/booking/${movie._id}/${showtimeId}`)
            }
};

export default MovieDetail;