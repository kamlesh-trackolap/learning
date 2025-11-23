import express from "express";
import { tenantCreateController } from "./controllers.tenant.js";


const router = express.Router();

router.post('/v1/create',tenantCreateController);

export default router;