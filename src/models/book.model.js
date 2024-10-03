import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema(
    {
        isbn: {
            type: String,
            required: true,
            unique: true,
        },
        author: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        reviews: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
);

export const Book = mongoose.model("Book", BookSchema);
