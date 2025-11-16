const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
const LOCALHOST_REGEX = /^http:\/\/localhost:\d+$/;
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true); // Postman, mobile apps
        // Allow any localhost:* in development
        if (process.env.NODE_ENV === "development" && LOCALHOST_REGEX.test(origin)) {
            return callback(null, true);
        }
        // Allow production domains
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
export default corsOptions;
//# sourceMappingURL=cors.config.js.map