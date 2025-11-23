import type { tenantType } from "../../models/tenants.model.js";
import { catchAsync } from "../../utils/catchAsync.js";
import validateResource from "../../utils/validateResource.utils.js";
import tenantCreateService from "./services/create.service.js";
import createTenantSchema from "./zod/tenantCreate.zod.js";
export const tenantCreateController = catchAsync(async(req,res)=>{
    const tenantData = validateResource(createTenantSchema, req.body);
    await tenantCreateService(tenantData);
    return res.json({
        success:true,
        message:'Workplace created successfully',
    }).status(201);
});