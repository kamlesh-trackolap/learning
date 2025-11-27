import tenantModal from "../../../models/tenants.model.js";
import { NotFoundError } from "../../../utils/appError.utils.js";

const tenantGetService = async (tenantId: String) => {
    if (!tenantId) {
        throw new NotFoundError("Tenant not found");
    }
    const tenant = await tenantModal.findById(tenantId);
    if (!tenant) {
        throw new NotFoundError("Tenant not found");
    }
    tenant.status = 'deleted';
    await tenant.save({ validateBeforeSave:true });
    return true;
};

export default tenantGetService;