import { connect } from "mongoose";
import _config from "../config/config.js";

export const connectDB = async () => {
            try {
                        const connects = await connect(_config.MONGO_URI);
                        if (connects.ConnectionStates.connected) {
                                    console.log("Database is connected");

                        } else {
                                    console.log("Database is not connected");
                        }
            } catch (error) {
                        console.log("DB error", error);
            }
}

