import { Movie } from "../models/movie.models.js"


export const addMovie = async (req, res) => {
            try {
                        const { title, description, duration, showtimes } = req.body;

                        if (!title || !description || !duration || !showtimes || !Array.isArray(showtimes) || showtimes.length === 0) {
                                    return res.status(400).json({ success: false, message: "Invalid input. All fields are required!" });
                        }

                        const formatedShowTimess = showtimes.map((data) => ({
                                    time: data.time,
                                    totalSeats: data.totalSeats,
                                    availableSeats: data.totalSeats
                        }))

                        const newMovie = new Movie({
                                    title,
                                    description,
                                    duration,
                                    showtimes: formatedShowTimess
                        })
                        await newMovie.save();
                        res.status(201).json({ success: true, message: "Movie added successfully", data: newMovie })
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Server error", error: error.message })
            }
}


export const getAllMovies = async (req, res) => {
            try {
                        const movies = await Movie.find();
                        if (!movies) {
                                    return res.status(400).json({ success: false, message: "Move not found" })
                        }

                        return res.status(200).json({ success: true, movies })
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Server error", error: error.message })
            }
}


export const getMovieById = async (req, res) => {


            try {
                        const movieId = req.params.id;
                        const movie = await Movie.findById({ _id: movieId })
                        if (!movie) {
                                    return res.status(400).json({ success: false, message: "Movie not found!" })
                        }

                        return res.status(200).json({ success: true, movie })
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Server error", error: error.message })
            }
}


export const movieBySearch = async (req, res) => {

            try {
                        const { title } = req.query;
                        const movie = await Movie.find({
                                    title: { $regex: title, $options: "i" }
                        });
                        if (!movie) {
                                    return res.status(400).json({ success: false, message: "movie not found" })
                        }

                        return res.status(200).json({ success: true, movie })
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Server error lawds", error: error.message })
            }
}