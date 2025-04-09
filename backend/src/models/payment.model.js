import { Schema, model } from "mongoose";

const paymentSchema = Schema({
            userId: {
                        type: Schema.Types.ObjectId,
                        ref: "User",
                        required: true
            },
            bookingId: {
                        type: Schema.Types.ObjectId,
                        ref: "Booking"
            },
            amount: {
                        type: Number,
                        required: true
            },
            paymentStatus: {
                        type: String,
                        enum: ["pending", "complete", "failed"],
                        default: "pending",
            },
            transactionId: {
                        type: String,
                        unique: true
            },
}, { timestamps: true });

export const Payment = model("Payment", paymentSchema);