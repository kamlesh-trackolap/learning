import express from "express";
import helmet from "helmet";
import cors from "cors";
import corsOptions from "./config/cors.config.js";
import { errorHandler } from "./middlewares/error.middleware.js";
const app = express();
// security 
app.use(helmet());
// CROS
app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'server is live'
    });
});
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map