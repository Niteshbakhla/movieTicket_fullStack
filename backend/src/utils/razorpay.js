import Razorpay from "razorpay";
import _config from "../config/config.js";

export const razorpayInstance = new Razorpay({
            key_id: _config.RAZORPAY_KEY_ID,
            key_secret: _config.RAZORPAY_SECRET
});