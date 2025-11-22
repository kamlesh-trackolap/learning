import express from "express";
import { createTenantController } from "./controllers.tenant.js";


const router = express.Router();

router.post('/v1/create',createTenantController);

export default router;