import { Booking } from "../models/booking.model.js";
import { Movie } from "../models/movie.models.js";



export const bookTicket = async (req, res) => {
            try {
                        const { movieId, showtime, numberOfTickets, totalPrice, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;



                        if (!movieId || !showtime || !numberOfTickets || !totalPrice) {
                                    return res.status(400).json({ success: false, message: "Fields are required" })
                        }

                        //auth user id will get
                        const userId = req.user.id;

                        const ticketPrice = totalPrice;
                        const totalAmount = ticketPrice * numberOfTickets;

                        const movie = await Movie.findById(movieId)
                        if (!movie) return res.status(404).json({ message: "Movie not found" });

                        // Yaha thoda seat ka management dekhna hai 
                        const showtimes = movie.showtimes.id(showtime)

                        showtimes.availableSeats -= 1
                        await movie.save()


                        const booking = new Booking({
                                    userId,
                                    movieId,
                                    showtime,
                                    numberOfTickets,
                                    totalPrice: totalAmount,
                                    bookingStatus: "confirmed",
                                    paymentStatus: "paid",
                                    razorpayPaymentId,
                                    razorpayOrderId,
                                    razorpaySignature
                        })

                        await booking.save();

                        return res.status(200).json({ success: true, booking, showtimes })
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Server error", error: error.message })
            }
}

export const getBookings = async (req, res) => {
            try {
                        const bookings = await Booking.find({ userId: req.user.id }).populate("movieId").sort({ createdAt: -1 })


                        return res.status(200).json({ success: true, message: "Booking Successful", bookings });
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Server error", error: error.message });
            }
}

export const cancelBooking = async (req, res) => {
            try {
                        const bookingId = req.params.id;
                        const userId = req.user.id;

                        // Find the Booking 
                        const booking = await Booking.findById(bookingId)
                        if (!booking) {
                                    return res.status(404).json({ message: "Booking not found" });
                        }

                        if (booking.userId.toString() !== userId) {
                                    return res.status(400).json({ success: false, message: "Unauthorized" })
                        }
                        if (booking.bookingStatus === "canceled") {
                                    return res.status(400).json({ message: "Booking already cancelled" })
                        }
                        booking.bookingStatus = "canceled"
                        await booking.save();

                        return res.status(200).json({ success: true, message: "Booking cancelled successfully", booking });
            } catch (error) {
                        return res.status(500).json({ succcess: false, message: "Server error", error: error.message })
            }
}