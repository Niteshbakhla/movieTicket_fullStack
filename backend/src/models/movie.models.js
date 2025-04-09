import { Schema, model } from "mongoose";

const showtimeSchema = new Schema({
            time: {
                        type: Date,
                        required: true,
            },
            totalSeats: {
                        type: Number,
                        required: true,
                        min: 1,
            },
            availableSeats: {
                        type: Number,
                        required: true,
                        min: 0,
            },
}, { _id: true });

const movieSchema = new Schema({
            title: {
                        type: String,
                        required: true,
            },
            description: {
                        type: String,
                        required: true,
            },
            duration: {
                        type: Number,
                        required: true,
                        min: 1,
            },
            genre: {
                        type: [String],
                        default: [],
            },
            showtimes: [showtimeSchema],
}, { timestamps: true });

export const Movie = model("Movie", movieSchema);
