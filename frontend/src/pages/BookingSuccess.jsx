import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

const BookingSuccess = ({ booking }) => {
            const [movie, setMovie] = useState(null);
            const [showtime, setShowtime] = useState(null);

            useEffect(() => {
                        const fetchDetails = async () => {
                                    try {
                                                const movieRes = await axios.get(`${API_BASE}/api/movies/${booking.movieId}`, { withCredentials: true });
                                                setMovie(movieRes.data.movie);
                                                const show = movieRes.data.movie.showtimes.find((s) => s._id === booking.showtime);
                                                setShowtime(show);
                                    } catch (error) {
                                                console.error("Error loading movie/showtime", error);
                                    }
                        };

                        if (booking) {
                                    fetchDetails();
                        }
            }, [booking]);

            if (!booking || !movie || !showtime) return (
                        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                    <div className="text-gray-600 text-lg">Loading...</div>
                        </div>
            );

            const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

            return (
                        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
                                    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-green-200">
                                                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
                                                            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                                                                        🎉 Booking Confirmed!
                                                            </h1>
                                                            <p className="text-green-100 text-sm">Your tickets are ready!</p>
                                                </div>

                                                <div className="p-6 space-y-4">
                                                            <div className="grid grid-cols-1 gap-4 text-gray-700">
                                                                        <div className="flex items-center gap-3">
                                                                                    <span className="text-yellow-400">🎬</span>
                                                                                    <p><span className="font-semibold">Movie:</span> {movie.title}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                                    <span className="text-yellow-400">🕒</span>
                                                                                    <p><span className="font-semibold">Showtime:</span> {formatDate(showtime.time)}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                                    <span className="text-yellow-400">🎫</span>
                                                                                    <p><span className="font-semibold">Tickets:</span> {booking.numberOfTickets}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                                    <span className="text-yellow-400">💰</span>
                                                                                    <p><span className="font-semibold">Total Paid:</span> ₹{booking.totalPrice}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                                    <span className="text-yellow-400">💳</span>
                                                                                    <p><span className="font-semibold">Payment ID:</span> {booking.razorpayPaymentId}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                                    <span className="text-yellow-400">🧾</span>
                                                                                    <p><span className="font-semibold">Booking ID:</span> {booking._id}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                                    <span className="text-green-500">✅</span>
                                                                                    <p><span className="font-semibold">Status:</span> {booking.bookingStatus}</p>
                                                                        </div>
                                                            </div>
                                                </div>
                                    </div>
                        </div>
            );
};

export default BookingSuccess;