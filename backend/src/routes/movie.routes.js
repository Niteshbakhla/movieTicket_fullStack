import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/verify.token.js";
import { addMovie, getAllMovies, getMovieById, movieBySearch } from "../controllers/movie.controllers.js";

const router = Router();

// This is admin route
router.route("/admin/movies").post(authenticate, isAdmin, addMovie);

// This is user route
router.route("/movies").get(authenticate, getAllMovies)
router.route("/movies/:id").get(authenticate, getMovieById);
router.route("/search/movies").get(authenticate, movieBySearch)




export default router;