import type { tenantType } from "../../models/tenants.model.js";
import { catchAsync } from "../../utils/catchAsync.js";
import validateResource from "../../utils/validateResource.utils.js";
import tenantCreateService from "./services/create.service.js";
import tenantGetService from "./services/get.service.js";
import createTenantSchema from "./zod/tenantCreate.zod.js";

export const tenantCreateController = catchAsync(async(req,res)=>{
    const tenantData = validateResource(createTenantSchema, req.body);
    await tenantCreateService(tenantData);
    return res.json({
        success:true,
        message:'Workplace created successfully',
    }).status(201);
});

export const tenantUpdateController = catchAsync(async(req,res)=>{
    const tenantData = validateResource(createTenantSchema, req.body);
    await tenantCreateService(tenantData);
    return res.json({
        success:true,
        message:'Workplace created successfully',
    }).status(201);
});

export const tenantGetController = catchAsync(async(req,res)=>{
    const tenantId = req.params?.tenantId;
    const tenant  =   await tenantGetService(tenantId);
    return res.json({
        success:true,
        message:'Tenant successfully found',
        data:tenant
    }).status(200);
});

export const tenantDeleteController = catchAsync(async(req,res)=>{
    const tenantId = req.params?.tenantId;
    await tenantGetService(tenantId);
    return res.json({
        success:true,
        message:'Tenant delete successfuly',
    }).status(200);
});
