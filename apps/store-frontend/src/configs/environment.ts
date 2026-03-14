import { z } from "zod";

const schema = z.object({
	VITE_API_BASE_URL: z.string().url(),
	VITE_APP_NAME: z.string().default("My App"),
	VITE_NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
});

type EnvConfig = z.infer<typeof schema>;

class Environment {
	private static instance: Environment;
	private env: EnvConfig;

	private constructor() {
		const result = schema.safeParse({
			...import.meta.env,
			...(typeof window !== "undefined"
				? (window as Record<string, unknown>).env || {}
				: {}),
		});
		if (!result.success) {
			console.error(
				"Environment variable validation failed:",
				result.error.issues,
			);
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

	public get config(): EnvConfig {
		return this.env;
	}
}

export const ENV = Environment.getInstance().config;
