import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
