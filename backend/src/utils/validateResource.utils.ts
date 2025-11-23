import { ZodError } from "zod";

const validateResource = (schema: any, data: any) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new Error(JSON.stringify({
            status: 'error',
            message: 'Validation failed',
            errors: result.error.issues.map((issue:any) => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
        }));
    }
    return result.data;
};
export default validateResource;