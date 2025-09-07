import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),
	NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3001/api'),
	API_SECRET_KEY: z.string().min(1),
	NEXTAUTH_SECRET: z.string().min(1),
	NEXTAUTH_URL: z.string().url().default('http://localhost:3000'),
	NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional(),
	NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
	STRIPE_SECRET_KEY: z.string().optional(),
	NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z.string().optional()
})

export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>
