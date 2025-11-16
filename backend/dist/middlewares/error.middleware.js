import { AppError } from "../utils/appError.utils.js";
export const errorHandler = (err, req, res, next) => {
    // is it one of our known operational errors?
    if (err instanceof AppError) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
            code: err.code
        });
    }
    // Unknown/unexpected error → internal server error
    console.error("UNEXPECTED ERROR:", err);
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        code: "INTERNAL_ERROR",
    });
};
//# sourceMappingURL=error.middleware.js.map