import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
            userId: {
                        type: Schema.Types.ObjectId,
                        ref: "User"
            },
            movieId: {
                        type: Schema.Types.ObjectId,
                        ref: "Movie"
            },
            showtime: {
                        type: String,
                        required: true
            },
            numberOfTickets: {
                        type: Number,
                        required: true
            },
            totalPrice: {
                        type: String,
                        required: true
            },
            bookingStatus: {
                        type: String,
                        enum: ["pending", "confirmed", "canceled"],
                        default: "pending",
            },
            paymentStatus: {
                        type: String,
                        enum: ["pending", "paid", "refunded"],
                        default: "pending"
            },
            razorpayPaymentId: {
                        type: String,
                        required: true
            },
            razorpayOrderId: {
                        type: String,
                        required: true
            },
            razorpaySignature: {
                        type: String,
                        required: true
            }
}, { timestamps: true });

export const Booking = model("Booking", bookingSchema);