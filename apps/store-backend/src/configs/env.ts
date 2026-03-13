import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const schema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.string().url(),
    CORS_ORIGIN: z
        .string()
        .transform((origin) => origin.split(","))
        .pipe(z.array(z.string().url())),
    JWT_SECRET: z.string().min(8),
    JWT_EXPIRY: z.coerce.number().default(3600),
    ACCESS_TOKEN_SECRET: z.string().min(8).default("your-super-secret-access-token-key-which-is-long-enough"),
    REFRESH_TOKEN_SECRET: z.string().min(8).default("your-super-secret-refresh-token-key-which-is-long-enough"),
    SERVER_URL: z.string().url().default("http://localhost:5000"),
    ROOT_DIR: z.string().default(process.cwd()),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    SMTP_EMAIL: z.string().email(),
    SMTP_PASSWORD: z.string(),
});

class Environment {
    private static instance: Environment;
    private env: z.infer<typeof schema>;

    private constructor() {
        const result = schema.safeParse(process.env);
        if (!result.success) {
            console.error("Environment variable validation failed:", result.error.errors);
            throw new Error("Invalid environment variables");
        }
        this.env = result.data;
    }

    public static getInstance(): Environment {
        if (!Environment.instance) {
            Environment.instance = new Environment();
        }
        return Environment.instance;
    }

    public get<K extends keyof z.infer<typeof schema>>(key: K): z.infer<typeof schema>[K] {
        return this.env[key];
    }
}

export default Environment.getInstance();
