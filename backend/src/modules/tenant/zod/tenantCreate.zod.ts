import { z } from 'zod';

const createTenantSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .email("Invalid email address"),
  phone: z.string()
    .optional(),
  userLimit: z.number()
    .int("User limit must be an integer")
    .positive("User limit must be positive")
    .optional()
    .default(10),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional()
  }).optional().default({}),
  localization: z.object({
    language: z.string().default('en'),
    currency: z.string().default('USD'),
    currencySymbol: z.string().default('$'),
    dateFormate: z.string().default('MM/DD/YYYY'),
    timeFormate: z.string().default('12h'),
    phoneCode: z.string().default('+1'),
    timezones: z.array(z.string()).default(['UTC']),
    numberFormate: z.string().default('en-US')
  }).optional()
});

export default createTenantSchema;