import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import connectDB from "./config/database.js";
dotenv.config();
const PORT = process.env.PORT;
connectDB(); // database connection
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`server is runnign on PORT: ${PORT}`);
});
//# sourceMappingURL=server.js.map