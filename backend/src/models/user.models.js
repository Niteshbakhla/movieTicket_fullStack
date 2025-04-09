import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";



const userSchema = new Schema({
            name: {
                        type: String,
                        required: true,
                        lowercase: true,
            },
            email: {
                        type: String,
                        required: true,
                        lowercase: true,
                        unique: true,
                        trim: true
            },
            password: {
                        type: String,
                        required: true,
                        // minLength: 6
            },
            // role: {
            //             type: String,
            //             enum: ["user", "admin"],
            //             default: "user"
            // }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
            if (this.isModified("password")) {
                        this.password = await bcrypt.hash(this.password, 10)
            }

            next()
});

userSchema.methods.comparePassword = async function (password) {
            return await bcrypt.compare(password, this.password)
}

export const User = model("User", userSchema);