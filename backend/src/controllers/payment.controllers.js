import Razorpay from "razorpay";
import { razorpayInstance } from "../utils/razorpay.js";

export const initiatePayment = async (req, res) => {
            try {
                        const { totalAmount } = req.body;


                        const options = {
                                    amount: totalAmount * 100, // Convert to paise
                                    currency: "INR",
                                    receipt: `receipt_order_${Date.now()}`,
                        };

                        razorpayInstance
                        const order = await razorpayInstance.orders.create(options);

                        return res.status(200).json({
                                    success: true,
                                    orderId: order.id,
                                    amount: order.amount,
                                    currency: order.currency,
                        });
            } catch (error) {
                        res.status(500).json({ success: false, message: "Payment init failed", error: error.message });
            }
};
