import { ApiResponse } from "../utils/ApiResponse.js";
import { Book } from "../models/book.model.js";

const createBook = async (req, res) => {
    const { isbn, author, title } = req.body;

    if (!isbn || !author || !title) {
        return res.status(400).json({
            message: "ISBN, author, and title are required",
        });
    }

    const book = Book.create({
        isbn,
        author,
        title,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, book, "Book created successfully"));
};

const getBooks = async (req, res) => {
    const books = Book.find();

    return res
        .status(200)
        .json(new ApiResponse(200, books, "Books retrieved successfully"));
};

const getBookByISBN = async (req, res) => {
    const { isbn } = req.params;

    const book = Book.findOne({
        isbn,
    });

    if (!book) {
        return res.status(404).json({
            message: "Book not found",
        });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, book, "Book retrieved successfully"));
};

const getBookByAuthor = async (req, res) => {
    const { author } = req.params;

    const books = Book.find({
        author,
    });

    if (!books) {
        return res.status(404).json({
            message: "Books not found",
        });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, books, "Books retrieved successfully"));
};

const getBookByTitle = async (req, res) => {
    const { title } = req.params;

    const books = Book.find({
        title,
    });

    if (!books) {
        return res.status(404).json({
            message: "Books not found",
        });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, books, "Books retrieved successfully"));
};

// not sure if this is correct
const getBookByReview = async (req, res) => {
    const { isbn } = req.params;

    const book = Book.findOne({
        isbn,
    });

    if (!book) {
        return res.status(404).json({
            message: "Book not found",
        });
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, book.reviews, "Reviews retrieved successfully")
        );
};

const addReview = async (req, res) => {
    const { isbn } = req.params;

    const findBook = Book.findOne({
        isbn,
    });

    if (!findBook) {
        return res.status(404).json({
            message: "Book not found",
        });
    }

    const { review } = req.body;

    if (!review) {
        return res.status(400).json({
            message: "Review is required",
        });
    }

    findBook.reviews.push(review);
    findBook.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, findBook, "Review added successfully"));
};

const deleteReview = async (req, res) => {
    const { isbn } = req.params;

    const findBook = Book.findOne({
        isbn,
    });

    if (!findBook) {
        return res.status(404).json({
            message: "Book not found",
        });
    }

    const { review } = req.body;

    if (!review) {
        return res.status(400).json({
            message: "Review is required",
        });
    }

    const index = findBook.reviews.indexOf(review);

    if (index > -1) {
        findBook.reviews.splice(index, 1);
    }

    findBook.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, findBook, "Review deleted successfully"));
};

// using promises
const getBookByISBNPromise = (req, res) => {
    const { isbn } = req.params;

    Book.findOne({
        isbn,
    })
        .then((book) => {
            if (!book) {
                return res.status(404).json({
                    message: "Book not found",
                });
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(200, book, "Book retrieved successfully")
                );
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
            });
        });
};

export {
    createBook,
    getBooks,
    getBookByISBN,
    getBookByAuthor,
    getBookByTitle,
    getBookByReview,
    addReview,
    deleteReview,
    getBookByISBNPromise,
};
