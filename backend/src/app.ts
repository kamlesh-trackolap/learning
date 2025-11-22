import express from "express";
import helmet from "helmet";
import cors from "cors";
import corsOptions from "./config/cors.config.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import tenantRoutes from "./modules/tenant/routes.tenant.js";

const app = express();

// security 
app.use(helmet());
// CROS
app.use(cors(corsOptions));

app.use(express.json({limit: '10mb'}));

app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:'server is live'
    })
})

// -- tenants routes ---

app.post('/api',tenantRoutes)

app.use(errorHandler)
export default app;
