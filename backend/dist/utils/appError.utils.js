export class AppError extends Error {
    constructor(message, { status, code = "INTERNAL_ERROR", details = null }) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.code = code;
        this.details = details;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor); // cleaner stack
    }
}
// 400 - Bad Request
export class BadRequestError extends AppError {
    constructor(message = "Bad request", details = null) {
        super(message, {
            status: 400,
            code: "BAD_REQUEST",
            details,
        });
    }
}
// 401 - Unauthorized
export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized", details = null) {
        super(message, {
            status: 401,
            code: "UNAUTHORIZED",
            details,
        });
    }
}
// 403 - Forbidden
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden", details = null) {
        super(message, {
            status: 403,
            code: "FORBIDDEN",
            details,
        });
    }
}
// 404 - Not Found
export class NotFoundError extends AppError {
    constructor(message = "Not found", details = null) {
        super(message, {
            status: 404,
            code: "NOT_FOUND",
            details,
        });
    }
}
// 409 - Conflict
export class ConflictError extends AppError {
    constructor(message = "Conflict", details = null) {
        super(message, {
            status: 409,
            code: "CONFLICT",
            details,
        });
    }
}
// 422 - Unprocessable Entity
export class UnprocessableEntityError extends AppError {
    constructor(message = "Unprocessable entity", details = null) {
        super(message, {
            status: 422,
            code: "UNPROCESSABLE_ENTITY",
            details,
        });
    }
}
// 500 - Internal Server Error
export class InternalServerError extends AppError {
    constructor(message = "Internal server error", details = null) {
        super(message, {
            status: 500,
            code: "INTERNAL_ERROR",
            details,
        });
    }
}
// 503 - Service Unavailable
export class ServiceUnavailableError extends AppError {
    constructor(message = "Service unavailable", details = null) {
        super(message, {
            status: 503,
            code: "SERVICE_UNAVAILABLE",
            details,
        });
    }
}
//# sourceMappingURL=appError.utils.js.map