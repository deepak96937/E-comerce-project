import User from "../models/user.model.js"; // ✅ use .js if ES module
import { errorHandler } from "../utils/error.js"; // ✅ use .js if ES module
import bcrypt from "bcryptjs";

export const test = (req, res) => {
    res.json({
        message: "hello world"
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account!"));
    }

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
