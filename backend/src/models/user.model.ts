import mongoose from "mongoose";

export interface UserType {
  tenantId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  roleId: mongoose.Types.ObjectId;
  refreshToken: {
    mobile: string | null;
    web: string | null;
  };
  status: "PENDING" | "ACTIVE" | "INACTIVE";
}

const userSchema = new mongoose.Schema<UserType>(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: [true, "Tenant is required"],
      index: true
    },

    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: [true, "Role is required"],
    },

    refreshToken: {
      mobile: {
        type: String,
        default: null,
      },
      web: {
        type: String,
        default: null,
      },
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "INACTIVE"],
      default: "PENDING",
    },
  },
  {
    timestamps: true, 
  }
);

const userModel =
  mongoose.models?.User ||
  mongoose.model<UserType>("User", userSchema);

export default userModel;
