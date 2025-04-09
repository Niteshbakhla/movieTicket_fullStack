import express from "express";
import userRouter from "./routes/auth.routes.js"
import movieRouter from "./routes/movie.routes.js"
import bookingRouter from "./routes/booking.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import _config from "./config/config.js";

export const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",");

app.use(cors({
            origin: _config.FRONTEND_URL,
            credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", userRouter);
app.use("/api", movieRouter);
app.use("/api", bookingRouter);

