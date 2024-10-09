import {
    createBook,
    getBooks,
    getBookByISBN,
    getBookByAuthor,
    getBookByTitle,
    getBookByReview,
    addReview,
    deleteReview,
} from "../controllers/book.controller.js";
import { Router } from "express";

const router = Router();

router.route("/create").post(createBook);
router.route("/").get(getBooks);
router.route("/isbn/:isbn").get(getBookByISBN);
router.route("/author/:author").get(getBookByAuthor);
router.route("/title/:title").get(getBookByTitle);
router.route("/review/:isbn").get(getBookByReview);
router.route("/review/add/:isbn").post(addReview);
router.route("/review/delete/:isbn").delete(deleteReview);

export default router;
