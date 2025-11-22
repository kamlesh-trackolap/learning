// models/Audit.js
import mongoose from "mongoose";

export interface auditTypes {
    tenantId: mongoose.Schema.Types.ObjectId;
    resourceId: string;
    userId: mongoose.Types.ObjectId;
    event: string;
    oldValue?: any;
    newValue?: any;
    changedField?: string;
    description?: string;
}

const auditSchema = new mongoose.Schema<auditTypes>({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: [true, "Tenant ID is required"],
        index: true
    },
    resourceId: {
        type: String,
        required: [true, "Resource ID is required"],
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true
    },
    event: {
        type: String,
        required: [true, "Event type is required"],
        enum: [
            'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT',
            'EXPORT', 'IMPORT', 'APPROVE', 'REJECT', 'RESTORE',
            'STATUS_CHANGE', 'PERMISSION_CHANGE', 'BULK_UPDATE'
        ],
        index: true
    },
    oldValue: {
        type: String
    },
    newValue: {
        type: String
    },
    changedField: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    }
}, {
    timestamps: true
});

const auditModal = mongoose.models?.Audit as mongoose.Model<auditTypes> ||
    mongoose.model<auditTypes>("Audit", auditSchema);

export default auditModal;