import mongoose from "mongoose";


export interface tenantSchemaType {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: {
    street: string,
    city: string,
    state: string,
    postal_code: string,
    country: string,
  },

  // Localization Settings
  localization: {
    currency: string,
    currencySymbol: string,
    currencyPosition: "before" // "before" or "after"
    dateFormate: string; //"MM/DD/YYYY"
    timeFormate: string; // '12h' or '24h'
    phoneCode: string;
    timezones: string;

    numberFormate: {
      decimalSeparator: ".",
      thousandsSeparator: ",",
    }
  }
  userLimit: {
    maxuser: number;
    totalUser: number;
  }

  status: string;

}

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  postal_code: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  }
})

const tenantSchema = new mongoose.Schema<tenantSchemaType>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    address: addressSchema,
    localization: {
      language: {
        type: String,
        default: "english"
      },
      currency: {
        type: String,
        default: "INR"
      },
      currencySymbol: {
        type: String,
        default: "₹"
      },
      currencyPosition: {
        type: String,
        enum: ["before", "after"],
        default: "before"
      },
      dateFormate: {
        type: String,
        default: "DD/MM/YYYY"
      },
      timeFormate: {
        type: String,
        enum: ["12h", "24h"],
        default: "12h"
      },
      phoneCode: {
        type: String,
        default: "+91"
      },
      timezones: {
        type: String,
        default: "UTC"
      },
      numberFormate: {
        decimalSeparator: {
          type: String,
          default: "."
        },
        thousandsSeparator: {
          type: String,
          default: ","
        }
      }
    },
    userLimit: {
      maxuser: {
        type: Number,
        default: 10,
        min: 1
      },
      totalUser: {
        type: Number,
        default: 0,
        min: 0
      }
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "suspended", "pending"],
      default: "pending"
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

const tenantModal = (mongoose.models.Tenant as mongoose.Model<tenantSchemaType>) || mongoose.model<tenantSchemaType>("Tenant", tenantSchema);
export default tenantModal;
