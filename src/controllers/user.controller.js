import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required",
        });
    }

    const user = User.create({
        username,
        password,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User created successfully"));
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!password) {
        return res.status(400).json({
            message: "Password is required",
        });
    }

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    if (user.password !== password) {
        return res.status(401).json({
            message: "Invalid password",
        });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User logged in successfully"));
};

export { register, login };
