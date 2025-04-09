import { Router } from "express";
import { authenticate } from "../middleware/verify.token.js";
import { bookTicket, cancelBooking, getBookings } from "../controllers/booking.controllers.js";
import { initiatePayment } from "../controllers/payment.controllers.js";

const router = Router();

router.route("/movie/bookings")
            .post(authenticate, bookTicket)
            .get(authenticate, getBookings)

router.route("/movie/bookings/:id").delete(authenticate, cancelBooking)


router.route("/movie/payment").post(authenticate, initiatePayment)
export default router;