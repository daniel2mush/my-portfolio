import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  ADMIN_EMAIL: z.string().min(1, "ADMIN_EMAIL is missing"),
  ADMIN_PASSWORD: z.string().min(1, "ADMIN_PASSWORD is missing"),

  DATABASE_URL: z.url("DATABASE_URL must be a valid URL"),

  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is missing"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is missing"),
  CLOUDINARY_NAME: z.string().min(1, "CLOUDINARY_NAME is missing"),

  NEXT_PUBLIC_CLOUDINARY_NAME: z
    .string()
    .min(1, "NEXT_PUBLIC_CLOUDINARY_NAME is missing"),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z
    .string()
    .min(1, "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is missing"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log(_env.error);

  console.log(_env.error.message);

  throw new Error(`Error occured with the env file : ${_env.error.message}`);
}

export const env = _env.data;

// export const env = _env.parse(process.env);
