import mongoose from "mongoose";


export interface tenantSchemaType {
  name: string;
  email: string;
  phone: string;
  password: string;
  sessions: string[];
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
    sessions: [{
      type: String
    }],
    address: addressSchema,
    localization: {
      language: {
        type: String,
        required: true,
        default: "english"
      },
      currency: {
        type: String,
        required: true,
        default: "INR"
      },
      currencySymbol: {
        type: String,
        required: true,
        default: "₹"
      },
      currencyPosition: {
        type: String,
        required: true,
        enum: ["before", "after"],
        default: "before"
      },
      dateFormate: {
        type: String,
        required: true,
        default: "DD/MM/YYYY"
      },
      timeFormate: {
        type: String,
        required: true,
        enum: ["12h", "24h"],
        default: "12h"
      },
      phoneCode: {
        type: String,
        required: true,
        default: "+91"
      },
      timezones: {
        type: String,
        required: true,
        default: "UTC"
      },
      numberFormate: {
        decimalSeparator: {
          type: String,
          required: true,
          default: "."
        },
        thousandsSeparator: {
          type: String,
          required: true,
          default: ","
        }
      }
    },
    userLimit: {
      maxuser: {
        type: Number,
        required: true,
        default: 10,
        min: 1
      },
      totalUser: {
        type: Number,
        required: true,
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

// Create and export the model
export const Tenant = mongoose.model<tenantSchemaType>("Tenant", tenantSchema);
