import express from "express";
import userRouter from "./routes/auth.routes.js"
import movieRouter from "./routes/movie.routes.js"
import bookingRouter from "./routes/booking.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"

export const app = express();
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({
            origin: function (origin, callback) {
                        if (allowedOrigins.includes(origin)) {
                                    callback(null, true)
                        } else {
                                    callback(new Error("Not allowed by CORS"))
                        }
            },
            credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", userRouter);
app.use("/api", movieRouter);
app.use("/api", bookingRouter);

