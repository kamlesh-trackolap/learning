import mongoose from "mongoose";

export interface RoleType {
  tenantId: mongoose.Types.ObjectId;
  name: string;
  permissions: string[];
  status: "ACTIVE" | "INACTIVE";
}

const roleSchema = new mongoose.Schema<RoleType>(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: [true, "Tenant ID is required"],
      index: true,
    },

    name: {
      type: String,
      required: [true, "Role name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
      unique:true
    },

    permissions: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const roleModel =
  mongoose.models?.Role ||
  mongoose.model<RoleType>("Role", roleSchema);

export default roleModel;
