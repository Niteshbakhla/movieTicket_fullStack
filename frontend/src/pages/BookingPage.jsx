import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useRazorpay } from "react-razorpay"
import toast from "react-hot-toast";
import BookingSuccess from "./BookingSuccess";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config";

const BookingPage = () => {
            const { movieId, showId } = useParams();
            const navigate = useNavigate();
            const [data, setData] = useState([]);
            const [selectedShowtime, setSelectedShowtime] = useState(null);
            const [numTickets, setNumTickets] = useState(1);
            const [pricePerTicket] = useState(200);
            const [totalPrice, setTotalPrice] = useState(200);
            const [confirmData, setConfirmData] = useState([]);
            const { Razorpay } = useRazorpay();


            const bookingMovie = async () => {
                        try {
                                    const { data } = await axios.get(`${API_BASE}/api/movies/` + movieId, { withCredentials: true });
                                    setData(data.movie)
                                    const show = data?.movie?.showtimes?.find((datas) => datas._id === showId)

                                    setSelectedShowtime(show)
                        } catch (err) {
                                    console.error(err);
                        }
            };

            useEffect(() => {
                        bookingMovie()
            }, []);

            useEffect(() => {
                        setTotalPrice(numTickets * pricePerTicket);
            }, [numTickets, pricePerTicket]);

            const confirmBooking = async (razorpayResponse) => {
                        try {
                                    const bookingData = {
                                                movieId,
                                                showtime: showId,
                                                numberOfTickets: numTickets,
                                                totalPrice: pricePerTicket,
                                                razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                                                razorpaySignature: razorpayResponse.razorpay_signature,
                                                razorpayOrderId: razorpayResponse.razorpay_order_id

                                    }
                                    const { data } = await axios.post(`${API_BASE}/api/movie/bookings`, bookingData, { withCredentials: true });
                                    setConfirmData(data.booking)
                        } catch (error) {
                                    console.log(error)
                                    toast.error(error.data.message)
                        }
            }

            const paymentNow = async () => {
                        try {
                                    const paymentData = {
                                                totalAmount: totalPrice
                                    }
                                    const { data } = await axios.post(`${API_BASE}/api/movie/payment`, paymentData, { withCredentials: true })
                                    const RazorpayOrderOptions = {
                                                key: 'rzp_test_9at4zSdc9GLb1k',
                                                amount: data.amount,
                                                currency: data.currency,
                                                name: 'MovieTime',
                                                description: "Booking Movie Ticket",
                                                order_id: data.orderId,
                                                handler: async function (response) {
                                                            await confirmBooking(response)
                                                            toast.success("Booked")
                                                },
                                                prefill: {
                                                            name: 'Nitesh',
                                                            email: 'gaurav.kumar@example.com',
                                                            contact: '9999999999'
                                                },
                                                theme: {
                                                            color: "#121212",
                                                },
                                    };

                                    const rzp = new Razorpay(RazorpayOrderOptions)
                                    rzp.on("payment.failed", function (response) {
                                                toast.error("Payment failed or cancelled.");
                                    });
                                    rzp.open();
                        } catch (error) {
                                    console.log("Payment error:", error)
                                    toast.error(error.response.data.error)
                        }
            };

            const cancelBooking = async (id) => {
                        try {
                                    const { data } = axios.get(`${API_BASE}/api/movie/${id}`, { withCredentials: true })
                                    toast.success(data.message)
                                    navigate("/")
                        } catch (error) {
                                    console.error("Cancel Booking Error", error.message)
                        }
            }

            if (!movieId) return (
                        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                    <div className="text-gray-600 text-lg">Loading...</div>
                        </div>
            );


            return (
                        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
                                    {confirmData.length === 0 ? (
                                                <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
                                                            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                                                        Booking: <span className="text-yellow-400">{data?.title}</span>
                                                            </h1>

                                                            <div className="space-y-3 mb-6">
                                                                        <p className="text-gray-600">
                                                                                    <span className="font-medium text-gray-700">Showtime:</span>{" "}
                                                                                    {new Date(selectedShowtime?.time).toLocaleDateString()}
                                                                        </p>

                                                                        <p className="text-gray-600">
                                                                                    <span className="font-medium text-gray-700">Available Seats:</span>{" "}
                                                                                    {selectedShowtime?.availableSeats}
                                                                        </p>

                                                            </div>

                                                            <div className="mb-6">
                                                                        <label className="block text-gray-700 font-semibold mb-2">
                                                                                    Number of Tickets
                                                                        </label>
                                                                        <input
                                                                                    type="number"
                                                                                    min="1"
                                                                                    // max={selectedShowtime?.totalSeats}
                                                                                    value={numTickets}
                                                                                    onChange={(e) => setNumTickets(parseInt(e.target.value))}
                                                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                                        />
                                                            </div>

                                                            <p className="text-xl font-semibold text-gray-900 mb-6">
                                                                        Total Price: <span className="text-blue-600">₹{totalPrice}</span>
                                                            </p>

                                                            <button
                                                                        className="w-full px-6 py-3 mb-4 active:scale[0.9] bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
                                                                        onClick={paymentNow}
                                                            >
                                                                        Pay Now
                                                            </button>
                                                            <button
                                                                        className="w-full px-6 py-3 active:scale-[0.9] bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
                                                                        onClick={cancelBooking}
                                                            >
                                                                        Cancel Booking
                                                            </button>
                                                </div>
                                    ) : (
                                                <BookingSuccess booking={confirmData} />
                                    )}




                        </div>

            );
};

export default BookingPage;