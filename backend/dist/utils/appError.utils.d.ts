export interface AppErrorOptions {
    status: number;
    code?: string;
    details?: any;
}
export declare class AppError extends Error {
    status: number;
    code: string;
    details: any;
    isOperational: boolean;
    constructor(message: string, { status, code, details }: AppErrorOptions);
}
export declare class BadRequestError extends AppError {
    constructor(message?: string, details?: null);
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string, details?: null);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string, details?: null);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string, details?: null);
}
export declare class ConflictError extends AppError {
    constructor(message?: string, details?: null);
}
export declare class UnprocessableEntityError extends AppError {
    constructor(message?: string, details?: null);
}
export declare class InternalServerError extends AppError {
    constructor(message?: string, details?: null);
}
export declare class ServiceUnavailableError extends AppError {
    constructor(message?: string, details?: null);
}
