import type { tenantType } from "../../../models/tenants.model.js";
import tenantModal from "../../../models/tenants.model.js";
import { AppError, ConflictError } from "../../../utils/appError.utils.js";

const tenantCreateService = async(bodyData:tenantType)=>{

    const {name,email,phone,address,localization,userLimit,} = bodyData;
    const {language,currency,currencySymbol,dateFormate,timeFormate,phoneCode,timezones,numberFormate} = localization ?? {};
    const {street,city,state,postalCode,country} = address ?? {}

    const tenantData = {
        name,
        email,
        phone,
        userLimit,
        address: {
            street,
            city,
            state,
            postalCode,
            country
        },
        localization: {
            language,
            currency,
            currencySymbol,
            dateFormate,
            timeFormate,
            phoneCode,
            timezones,
            numberFormate
        }
    };

    const isEmailExist = await tenantModal.findOne({ 
      email: email.toLowerCase() 
    });

    if(isEmailExist){
        throw new ConflictError("email is already exist",{
            status:409,
            code:"EMAIL_ALREADY_EXISTS"
        })
    }

    const newTenant = await tenantModal.create(tenantData);
    if(!newTenant){
        throw new AppError('please try again',{
            status:500
        })
    };

    // email send - Congratulation to created the workplace
    return true;
};
export default tenantCreateService;