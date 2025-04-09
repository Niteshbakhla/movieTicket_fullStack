import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

const Navbar = () => {
            const location = useLocation();
            const token = localStorage.getItem("token");
            const [isHistoryOpen, setIsHistoryOpen] = useState(false);
            const [bookings, setBookings] = useState([]);
            const { searchTerm, setSearchTerm, setFilteredMove, setMovies } = useAuth();

            const hideNavbarPaths = ["/login", "/signup"];

            const logout = async () => {
                        try {
                                    const { data } = await axios.get(`${API_BASE}/api/auth/logout`, {
                                                withCredentials: true,
                                    });
                                    toast.success(data.message);
                                    localStorage.removeItem("token");
                        } catch (error) {
                                    console.log(error);
                                    toast.error("Logout failed");
                        }
            };

            const fetchBookingHistory = async () => {
                        try {
                                    const { data } = await axios.get(`${API_BASE}/api/movie/bookings`, {
                                                withCredentials: true,
                                    });
                                    setBookings(data.bookings || []);
                        } catch (error) {
                                    console.error("Error fetching booking history:", error);
                                    toast.error("Failed to load booking history");
                        }
            };

            const searchMovies = async (term) => {
                        try {
                                    const { data } = await axios.get(
                                                `${API_BASE}/api/search/movies?title=${term}`,
                                                { withCredentials: true }
                                    );
                                    setMovies(data.movie);
                        } catch (error) {
                                    console.log("Search error:", error);
                        }
            };

            useEffect(() => {
                        if (token && isHistoryOpen) {
                                    fetchBookingHistory();
                        }
            }, [token, isHistoryOpen]);

            useEffect(() => {
                        const delayDebounce = setTimeout(() => {
                                    if (searchTerm) {
                                                searchMovies(searchTerm);
                                    }
                        }, 300);

                        return () => clearTimeout(delayDebounce);
            }, [searchTerm]);

            // ✅ Return after all hooks
            if (hideNavbarPaths.includes(location.pathname)) {
                        return null;
            }

            return (
                        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
                                    <Link
                                                to="/"
                                                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center gap-2 transition-transform hover:scale-105"
                                    >
                                                <span className="text-yellow-400">🎬</span> MovieTime
                                    </Link>

                                    {/* Search Bar */}
                                    <div className="flex-1 max-w-md mx-4">
                                                <div className="relative">
                                                            <input
                                                                        type="text"
                                                                        placeholder="Search movies..."
                                                                        className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                            />
                                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                                        <svg
                                                                                    className="w-5 h-5 text-gray-400"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    viewBox="0 0 24 24"
                                                                        >
                                                                                    <path
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                                strokeWidth={2}
                                                                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                                                    />
                                                                        </svg>
                                                            </span>
                                                </div>
                                    </div>

                                    <div className="flex items-center gap-6 relative">
                                                {token ? (
                                                            <>
                                                                        {/* History Dropdown */}
                                                                        <div className="relative">
                                                                                    <button
                                                                                                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                                                                                                className="px-4 py-2 rounded-full font-medium text-gray-200 hover:text-white transition-all duration-300 focus:outline-none"
                                                                                    >
                                                                                                History
                                                                                    </button>
                                                                                    {isHistoryOpen && (
                                                                                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200">
                                                                                                            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                                                                                                                        <h3 className="text-lg font-semibold text-gray-900">Booking History</h3>
                                                                                                            </div>
                                                                                                            <div className="max-h-64 overflow-y-auto">
                                                                                                                        {bookings.length > 0 ? (
                                                                                                                                    bookings.map((booking) => (
                                                                                                                                                <div
                                                                                                                                                            key={booking._id}
                                                                                                                                                            className="p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                                                                                                                                >
                                                                                                                                                            <p className="text-sm text-gray-800 font-medium">{booking.movieTitle}</p>
                                                                                                                                                            <p className="text-xs text-gray-600">
                                                                                                                                                                        {new Date(booking.createdAt).toLocaleDateString()} •{" "}
                                                                                                                                                                        {booking.numberOfTickets} tickets
                                                                                                                                                            </p>
                                                                                                                                                            <p className="text-xs text-green-600">₹{booking.totalPrice}</p>
                                                                                                                                                </div>
                                                                                                                                    ))
                                                                                                                        ) : (
                                                                                                                                    <div className="p-4 text-center text-gray-500 text-sm">
                                                                                                                                                No booking history yet
                                                                                                                                    </div>
                                                                                                                        )}
                                                                                                            </div>
                                                                                                </div>
                                                                                    )}
                                                                        </div>

                                                                        {/* Logout Button */}
                                                                        <Link
                                                                                    onClick={logout}
                                                                                    to="/login"
                                                                                    className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full font-medium transition-all duration-300 hover:bg-yellow-300 hover:shadow-md transform hover:-translate-y-0.5"
                                                                        >
                                                                                    Logout
                                                                        </Link>
                                                            </>
                                                ) : (
                                                            <>
                                                                        <Link
                                                                                    to="/login"
                                                                                    className={`relative px-3 py-1 rounded-full font-medium text-lg transition-all duration-300 ${location.pathname === "/login"
                                                                                                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-400"
                                                                                                : "text-gray-200 hover:text-white after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-yellow-400 after:bottom-[-4px] after:left-0 after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100"
                                                                                                }`}
                                                                        >
                                                                                    Login
                                                                        </Link>
                                                                        <Link
                                                                                    to="/signup"
                                                                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${location.pathname === "/signup"
                                                                                                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-400"
                                                                                                : "bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-md transform hover:-translate-y-0.5"
                                                                                                }`}
                                                                        >
                                                                                    Signup
                                                                        </Link>
                                                            </>
                                                )}
                                    </div>
                        </nav>
            );
};

export default Navbar;
