import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// routes import
import userRoutes from "./routes/user.routes.js";
import bookRoutes from "./routes/book.routes.js";

// routes declaration
app.use("/api/user/", userRoutes);
app.use("/api/book/", bookRoutes);

export { app };
